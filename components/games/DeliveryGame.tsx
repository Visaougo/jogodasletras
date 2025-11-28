import React from 'react';
import { DeliveryChallenge } from '../../types';
import { playSFX } from '../../utils/audioUtils';

interface DeliveryGameProps {
    item: DeliveryChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const DeliveryGame: React.FC<DeliveryGameProps> = ({ item, onComplete }) => {
    const handleDeliver = (itemId: string, e: React.MouseEvent) => {
        if (itemId === item.correctItemId) {
            playSFX('success');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl animate-fade-in">
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