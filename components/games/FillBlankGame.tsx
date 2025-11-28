import React, { useState, useEffect } from 'react';
import { FillBlankChallenge } from '../../types';
import { playSFX, speakText } from '../../utils/audioUtils';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface FillBlankGameProps {
    item: FillBlankChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const FillBlankGame: React.FC<FillBlankGameProps> = ({ item, onComplete }) => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        setShuffledOptions(shuffleArray(item.options));
    }, [item]);

    const handleSelect = (word: string, e: React.MouseEvent) => {
        if (word === item.correctWord) {
            playSFX('success');
            speakText(item.fullSentence);
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl animate-fade-in">
            <div className="bg-amber-900/80 p-8 rounded-lg border-4 border-amber-600 mb-10 w-full text-center shadow-xl">
                 <p className="text-3xl md:text-5xl text-white font-vt323 uppercase leading-relaxed">
                     {item.sentencePart1} <span className="text-yellow-400 underline decoration-4 underline-offset-8 bg-black/30 px-2 rounded">_____</span> {item.sentencePart2}
                 </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {shuffledOptions.map((opt, i) => (
                    <button
                        key={i}
                        onClick={(e) => handleSelect(opt, e)}
                        className="bg-stone-100 text-black border-b-8 border-stone-400 px-8 py-4 text-3xl font-bold font-vt323 uppercase rounded hover:bg-white active:mt-1 active:border-b-0"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};