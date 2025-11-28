import React, { useState } from 'react';
import { SKINS } from '../constants';
import { SkinType } from '../types';
import { PixelButton } from './PixelUI';
import { User, Play } from 'lucide-react';
import { playSFX } from '../utils/audioUtils';

interface LoginScreenProps {
    onStart: (name: string, skin: SkinType) => void;
    savedUsers: { name: string, skin: SkinType, level: number }[];
    onLoadUser: (name: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onStart, savedUsers, onLoadUser }) => {
    const [name, setName] = useState('');
    const [selectedSkin, setSelectedSkin] = useState<SkinType>('steve');
    const [view, setView] = useState<'NEW' | 'LOAD'>('NEW');

    const handleStart = () => {
        if (name.trim().length < 2) {
            playSFX('error');
            alert("DIGITE UM NOME MÁGICO!");
            return;
        }
        playSFX('success');
        onStart(name.trim(), selectedSkin);
    };

    // Função para pegar o caminho da imagem
    const getSkinImage = (skinId: string) => {
        // Busca na pasta /public/assets/
        return `/assets/${skinId}.png`;
    };

    return (
        <div className="min-h-[100dvh] bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-vt323">
            {/* Fundo Animado */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 text-9xl animate-float">🅰️</div>
                <div className="absolute bottom-20 right-20 text-9xl animate-bounce-slow">📚</div>
                <div className="absolute top-1/2 left-1/4 text-6xl animate-pulse">✨</div>
            </div>

            <div className="z-10 w-full max-w-2xl bg-stone-800 border-8 border-stone-600 rounded-xl p-8 shadow-2xl animate-pop-in">
                <h1 className="text-5xl md:text-7xl text-yellow-400 text-center mb-8 uppercase tracking-widest drop-shadow-md">
                    QUEM É VOCÊ?
                </h1>

                {/* Abas: Novo vs Carregar */}
                {savedUsers.length > 0 && (
                    <div className="flex justify-center gap-4 mb-8">
                        <button 
                            onClick={() => { playSFX('click'); setView('NEW'); }}
                            className={`px-6 py-2 uppercase font-bold text-xl rounded-t-lg border-t-4 border-x-4 ${view === 'NEW' ? 'bg-green-600 border-green-800 text-white' : 'bg-stone-700 border-stone-900 text-gray-400'}`}
                        >
                            NOVO AVENTUREIRO
                        </button>
                        <button 
                            onClick={() => { playSFX('click'); setView('LOAD'); }}
                            className={`px-6 py-2 uppercase font-bold text-xl rounded-t-lg border-t-4 border-x-4 ${view === 'LOAD' ? 'bg-blue-600 border-blue-800 text-white' : 'bg-stone-700 border-stone-900 text-gray-400'}`}
                        >
                            CONTINUAR AVENTURA
                        </button>
                    </div>
                )}

                {view === 'NEW' ? (
                    <div className="space-y-8">
                        {/* Input de Nome */}
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-2xl uppercase">SEU NOME MÁGICO:</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value.toUpperCase())}
                                    placeholder="DIGITE AQUI..."
                                    className="w-full bg-black/50 border-4 border-stone-500 rounded-lg py-4 pl-16 pr-4 text-3xl text-white uppercase focus:border-yellow-400 outline-none placeholder-gray-600"
                                    maxLength={12}
                                />
                            </div>
                        </div>

                        {/* Seleção de Skin (COM IMAGENS REAIS AGORA) */}
                        <div>
                            <label className="text-white text-2xl uppercase mb-4 block">ESCOLHA SEU HERÓI:</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {SKINS.map(skin => (
                                    <button 
                                        key={skin.id}
                                        onClick={() => { playSFX('click'); setSelectedSkin(skin.id); }}
                                        className={`relative p-2 border-4 rounded-xl transition-all hover:scale-105 group overflow-hidden ${selectedSkin === skin.id ? 'border-yellow-400 bg-white/10 ring-4 ring-yellow-500/30 scale-105' : 'border-stone-600 bg-stone-900 opacity-70 hover:opacity-100'}`}
                                    >
                                        <div className="w-20 h-20 mx-auto mb-2 relative flex items-center justify-center">
                                            {/* AQUI ESTÁ A MÁGICA: Tag IMG em vez de DIV colorida */}
                                            <img 
                                                src={getSkinImage(skin.id)} 
                                                alt={skin.label}
                                                className="w-full h-full object-contain pixelated drop-shadow-lg group-hover:scale-110 transition-transform"
                                                onError={(e) => {
                                                    // Se der erro na imagem, mostra o quadrado colorido como segurança
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).parentElement!.style.backgroundColor = skin.color.replace('bg-', '');
                                                }}
                                            />
                                        </div>
                                        <p className={`text-center text-xl uppercase ${selectedSkin === skin.id ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>{skin.label}</p>
                                        
                                        {selectedSkin === skin.id && <div className="absolute top-2 right-2 text-yellow-400 text-xl animate-bounce">★</div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <PixelButton onClick={handleStart} fullWidth className="py-6 text-4xl mt-4 animate-pulse">
                            COMEÇAR JORNADA! 🚀
                        </PixelButton>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {savedUsers.map((user, idx) => (
                            <button 
                                key={idx}
                                onClick={() => { playSFX('portal'); onLoadUser(user.name); }}
                                className="flex items-center justify-between bg-stone-700 hover:bg-stone-600 p-4 rounded-lg border-4 border-stone-900 group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Miniatura do personagem salvo com Imagem */}
                                    <div className="w-12 h-12 border-2 border-white bg-black/50 rounded overflow-hidden">
                                        <img src={getSkinImage(user.skin)} alt={user.skin} className="w-full h-full object-cover pixelated" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl text-white font-bold uppercase group-hover:text-yellow-400">{user.name}</div>
                                        <div className="text-green-400 text-sm uppercase">NÍVEL {user.level}</div>
                                    </div>
                                </div>
                                <Play className="text-white group-hover:translate-x-1 transition-transform" size={32} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="mt-8 text-gray-500 text-sm uppercase text-center">
                <p>O progresso é salvo automaticamente neste dispositivo.</p>
            </div>
        </div>
    );
};