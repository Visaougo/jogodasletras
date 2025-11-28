import React from 'react';
import { ModuleType } from '../types';

export type DimensionTheme = 
  | 'FOREST' | 'MOUNTAIN' | 'CAVE' | 'NETHER' | 'ICE' | 'DREAM' 
  | 'FINAL_SANCTUARY' | 'ARENA' | 'FARM' | 'MAGIC_GRID' 
  | 'LIBRARY' | 'SPACE';

interface DimensionBackgroundProps {
  type: ModuleType | DimensionTheme;
  children: React.ReactNode;
}

export const DimensionBackground: React.FC<DimensionBackgroundProps> = ({ type, children }) => {
  
  // Função para escolher a imagem baseada no tipo de jogo/fase
  const getBackgroundImage = () => {
    switch (type) {
        // 🌳 FLORESTA (Início, Letras, Campo, Entrega)
        case ModuleType.LETTERS:
        case ModuleType.FIELD:
        case ModuleType.DELIVERY:
        case 'FOREST':
        case 'FARM':
            return '/assets/bg_forest.png';

        // 🪨 CAVERNA (Mina, Sílabas, Compreensão, Monstros, Creeper)
        case ModuleType.SYLLABLES:
        case ModuleType.MINE:
        case ModuleType.COMPREHENSION:
        case ModuleType.CREEPER:
        case ModuleType.MONSTER:
        case 'CAVE':
        case 'MOUNTAIN':
        case 'ARENA':
            return '/assets/bg_cave.png';

        // 🔥 NETHER (Blaze)
        case ModuleType.BLAZE:
        case 'NETHER':
            return '/assets/bg_nether.png';

        // 🌌 THE END / ESPAÇO (Boss, Memória, Palavras Cruzadas, Inverso)
        case ModuleType.FINAL_BOOK:
        case ModuleType.MEMORY:
        case ModuleType.WORD_SEARCH:
        case ModuleType.REVERSE:
        case 'FINAL_SANCTUARY':
        case 'SPACE':
        case 'MAGIC_GRID':
        case 'DREAM':
            return '/assets/bg_end.png';
            
        // 📚 BIBLIOTECA (Histórias, Preencher, Crafting)
        case ModuleType.FILL_BLANK:
        case ModuleType.STORY_CRAFT:
        case 'LIBRARY':
            return '/assets/bg_library.png';

        // PADRÃO (Se não achar, usa floresta)
        default:
            return '/assets/bg_forest.png';
    }
  };

  const bgImage = getBackgroundImage();

  // Define a cor e tipo das partículas flutuantes baseada no ambiente
  let particleType = 'dust';
  if (bgImage.includes('nether')) particleType = 'ember';
  if (bgImage.includes('end')) particleType = 'magic';
  if (bgImage.includes('forest')) particleType = 'firefly';
  if (bgImage.includes('library')) particleType = 'dust';

  return (
    // ✅ CORREÇÃO: 'min-h-screen' força a altura total da tela, 'fixed' na imagem trava ela no fundo
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden bg-black">
      
      {/* 1. CAMADA DA IMAGEM DE FUNDO (Fixa para cobrir tudo) */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* 2. CAMADA ESCURA (Overlay para o texto ficar legível) */}
      <div className="fixed inset-0 z-0 bg-black/50 backdrop-blur-[1px]"></div>

      {/* 3. PARTÍCULAS ANIMADAS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-60 
                ${particleType === 'firefly' ? 'w-2 h-2 bg-yellow-300 animate-float shadow-[0_0_5px_yellow]' : ''}
                ${particleType === 'ember' ? 'w-1 h-1 bg-red-500 animate-rain reverse-direction' : ''}
                ${particleType === 'magic' ? 'w-2 h-2 bg-purple-400 animate-pulse shadow-[0_0_10px_purple]' : ''}
                ${particleType === 'dust' ? 'w-1 h-1 bg-gray-300 animate-float opacity-20' : ''}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 4. CONTEÚDO DO JOGO (Botões, Texto, etc) - Com z-index maior que o fundo */}
      <div className="relative z-10 w-full flex-grow flex flex-col">
            {children}
      </div>
    </div>
  );
};