import React, { useState, useEffect } from 'react';
import { MineChallenge } from '../../types';
import { EraseButton } from '../PixelUI';
import { playSFX } from '../../utils/audioUtils';
import { FALLBACK_MINE } from '../../constants';

// Helper
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface MineGameProps {
    item: MineChallenge;
    onComplete: (e?: React.MouseEvent) => void;
}

export const MineGame: React.FC<MineGameProps> = ({ item, onComplete }) => {
    const INTERNAL_MINE = FALLBACK_MINE;
    const [currentItem, setCurrentItem] = useState(item);
    const [slots, setSlots] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        // Usa o item passado ou um fallback
        const selected = INTERNAL_MINE[Math.floor(Math.random() * INTERNAL_MINE.length)];
        const targetItem = item.correctSyllables ? item : selected;
        setCurrentItem(targetItem);
        
        setOptions(shuffleArray([...targetItem.correctSyllables, ...targetItem.distractors]));
        setSlots(Array(targetItem.correctSyllables.length).fill(''));
    }, [item]); 
    
    const handleOptionClick = (syllable: string, e: React.MouseEvent) => {
        playSFX('click');
        const nextIdx = slots.findIndex(s => s === '');
        if (nextIdx !== -1) {
             const newSlots = [...slots];
             newSlots[nextIdx] = syllable;
             setSlots(newSlots);
             if (nextIdx === currentItem.correctSyllables.length - 1) {
                 const formedWord = [...newSlots];
                 formedWord[nextIdx] = syllable; 
                 if (formedWord.join('') === currentItem.correctSyllables.join('')) setTimeout(() => onComplete(e), 500);
                 else setTimeout(() => { playSFX('error'); setSlots(Array(currentItem.correctSyllables.length).fill('')); }, 1000);
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
                <div className="text-8xl mb-2">{currentItem.emoji}</div>
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