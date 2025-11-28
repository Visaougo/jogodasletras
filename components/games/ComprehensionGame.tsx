import React from 'react';
import { ComprehensionChallenge } from '../../types';
import { playSFX } from '../../utils/audioUtils';

interface ComprehensionGameProps {
    item: ComprehensionChallenge;
    onComplete: (e?: React.MouseEvent) => void;
}

export const ComprehensionGame: React.FC<ComprehensionGameProps> = ({ item, onComplete }) => {
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