import React, { useState, useEffect } from 'react';
import { MemoryChallenge } from '../../types';
import { playSFX } from '../../utils/audioUtils';

interface MemoryGameProps {
    item: MemoryChallenge;
    onComplete: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ item, onComplete }) => {
    const [cards, setCards] = useState<{id: string, content: string, type: 'TEXT'|'IMAGE', isFlipped: boolean, isMatched: boolean}[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    
    useEffect(() => {
        // Garante pares únicos e embaralha
        const gameCards = item.pairs.map(p => ({ ...p, uniqueId: Math.random(), isFlipped: false, isMatched: false }));
        setCards(gameCards.sort(() => Math.random() - 0.5));
        setFlipped([]); 
    }, [item]); 

    const handleCardClick = (index: number) => {
        if (flipped.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;
        playSFX('click');
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);
        
        if (newFlipped.length === 2) {
            const c1 = cards[newFlipped[0]];
            const c2 = cards[newFlipped[1]];
            if (c1.id === c2.id) {
                playSFX('success');
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[newFlipped[0]].isMatched = true;
                    matchedCards[newFlipped[1]].isMatched = true;
                    setCards(matchedCards);
                    setFlipped([]);
                    if (matchedCards.every(c => c.isMatched)) onComplete();
                }, 1000);
            } else {
                setTimeout(() => {
                    playSFX('error');
                    const resetCards = [...cards];
                    resetCards[newFlipped[0]].isFlipped = false;
                    resetCards[newFlipped[1]].isFlipped = false;
                    setCards(resetCards);
                    setFlipped([]);
                }, 1000);
            }
        }
    };
    return (
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in">
            {cards.map((card, i) => (
                <button key={i} onClick={() => handleCardClick(i)} className={`w-24 h-24 rounded-lg text-4xl flex items-center justify-center border-4 transition-all duration-300 transform ${card.isFlipped || card.isMatched ? 'bg-white border-yellow-400 rotate-y-180' : 'bg-stone-800 border-stone-600 hover:bg-stone-700'}`}>
                    {(card.isFlipped || card.isMatched) ? card.content : '❓'}
                </button>
            ))}
        </div>
    );
};