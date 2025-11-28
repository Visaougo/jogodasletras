import React, { useState, useEffect } from 'react';
import { SyllableChallenge } from '../../types';
import { PixelButton, EraseButton } from '../PixelUI';
import { playSFX } from '../../utils/audioUtils';
import { FALLBACK_SYLLABLES } from '../../constants';

// Helper
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

interface SyllablesGameProps {
    item: SyllableChallenge;
    onComplete: (e?: React.MouseEvent) => void;
}

export const SyllablesGame: React.FC<SyllablesGameProps> = ({ item, onComplete }) => {
  const INTERNAL_SYLLABLES = FALLBACK_SYLLABLES;
  const [currentItem, setCurrentItem] = useState(item);
  const [slots, setSlots] = useState<string[]>([]);
  const [pool, setPool] = useState<{val: string, id: string}[]>([]);
  
  useEffect(() => {
    // Se o item vier vazio ou genérico, usa o fallback, senão usa o item
    const targetItem = item.syllables && item.syllables.length > 0 ? item : INTERNAL_SYLLABLES[Math.floor(Math.random() * INTERNAL_SYLLABLES.length)];
    setCurrentItem(targetItem);
    
    // Cria IDs únicos para o pool
    const allOptions = [...targetItem.syllables, ...targetItem.distractors];
    const mappedPool = shuffleArray(allOptions).map((s, i) => ({
        val: s, 
        id: `syl-${i}-${Math.random()}`
    }));

    setPool(mappedPool);
    setSlots(Array(targetItem.syllables.length).fill(''));
  }, [item]);
  
  const handlePoolClick = (sylObj: {val: string, id: string}) => {
    playSFX('click');
    const firstEmpty = slots.findIndex(s => s === '');
    if (firstEmpty !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmpty] = sylObj.val;
      setSlots(newSlots);
    }
  };
  
  const handleBackspace = () => {
      const lastFilledIndex = [...slots].reverse().findIndex(s => s !== '');
      if (lastFilledIndex !== -1) {
          const indexToRemove = slots.length - 1 - lastFilledIndex;
          const newSlots = [...slots];
          newSlots[indexToRemove] = '';
          setSlots(newSlots);
          playSFX('click');
      }
  };

  const checkAnswer = (e: React.MouseEvent) => {
    if (slots.join('') === currentItem.syllables.join('')) onComplete(e);
    else playSFX('error');
  };

  return (
     <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="text-9xl animate-bounce drop-shadow-lg">{currentItem.emoji}</div>
        <div className="flex gap-2">
            {slots.map((s,i) => (
                <div key={i} className={`w-20 h-20 md:w-24 md:h-24 border-4 rounded flex items-center justify-center text-3xl md:text-4xl uppercase font-vt323 font-bold transition-all ${s ? 'bg-stone-800 text-white border-white animate-pop-in' : 'bg-stone-900/50 border-stone-600 border-dashed'}`}>
                    {s}
                </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center max-w-lg mt-4">
            {pool.map((sObj) => (
                <button 
                    key={sObj.id} 
                    onClick={() => handlePoolClick(sObj)} 
                    className="px-6 py-4 text-2xl md:text-3xl font-bold uppercase rounded border-b-8 active:mt-1 active:border-b-0 font-vt323 bg-green-600 border-green-900 text-white hover:bg-green-500 hover:scale-105 transition-transform shadow-lg"
                >
                    {sObj.val}
                </button>
            ))}
        </div>
        <div className="flex gap-4 mt-6">
            <EraseButton onClick={handleBackspace} disabled={slots.every(s => s === '')} />
            <PixelButton onClick={checkAnswer} disabled={slots.some(s => s === '')} className={slots.every(s => s !== '') ? 'animate-pulse' : 'opacity-50'}>
                VERIFICAR
            </PixelButton>
        </div>
     </div>
  );
};