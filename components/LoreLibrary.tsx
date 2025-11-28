import React, { useState } from 'react';
import { LORE_ENTRIES } from '../constants';
import { PixelButton } from './PixelUI';
import { Lock, X } from 'lucide-react';
import { playSFX } from '../utils/audioUtils';

interface LoreLibraryProps {
    userLevel: number;
    onBack: () => void;
}

export const LoreLibrary: React.FC<LoreLibraryProps> = ({ userLevel, onBack }) => {
    const [selectedStory, setSelectedStory] = useState<typeof LORE_ENTRIES[0] | null>(null);

    return (
        <div className="min-h-full p-4 md:p-8 animate-fade-in relative flex flex-col items-center">
            <button onClick={onBack} className="self-start mb-6 text-white hover:underline uppercase text-xl font-vt323">← VOLTAR AO INÍCIO</button>
            
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl text-yellow-400 font-vt323 uppercase drop-shadow-md">BIBLIOTECA DAS LENDAS</h1>
                <p className="text-gray-400 uppercase font-vt323 mt-2 text-xl">DESCUBRA A HISTÓRIA DAS CRIATURAS!</p>
            </div>

            {/* Grid de Histórias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
                {LORE_ENTRIES.map((entry) => {
                    const isLocked = userLevel < entry.unlockLevel;

                    return (
                        <div 
                            key={entry.id}
                            onClick={() => {
                                if (!isLocked) {
                                    playSFX('click');
                                    setSelectedStory(entry);
                                } else {
                                    playSFX('error');
                                }
                            }}
                            className={`
                                relative bg-stone-800 border-4 rounded-xl p-4 transition-all group font-vt323
                                ${isLocked ? 'border-stone-600 opacity-70 cursor-not-allowed' : 'border-yellow-600 cursor-pointer hover:scale-105 hover:border-yellow-400 hover:shadow-[0_0_20px_gold]'}
                            `}
                        >
                            {/* Imagem */}
                            <div className="w-full h-48 bg-black/50 rounded-lg mb-4 overflow-hidden relative border-2 border-stone-900">
                                {isLocked ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500 z-10 bg-black/80">
                                        <Lock size={48} className="mb-2" />
                                        <span className="font-bold text-xl uppercase">BLOQUEADO</span>
                                        <span className="text-sm">NÍVEL {entry.unlockLevel}</span>
                                    </div>
                                ) : (
                                    <img 
                                        src={entry.image} 
                                        alt={entry.character} 
                                        className="w-full h-full object-cover pixelated group-hover:scale-110 transition-transform duration-500" 
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            // Mostra um fundo colorido se a imagem falhar
                                            (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#333';
                                        }}
                                    />
                                )}
                            </div>

                            <div className="text-center">
                                <h3 className={`text-2xl font-bold uppercase ${isLocked ? 'text-gray-600' : 'text-white'}`}>{entry.character}</h3>
                                <p className={`text-sm uppercase ${isLocked ? 'text-gray-700' : 'text-yellow-500'}`}>{entry.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal de Leitura */}
            {selectedStory && (
                <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedStory(null)}>
                    <div 
                        className="bg-stone-900 border-4 border-yellow-500 rounded-xl max-w-5xl w-full p-6 md:p-10 relative animate-pop-in flex flex-col md:flex-row gap-8 items-center shadow-[0_0_50px_rgba(234,179,8,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setSelectedStory(null)} className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"><X size={32} /></button>

                        <div className="w-full md:w-1/2">
                            <div className="rounded-lg border-8 border-stone-800 overflow-hidden shadow-2xl rotate-1 bg-black">
                                <img src={selectedStory.image} alt={selectedStory.character} className="w-full h-auto pixelated object-cover" />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 text-left font-vt323">
                            <h2 className="text-5xl text-yellow-400 font-bold uppercase mb-2 drop-shadow-md">{selectedStory.character}</h2>
                            <h3 className="text-2xl text-green-400 uppercase mb-6 tracking-wider">{selectedStory.title}</h3>
                            
                            <div className="bg-black/40 p-6 rounded-lg border-l-8 border-yellow-600">
                                <p className="text-white text-2xl leading-relaxed uppercase shadow-black drop-shadow-md">
                                    {selectedStory.story}
                                </p>
                            </div>
                            
                            <div className="mt-8 flex justify-end">
                                <PixelButton onClick={() => setSelectedStory(null)}>FECHAR LIVRO</PixelButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};