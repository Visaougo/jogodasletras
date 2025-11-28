import React from 'react';
import { CreeperChallenge } from '../../types';

interface CreeperGameProps {
    item: CreeperChallenge;
    onComplete: (success: boolean, e?: React.MouseEvent) => void;
    totalItems: number;
    currentIdx: number;
}

export const CreeperGame: React.FC<CreeperGameProps> = ({ item, onComplete }) => {
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