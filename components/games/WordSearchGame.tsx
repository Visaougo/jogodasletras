import React, { useState, useEffect } from 'react';
import { WordSearchChallenge } from '../../types';
import { PixelButton } from '../PixelUI';
import { playSFX } from '../../utils/audioUtils';

interface WordSearchGameProps {
    item: WordSearchChallenge;
    onComplete: (e: React.MouseEvent) => void;
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({ item, onComplete }) => {
    const [selected, setSelected] = useState<{r:number, c:number}[]>([]);
    
    // Reset selection on item change
    useEffect(() => {
        setSelected([]);
    }, [item]);

    const toggleCell = (r: number, c: number) => {
        playSFX('click');
        const exists = selected.find(s => s.r === r && s.c === c);
        if (exists) {
            setSelected(prev => prev.filter(s => s.r !== r || s.c !== c));
        } else {
            setSelected(prev => [...prev, {r, c}]);
        }
    };

    const check = (e: React.MouseEvent) => {
        if (selected.length !== item.foundCoordinates.length) {
            playSFX('error');
            return;
        }
        
        const allMatch = item.foundCoordinates.every(coord => 
            selected.some(s => s.r === coord.r && s.c === coord.c)
        );

        if (allMatch) {
            playSFX('win');
            onComplete(e);
        } else {
            playSFX('error');
        }
    };

    return (
        <div className="flex flex-col items-center animate-fade-in">
             <div className="bg-purple-900 p-4 rounded-lg border-4 border-purple-500 mb-6 text-center shadow-lg">
                 <p className="text-gray-300 text-sm uppercase mb-1">ENCONTRE A PALAVRA:</p>
                 <h2 className="text-4xl text-white font-bold tracking-widest uppercase">{item.targetWord}</h2>
                 <div className="flex justify-center gap-2 mt-2">
                     {item.syllables.map((s,i) => <span key={i} className="bg-black/40 px-2 rounded text-purple-200 text-sm">{s}</span>)}
                 </div>
             </div>

             <div className="grid gap-1 bg-stone-800 p-2 rounded border-4 border-stone-600" style={{ gridTemplateColumns: `repeat(${item.gridSize}, minmax(0, 1fr))` }}>
                 {item.grid.map((row, r) => (
                     row.map((char, c) => {
                         const isSelected = selected.some(s => s.r === r && s.c === c);
                         return (
                             <button 
                                key={`${r}-${c}`}
                                onClick={() => toggleCell(r, c)}
                                className={`w-10 h-10 md:w-14 md:h-14 text-xl md:text-3xl font-bold uppercase flex items-center justify-center rounded transition-colors ${isSelected ? 'bg-green-500 text-white animate-pop-in' : 'bg-stone-700 text-gray-300 hover:bg-stone-600'}`}
                             >
                                 {char}
                             </button>
                         )
                     })
                 ))}
             </div>

             <div className="mt-8">
                 <PixelButton onClick={check}>VERIFICAR</PixelButton>
             </div>
        </div>
    );
};