import React, { useState, useEffect } from 'react';
import { LettersChallenge } from '../../types';
import { PixelButton, EraseButton } from '../PixelUI';
import { playSFX } from '../../utils/audioUtils';

// Helper local para embaralhar
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface LettersGameProps {
    item: LettersChallenge;
    onComplete: (e?: React.MouseEvent) => void;
}

export const LettersGame: React.FC<LettersGameProps> = ({ item, onComplete }) => {
    
    // Estado local para os slots e o pool de letras
    const [placed, setPlaced] = useState<(string | null)[]>([]);
    const [pool, setPool] = useState<{char: string, id: string}[]>([]);

    // ✅ O Pool é recriado SEMPRE que o 'item' muda (nova rodada)
    useEffect(() => {
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