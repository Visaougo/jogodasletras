import React, { useState, useEffect, useRef } from 'react';
import { BiomeModule, ModuleType, TimeOfDay, WolfState, FinalBookChallenge as FinalBookChallengeType } from '../types';
import { generateGameContent } from '../services/geminiService';
import { Mascot, WolfConfirmationModal, ParticleBurst, PixelButton, EraseButton } from './PixelUI';
import { Loader2, HelpCircle, Hand, Clock } from 'lucide-react';
import { COLLECTIBLE_CARDS, FALLBACK_MEMORY } from '../constants';
import { DimensionBackground, DimensionTheme } from './DimensionBackground'; 
import { ReadingGame } from './ReadingGame'; 
import { FinalBookChallenge } from './FinalBookChallenge';

// --- IMPORTAÇÕES DOS JOGOS ---
import { LettersGame } from './games/LettersGame'; 
import { SyllablesGame } from './games/SyllablesGame';
import { MineGame } from './games/MineGame';
import { MemoryGame } from './games/MemoryGame';
import { FieldGame } from './games/FieldGame';
import { ComprehensionGame } from './games/ComprehensionGame';
import { CreeperGame } from './games/CreeperGame';
import { BlazeGame } from './games/BlazeGame';
import { FillBlankGame } from './games/FillBlankGame';
import { StoryCraftGame } from './games/StoryCraftGame';
import { ReverseGame } from './games/ReverseGame';
import { MonsterGame } from './games/MonsterGame';
import { DeliveryGame } from './games/DeliveryGame';
import { WordSearchGame } from './games/WordSearchGame';
// -------------------------------------

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
  const [sessionStreak, setSessionStreak] = useState(0); 
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

        {/* RELÓGIO DE TEMPO DE JOGO */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full font-vt323 border border-white/20 flex items-center gap-2 z-30">
            <Clock size={16} className="text-yellow-400" />
            <span>
                {Math.floor((userStats.dailyPlayTime || 0) / 60).toString().padStart(2, '0')}:
                {((userStats.dailyPlayTime || 0) % 60).toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-400 ml-1">/ 15m</span>
        </div>

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
            
            {/* SEPARATED GAMES */}
            {module.type === ModuleType.LETTERS && <LettersGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            {module.type === ModuleType.SYLLABLES && <SyllablesGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            {module.type === ModuleType.MINE && <MineGame item={currentItem} onComplete={(e) => nextQuestion(1, currentItem.word, e)} />}
            {module.type === ModuleType.FIELD && <FieldGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.MEMORY && <MemoryGame item={currentItem} onComplete={() => nextQuestion(5)} />}
            {module.type === ModuleType.COMPREHENSION && <ComprehensionGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.CREEPER && <CreeperGame item={currentItem} onComplete={(success, e) => success ? nextQuestion(1, currentItem.word, e) : nextQuestion(0)} totalItems={content.length} currentIdx={currentIndex} />}
            {module.type === ModuleType.BLAZE && <BlazeGame item={currentItem} onComplete={(s) => s ? nextQuestion(1) : nextQuestion(0)} />}
            {module.type === ModuleType.FILL_BLANK && <FillBlankGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.STORY_CRAFT && <StoryCraftGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.REVERSE && <ReverseGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.MONSTER && <MonsterGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.DELIVERY && <DeliveryGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            {module.type === ModuleType.WORD_SEARCH && <WordSearchGame item={currentItem} onComplete={(e) => nextQuestion(1, undefined, e)} />}
            
            {/* INLINE GAMES */}
            {module.type === ModuleType.FLUENCY && <ReadingGame item={currentItem} onComplete={() => nextQuestion(1)} wolfMode={wolfState===WolfState.LISTENING} onWolfInteract={onSyllableSelectForHelp} />}
            
            {/* NEW GAMES */}
            {module.type === ModuleType.FINAL_BOOK && <FinalBookChallenge item={currentItem} onComplete={handleFinalBookComplete} />}

        </div>

        <div className="mt-auto text-center pb-4 z-20">
            <button onClick={onExit} className="text-white/50 hover:text-white underline font-vt323 text-2xl uppercase">SAIR DA DIMENSÃO</button>
        </div>
        </div> {/* ✅ FECHAMENTO DA DIV PRINCIPAL */}
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