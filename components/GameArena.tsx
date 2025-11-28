import React, { useState, useEffect, useRef } from 'react';
import { BiomeModule, ModuleType, LettersChallenge, SyllableChallenge, FluencyChallenge, ComprehensionChallenge, CreeperChallenge, MineChallenge, FieldChallenge, TimeOfDay, WolfState, MemoryChallenge, BlazeChallenge, FillBlankChallenge, StoryCraftChallenge, ReverseChallenge, MonsterChallenge, FinalBookChallenge as FinalBookChallengeType, DeliveryChallenge, WordSearchChallenge } from '../types';
import { generateGameContent } from '../services/geminiService';
import { PixelButton, Mascot, WolfConfirmationModal, ParticleBurst, EraseButton } from './PixelUI';
import { Loader2, HelpCircle, Hand, Swords, Trash2, ArrowRight, Lightbulb } from 'lucide-react';
import { COLLECTIBLE_CARDS, FALLBACK_MEMORY } from '../constants';
import { DimensionBackground, DimensionTheme } from './DimensionBackground'; 
import { ReadingGame } from './ReadingGame'; 
import { FinalBookChallenge } from './FinalBookChallenge';
import { playSFX, speakText } from '../utils/audioUtils';
import { updateAdaptiveStats, INITIAL_ADAPTIVE_STATS } from '../utils/adaptiveSystem';

interface GameArenaProps {
  module: BiomeModule;
  level: number;
  onComplete: (xpEarned: number, emeralds: number, learnedWords: string[], droppedCard?: string, newAdaptiveStats?: any, duration?: number) => void;
  onExit: () => void;
  onUnlockAchievement: (ach: any) => void;
  onUpdateQuest: (type: string, amount: number) => void;
  currentAchievements: string[];
  userStats: any; 
  nightMode: boolean;
  soundEnabled: boolean;
  timeOfDay?: TimeOfDay; 
}

// Helper for shuffling
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const GameArena: React.FC<GameArenaProps> = ({ 
    module, 
    level, 
    onComplete, 
    onExit, 
    onUpdateQuest,
    userStats,
    nightMode,
    soundEnabled,
    timeOfDay
}) => {
  const [content, setContent] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showCutscene, setShowCutscene] = useState(true);
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [droppedCard, setDroppedCard] = useState<string | undefined>(undefined);
  const [particlePos, setParticlePos] = useState<{x: number, y: number} | null>(null);
  const [hasError, setHasError] = useState(false);
  
  // --- ADAPTIVE TRACKING ---
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentAdaptiveStats, setCurrentAdaptiveStats] = useState(userStats.adaptiveStats || INITIAL_ADAPTIVE_STATS);
  // Growing Sentences Logic: Track streaks in session
  const [sessionStreak, setSessionStreak] = useState(0); 
  
  // Track total level duration
  const levelStartTimeRef = useRef<number>(Date.now());

  // --- WOLF LOGIC STATE ---
  const [wolfCharges, setWolfCharges] = useState(3);
  const [wolfState, setWolfState] = useState<WolfState>(WolfState.IDLE);
  const [wolfMood, setWolfMood] = useState<'neutral'|'happy'|'excited'|'worried'>('neutral');
  const [selectedSyllableForHelp, setSelectedSyllableForHelp] = useState<string | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentDimension, setCurrentDimension] = useState<DimensionTheme | ModuleType>(module.type);
  const xpMultiplier = timeOfDay === 'MORNING' ? 1.5 : 1;
  const emeraldMultiplier = timeOfDay === 'AFTERNOON' ? 2 : 1;
  const voiceEffect = userStats.equippedVoiceEffect || 'NORMAL';

  // --- IDLE CHECKER (WOLF SLEEP) ---
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (wolfState === WolfState.SLEEPING) {
        setWolfState(WolfState.WAKING);
        playSFX('wake');
        setTimeout(() => setWolfState(WolfState.IDLE), 1000);
    }
    
    idleTimerRef.current = setTimeout(() => {
        if (wolfState === WolfState.IDLE) {
            setWolfState(WolfState.SLEEPING);
        }
    }, 15000);
  };

  useEffect(() => {
    resetIdleTimer();
    const handleActivity = () => resetIdleTimer();
    window.addEventListener('click', handleActivity);
    return () => {
        window.removeEventListener('click', handleActivity);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [wolfState]);


  // --- AUDIO & WOLF HANDLERS ---
  const handleSound = (type: 'correct' | 'incorrect' | 'win') => {
      if (!soundEnabled) return;
      if (type === 'incorrect') playSFX('error');
      else playSFX('success');
  };

  const handleWolfClick = () => {
    if (wolfState === WolfState.SLEEPING) return;
    if (wolfState !== WolfState.IDLE) return; 

    const isSentenceGame = [ModuleType.COMPREHENSION, ModuleType.FLUENCY, ModuleType.FILL_BLANK].includes(module.type);

    if (isSentenceGame) {
        if (wolfCharges > 0) {
            playSFX('wolf_howl');
            speakText("Olá! Qual sílaba você quer que eu leia?", true, voiceEffect);
            setWolfState(WolfState.LISTENING);
        } else {
            speakText("Minhas ajudas acabaram!", true, voiceEffect);
            setWolfState(WolfState.NO_CHARGES);
            setTimeout(() => setWolfState(WolfState.IDLE), 3000);
        }
    } else {
        playSFX('wolf_howl');
        setWolfMood('happy');
        setTimeout(() => setWolfMood('neutral'), 2000);
    }
  };

  const onSyllableSelectForHelp = (syllable: string) => {
    if (wolfState === WolfState.LISTENING) {
        setSelectedSyllableForHelp(syllable);
        setWolfState(WolfState.CONFIRMING);
        speakText("É essa sílaba aqui?", true, voiceEffect);
    }
  };

  const confirmWolfHelp = () => {
     if (selectedSyllableForHelp) {
         setWolfState(WolfState.SPEAKING);
         setWolfCharges(prev => prev - 1);
         speakText(`${selectedSyllableForHelp}.`, true, voiceEffect);
         speakText("Viu? É fácil!", true, voiceEffect);
         
         setWolfMood('happy');
         setTimeout(() => {
             setWolfState(WolfState.IDLE);
             setWolfMood('neutral');
             setSelectedSyllableForHelp(null);
         }, 3000);
     }
  };

  const cancelWolfHelp = () => {
      speakText("Tudo bem!", true, voiceEffect);
      setWolfState(WolfState.LISTENING); 
      setSelectedSyllableForHelp(null);
  };

  // --- CONTENT LOADING ---
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setHasError(false);
      try {
        let data: any[] = [];
        
        if (module.type === ModuleType.MEMORY) {
            data = FALLBACK_MEMORY; 
        } else {
            let difficulty = 'SHORT';
            if (sessionStreak > 6) difficulty = 'LONG';
            else if (sessionStreak > 3) difficulty = 'MEDIUM';
            
            data = await generateGameContent(module.type, level, difficulty as any);
        }

        if (data.length === 0) throw new Error("No content generated");

        setContent(data);
        setStartTime(Date.now()); 
        levelStartTimeRef.current = Date.now();
        setCurrentDimension(module.type);

      } catch (err) {
        console.error("Failed to load game content", err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [module.type, level, sessionStreak]);

  const calculateCardDrop = () => {
      if (Math.random() < 0.35) { 
          const roll = Math.random();
          let rarity = 'COMMON';
          if (roll > 0.95) rarity = 'LEGENDARY';
          else if (roll > 0.85) rarity = 'EPIC';
          else if (roll > 0.60) rarity = 'RARE';

          const pool = COLLECTIBLE_CARDS.filter(c => c.rarity === rarity);
          if (pool.length > 0) {
              const card = pool[Math.floor(Math.random() * pool.length)];
              setDroppedCard(card.id);
          }
      }
  };

  const handleLevelComplete = (finalScore: number) => {
    setIsFinished(true);
    handleSound('win');
    setWolfState(WolfState.CELEBRATING);
    setWolfMood('excited'); 
    speakText("Você conseguiu! Incrível!", true, voiceEffect);
    
    const baseXp = (finalScore * 10) + 50; 
    const finalXp = Math.floor(baseXp * xpMultiplier);
    const finalEmeralds = module.emeraldReward * emeraldMultiplier;
    const duration = Date.now() - levelStartTimeRef.current;

    calculateCardDrop();
    onUpdateQuest('PLAY_GAME', 1);
    onUpdateQuest('EARN_EMERALDS', finalEmeralds);

    setTimeout(() => onComplete(finalXp, finalEmeralds, collectedWords, droppedCard, currentAdaptiveStats, duration), 4000);
  };

  const handleFinalBookComplete = () => {
      setIsFinished(true);
      handleSound('win');
      setWolfState(WolfState.CELEBRATING);
      setWolfMood('excited');
      
      const finalXp = 500;
      const finalEmeralds = 200;
      const duration = Date.now() - levelStartTimeRef.current;
      
      // Award READER MARK
      const legendaryItem = 'item_reader_mark';
      setDroppedCard(legendaryItem);

      onUpdateQuest('PLAY_GAME', 1);
      setTimeout(() => onComplete(finalXp, finalEmeralds, [], legendaryItem, currentAdaptiveStats, duration), 8000);
  };

  const handleCorrectAnswer = (word?: string, event?: React.MouseEvent) => {
      const timeTaken = Date.now() - startTime;
      const newStats = updateAdaptiveStats(currentAdaptiveStats, true, timeTaken, word);
      setCurrentAdaptiveStats(newStats);
      setSessionStreak(prev => prev + 1);
      
      handleSound('correct');
      if (event) {
          setParticlePos({ x: event.clientX, y: event.clientY });
          setTimeout(() => setParticlePos(null), 1000);
      } else {
          setParticlePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          setTimeout(() => setParticlePos(null), 1000);
      }

      setWolfMood('happy');
      // Short phrases only as requested for general interactions
      speakText("ISSO!", true, voiceEffect);
      
      onUpdateQuest('CORRECT_ANSWERS', 1);
      if (word) setCollectedWords(prev => [...prev, word]);

      setTimeout(() => setWolfMood('neutral'), 1500);
  };

  const handleIncorrectAnswer = (wordId?: string) => {
      const timeTaken = Date.now() - startTime;
      const newStats = updateAdaptiveStats(currentAdaptiveStats, false, timeTaken, wordId);
      setCurrentAdaptiveStats(newStats);
      setSessionStreak(Math.max(0, sessionStreak - 1));

      handleSound('incorrect');
      setWolfMood('worried');
      // Gentle correction
      speakText("TENTE DE NOVO.", true, voiceEffect);
  };

  const nextQuestion = (points: number, word?: string, e?: React.MouseEvent) => {
    setScore(s => s + points);
    if (points > 0) handleCorrectAnswer(word, e);
    else handleIncorrectAnswer(word);

    setStartTime(Date.now()); 

    if (currentIndex < content.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 1500); 
    } else {
      handleLevelComplete(score + points);
    }
  };

  if (showCutscene && !loading && !hasError) {
      return (
          <Cutscene 
            type={module.type} 
            onComplete={() => {
                setShowCutscene(false);
                playSFX('portal');
            }} 
            nightMode={nightMode}
          />
      );
  }

  if (loading) {
    return (
      <DimensionBackground type={currentDimension}>
        <div className="flex flex-col items-center justify-center min-h-[100dvh] text-white space-y-4">
            <Loader2 className="w-20 h-20 animate-spin text-green-500" />
            <p className="text-3xl font-vt323 uppercase animate-pulse">GERANDO MUNDO...</p>
        </div>
      </DimensionBackground>
    );
  }

  if (hasError) {
     return (
      <DimensionBackground type={currentDimension}>
        <div className="flex flex-col items-center justify-center min-h-[100dvh] text-white space-y-6 text-center p-4">
            <div className="text-6xl grayscale">👾</div>
            <h2 className="text-4xl font-vt323 uppercase text-red-400">ALGO DEU ERRADO...</h2>
            <PixelButton onClick={onExit} variant="secondary">VOLTAR</PixelButton>
        </div>
      </DimensionBackground>
     );
  }

  if (isFinished) {
       return (
        <DimensionBackground type={currentDimension}>
          <div className="flex flex-col items-center justify-center min-h-[100dvh] text-center space-y-8 animate-pop-in p-4">
              <div className="text-9xl animate-bounce">💎</div>
              <h2 className="text-5xl text-white font-bold uppercase">NÍVEL COMPLETADO!</h2>
              <Mascot mood="excited" wolfState={WolfState.CELEBRATING} wolfSkin={userStats.equippedWolfSkin} />
              <div className="flex flex-col gap-4">
                  <p className="text-3xl text-yellow-400 uppercase">+{module.emeraldReward * emeraldMultiplier} ESMERALDAS</p>
                  {droppedCard && droppedCard === 'item_reader_mark' && (
                      <div className="bg-yellow-500/20 p-4 rounded border border-yellow-400 animate-pulse">
                          <p className="text-xl text-yellow-200">ITEM LENDÁRIO: MARCA DO LEITOR!</p>
                      </div>
                  )}
              </div>
          </div>
        </DimensionBackground>
      );
  }

  const currentItem = content[currentIndex];

  return (
    <DimensionBackground type={currentDimension}>
        <div className={`w-full h-full min-h-[100dvh] p-4 flex flex-col ${wolfState === WolfState.LISTENING ? 'cursor-help' : ''}`}>
        
        {particlePos && <ParticleBurst x={particlePos.x} y={particlePos.y} />}

        {/* PROGRESS BAR */}
        <div className="w-full max-w-4xl mx-auto bg-stone-900/50 h-6 border-4 border-stone-600 mb-8 relative rounded-full overflow-hidden backdrop-blur-sm shadow-lg">
            <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${((currentIndex) / content.length) * 100}%` }}
            ></div>
        </div>
        
        <Mascot 
          mood={wolfMood} 
          nightMode={nightMode} 
          xp={userStats.mascotXp} 
          level={userStats.mascotLevel}
          inventory={userStats.inventory} 
          onHelp={handleWolfClick}
          charges={wolfCharges}
          wolfState={module.type === ModuleType.FINAL_BOOK ? WolfState.RUNNING : wolfState}
          wolfSkin={userStats.equippedWolfSkin} 
        />

        {wolfState === WolfState.LISTENING && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-full border-4 border-white z-50 animate-bounce uppercase font-bold pointer-events-none shadow-2xl flex items-center gap-3">
             <HelpCircle size={28} /> CLIQUE EM UMA PALAVRA
          </div>
        )}

        {wolfState === WolfState.CONFIRMING && selectedSyllableForHelp && (
            <WolfConfirmationModal 
                syllable={selectedSyllableForHelp}
                onConfirm={confirmWolfHelp}
                onCancel={cancelWolfHelp}
            />
        )}

        <VisualCue active={!isFinished} />

        <div className="flex-grow flex flex-col justify-center relative w-full max-w-6xl mx-auto items-center">
            
            {/* EXISTING MODES */}
            {module.type === ModuleType.LETTERS && <LettersGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            {module.type === ModuleType.SYLLABLES && <SyllablesGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            
            {module.type === ModuleType.FLUENCY && <ReadingGame item={currentItem} onComplete={() => nextQuestion(1)} wolfMode={wolfState===WolfState.LISTENING} onWolfInteract={onSyllableSelectForHelp} />}
            {module.type === ModuleType.COMPREHENSION && <ComprehensionGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.CREEPER && <CreeperGame item={currentItem} onComplete={(success, e) => success ? nextQuestion(1, currentItem.word, e) : nextQuestion(0)} totalItems={content.length} currentIdx={currentIndex} />}
            {module.type === ModuleType.MINE && <MineGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            {module.type === ModuleType.FIELD && <FieldGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.MEMORY && <MemoryGame item={currentItem} onComplete={() => nextQuestion(5)} />}
            {module.type === ModuleType.BLAZE && <BlazeGame item={currentItem} onComplete={(s) => s ? nextQuestion(1) : nextQuestion(0)} />}
            {module.type === ModuleType.FILL_BLANK && <FillBlankGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.STORY_CRAFT && <StoryCraftGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.REVERSE && <ReverseGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.MONSTER && <MonsterGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            
            {/* NEW GAMES */}
            {module.type === ModuleType.FINAL_BOOK && <FinalBookChallenge item={currentItem} onComplete={handleFinalBookComplete} />}
            {module.type === ModuleType.DELIVERY && <DeliveryGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.WORD_SEARCH && <WordSearchGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}

        </div>

        <div className="mt-auto text-center pb-4 z-20">
            <button onClick={onExit} className="text-white/50 hover:text-white underline font-vt323 text-2xl uppercase">SAIR DA DIMENSÃO</button>
        </div>
        </div>
    </DimensionBackground>
  );
};

const VisualCue: React.FC<{ active: boolean }> = ({ active }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const t = setTimeout(() => setShow(false), 3000); 
        return () => clearTimeout(t);
    }, [active]);
    if (!show || !active) return null;
    return (
        <div className="fixed pointer-events-none inset-0 z-40 flex items-center justify-center opacity-0 animate-fade-in-out">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
                <Hand className="w-16 h-16 text-yellow-400 animate-bounce opacity-80 rotate-12" />
            </div>
        </div>
    );
};

const Cutscene: React.FC<{ type: ModuleType, onComplete: () => void, nightMode: boolean }> = ({ type, onComplete }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden animate-fade-in cursor-pointer" onClick={onComplete}>
         <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900 via-black to-black animate-pulse-slow opacity-50"></div>
         <div className="w-64 h-64 border-4 border-cyan-500 rounded-full animate-spin flex items-center justify-center shadow-[0_0_50px_cyan]">
             <div className="w-48 h-48 border-2 border-white rounded-full animate-ping opacity-50"></div>
         </div>
         <div className="mt-12 text-center animate-pop-in">
             <h2 className="text-4xl text-cyan-400 font-bold uppercase mb-4">ENTRANDO NO MUNDO...</h2>
             <p className="text-white animate-pulse">TOQUE PARA COMEÇAR</p>
         </div>
    </div>
);

// --- NEW DELIVERY GAME ---
const DeliveryGame: React.FC<{ item: DeliveryChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const handleDeliver = (itemId: string, e: React.MouseEvent) => {
        if (itemId === item.correctItemId) {
            playSFX('success');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl">
            {/* Instruction */}
            <div className="bg-stone-800 p-6 rounded-xl border-4 border-yellow-600 mb-8 text-center w-full">
                <div className="flex justify-center gap-2 flex-wrap">
                    {item.instructionSyllables.map((s, i) => (
                        <span key={i} className="text-2xl text-white font-vt323 uppercase bg-black/30 px-2 rounded">{s}</span>
                    ))}
                </div>
                <div className="mt-4 text-yellow-400 uppercase text-sm animate-pulse">ENTREGUE PARA: {item.targetCharacter}</div>
            </div>

            {/* Items (3 Options) */}
            <div className="flex flex-wrap gap-8 justify-center">
                {item.items.map(obj => (
                    <button 
                        key={obj.id}
                        onClick={(e) => handleDeliver(obj.id, e)}
                        className="group flex flex-col items-center bg-stone-700 p-4 rounded-lg border-b-8 border-stone-900 active:translate-y-2 hover:bg-stone-600 transition-colors min-w-[100px]"
                    >
                        <span className="text-6xl mb-2 group-hover:scale-110 transition-transform">{obj.emoji}</span>
                        <span className="text-white font-bold uppercase text-sm">{obj.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- NEW WORD SEARCH GAME ---
const WordSearchGame: React.FC<{ item: WordSearchChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [selected, setSelected] = useState<{r:number, c:number}[]>([]);
    
    // Reset selection on item change
    useEffect(() => {
        setSelected([]);
    }, [item]);

    const toggleCell = (r: number, c: number) => {
        playSFX('click');
        const exists = selected.find(s => s.r === r && s.c === c);
        if (exists) {
            setSelected(prev => prev.filter(s => s.r !== r || s.c !== c));
        } else {
            setSelected(prev => [...prev, {r, c}]);
        }
    };

    const check = (e: React.MouseEvent) => {
        if (selected.length !== item.foundCoordinates.length) {
            playSFX('error');
            return;
        }
        
        const allMatch = item.foundCoordinates.every(coord => 
            selected.some(s => s.r === coord.r && s.c === coord.c)
        );

        if (allMatch) {
            playSFX('win');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center">
             <div className="bg-purple-900 p-4 rounded-lg border-4 border-purple-500 mb-6 text-center shadow-lg">
                 <p className="text-gray-300 text-sm uppercase mb-1">ENCONTRE A PALAVRA:</p>
                 <h2 className="text-4xl text-white font-bold tracking-widest uppercase">{item.targetWord}</h2>
                 <div className="flex justify-center gap-2 mt-2">
                     {item.syllables.map((s,i) => <span key={i} className="bg-black/40 px-2 rounded text-purple-200 text-sm">{s}</span>)}
                 </div>
             </div>

             <div className="grid gap-1 bg-stone-800 p-2 rounded border-4 border-stone-600" style={{ gridTemplateColumns: `repeat(${item.gridSize}, minmax(0, 1fr))` }}>
                 {item.grid.map((row, r) => (
                     row.map((char, c) => {
                         const isSelected = selected.some(s => s.r === r && s.c === c);
                         return (
                             <button 
                                key={`${r}-${c}`}
                                onClick={() => toggleCell(r, c)}
                                className={`w-10 h-10 md:w-14 md:h-14 text-xl md:text-3xl font-bold uppercase flex items-center justify-center rounded transition-colors ${isSelected ? 'bg-green-500 text-white animate-pop-in' : 'bg-stone-700 text-gray-300 hover:bg-stone-600'}`}
                             >
                                 {char}
                             </button>
                         )
                     })
                 ))}
             </div>

             <div className="mt-8">
                 <PixelButton onClick={check}>VERIFICAR</PixelButton>
             </div>
        </div>
    );
};

// --- EXISTING GAMES ---
const BlazeGame: React.FC<{ item: BlazeChallenge, onComplete: (success: boolean) => void }> = ({ item, onComplete }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl">
            <div className="text-8xl mb-4 animate-pulse">🔥</div>
            <div className="bg-red-900/80 p-6 border-4 border-red-500 rounded-lg mb-8 text-center shadow-[0_0_30px_red]">
                <h2 className="text-3xl md:text-4xl text-yellow-200 font-vt323 uppercase leading-tight">{item.instruction}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {item.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => opt.isCorrect ? onComplete(true) : onComplete(false)}
                        className="bg-stone-800 p-8 rounded border-b-8 border-black hover:bg-stone-700 active:translate-y-2 flex flex-col items-center"
                    >
                        <span className="text-6xl mb-2">{opt.emoji}</span>
                        <span className="text-2xl font-bold uppercase">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- FILL BLANK GAME (CORRIGIDO PARA O BUG DO VÍDEO) ---
const FillBlankGame: React.FC<{ item: FillBlankChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    // 🔥 CORREÇÃO: Removemos a dependência de INTERNAL_FILL_BLANK com sorteio aleatório
    // O jogo agora obedece estritamente o item passado pelo pai (GameArena)
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        // Log para debug (pressione F12 para ver a resposta correta)
        console.log("--- FILL BLANK ---");
        console.log("Frase:", item.fullSentence);
        console.log("Resposta Correta:", item.correctWord);
        
        setShuffledOptions(shuffleArray(item.options));
    }, [item]); // Atualiza sempre que o item mudar

    const handleSelect = (word: string, e: React.MouseEvent) => {
        if (word === item.correctWord) {
            console.log("Acertou!");
            playSFX('success');
            speakText(item.fullSentence);
            onComplete(e);
        } else {
            console.log("Errou. Esperado:", item.correctWord, "Recebido:", word);
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl animate-fade-in">
            <div className="bg-amber-900/80 p-8 rounded-lg border-4 border-amber-600 mb-10 w-full text-center shadow-xl">
                 <p className="text-3xl md:text-5xl text-white font-vt323 uppercase leading-relaxed">
                     {item.sentencePart1} <span className="text-yellow-400 underline decoration-4 underline-offset-8 bg-black/30 px-2 rounded">_____</span> {item.sentencePart2}
                 </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {shuffledOptions.map((opt, i) => (
                    <button
                        key={i}
                        onClick={(e) => handleSelect(opt, e)}
                        className="bg-stone-100 text-black border-b-8 border-stone-400 px-8 py-4 text-3xl font-bold font-vt323 uppercase rounded hover:bg-white active:mt-1 active:border-b-0"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

const StoryCraftGame: React.FC<{ item: StoryCraftChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [slots, setSlots] = useState<{SUBJECT: string|null, VERB: string|null, OBJECT: string|null}>({ SUBJECT: null, VERB: null, OBJECT: null });
    
    useEffect(() => {
        // Reset slots on new item
        setSlots({ SUBJECT: null, VERB: null, OBJECT: null });
    }, [item]);

    const handleDrop = (element: any) => {
        playSFX('click');
        setSlots(prev => ({ ...prev, [element.type]: element.label }));
    };

    const handleCraft = (e: React.MouseEvent) => {
        if (!slots.SUBJECT || !slots.VERB || !slots.OBJECT) return;
        
        const match = item.validCombinations.find(c => 
            c.subject === slots.SUBJECT && c.verb === slots.VERB && c.object === slots.OBJECT
        );

        if (match) {
            playSFX('success');
            speakText(match.resultSentence);
            setTimeout(() => onComplete(e), 2000);
        } else {
            playSFX('error');
            speakText("Essa história ficou estranha... Tente mudar algo!");
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl">
             <div className="grid grid-cols-3 gap-4 mb-8 bg-stone-800 p-4 rounded border-4 border-stone-600">
                 {['SUBJECT', 'VERB', 'OBJECT'].map((type, i) => (
                     <div key={i} className="w-24 h-24 md:w-32 md:h-32 bg-black/50 border-2 border-stone-500 flex items-center justify-center text-center p-2">
                         {slots[type as keyof typeof slots] ? (
                             <span className="text-yellow-400 font-vt323 text-xl md:text-2xl uppercase">{slots[type as keyof typeof slots]}</span>
                         ) : (
                             <span className="text-white/20 text-xs uppercase">{type}</span>
                         )}
                     </div>
                 ))}
             </div>
             
             <div className="flex flex-wrap justify-center gap-4 mb-8">
                 {item.elements.map(el => (
                     <button 
                        key={el.id} 
                        onClick={() => handleDrop(el)}
                        className="bg-stone-700 text-white p-4 rounded border-b-4 border-stone-900 hover:bg-stone-600 active:translate-y-1"
                     >
                         <div className="text-3xl mb-1">{el.emoji}</div>
                         <div className="text-xs uppercase font-bold">{el.label}</div>
                     </button>
                 ))}
             </div>

             <PixelButton onClick={handleCraft} disabled={!slots.SUBJECT || !slots.VERB || !slots.OBJECT}>
                 CRIAR HISTÓRIA
             </PixelButton>
        </div>
    );
};

const ReverseGame: React.FC<{ item: ReverseChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [currentOrder, setCurrentOrder] = useState<string[]>([]);

    useEffect(() => {
        // FIXED: Use passed item instead of random internal
        setCurrentOrder(shuffleArray([...item.scrambled]));
    }, [item]); 

    const moveWord = (fromIdx: number, toIdx: number) => {
        const newOrder = [...currentOrder];
        const [removed] = newOrder.splice(fromIdx, 1);
        newOrder.splice(toIdx, 0, removed);
        setCurrentOrder(newOrder);
        playSFX('click');
    };

    const check = (e: React.MouseEvent) => {
        if (currentOrder.join(' ') === item.correct.join(' ')) {
            playSFX('success');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl">
             <h3 className="text-2xl text-white mb-8 uppercase text-center">COLOQUE A FRASE NA ORDEM CERTA:</h3>
             
             <div className="flex flex-wrap gap-4 justify-center mb-12">
                 {currentOrder.map((word, i) => (
                     <div key={i} className="flex gap-1">
                        {i > 0 && <button onClick={() => moveWord(i, i-1)} className="text-white/50 hover:text-white px-2">◀</button>}
                        <div className="bg-teal-700 text-white px-6 py-4 text-2xl font-bold rounded border-b-4 border-teal-900 uppercase">
                            {word}
                        </div>
                        {i < currentOrder.length - 1 && <button onClick={() => moveWord(i, i+1)} className="text-white/50 hover:text-white px-2">▶</button>}
                     </div>
                 ))}
             </div>
             
             <PixelButton onClick={check}>VERIFICAR</PixelButton>
        </div>
    );
};

const MonsterGame: React.FC<{ item: MonsterChallenge, onComplete: (e: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [shuffledOptions, setShuffledOptions] = useState<typeof item.options>([]);

    useEffect(() => {
        // FIXED: Use passed item directly
        setShuffledOptions(shuffleArray(item.options));
    }, [item]); 

    return (
        <div className="flex flex-col items-center w-full max-w-2xl">
            <div className="text-9xl mb-4 animate-bounce-short">🧟</div>
            <div className="bg-red-900/80 p-6 border-4 border-red-600 rounded mb-8 text-center">
                 <h2 className="text-3xl text-white font-vt323 uppercase">{item.instruction}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {shuffledOptions.map((opt, i) => (
                    <button key={i} onClick={(e) => opt.isCorrect ? onComplete(e) : playSFX('error')} className="bg-stone-800 p-6 rounded border-2 border-stone-600 hover:bg-stone-700 text-2xl text-white font-bold uppercase">
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

const LettersGame: React.FC<{ item: LettersChallenge; onComplete: (e?: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    
    // Estado local para os slots e o pool de letras
    const [placed, setPlaced] = useState<(string | null)[]>([]);
    const [pool, setPool] = useState<{char: string, id: string}[]>([]);

    // ✅ O Pool é recriado SEMPRE que o 'item' muda (nova rodada)
    useEffect(() => {
        console.log("--- 🔄 INICIANDO NOVA RODADA (LettersGame) ---");
        // Prepara as letras com IDs únicos para evitar bugs de chave no React
        const chars = item.word.split('').map((c, i) => ({ 
            char: c, 
            id: `${item.id}-${i}-${Math.random()}` 
        }));
        setPool(shuffleArray(chars));
        setPlaced(Array(item.word.length).fill(null));

    }, [item]); 

    // Função ao clicar em uma letra do pool
    const handlePoolClick = (charObj: {char: string, id: string}) => {
        playSFX('click');
        const firstEmpty = placed.findIndex(p => p === null);
        if (firstEmpty !== -1) {
            const newPlaced = [...placed];
            newPlaced[firstEmpty] = charObj.char;
            setPlaced(newPlaced);
            setPool(prev => prev.filter(p => p.id !== charObj.id));
        }
    };

    // ✅ Botão APAGAR 
    const handleBackspace = () => {
        const filledIndices = placed.map((c, i) => c !== null ? i : -1).filter(i => i !== -1);
        const lastIndex = filledIndices.length > 0 ? filledIndices[filledIndices.length - 1] : -1;

        if (lastIndex !== undefined && lastIndex !== -1) {
            const charToRemove = placed[lastIndex];
            if (charToRemove) {
                const newPlaced = [...placed];
                newPlaced[lastIndex] = null;
                setPlaced(newPlaced);
                setPool(prev => [...prev, { 
                    char: charToRemove, 
                    id: `returned-${Math.random()}` 
                }]);
                playSFX('click');
            }
        }
    };

    // ✅ Validação e Avanço
    const checkAnswer = (e: React.MouseEvent) => {
        const currentAttempt = placed.join('');
        if (currentAttempt === item.word) {
            onComplete(e); 
        } else {
             playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div className="text-9xl animate-float drop-shadow-lg">{item.emoji}</div>
            <div className="flex gap-2 min-h-[80px]">
                {placed.map((c, i) => (
                    <div 
                        key={i} 
                        className={`
                            w-14 h-14 md:w-16 md:h-16 border-4 rounded flex items-center justify-center text-4xl font-vt323 font-bold uppercase transition-all
                            ${c ? 'bg-stone-800 text-white border-stone-600 animate-pop-in' : 'bg-stone-900/50 border-stone-700 border-dashed'}
                        `}
                    >
                        {c}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center max-w-lg min-h-[80px]">
                {pool.map(c => (
                    <button 
                        key={c.id} 
                        onClick={() => handlePoolClick(c)} 
                        className="w-14 h-14 md:w-16 md:h-16 bg-orange-500 hover:bg-orange-400 text-black text-3xl md:text-4xl border-b-4 border-orange-700 rounded font-vt323 font-bold active:translate-y-1 active:border-b-0 transition-all shadow-lg"
                    >
                        {c.char}
                    </button>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <EraseButton onClick={handleBackspace} disabled={placed.every(p => p === null)} />
                <PixelButton 
                    onClick={checkAnswer} 
                    disabled={placed.some(p => p === null)} 
                    className={placed.every(p => p !== null) ? 'animate-pulse' : 'opacity-50'}
                >
                    CONSTRUIR
                </PixelButton>
            </div>
        </div>
    );
};

const SyllablesGame: React.FC<{ item: SyllableChallenge; onComplete: (e?: React.MouseEvent) => void }> = ({ item, onComplete }) => {
  const [slots, setSlots] = useState<string[]>([]);
  const [pool, setPool] = useState<{val: string, id: string}[]>([]);
  
  // FIXED: Added dependency [item] and removed fallback randomization
  useEffect(() => {
    // Create unique IDs for pool items
    const allOptions = [...item.syllables, ...item.distractors];
    const mappedPool = shuffleArray(allOptions).map((s, i) => ({
        val: s, 
        id: `syl-${i}-${Math.random()}`
    }));

    setPool(mappedPool);
    setSlots(Array(item.syllables.length).fill(''));
  }, [item]);
  
  const handlePoolClick = (sylObj: {val: string, id: string}) => {
    playSFX('click');
    const firstEmpty = slots.findIndex(s => s === '');
    if (firstEmpty !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmpty] = sylObj.val;
      setSlots(newSlots);
    }
  };
  
  const handleBackspace = () => {
      const lastFilledIndex = [...slots].reverse().findIndex(s => s !== '');
      if (lastFilledIndex !== -1) {
          const indexToRemove = slots.length - 1 - lastFilledIndex;
          const newSlots = [...slots];
          newSlots[indexToRemove] = '';
          setSlots(newSlots);
          playSFX('click');
      }
  };

  const checkAnswer = (e: React.MouseEvent) => {
    if (slots.join('') === item.syllables.join('')) onComplete(e);
    else playSFX('error');
  };

  return (
     <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="text-9xl animate-bounce drop-shadow-lg">{item.emoji}</div>
        <div className="flex gap-2">
            {slots.map((s,i) => (
                <div key={i} className={`w-20 h-20 md:w-24 md:h-24 border-4 rounded flex items-center justify-center text-3xl md:text-4xl uppercase font-vt323 font-bold transition-all ${s ? 'bg-stone-800 text-white border-white animate-pop-in' : 'bg-stone-900/50 border-stone-600 border-dashed'}`}>
                    {s}
                </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center max-w-lg mt-4">
            {pool.map((sObj) => (
                <button 
                    key={sObj.id} 
                    onClick={() => handlePoolClick(sObj)} 
                    className="px-6 py-4 text-2xl md:text-3xl font-bold uppercase rounded border-b-8 active:mt-1 active:border-b-0 font-vt323 bg-green-600 border-green-900 text-white hover:bg-green-500 hover:scale-105 transition-transform shadow-lg"
                >
                    {sObj.val}
                </button>
            ))}
        </div>
        <div className="flex gap-4 mt-6">
            <EraseButton onClick={handleBackspace} disabled={slots.every(s => s === '')} />
            <PixelButton onClick={checkAnswer} disabled={slots.some(s => s === '')} className={slots.every(s => s !== '') ? 'animate-pulse' : 'opacity-50'}>
                VERIFICAR
            </PixelButton>
        </div>
     </div>
  );
};

const MineGame: React.FC<{ item: MineChallenge; onComplete: (e?: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [slots, setSlots] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        // FIXED: Use passed item directly
        setOptions(shuffleArray([...item.correctSyllables, ...item.distractors]));
        setSlots(Array(item.correctSyllables.length).fill(''));
    }, [item]); 
    
    const handleOptionClick = (syllable: string, e: React.MouseEvent) => {
        playSFX('click');
        const nextIdx = slots.findIndex(s => s === '');
        if (nextIdx !== -1) {
             const newSlots = [...slots];
             newSlots[nextIdx] = syllable;
             setSlots(newSlots);
             if (nextIdx === item.correctSyllables.length - 1) {
                 const formedWord = [...newSlots];
                 formedWord[nextIdx] = syllable; 
                 if (formedWord.join('') === item.correctSyllables.join('')) setTimeout(() => onComplete(e), 500);
                 else setTimeout(() => { playSFX('error'); setSlots(Array(item.correctSyllables.length).fill('')); }, 1000);
             }
        }
    };

    const handleBackspace = () => {
        const lastFilledIndex = [...slots].reverse().findIndex(s => s !== '');
        if (lastFilledIndex !== -1) {
            const indexToRemove = slots.length - 1 - lastFilledIndex;
            const newSlots = [...slots];
            newSlots[indexToRemove] = '';
            setSlots(newSlots);
            playSFX('click');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-2xl animate-fade-in">
            <div className="bg-black/50 p-4 rounded-lg mb-8 text-center animate-float">
                <div className="text-8xl mb-2">{item.emoji}</div>
                <div className="flex gap-2">
                    {slots.map((s, i) => <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-stone-800 border-b-4 border-stone-600 flex items-center justify-center text-4xl text-yellow-400 font-bold uppercase font-vt323 rounded">{s}</div>)}
                </div>
            </div>
            <div className="relative w-full flex justify-center gap-4 flex-wrap bg-stone-900/80 p-6 rounded-lg border-y-4 border-stone-700">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-stone-600 -z-10"></div> 
                {options.map((syl, i) => (
                     <button key={i} onClick={(e) => handleOptionClick(syl, e)} className={`relative w-24 h-24 flex flex-col items-center justify-center bg-stone-700 border-4 border-black rounded-lg active:scale-95 transition-transform hover:-translate-y-1`}>
                        <span className="text-3xl font-bold text-white uppercase font-vt323">{syl}</span>
                     </button>
                ))}
            </div>
            <div className="mt-4">
                <EraseButton onClick={handleBackspace} />
            </div>
        </div>
    );
};

const FieldGame: React.FC<{ item: FieldChallenge; onComplete: (e?: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        // FIXED: Use passed item directly
        setShuffledOptions(shuffleArray(item.options));
    }, [item]);

    const handleChoice = (opt: string, e: React.MouseEvent) => {
        if (opt === item.target) onComplete(e);
        else playSFX('error');
    };
    return (
        <div className="flex flex-col items-center w-full animate-fade-in">
            <div className="bg-green-800/80 p-6 rounded-xl border-4 border-green-600 mb-10 text-center animate-pop-in">
                <h3 className="text-2xl md:text-4xl text-white uppercase font-bold font-vt323">{item.instruction}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {shuffledOptions.map((opt, i) => (
                    <button key={i} onClick={(e) => handleChoice(opt, e)} className="group relative w-32 h-32 flex flex-col items-center justify-end pb-4 transition-transform hover:scale-105 active:scale-95">
                        <div className="absolute bottom-0 w-2 h-16 bg-green-700 mx-auto"></div>
                        <div className="relative z-10 w-24 h-24 bg-pink-500 border-4 border-pink-700 rounded-full flex items-center justify-center shadow-lg group-hover:bg-pink-400">
                             <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-yellow-600"><span className="text-5xl font-bold text-black font-vt323">{opt}</span></div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const MemoryGame: React.FC<{ item: MemoryChallenge; onComplete: () => void }> = ({ item, onComplete }) => {
    const [cards, setCards] = useState<{id: string, content: string, type: 'TEXT'|'IMAGE', isFlipped: boolean, isMatched: boolean}[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    
    useEffect(() => {
        const gameCards = item.pairs.map(p => ({ ...p, uniqueId: Math.random(), isFlipped: false, isMatched: false }));
        setCards(gameCards.sort(() => Math.random() - 0.5));
        setFlipped([]); // Reset flipped state
    }, [item]); // FIXED: Added dependency

    const handleCardClick = (index: number) => {
        if (flipped.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;
        playSFX('click');
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);
        if (newFlipped.length === 2) {
            const c1 = cards[newFlipped[0]];
            const c2 = cards[newFlipped[1]];
            if (c1.id === c2.id) {
                playSFX('success');
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[newFlipped[0]].isMatched = true;
                    matchedCards[newFlipped[1]].isMatched = true;
                    setCards(matchedCards);
                    setFlipped([]);
                    if (matchedCards.every(c => c.isMatched)) onComplete();
                }, 1000);
            } else {
                setTimeout(() => {
                    playSFX('error');
                    const resetCards = [...cards];
                    resetCards[newFlipped[0]].isFlipped = false;
                    resetCards[newFlipped[1]].isFlipped = false;
                    setCards(resetCards);
                    setFlipped([]);
                }, 1000);
            }
        }
    };
    return (
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in">
            {cards.map((card, i) => (
                <button key={i} onClick={() => handleCardClick(i)} className={`w-24 h-24 rounded-lg text-4xl flex items-center justify-center border-4 transition-all duration-300 transform ${card.isFlipped || card.isMatched ? 'bg-white border-yellow-400 rotate-y-180' : 'bg-stone-800 border-stone-600 hover:bg-stone-700'}`}>
                    {(card.isFlipped || card.isMatched) ? card.content : '❓'}
                </button>
            ))}
        </div>
    );
};

// --- COMPREHENSION GAME ---
const ComprehensionGame: React.FC<{ item: ComprehensionChallenge; onComplete: (e?: React.MouseEvent) => void }> = ({ item, onComplete }) => {
    return (
        <div className="flex flex-col items-center animate-fade-in">
            <div className="text-3xl text-white bg-black/50 p-6 rounded mb-8 uppercase text-center font-vt323">{item.sentence}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {item.options.map((opt, i) => (
                    <button key={i} onClick={(e) => opt.isCorrect ? onComplete(e) : playSFX('error')} className="bg-stone-200 border-b-8 border-stone-400 p-8 rounded flex flex-col items-center hover:bg-white active:translate-y-2">
                        <span className="text-7xl mb-4">{opt.emoji}</span>
                        <span className="text-2xl font-bold uppercase text-black font-vt323">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- CREEPER GAME ---
const CreeperGame: React.FC<{ item: CreeperChallenge; onComplete: (success: boolean, e?: React.MouseEvent) => void; totalItems: number; currentIdx: number }> = ({ item, onComplete }) => {
    return (
        <div className="flex flex-col items-center w-full animate-fade-in">
            <h2 className="text-6xl text-white font-bold mb-8 uppercase font-vt323">{item.word}</h2>
            <div className="grid grid-cols-3 gap-6">
                {item.options.map((opt, i) => (
                    <button key={i} onClick={(e) => opt.isCorrect ? onComplete(true, e) : onComplete(false)} className="bg-stone-700 p-8 text-7xl rounded border-4 border-stone-500 hover:bg-stone-600">
                        {opt.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};