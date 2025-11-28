import React, { useState, useEffect } from 'react';
import { MonsterChallenge } from '../../types';
import { playSFX } from '../../utils/audioUtils';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface MonsterGameProps {
    item: MonsterChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const MonsterGame: React.FC<MonsterGameProps> = ({ item, onComplete }) => {
    const [shuffledOptions, setShuffledOptions] = useState<typeof item.options>([]);

    useEffect(() => {
        setShuffledOptions(shuffleArray(item.options));
    }, [item]); 

    return (
        <div className="flex flex-col items-center w-full max-w-2xl animate-fade-in">
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