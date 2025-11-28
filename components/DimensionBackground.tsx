
import React from 'react';
import { ModuleType } from '../types';
import { playSFX } from '../utils/audioUtils';

export type DimensionTheme = 
  | 'FOREST' 
  | 'MOUNTAIN' 
  | 'CAVE' 
  | 'MECHANICAL' 
  | 'DARK_ROOM' 
  | 'NEON_FOREST' 
  | 'CUBIC_DESERT' 
  | 'PIXEL_SPACE' 
  | 'UNDERWATER' 
  | 'FUTURE_CITY'
  | 'NETHER'
  | 'SKY_TOWER'
  | 'ICE'
  | 'DREAM'
  | 'FINAL_SANCTUARY'
  | 'ARENA'
  | 'GRAVITY'
  | 'FARM'
  | 'MAGIC_GRID';

interface DimensionBackgroundProps {
  type: ModuleType | DimensionTheme;
  children: React.ReactNode;
}

export const DimensionBackground: React.FC<DimensionBackgroundProps> = ({ type, children }) => {
  let bgClass = '';
  let particleType: 'firefly' | 'ember' | 'sparkle' | 'dust' | 'bubble' | 'star' | 'digital' | 'cloud' | 'snow' | 'gold' | 'magic' | 'leaf' = 'dust';

  // Map types to themes
  switch (type) {
    case ModuleType.LETTERS:
      bgClass = 'bg-gradient-to-b from-green-900 via-green-800 to-green-950'; // Forest
      particleType = 'firefly';
      break;
    case ModuleType.SYLLABLES:
      bgClass = 'bg-gradient-to-b from-stone-500 via-stone-700 to-stone-900'; // Mountain
      particleType = 'ember';
      break;
    case ModuleType.FLUENCY:
    case 'NEON_FOREST':
      bgClass = 'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-900 via-purple-900 to-black'; 
      particleType = 'firefly';
      break;
    case 'CUBIC_DESERT':
      bgClass = 'bg-gradient-to-tr from-yellow-700 via-amber-800 to-yellow-950'; // Temple Gold/Dark
      particleType = 'gold';
      break;
    case 'PIXEL_SPACE':
      bgClass = 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black';
      particleType = 'star';
      break;
    case 'UNDERWATER':
      bgClass = 'bg-gradient-to-b from-cyan-600 via-blue-800 to-blue-950';
      particleType = 'bubble';
      break;
    case 'FUTURE_CITY':
      bgClass = 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900';
      particleType = 'digital';
      break;
    case ModuleType.COMPREHENSION:
      bgClass = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'; // Crystal Cave
      particleType = 'sparkle';
      break;
    case ModuleType.CREEPER:
      bgClass = 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-stone-900 to-black'; // Danger
      particleType = 'ember';
      break;
    case ModuleType.MINE:
      bgClass = 'bg-stone-900'; // Deep Mine
      particleType = 'dust';
      break;
    case ModuleType.FIELD:
      bgClass = 'bg-gradient-to-b from-sky-400 to-lime-600'; // Bright Field
      particleType = 'firefly';
      break;
    case ModuleType.BLAZE:
    case 'NETHER':
      bgClass = 'bg-gradient-to-t from-red-900 via-red-800 to-orange-900'; // Nether
      particleType = 'ember';
      break;
    case ModuleType.FILL_BLANK:
    case ModuleType.STORY_CRAFT:
      bgClass = 'bg-[#4a3627]'; // Library Wood
      particleType = 'dust';
      break;
    case 'ICE':
      bgClass = 'bg-gradient-to-b from-slate-800 via-cyan-900 to-blue-950';
      particleType = 'snow';
      break;
    case 'SKY_TOWER':
    case 'GRAVITY':
      bgClass = 'bg-gradient-to-b from-sky-400 to-blue-600';
      particleType = 'cloud';
      break;
    case 'DREAM':
    case ModuleType.FINAL_BOOK:
      bgClass = 'bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900';
      particleType = 'magic';
      break;
    case ModuleType.MONSTER:
    case 'ARENA':
        bgClass = 'bg-stone-800';
        particleType = 'dust';
        break;
    case ModuleType.DELIVERY:
    case 'FARM':
        bgClass = 'bg-gradient-to-b from-sky-300 to-green-500';
        particleType = 'leaf';
        break;
    case ModuleType.WORD_SEARCH:
    case 'MAGIC_GRID':
        bgClass = 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-900 to-black';
        particleType = 'magic';
        break;
    default:
      bgClass = 'bg-stone-900';
  }

  // Easter Eggs Handlers
  const handleBgClick = (e: React.MouseEvent) => {
      // Prevent triggering if clicking UI elements
      if (e.target !== e.currentTarget) return;
      playSFX('secret');
  };

  // Dimension Specific Decors
  const renderDecor = () => {
      if (type === ModuleType.BLAZE || type === 'NETHER') {
          return (
              <div className="absolute inset-0 pointer-events-none opacity-50">
                  <div className="absolute bottom-0 w-full h-20 bg-orange-600 animate-pulse blur-xl"></div>
              </div>
          );
      }
      if (type === ModuleType.MINE) {
           return (
              <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-0 h-full w-12 bg-stone-800 border-r-4 border-stone-950"></div>
                  <div className="absolute right-0 top-0 h-full w-12 bg-stone-800 border-l-4 border-stone-950"></div>
                  <div className="absolute top-20 left-0 w-full h-8 bg-stone-800 border-y-4 border-stone-950"></div>
              </div>
           );
      }
      if (type === ModuleType.FIELD) {
          return (
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-lime-800 to-lime-600">
                  <div className="w-full h-4 bg-lime-900 opacity-50 absolute top-0"></div>
              </div>
          );
      }
      if (type === 'ICE') {
          return (
              <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
              </div>
          )
      }
      if (type === ModuleType.DELIVERY) {
          return (
              <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-0 w-full h-1/3 bg-green-800 border-t-8 border-green-900"></div>
                  <div className="absolute top-10 left-10 text-6xl animate-float">🏠</div>
              </div>
          )
      }
      if (type === ModuleType.FINAL_BOOK) {
          return (
              <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                  <div className="absolute bottom-0 w-full h-1/4 bg-purple-900/50 blur-xl"></div>
              </div>
          )
      }
      return null;
  };

  return (
    <div 
        className={`relative w-full min-h-full flex-grow overflow-hidden ${bgClass} transition-colors duration-1000`}
        onClick={handleBgClick}
    >
      {/* Dynamic Decor */}
      {renderDecor()}

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-60 
                ${particleType === 'firefly' ? 'w-2 h-2 bg-yellow-300 animate-float shadow-[0_0_5px_yellow]' : ''}
                ${particleType === 'ember' ? 'w-1 h-1 bg-red-500 animate-rain reverse-direction' : ''}
                ${particleType === 'sparkle' ? 'w-1 h-1 bg-white animate-pulse-slow shadow-[0_0_5px_white]' : ''}
                ${particleType === 'dust' ? 'w-1 h-1 bg-gray-400 animate-float opacity-20' : ''}
                ${particleType === 'bubble' ? 'w-3 h-3 border border-white/50 bg-white/10 animate-float' : ''}
                ${particleType === 'star' ? 'w-1 h-1 bg-white animate-pulse' : ''}
                ${particleType === 'digital' ? 'w-1 h-4 bg-green-400/50 animate-rain' : ''}
                ${particleType === 'cloud' ? 'w-8 h-4 bg-white/30 blur-sm animate-float' : ''}
                ${particleType === 'snow' ? 'w-2 h-2 bg-white animate-rain' : ''}
                ${particleType === 'gold' ? 'w-2 h-2 bg-yellow-400 animate-float shadow-[0_0_5px_yellow]' : ''}
                ${particleType === 'magic' ? 'w-2 h-2 bg-white animate-float shadow-[0_0_20px_white]' : ''}
                ${particleType === 'leaf' ? 'w-3 h-2 bg-green-300 animate-rain rounded-tl-lg rounded-br-lg' : ''}
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

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
            {children}
        </div>
      </div>
    </div>
  );
};
