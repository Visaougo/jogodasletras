import React, { useState, useEffect } from 'react';
import { FieldChallenge } from '../../types';
import { playSFX } from '../../utils/audioUtils';
import { FALLBACK_FIELD } from '../../constants';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface FieldGameProps {
    item: FieldChallenge;
    onComplete: (e?: React.MouseEvent) => void;
}

export const FieldGame: React.FC<FieldGameProps> = ({ item, onComplete }) => {
    const INTERNAL_FIELD = FALLBACK_FIELD;
    const [currentItem, setCurrentItem] = useState(item);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        // Usa o item passado se tiver alvo, senão fallback
        const selected = INTERNAL_FIELD[Math.floor(Math.random() * INTERNAL_FIELD.length)];
        const targetItem = item.target ? item : selected;
        setCurrentItem(targetItem);
        setShuffledOptions(shuffleArray(targetItem.options));
    }, [item]);

    const handleChoice = (opt: string, e: React.MouseEvent) => {
        if (opt === currentItem.target) onComplete(e);
        else playSFX('error');
    };
    return (
        <div className="flex flex-col items-center w-full animate-fade-in">
            <div className="bg-green-800/80 p-6 rounded-xl border-4 border-green-600 mb-10 text-center animate-pop-in">
                <h3 className="text-2xl md:text-4xl text-white uppercase font-bold font-vt323">{currentItem.instruction}</h3>
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