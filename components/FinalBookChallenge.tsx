
import React, { useState, useEffect } from 'react';
import { FinalBookChallenge as FinalBookChallengeType } from '../types';
import { playSFX, speakText } from '../utils/audioUtils';
import { PixelButton, EraseButton } from './PixelUI';
import { Lightbulb, ArrowRight, Check } from 'lucide-react';

// INTERNAL BANK FOR ROBUSTNESS (50+ Sentences)
const INTERNAL_SENTENCES = [
    { syllables: ['O', 'LO', 'BO', 'A', 'JU', 'DA', 'VO', 'CÊ'], fullText: 'O LOBO AJUDA VOCÊ' },
    { syllables: ['LE', 'R', 'É', 'U', 'MA', 'A', 'VEN', 'TU', 'RA'], fullText: 'LER É UMA AVENTURA' },
    { syllables: ['VO', 'CÊ', 'É', 'MUI', 'TO', 'FOR', 'TE'], fullText: 'VOCÊ É MUITO FORTE' },
    { syllables: ['O', 'MUN', 'DO', 'É', 'GI', 'GAN', 'TE'], fullText: 'O MUNDO É GIGANTE' },
    { syllables: ['A', 'MI', 'GOS', 'SÃO', 'PRE', 'SEN', 'TES'], fullText: 'AMIGOS SÃO PRESENTES' },
    { syllables: ['O', 'SOL', 'BRI', 'LHA', 'SE', 'MP', 'RE'], fullText: 'O SOL BRILHA SEMPRE' },
    { syllables: ['VA', 'MOS', 'BRIN', 'CAR', 'JUN', 'TOS'], fullText: 'VAMOS BRINCAR JUNTOS' },
    { syllables: ['SO', 'NHOS', 'PO', 'DEM', 'CRE', 'SCER'], fullText: 'SONHOS PODEM CRESCER' },
    { syllables: ['A', 'LU', 'Z', 'VEN', 'CE', 'O', 'ME', 'DO'], fullText: 'A LUZ VENCE O MEDO' },
    { syllables: ['VO', 'CÊ', 'É', 'UM', 'GRAN', 'DE', 'HE', 'RÓI'], fullText: 'VOCÊ É UM GRANDE HERÓI' },
    { syllables: ['A', 'PREN', 'DER', 'É', 'DI', 'VER', 'TI', 'DO'], fullText: 'APRENDER É DIVERTIDO' },
    { syllables: ['O', 'SA', 'BER', 'NÃO', 'TEM', 'FIM'], fullText: 'O SABER NÃO TEM FIM' },
    { syllables: ['A', 'MA', 'GI', 'A', 'ES', 'TÁ', 'NOS', 'LI', 'VROS'], fullText: 'A MAGIA ESTÁ NOS LIVROS' },
    { syllables: ['CA', 'DA', 'PA', 'LA', 'VRA', 'CON', 'TA'], fullText: 'CADA PALAVRA CONTA' },
    { syllables: ['VO', 'CÊ', 'PO', 'DE', 'VO', 'AR', 'LON', 'GE'], fullText: 'VOCÊ PODE VOAR LONGE' },
    { syllables: ['A', 'I', 'MA', 'GI', 'NA', 'ÇÃO', 'CRI', 'A'], fullText: 'A IMAGINAÇÃO CRIA' },
    { syllables: ['SE', 'JA', 'CU', 'RI', 'O', 'SO', 'SEM', 'PRE'], fullText: 'SEJA CURIOSO SEMPRE' },
    { syllables: ['DES', 'CU', 'BRA', 'NO', 'VAS', 'COI', 'SAS'], fullText: 'DESCUBRA NOVAS COISAS' },
    { syllables: ['O', 'FU', 'TU', 'RO', 'É', 'BRI', 'LHAN', 'TE'], fullText: 'O FUTURO É BRILHANTE' },
    { syllables: ['VO', 'CÊ', 'FAZ', 'A', 'DI', 'FE', 'REN', 'ÇA'], fullText: 'VOCÊ FAZ A DIFERENÇA' },
    { syllables: ['A', 'ME', 'A', 'NA', 'TU', 'RE', 'ZA'], fullText: 'AME A NATUREZA' },
    { syllables: ['CUI', 'DE', 'DOS', 'A', 'NI', 'MAIS'], fullText: 'CUIDE DOS ANIMAIS' },
    { syllables: ['RES', 'PEI', 'TE', 'AS', 'PES', 'SO', 'AS'], fullText: 'RESPEITE AS PESSOAS' },
    { syllables: ['SE', 'JA', 'GEN', 'TIL', 'COM', 'TO', 'DOS'], fullText: 'SEJA GENTIL COM TODOS' },
    { syllables: ['A', 'JU', 'DE', 'QUEM', 'PRE', 'CI', 'SA'], fullText: 'AJUDE QUEM PRECISA' },
    { syllables: ['DI', 'GA', 'SEM', 'PRE', 'A', 'VER', 'DA', 'DE'], fullText: 'DIGA SEMPRE A VERDADE' },
    { syllables: ['FA', 'ÇA', 'O', 'SEU', 'ME', 'LHOR'], fullText: 'FAÇA O SEU MELHOR' },
    { syllables: ['NUN', 'CA', 'DE', 'SIS', 'TA', 'DOS', 'SO', 'NHOS'], fullText: 'NUNCA DESISTA DOS SONHOS' },
    { syllables: ['A', 'CRE', 'DI', 'TE', 'EM', 'VO', 'CÊ'], fullText: 'ACREDITE EM VOCÊ' },
    { syllables: ['O', 'A', 'MOR', 'É', 'IM', 'POR', 'TAN', 'TE'], fullText: 'O AMOR É IMPORTANTE' },
    { syllables: ['A', 'PAZ', 'TRAZ', 'FE', 'LI', 'CI', 'DA', 'DE'], fullText: 'A PAZ TRAZ FELICIDADE' },
    { syllables: ['SOR', 'RIA', 'PA', 'RA', 'A', 'VI', 'DA'], fullText: 'SORRIA PARA A VIDA' },
    { syllables: ['CAN', 'TE', 'E', 'DAN', 'CE', 'MUI', 'TO'], fullText: 'CANTE E DANCE MUITO' },
    { syllables: ['BRIN', 'QUE', 'COM', 'SEUS', 'A', 'MI', 'GOS'], fullText: 'BRINQUE COM SEUS AMIGOS' },
    { syllables: ['ES', 'TU', 'DE', 'PA', 'RA', 'CRES', 'CER'], fullText: 'ESTUDE PARA CRESCER' },
    { syllables: ['LE', 'IA', 'TO', 'DOS', 'OS', 'DI', 'AS'], fullText: 'LEIA TODOS OS DIAS' },
    { syllables: ['ES', 'CRE', 'VA', 'SU', 'AS', 'I', 'DEI', 'AS'], fullText: 'ESCREVA SUAS IDEIAS' },
    { syllables: ['DE', 'SE', 'NHE', 'O', 'SEU', 'MUN', 'DO'], fullText: 'DESENHE O SEU MUNDO' },
    { syllables: ['PIN', 'TE', 'COM', 'CO', 'RES', 'VI', 'VAS'], fullText: 'PINTE COM CORES VIVAS' },
    { syllables: ['OU', 'ÇA', 'BO', 'AS', 'HIS', 'TÓ', 'RI', 'AS'], fullText: 'OUÇA BOAS HISTÓRIAS' },
    { syllables: ['CON', 'TE', 'O', 'QUE', 'A', 'PREN', 'DEU'], fullText: 'CONTE O QUE APRENDEU' },
    { syllables: ['SE', 'JA', 'UM', 'BOM', 'LEI', 'TOR'], fullText: 'SEJA UM BOM LEITOR' },
    { syllables: ['A', 'LEI', 'TU', 'RA', 'LI', 'BER', 'TA'], fullText: 'A LEITURA LIBERTA' },
    { syllables: ['O', 'SA', 'BER', 'É', 'PO', 'DER'], fullText: 'O SABER É PODER' },
    { syllables: ['VO', 'CÊ', 'É', 'ES', 'PE', 'CI', 'AL'], fullText: 'VOCÊ É ESPECIAL' },
    { syllables: ['O', 'MUN', 'DO', 'PRE', 'CI', 'SA', 'DE', 'TI'], fullText: 'O MUNDO PRECISA DE TI' },
    { syllables: ['BRI', 'LHE', 'CO', 'MO', 'U', 'MA', 'ES', 'TRE', 'LA'], fullText: 'BRILHE COMO UMA ESTRELA' },
    { syllables: ['VO', 'CÊ', 'CON', 'SE', 'GUE', 'TU', 'DO'], fullText: 'VOCÊ CONSEGUE TUDO' },
    { syllables: ['PAR', 'A', 'BÉNS', 'PE', 'LA', 'CON', 'QUIS', 'TA'], fullText: 'PARABÉNS PELA CONQUISTA' },
    { syllables: ['A', 'AVEN', 'TU', 'RA', 'CON', 'TI', 'NU', 'A'], fullText: 'A AVENTURA CONTINUA' }
];

interface FinalBookChallengeProps {
  item: FinalBookChallengeType;
  onComplete: () => void;
}

export const FinalBookChallenge: React.FC<FinalBookChallengeProps> = ({ item, onComplete }) => {
    const [phases, setPhases] = useState<{syllables: string[], fullText: string}[]>([]);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [placedSyllables, setPlacedSyllables] = useState<string[]>([]);
    const [poolSyllables, setPoolSyllables] = useState<{id: string, val: string, x: number, y: number}[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    
    // --- HINT SYSTEM STATE ---
    const [hintsUsed, setHintsUsed] = useState(0);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
    
    // Highlighting IDs
    const [hintHighlightId, setHintHighlightId] = useState<string | null>(null); // For Type 1 & 2
    const [sequenceHighlightId, setSequenceHighlightId] = useState<string | null>(null); // For Type 3

    // Initialization: Pick 6-10 random sentences
    useEffect(() => {
        // Pick 10 random sentences from internal bank
        const shuffledBank = [...INTERNAL_SENTENCES].sort(() => Math.random() - 0.5);
        const selected = shuffledBank.slice(0, 10);
        setPhases(selected);
    }, []);

    // Generate non-overlapping positions
    const generateNonOverlappingPositions = (items: string[]) => {
        const positions: {id: string, val: string, x: number, y: number}[] = [];
        const ITEM_WIDTH = 12; 
        const ITEM_HEIGHT = 15;
        const MARGIN = 2; 

        items.forEach((val, i) => {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 50;

            while(!placed && attempts < maxAttempts) {
                // Random Pos: 5% to 85% width, 10% to 80% height to stay within pool area
                const x = Math.random() * (90 - ITEM_WIDTH) + 5;
                const y = Math.random() * (80 - ITEM_HEIGHT) + 5;

                const collision = positions.some(p => {
                    return (
                        x < p.x + ITEM_WIDTH + MARGIN &&
                        x + ITEM_WIDTH + MARGIN > p.x &&
                        y < p.y + ITEM_HEIGHT + MARGIN &&
                        y + ITEM_HEIGHT + MARGIN > p.y
                    );
                });

                if (!collision) {
                    positions.push({
                        id: `${val}-${i}-${Math.random()}`,
                        val,
                        x,
                        y
                    });
                    placed = true;
                }
                attempts++;
            }

            // Fallback grid if crowded
            if(!placed) {
                const cols = 4; 
                const col = i % cols;
                const row = Math.floor(i / cols);
                positions.push({
                    id: `${val}-${i}-${Math.random()}`,
                    val,
                    x: col * 22 + 5,
                    y: row * 20 + 10
                });
            }
        });
        return positions;
    };

    // Initialize Sentence Round
    useEffect(() => {
        if (isCompleted || phases.length === 0) return;

        const currentSentence = phases[sentenceIndex];
        if (currentSentence) {
            setPlacedSyllables([]);
            setIsSuccess(false);
            setHintsUsed(0);
            setMistakeCount(0);
            setHintHighlightId(null);
            setSequenceHighlightId(null);
            setLastInteractionTime(Date.now());
            
            // Add some noise (distractors are implicit or we just use the sentence parts)
            // For now, just the sentence parts shuffled
            const allSyllables = [...currentSentence.syllables];
            const shuffled = allSyllables.sort(() => Math.random() - 0.5);
            setPoolSyllables(generateNonOverlappingPositions(shuffled));
        } else if (phases.length > 0 && sentenceIndex >= phases.length) {
            setIsCompleted(true);
            onComplete();
        }
    }, [sentenceIndex, phases, isCompleted]);

    // --- HINT LOGIC ---

    // DICA TIPO 2: Auto Hint (Idle)
    useEffect(() => {
        if (isSuccess || isCompleted) return;
        
        const checkIdle = setInterval(() => {
            if (Date.now() - lastInteractionTime > 6000) {
                // Trigger Type 2 (Next Syllable) automatically
                triggerHint('NEXT');
            }
        }, 1000);

        return () => clearInterval(checkIdle);
    }, [lastInteractionTime, isSuccess, placedSyllables, poolSyllables, isCompleted]);

    const triggerHint = (type: 'FIRST' | 'NEXT' | 'ORDER') => {
        const currentSentence = phases[sentenceIndex];
        if (!currentSentence) return;

        const targetSyllables = currentSentence.syllables;
        const nextIndex = placedSyllables.length;

        // If phrase is complete, no hints needed
        if (nextIndex >= targetSyllables.length) return;

        if (type === 'FIRST' || type === 'NEXT') {
            // Highlight the next correct syllable in the pool
            const nextVal = targetSyllables[nextIndex];
            const targetPoolItem = poolSyllables.find(p => p.val === nextVal);
            
            if (targetPoolItem) {
                playSFX('pop');
                setHintHighlightId(targetPoolItem.id);
                setTimeout(() => setHintHighlightId(null), 2000);
                setLastInteractionTime(Date.now());
            }
        } 
        else if (type === 'ORDER') {
            // Pulse correct syllables in sequence
            const remainingTargets = targetSyllables.slice(nextIndex);
            let delay = 0;
            
            remainingTargets.forEach((val) => {
                setTimeout(() => {
                    const item = poolSyllables.find(p => p.val === val);
                    if (item) {
                        playSFX('pop');
                        setSequenceHighlightId(item.id);
                        setTimeout(() => setSequenceHighlightId(null), 400);
                    }
                }, delay);
                delay += 500;
            });
        }
    };

    const handleManualHintClick = () => {
        if (hintsUsed >= 2 || isSuccess) return;

        if (hintsUsed === 0) {
            triggerHint('FIRST');
        } else if (hintsUsed === 1) {
            triggerHint('ORDER');
        }
        setHintsUsed(prev => prev + 1);
        setLastInteractionTime(Date.now());
    };

    const handlePoolClick = (sylObj: {id: string, val: string, x: number, y: number}) => {
        playSFX('click');
        setLastInteractionTime(Date.now());

        // Validation Logic
        const currentSentence = phases[sentenceIndex];
        const targetSyllables = currentSentence.syllables;
        const nextIndex = placedSyllables.length;

        if (sylObj.val !== targetSyllables[nextIndex]) {
            // Mistake
            playSFX('error');
            setMistakeCount(prev => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    triggerHint('NEXT'); // Auto trigger Type 2 on 3rd mistake
                    return 0;
                }
                return newCount;
            });
            return; // Block incorrect placement
        } 
        
        // Correct placement
        setMistakeCount(0);
        setPoolSyllables(prev => prev.filter(p => p.id !== sylObj.id));
        setPlacedSyllables(prev => [...prev, sylObj.val]);
        
        if (hintHighlightId === sylObj.id) setHintHighlightId(null);
    };

    const handleBackspace = () => {
        const lastPlaced = placedSyllables[placedSyllables.length - 1];
        if (lastPlaced) {
            playSFX('click');
            setPlacedSyllables(prev => prev.slice(0, -1));
            
            // Return to pool with SAFE position
            let newX = Math.random() * 80 + 5;
            let newY = Math.random() * 70 + 10;
            
            // Simple retry for non-overlap
            let placed = false;
            let attempts = 0;
            while(!placed && attempts < 20) {
                const collision = poolSyllables.some(p => 
                    Math.abs(p.x - newX) < 12 && Math.abs(p.y - newY) < 15
                );
                if(!collision) placed = true;
                else {
                    newX = Math.random() * 80 + 5;
                    newY = Math.random() * 70 + 10;
                    attempts++;
                }
            }

            setPoolSyllables(prev => [...prev, {
                id: `${lastPlaced}-${Math.random()}`,
                val: lastPlaced,
                x: newX,
                y: newY
            }]);
        }
    };

    useEffect(() => {
        if (isCompleted || phases.length === 0) return;
        const currentSentence = phases[sentenceIndex];
        
        const target = currentSentence.syllables.join('');
        const constructed = placedSyllables.join('');
        
        if (constructed === target) {
            setIsSuccess(true);
            playSFX('success');
            speakText(currentSentence.fullText);
            setTimeout(() => {
                setSentenceIndex(prev => prev + 1);
            }, 2000);
        }
    }, [placedSyllables, sentenceIndex, phases, isCompleted]);

    if (isCompleted) {
        return <div className="text-white text-4xl animate-pulse text-center p-8 uppercase font-vt323">O LIVRO FOI RESTAURADO!</div>;
    }

    if (phases.length === 0) {
        return <div className="text-white text-center">CARREGANDO...</div>;
    }

    return (
        <div className="flex flex-col items-center w-full h-[85vh] relative font-vt323">
            
            {/* HEADER with HINT BUTTON */}
            <div className="w-full max-w-4xl flex justify-between items-start absolute top-0 left-0 z-30 p-2">
                <div className="flex flex-col">
                    <div className="text-white/50 text-xs md:text-sm uppercase mb-2 bg-black/40 px-2 py-1 rounded">
                        FRASE {sentenceIndex + 1} DE {phases.length}
                    </div>
                </div>
                
                <button 
                    onClick={handleManualHintClick}
                    disabled={hintsUsed >= 2 || isSuccess}
                    className={`flex flex-col items-center justify-center bg-yellow-500 border-b-4 border-yellow-700 text-black rounded-full w-16 h-16 shadow-lg transition-all active:translate-y-1 ${hintsUsed >= 2 ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-110 animate-pulse-slow'}`}
                >
                    <Lightbulb size={28} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold -mt-1 uppercase">DICA</span>
                </button>
            </div>

            <div className={`text-7xl md:text-9xl mb-2 transition-transform duration-500 mt-8 ${isSuccess ? 'scale-125 rotate-12 drop-shadow-[0_0_50px_gold]' : 'animate-float'}`}>📖</div>

            {/* CONSTRUCTION ZONE */}
            <div className={`w-full max-w-4xl bg-black/40 border-4 ${isSuccess ? 'border-yellow-400 bg-yellow-900/30' : 'border-white/30'} rounded-xl p-4 md:p-6 min-h-[120px] flex gap-2 md:gap-4 justify-center items-center flex-wrap mb-4 transition-colors duration-300 relative z-20`}>
                 {placedSyllables.length === 0 && !isSuccess && <span className="text-white/30 text-xl md:text-3xl uppercase absolute animate-pulse pointer-events-none">MONTE A FRASE AQUI</span>}
                 {placedSyllables.map((syl, i) => (
                     <div 
                        key={i} 
                        className="bg-yellow-500 text-black font-bold text-2xl md:text-4xl px-3 py-2 md:px-5 md:py-3 rounded shadow-lg border-b-8 border-yellow-700 animate-pop-in"
                     >
                         {syl}
                     </div>
                 ))}
            </div>

            {/* ACTION BAR: ERASE BUTTON */}
            <div className="w-full max-w-4xl flex justify-end mb-2 z-20 px-2">
                <EraseButton onClick={handleBackspace} disabled={placedSyllables.length === 0 || isSuccess} />
            </div>

            {/* SCATTERED POOL AREA */}
            <div className="flex-grow w-full relative bg-stone-900/30 rounded-xl border-2 border-white/10 overflow-hidden z-10">
                {poolSyllables.map((sylObj) => {
                    const isHinted = hintHighlightId === sylObj.id || sequenceHighlightId === sylObj.id;
                    return (
                        <button 
                            key={sylObj.id} 
                            onClick={() => handlePoolClick(sylObj)}
                            className={`absolute font-bold text-2xl md:text-4xl px-3 py-2 md:px-5 md:py-3 rounded-lg shadow-xl border-b-8 transition-all animate-float
                                ${isHinted ? 'bg-yellow-400 text-black border-yellow-600 ring-4 ring-yellow-200 z-50 scale-110 animate-ping' : 'bg-purple-600 text-white border-purple-800 hover:bg-purple-500 active:scale-95'}
                            `}
                            style={{ 
                                left: `${sylObj.x}%`, 
                                top: `${sylObj.y}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                zIndex: isHinted ? 100 : Math.floor(sylObj.y) 
                            }}
                        >
                            {sylObj.val}
                        </button>
                    );
                })}
            </div>
            <div className="mt-2 text-white/30 text-xs uppercase text-center">TOQUE NAS PEÇAS PARA MOVER</div>
        </div>
    );
};
