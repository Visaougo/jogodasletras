import React, { useState, useEffect } from 'react';
import { ReverseChallenge } from '../../types';
import { PixelButton } from '../PixelUI';
import { playSFX } from '../../utils/audioUtils';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface ReverseGameProps {
    item: ReverseChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const ReverseGame: React.FC<ReverseGameProps> = ({ item, onComplete }) => {
    const [currentOrder, setCurrentOrder] = useState<string[]>([]);

    useEffect(() => {
        setCurrentOrder(shuffleArray([...item.scrambled]));
    }, [item]); 

    const moveWord = (fromIdx: number, toIdx: number) => {
        const newOrder = [...currentOrder];
        const [removed] = newOrder.splice(fromIdx, 1);
        newOrder.splice(toIdx, 0, removed);
        setCurrentOrder(newOrder);
        playSFX('click');
    };

    const check = (e: React.MouseEvent) => {
        if (currentOrder.join(' ') === item.correct.join(' ')) {
            playSFX('success');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl animate-fade-in">
             <h3 className="text-2xl text-white mb-8 uppercase text-center">COLOQUE A FRASE NA ORDEM CERTA:</h3>
             
             <div className="flex flex-wrap gap-4 justify-center mb-12">
                 {currentOrder.map((word, i) => (
                     <div key={i} className="flex gap-1">
                        {i > 0 && <button onClick={() => moveWord(i, i-1)} className="text-white/50 hover:text-white px-2">◀</button>}
                        <div className="bg-teal-700 text-white px-6 py-4 text-2xl font-bold rounded border-b-4 border-teal-900 uppercase">
                            {word}
                        </div>
                        {i < currentOrder.length - 1 && <button onClick={() => moveWord(i, i+1)} className="text-white/50 hover:text-white px-2">▶</button>}
                     </div>
                 ))}
             </div>
             
             <PixelButton onClick={check}>VERIFICAR</PixelButton>
        </div>
    );
};