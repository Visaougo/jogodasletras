import React from 'react';
import { PixelButton } from './PixelUI';
import { Trophy } from 'lucide-react';
import { SKINS } from '../constants';
import { SkinType } from '../types';

interface LeaderboardProps {
    users: { name: string, skin: SkinType, level: number, xp: number }[];
    onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, onBack }) => {
    // Ordena: Maior Nível ganha. Se empatar, quem tem mais XP ganha.
    const sortedUsers = [...users].sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return b.xp - a.xp;
    });

    return (
        <div className="min-h-[100dvh] p-4 md:p-8 animate-fade-in flex flex-col items-center w-full max-w-4xl mx-auto bg-slate-900">
            <button onClick={onBack} className="self-start mb-6 text-white hover:underline uppercase text-xl font-vt323">← VOLTAR</button>
            
            <div className="text-center mb-8">
                <h1 className="text-5xl text-yellow-400 font-vt323 uppercase drop-shadow-md flex items-center justify-center gap-4">
                    <Trophy size={48} /> HALL DA FAMA <Trophy size={48} />
                </h1>
                <p className="text-gray-400 uppercase font-vt323 text-xl">OS MAIORES LEITORES DO MUNDO!</p>
            </div>

            <div className="w-full bg-stone-800 border-8 border-stone-600 rounded-xl p-2 md:p-6 shadow-2xl">
                {/* Cabeçalho da Tabela */}
                <div className="grid grid-cols-12 gap-2 text-gray-400 font-bold uppercase border-b-4 border-stone-700 pb-2 mb-4 text-sm md:text-xl text-center font-vt323">
                    <div className="col-span-2">POS</div>
                    <div className="col-span-6 text-left pl-4">AVENTUREIRO</div>
                    <div className="col-span-2">NÍVEL</div>
                    <div className="col-span-2">XP</div>
                </div>

                {/* Lista de Jogadores */}
                <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {sortedUsers.map((user, index) => {
                        const skinObj = SKINS.find(s => s.id === user.skin);
                        const skinColor = skinObj ? skinObj.color : 'bg-gray-500';
                        
                        return (
                            <div key={index} className={`grid grid-cols-12 gap-2 items-center p-3 rounded-lg font-vt323 text-lg md:text-2xl transition-all hover:scale-[1.01] ${
                                index === 0 ? 'bg-yellow-900/40 border-2 border-yellow-500 text-yellow-200' :
                                index === 1 ? 'bg-stone-400/20 border-2 border-stone-400 text-stone-200' :
                                index === 2 ? 'bg-orange-900/40 border-2 border-orange-500 text-orange-200' :
                                'bg-stone-900/50 border border-stone-700 text-white'
                            }`}>
                                {/* Posição (1º, 2º, 3º...) */}
                                <div className="col-span-2 flex justify-center items-center font-bold text-3xl">
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                </div>

                                {/* Nome e Skin */}
                                <div className="col-span-6 flex items-center gap-3 pl-2 overflow-hidden">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 border-2 border-white rounded flex-shrink-0 overflow-hidden bg-black/50`}>
                                        {/* Tenta mostrar imagem, se não der mostra cor */}
                                        <img 
                                            src={`/assets/${user.skin}.png`} 
                                            alt={user.skin}
                                            className="w-full h-full object-cover pixelated"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.classList.add(skinColor);
                                            }}
                                        />
                                    </div>
                                    <span className="truncate uppercase font-bold">{user.name}</span>
                                </div>

                                {/* Nível */}
                                <div className="col-span-2 text-center font-bold text-green-400">
                                    {user.level}
                                </div>

                                {/* XP */}
                                <div className="col-span-2 text-center text-blue-400 text-sm md:text-xl">
                                    {user.xp}
                                </div>
                            </div>
                        );
                    })}
                    
                    {sortedUsers.length === 0 && (
                        <div className="text-center text-gray-500 py-10 uppercase text-xl font-vt323">
                            Nenhum aventureiro registrado ainda.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};