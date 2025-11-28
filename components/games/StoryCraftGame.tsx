import React, { useState, useEffect } from 'react';
import { StoryCraftChallenge } from '../../types';
import { PixelButton } from '../PixelUI';
import { playSFX, speakText } from '../../utils/audioUtils';

interface StoryCraftGameProps {
    item: StoryCraftChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const StoryCraftGame: React.FC<StoryCraftGameProps> = ({ item, onComplete }) => {
    const [slots, setSlots] = useState<{SUBJECT: string|null, VERB: string|null, OBJECT: string|null}>({ SUBJECT: null, VERB: null, OBJECT: null });
    
    useEffect(() => {
        setSlots({ SUBJECT: null, VERB: null, OBJECT: null });
    }, [item]);

    const handleDrop = (element: any) => {
        playSFX('click');
        setSlots(prev => ({ ...prev, [element.type]: element.label }));
    };

    const handleCraft = (e: React.MouseEvent) => {
        if (!slots.SUBJECT || !slots.VERB || !slots.OBJECT) return;
        
        const match = item.validCombinations.find(c => 
            c.subject === slots.SUBJECT && c.verb === slots.VERB && c.object === slots.OBJECT
        );

        if (match) {
            playSFX('success');
            speakText(match.resultSentence);
            setTimeout(() => onComplete(e), 2000);
        } else {
            playSFX('error');
            speakText("Essa história ficou estranha... Tente mudar algo!");
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl animate-fade-in">
             <div className="grid grid-cols-3 gap-4 mb-8 bg-stone-800 p-4 rounded border-4 border-stone-600">
                 {['SUBJECT', 'VERB', 'OBJECT'].map((type, i) => (
                     <div key={i} className="w-24 h-24 md:w-32 md:h-32 bg-black/50 border-2 border-stone-500 flex items-center justify-center text-center p-2">
                         {slots[type as keyof typeof slots] ? (
                             <span className="text-yellow-400 font-vt323 text-xl md:text-2xl uppercase">{slots[type as keyof typeof slots]}</span>
                         ) : (
                             <span className="text-white/20 text-xs uppercase">{type}</span>
                         )}
                     </div>
                 ))}
             </div>
             
             <div className="flex flex-wrap justify-center gap-4 mb-8">
                 {item.elements.map(el => (
                     <button 
                        key={el.id} 
                        onClick={() => handleDrop(el)}
                        className="bg-stone-700 text-white p-4 rounded border-b-4 border-stone-900 hover:bg-stone-600 active:translate-y-1"
                     >
                         <div className="text-3xl mb-1">{el.emoji}</div>
                         <div className="text-xs uppercase font-bold">{el.label}</div>
                     </button>
                 ))}
             </div>

             <PixelButton onClick={handleCraft} disabled={!slots.SUBJECT || !slots.VERB || !slots.OBJECT}>
                 CRIAR HISTÓRIA
             </PixelButton>
        </div>
    );
};