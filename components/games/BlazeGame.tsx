import React from 'react';
import { BlazeChallenge } from '../../types';

interface BlazeGameProps {
    item: BlazeChallenge;
    onComplete: (success: boolean) => void;
}

export const BlazeGame: React.FC<BlazeGameProps> = ({ item, onComplete }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl animate-fade-in">
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