import React, { useState, useEffect } from 'react';
import { Achievement, DailyQuest, Card, WolfState, WolfSkinType, WeatherType } from '../types';
import { Check, X, Trash2 } from 'lucide-react';
import { playSFX } from '../utils/audioUtils';

// --- Particle Burst System ---
export const ParticleBurst: React.FC<{ x: number, y: number }> = ({ x, y }) => {
    return (
        <div className="fixed pointer-events-none z-[100]" style={{ left: x, top: y }}>
            {Array.from({ length: 12 }).map((_, i) => (
                <div 
                    key={i} 
                    className="absolute w-4 h-4 rounded-full animate-explosion"
                    style={{
                        backgroundColor: ['#facc15', '#4ade80', '#60a5fa', '#f472b6'][i % 4],
                        transform: `rotate(${i * 30}deg) translate(0, 0)`,
                        animationDelay: `${Math.random() * 0.1}s`
                    }}
                ></div>
            ))}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce-short">⭐</div>
        </div>
    );
};

// --- Daily Reward Modal ---
export const DailyRewardModal: React.FC<{ day: number, onClose: () => void }> = ({ day, onClose }) => {
    useEffect(() => {
        playSFX('chest_open');
    }, []);

    const rewards = [
        { day: 1, label: "20 ESMERALDAS", icon: "💎", color: "text-green-400" },
        { day: 2, label: "30 ESMERALDAS", icon: "💎", color: "text-green-400" },
        { day: 3, label: "STICKER RARO", icon: "✨", color: "text-pink-400" },
        { day: 4, label: "40 ESMERALDAS", icon: "💎", color: "text-green-400" },
        { day: 5, label: "ITEM SURPRESA", icon: "🎁", color: "text-yellow-400" },
        { day: 6, label: "50 ESMERALDAS", icon: "💎", color: "text-green-400" },
        { day: 7, label: "SKIN ESPECIAL", icon: "👑", color: "text-purple-400" },
    ];

    const currentReward = rewards[(day - 1) % 7] || rewards[0];
    const isSpecialDay = day % 7 === 0 || day % 7 === 3 || day % 7 === 5;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
             <div className={`bg-stone-800 border-8 ${isSpecialDay ? 'border-yellow-500' : 'border-stone-600'} p-8 rounded-xl max-w-md w-full animate-pop-in text-center relative overflow-hidden`} onClick={e => e.stopPropagation()}>
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent animate-pulse-slow pointer-events-none"></div>
                 
                 <h2 className="text-3xl text-yellow-400 font-bold uppercase mb-2">RECOMPENSA DIÁRIA</h2>
                 <p className="text-white uppercase mb-6">DIA {day} DE 7</p>

                 <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                     {Array.from({length: 7}).map((_, i) => (
                         <div key={i} className={`flex-shrink-0 w-8 h-8 rounded border-2 flex items-center justify-center text-xs relative ${i + 1 === ((day - 1) % 7) + 1 ? 'bg-yellow-500 border-yellow-300 text-black animate-bounce z-10 scale-110' : i + 1 < ((day - 1) % 7) + 1 ? 'bg-green-600 border-green-400 text-white opacity-50' : 'bg-gray-700 border-gray-600 text-gray-500'}`}>
                             {i + 1 < ((day - 1) % 7) + 1 ? '✓' : i + 1}
                         </div>
                     ))}
                 </div>

                 <div className="text-8xl mb-4 animate-float drop-shadow-lg">{currentReward.icon}</div>
                 <h3 className={`text-4xl font-vt323 uppercase mb-8 ${currentReward.color}`}>{currentReward.label}</h3>

                 <button onClick={onClose} className="bg-green-600 border-b-8 border-green-800 text-white font-bold text-2xl py-3 px-8 rounded-lg uppercase w-full hover:bg-green-500 active:translate-y-1">
                     COLETAR!
                 </button>
             </div>
        </div>
    );
};

// --- Achievement Popup ---
export const AchievementPopup: React.FC<{ achievement: Achievement, onClose: () => void }> = ({ achievement, onClose }) => {
    useEffect(() => {
        playSFX('win');
        const t = setTimeout(onClose, 4000);
        return () => clearTimeout(t);
    }, [achievement]);

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-stone-800 border-4 border-yellow-500 p-4 rounded-lg shadow-xl animate-pop-in flex items-center gap-4 min-w-[300px]" onClick={onClose}>
             <div className="text-4xl animate-bounce">{achievement.icon}</div>
             <div>
                 <h4 className="text-yellow-400 font-vt323 text-xl uppercase font-bold">CONQUISTA DESBLOQUEADA!</h4>
                 <p className="text-white text-sm uppercase">{achievement.title}</p>
                 {achievement.reward && (
                     <p className="text-green-400 text-xs uppercase mt-1">
                         +{achievement.reward.emeralds} 💎 {achievement.reward.item && `+ ${achievement.reward.item.replace('skin_wolf_', '')}`}
                     </p>
                 )}
             </div>
        </div>
    );
};

// --- Quest Widget ---
export const QuestWidget: React.FC<{ quests: DailyQuest[], onClaim: (id: string) => void }> = ({ quests, onClaim }) => {
    return (
        <div className="bg-stone-800 border-4 border-stone-600 p-4">
            <h4 className="text-gray-400 uppercase mb-2 text-center text-sm">MISSÕES DIÁRIAS</h4>
            <div className="space-y-3">
                {quests.map(q => (
                    <div key={q.id} className={`p-2 rounded border-2 ${q.isClaimed ? 'border-green-800 bg-green-900/30 opacity-50' : 'border-stone-500 bg-stone-700'}`}>
                        <div className="flex justify-between items-center mb-1">
                             <span className="text-xs text-white uppercase">{q.description}</span>
                             <span className="text-xs text-yellow-400 font-bold">{q.reward} 💎</span>
                        </div>
                        <div className="w-full bg-black h-2 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-yellow-500" style={{ width: `${Math.min(100, (q.current / q.target) * 100)}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">{q.current}/{q.target}</span>
                            {!q.isClaimed && q.current >= q.target && (
                                <button onClick={() => onClaim(q.id)} className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded animate-pulse">
                                    COLETAR
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Toggle Button ---
export const ToggleButton: React.FC<{ isOn: boolean, onToggle: () => void, onIcon: React.ReactNode, offIcon: React.ReactNode }> = ({ isOn, onToggle, onIcon, offIcon }) => {
    return (
        <button onClick={onToggle} className={`p-2 rounded border-2 transition-colors ${isOn ? 'bg-yellow-500 border-yellow-700 text-black' : 'bg-stone-700 border-stone-500 text-gray-400'}`}>
            {isOn ? onIcon : offIcon}
        </button>
    );
};

// --- Word Block ---
export const WordBlock: React.FC<{ word: string }> = ({ word }) => {
    return (
        <div className="bg-stone-100 border-b-4 border-stone-300 text-black p-4 text-center rounded shadow-sm hover:scale-105 transition-transform cursor-default">
            <div className="text-2xl font-vt323 uppercase font-bold tracking-widest">{word}</div>
        </div>
    );
};

// --- Card Component ---
export const CardComponent: React.FC<{ card: Card, isNew?: boolean }> = ({ card, isNew }) => {
    const [flipped, setFlipped] = useState(false);
    
    // Rarity colors
    const colors = {
        COMMON: 'border-stone-400 bg-stone-200 text-stone-900',
        RARE: 'border-blue-400 bg-blue-100 text-blue-900',
        EPIC: 'border-purple-400 bg-purple-100 text-purple-900',
        LEGENDARY: 'border-yellow-400 bg-yellow-100 text-yellow-900',
    };

    return (
        <div 
            className={`relative w-32 h-48 md:w-40 md:h-56 cursor-pointer perspective-1000 ${isNew ? 'animate-pop-in' : ''}`}
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* FRONT */}
                <div className={`absolute w-full h-full backface-hidden border-4 rounded-lg p-2 flex flex-col items-center justify-between shadow-lg ${colors[card.rarity]}`}>
                     <div className="w-full flex justify-between items-start">
                         <span className="text-[10px] font-bold uppercase opacity-50">{card.rarity}</span>
                         {card.type === 'STICKER' && <span className="text-xs">✨</span>}
                         {card.type === 'MEDAL' && <span className="text-xs">🏅</span>}
                     </div>
                     <div className="text-5xl md:text-6xl drop-shadow-md">{card.image}</div>
                     <div className="text-center">
                         <p className="text-xs font-bold leading-tight uppercase font-vt323">{card.name}</p>
                     </div>
                </div>

                {/* BACK */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-stone-800 border-4 border-stone-600 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl mb-2 opacity-50">?</div>
                    <p className="text-white text-[10px] uppercase leading-relaxed">{card.description}</p>
                </div>
            </div>
        </div>
    );
};

// --- Weather Overlay ---
export const WeatherOverlay: React.FC<{ type: WeatherType }> = ({ type }) => {
    if (type === 'CLEAR') return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
            {type === 'RAIN' && (
                <div className="w-full h-full animate-rain opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
            )}
            {type === 'SNOW' && Array.from({length: 20}).map((_, i) => (
                <div key={i} className="absolute bg-white rounded-full opacity-60 w-2 h-2 animate-fall" style={{ left: `${Math.random()*100}%`, animationDuration: `${5+Math.random()*5}s`, animationDelay: `${Math.random()*5}s` }}></div>
            ))}
            {type === 'FOG' && (
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent animate-pulse-slow"></div>
            )}
        </div>
    );
};

// --- Erase Button ---
interface EraseButtonProps {
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export const EraseButton: React.FC<EraseButtonProps> = ({ onClick, className = '', disabled = false }) => {
    return (
        <button 
            onClick={() => {
                if (!disabled) playSFX('click');
                onClick();
            }}
            disabled={disabled}
            className={`
                bg-red-600 text-white font-bold py-3 px-6 text-xl rounded-lg border-b-8 border-red-800 
                active:translate-y-1 active:border-b-4 hover:bg-red-500 transition-all font-vt323 uppercase
                flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            <Trash2 size={24} />
            APAGAR
        </button>
    );
};

// --- Pixel Button ---
interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "font-bold py-4 px-8 text-xl md:text-3xl uppercase transition-all active:scale-95 border-b-8 focus:outline-none relative font-vt323 touch-manipulation select-none animate-float rounded-lg";
  
  const variants = {
    primary: "bg-green-600 text-white border-green-800 hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    secondary: "bg-stone-600 text-white border-stone-800 hover:bg-stone-500",
    danger: "bg-red-600 text-white border-red-800 hover:bg-red-500",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none`}
      onClick={(e) => {
          if(!props.disabled) playSFX('click');
          props.onClick?.(e);
      }}
      {...props}
    >
      <div className="absolute inset-0 border-2 border-white opacity-20 pointer-events-none rounded-lg"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 hover:opacity-100 transition-opacity rounded-lg">
        <div className="w-full h-full animate-shine absolute top-0 left-0"></div>
      </div>
      {children}
    </button>
  );
};

// --- Pixel Card ---
interface PixelCardProps {
  children: React.ReactNode;
  title?: string;
  color?: string; 
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  title, 
  color = 'bg-stone-800', 
  className = '' 
}) => {
  return (
    <div className={`relative p-2 ${className} animate-pop-in`}>
      <div className="absolute inset-0 bg-black opacity-30 translate-y-2 translate-x-2 rounded-lg"></div>
      <div className={`${color} border-4 md:border-8 border-stone-600 relative text-white p-6 md:p-8 h-full shadow-xl rounded-lg`}>
        {title && (
          <h3 className="text-3xl md:text-4xl mb-6 text-center text-yellow-300 drop-shadow-md border-b-4 border-white/10 pb-2 font-vt323 tracking-wider uppercase">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

// --- XP Bar ---
interface XPBarProps {
  current: number;
  max: number;
  level: number;
}

export const XPBar: React.FC<XPBarProps> = ({ current, max, level }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto mb-6 font-vt323 uppercase">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-green-400 text-2xl animate-pulse-slow">LVL {level}</span>
        <span className="text-gray-400 text-xl">{current} / {max} XP</span>
      </div>
      <div className="h-8 w-full bg-stone-900 border-4 border-stone-600 relative p-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-1000 ease-out pixel-shadow-sm relative rounded-full"
          style={{ width: `${percentage}%` }}
        >
          <div className="w-full h-2 bg-green-300 opacity-50"></div>
          <div className="absolute inset-0 animate-shine opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

// --- Wolf Confirmation Modal ---
interface WolfConfirmationModalProps {
  syllable: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WolfConfirmationModal: React.FC<WolfConfirmationModalProps> = ({ syllable, onConfirm, onCancel }) => {
  useEffect(() => {
    playSFX('confirm');
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-stone-800 border-8 border-blue-500 p-8 rounded-xl max-w-md w-full animate-pop-in shadow-[0_0_50px_rgba(59,130,246,0.6)]">
         <div className="flex flex-col items-center">
             <div className="text-7xl mb-6 animate-bounce">🐺</div>
             <p className="text-white text-3xl text-center uppercase font-vt323 mb-6 leading-none">É ESSA SÍLABA AQUI?</p>
             
             <div className="bg-white text-black text-6xl font-bold px-10 py-6 rounded-lg border-8 border-stone-900 mb-8 uppercase shadow-inner">
                 {syllable}
             </div>

             <div className="flex gap-6 w-full">
                 <button 
                  onClick={onCancel}
                  className="flex-1 bg-red-600 border-b-8 border-red-800 text-white font-bold text-2xl py-4 rounded-lg uppercase active:translate-y-2 hover:bg-red-500 transition-colors"
                 >
                   <X className="inline mr-2 w-8 h-8"/> NÃO
                 </button>
                 <button 
                  onClick={onConfirm}
                  className="flex-1 bg-green-600 border-b-8 border-green-800 text-white font-bold text-2xl py-4 rounded-lg uppercase active:translate-y-2 animate-pulse hover:bg-green-500 transition-colors"
                 >
                   <Check className="inline mr-2 w-8 h-8"/> SIM
                 </button>
             </div>
         </div>
      </div>
    </div>
  );
};

// --- Mascot Component (SKINNABLE & RESPONSIVE FIX + LIP SYNC + EYE TRACKING) ---
interface MascotProps {
  mood?: 'happy' | 'neutral' | 'sad' | 'excited' | 'worried';
  nightMode?: boolean;
  xp?: number;
  level?: number;
  inventory?: string[];
  onHelp?: () => void;
  charges?: number;
  wolfState?: WolfState;
  wolfSkin?: WolfSkinType; // New prop
}

export const Mascot: React.FC<MascotProps> = ({ 
  mood = 'neutral', 
  nightMode = false, 
  xp = 0, 
  level = 1,
  inventory = [],
  onHelp,
  charges = 0,
  wolfState = WolfState.IDLE,
  wolfSkin = 'DEFAULT'
}) => {
  const [quote, setQuote] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isWolf, setIsWolf] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Eye Tracking State
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inventory.includes('wolf')) {
      setIsWolf(true);
    }
  }, [inventory]);

  // Eye tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 4; // range -2 to 2
        const y = (e.clientY / window.innerHeight - 0.5) * 4; // range -2 to 2
        setEyeOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isListening = wolfState === WolfState.LISTENING;
  const isSpeaking = wolfState === WolfState.SPEAKING;
  const isSleeping = wolfState === WolfState.SLEEPING;
  const isCelebrating = wolfState === WolfState.CELEBRATING;
  const isRunning = wolfState === WolfState.RUNNING;
  const isWorried = wolfState === WolfState.WORRIED || mood === 'worried';

  // React to mood changes
  useEffect(() => {
     if(mood === 'happy' || mood === 'excited' || wolfState === WolfState.CELEBRATING) {
         setIsVisible(true);
         setQuote(mood === 'excited' ? "UAU! INCRÍVEL!" : "ISSO AÍ!");
         setTimeout(() => setIsVisible(false), 2000);
     } else if (isWorried) {
         setIsVisible(true);
         setQuote("HUMMM... TENTE DE NOVO?");
         setTimeout(() => setIsVisible(false), 3000);
     }
  }, [mood, wolfState]);

  const handleMascotClick = () => {
    setClickCount(c => c + 1);
    setTimeout(() => setClickCount(0), 1000);
    
    if (clickCount >= 2) {
        playSFX('secret');
        setQuote("VOCÊ ACHOU UM SEGREDO!");
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 2000);
    }

    if (isSleeping) {
        playSFX('wake');
        if (onHelp) onHelp();
    } else if (!isWolf) {
      setIsVisible(true);
      setQuote("OLÁ AMIGO!");
      setTimeout(() => setIsVisible(false), 2000);
      playSFX('click');
    } else {
       if (onHelp) onHelp();
    }
  };

  const activeScale = isWolf ? 1.1 : 1.0;

  // -- RENDER SVG BASED ON SKIN --
  const renderWolfSVG = () => {
      const baseColor = isListening ? "#cbd5e1" : "#9ca3af";
      const eyeColor = isListening ? "#3b82f6" : "black";
      
      // Dynamic Eye Shape
      let leftEyeH = 4;
      let rightEyeH = 4;
      let mouthY = 35;
      
      if (isSleeping) { leftEyeH = 1; rightEyeH = 1; }
      if (isCelebrating) { leftEyeH = 6; rightEyeH = 6; }
      if (isWorried) { mouthY = 38; } 

      // Apply eye offset only if awake
      const eyeX = isSleeping ? 0 : eyeOffset.x;
      const eyeY = isSleeping ? 0 : eyeOffset.y;

      // LIP SYNC ANIMATION STYLE
      // Simple scaling animation for the mouth
      const mouthStyle = isSpeaking ? { animation: 'pulse 0.2s infinite' } : {};

      // Light Skin Colors (Gold/White)
      const isLightSkin = wolfSkin === 'LIGHT';
      const isCosmic = wolfSkin === 'COSMIC';
      const isReader = wolfSkin === 'READER';
      const isSage = wolfSkin === 'SAGE';

      const bodyFill = isLightSkin ? '#fef08a' : isCosmic ? '#4c1d95' : isReader ? '#57534e' : isSage ? '#f5f5f4' : (wolfSkin === 'NINJA' ? '#1f2937' : baseColor);
      const strokeColor = isLightSkin ? '#fbbf24' : isCosmic ? '#a78bfa' : isReader ? '#292524' : isSage ? '#d97706' : 'black';
      const earFill = isLightSkin ? '#fde047' : isCosmic ? '#8b5cf6' : isSage ? '#fcd34d' : (wolfSkin === 'MAGIC' ? '#c084fc' : "#4b5563");

      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Zzz for sleep */}
            {isSleeping && (
                <text x="80" y="20" fontSize="14" fill="white" className="animate-float">Zzz</text>
            )}

            {/* Base Body */}
            <rect x="20" y="30" width="60" height="50" fill={bodyFill} stroke={strokeColor} strokeWidth="2" />
            <rect x="35" y="40" width="30" height="40" fill={wolfSkin === 'SPACE' ? '#e0f2fe' : isCosmic ? '#2e1065' : isReader ? '#f5f5f4' : "#e5e7eb"} />
            
            {/* Head */}
            <rect x="25" y="10" width="50" height="40" fill={wolfSkin === 'NINJA' ? '#374151' : bodyFill} stroke={strokeColor} strokeWidth="2" />
            
            {/* Ears */}
            <polygon points="25,10 35,0 45,10" fill={earFill} stroke={strokeColor} strokeWidth="2" className={isListening || isCelebrating ? "animate-shake" : ""}/>
            <polygon points="55,10 65,0 75,10" fill={earFill} stroke={strokeColor} strokeWidth="2" className={isListening || isCelebrating ? "animate-shake" : ""}/>
            
            {/* Eyes Group with Tracking */}
            <g transform={`translate(${eyeX}, ${eyeY})`}>
                <rect x="35" y="25" width="8" height="8" fill="white" />
                <rect x="39" y={27 + (4 - leftEyeH)/2} width="4" height={leftEyeH} fill={eyeColor} />
                <rect x="57" y="25" width="8" height="8" fill="white" />
                
                {wolfSkin === 'PIRATE' ? (
                    <rect x="55" y="23" width="12" height="12" fill="black" /> // Eye Patch
                ) : (
                    <rect x="61" y={27 + (4 - rightEyeH)/2} width="4" height={rightEyeH} fill={eyeColor} />
                )}

                {/* Reader Monocle */}
                {isReader && (
                    <circle cx="65" cy="29" r="6" fill="none" stroke="gold" strokeWidth="2" />
                )}
            </g>

            {/* Mouth/Snout - LIP SYNC */}
            <rect x="40" y={mouthY} width="20" height="12" fill="#e5e7eb" />
            {/* Animated Mouth Opening */}
            <rect 
                x="45" 
                y={isSpeaking ? "38" : mouthY + 5} 
                width="10" 
                height={isSpeaking ? "6" : "2"} 
                fill="black" 
                className={isSpeaking ? "animate-pulse" : ""}
                style={{ transformBox: 'fill-box', transformOrigin: 'center', ...mouthStyle }}
            />

            {/* SKIN EXTRAS */}
            {wolfSkin === 'MAGIC' && <text x="15" y="15" fontSize="20">✨</text>}
            {wolfSkin === 'MAGIC' && <text x="70" y="50" fontSize="20" className="animate-spin">🌟</text>}
            
            {wolfSkin === 'SPACE' && (
                <circle cx="50" cy="30" r="35" fill="blue" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
            )}

            {wolfSkin === 'PIRATE' && (
                <path d="M25,10 Q50,-5 75,10" fill="red" stroke="black" strokeWidth="3" />
            )}
            
            {wolfSkin === 'NINJA' && (
                 <rect x="25" y="22" width="50" height="10" fill="red" opacity="0.8" />
            )}

            {isReader && (
                <text x="75" y="10" fontSize="20" className="animate-float">🎓</text>
            )}

            {isSage && (
                <g>
                    <polygon points="20,10 25,-5 35,5 50,-10 65,5 75,-5 80,10" fill="#facc15" stroke="#b45309" strokeWidth="2" />
                    <circle cx="50" cy="-2" r="4" fill="#ef4444" />
                </g>
            )}
            
            {isLightSkin && (
                <>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#facc15" strokeWidth="2" className="animate-pulse" />
                    <text x="10" y="90" fontSize="16" className="animate-float">✨</text>
                    <text x="80" y="10" fontSize="16" className="animate-float" style={{animationDelay:'1s'}}>✨</text>
                </>
            )}

            {isCosmic && (
                <>
                    <circle cx="50" cy="50" r="50" fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray="5,5" className="animate-spin-slow" />
                    <text x="5" y="50" fontSize="20" className="animate-pulse">✨</text>
                    <text x="85" y="20" fontSize="20" className="animate-float">🪐</text>
                </>
            )}

            {/* Tail */}
            <path d="M80,60 Q95,50 90,80" fill={isCosmic ? "#8b5cf6" : isReader ? "#57534e" : "#9ca3af"} stroke="black" strokeWidth="2" className={mood === 'happy' || isCelebrating || isRunning ? "animate-wiggle" : isSleeping ? "" : "animate-pulse"} />
        </svg>
      );
  };

  return (
    <div 
      className={`fixed bottom-2 left-2 md:bottom-6 md:left-6 z-50 flex flex-col items-center transition-all duration-300 select-none touch-manipulation ${isWolf ? 'cursor-pointer hover:scale-105' : 'pointer-events-none'}`} 
      style={{ 
        transform: `scale(${activeScale})`, 
        transformOrigin: 'bottom left' 
      }}
      onClick={handleMascotClick}
    >
        {/* Helper Bubble */}
        {isVisible && (
            <div className="bg-white text-black p-2 md:p-4 border-4 border-black rounded-xl mb-2 md:mb-4 font-vt323 text-lg md:text-2xl animate-pop-in relative uppercase text-center min-w-[150px] md:min-w-[200px] max-w-[200px] md:max-w-[250px] shadow-lg">
                {quote}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-white"></div>
            </div>
        )}

        {/* Listening Indicator */}
        {isListening && (
           <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 text-4xl md:text-6xl animate-bounce drop-shadow-lg z-50">
              👂
           </div>
        )}

        {/* Audio Pulse Icon when speaking */}
        {isSpeaking && (
           <div className="absolute top-0 right-0 text-3xl md:text-4xl animate-ping text-blue-500">
               🔊
           </div>
        )}

        {/* Charges Indicator for Wolf */}
        {isWolf && onHelp && (
           <div className="flex gap-1 md:gap-2 mb-1 md:mb-2 bg-black/60 p-1 md:p-2 rounded-full border-2 border-white/20">
              {[...Array(3)].map((_, i) => (
                 <div key={i} className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${i < charges ? 'bg-blue-400 border border-blue-200 shadow-[0_0_8px_blue]' : 'bg-gray-700'}`}></div>
              ))}
           </div>
        )}
        
        {/* Render Mascot SVG */}
        <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 drop-shadow-2xl relative ${isListening ? 'animate-pulse' : isSleeping ? 'opacity-80' : isRunning ? 'animate-bounce-short' : 'animate-float'}`}>
            {isWolf ? renderWolfSVG() : (
              // DEFAULT MASCOT
              <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="20" y="20" width="60" height="60" fill="#f0abfc" stroke="black" strokeWidth="4" />
                  <rect x="30" y="40" width="10" height="10" fill="white" />
                  <rect x="35" y="42" width="4" height="4" fill="black" />
                  <rect x="60" y="40" width="10" height="10" fill="white" />
                  <rect x="65" y="42" width="4" height="4" fill="black" />
                  <rect x="40" y="60" width="20" height="10" fill="#db2777" />
                  {/* Hat for high level */}
                  {level > 5 && <path d="M20,20 L50,0 L80,20 Z" fill="cyan" stroke="black" strokeWidth="2" />}
              </svg>
            )}
        </div>
        
        {/* Level Tag */}
        <div className={`bg-black/90 text-white px-2 py-0.5 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold mt-1 md:mt-2 uppercase border-2 ${isListening ? 'border-blue-400 text-blue-300 animate-pulse' : 'border-white/30'}`}>
            {isWolf ? (isListening ? 'OUVINDO...' : isSleeping ? 'ZZZ...' : isRunning ? 'CAÇANDO!' : wolfSkin.replace('DEFAULT', 'COMPANHEIRO')) : `LVL ${level}`}
        </div>
    </div>
  );
};