
export enum ModuleType {
  SYLLABLES = 'SYLLABLES',     // Consciência Fonológica
  FLUENCY = 'FLUENCY',         // Leitura Fluente
  COMPREHENSION = 'COMPREHENSION', // Compreensão
  CREEPER = 'CREEPER',          // Desafio Rápido (Ortografia/Automatização)
  LETTERS = 'LETTERS',           // Montar palavras (Alfabetização)
  MINE = 'MINE',                 // Mina das Sílabas
  FIELD = 'FIELD',               // Campo das Letras
  MEMORY = 'MEMORY',             // Mini-game Memória
  
  // NEW MODES
  BLAZE = 'BLAZE',                   // Escape do Blaze
  FILL_BLANK = 'FILL_BLANK',         // Completar Frase
  STORY_CRAFT = 'STORY_CRAFT',       // Crafting de Histórias
  REVERSE = 'REVERSE',               // Leitura Inversa
  MONSTER = 'MONSTER',               // Arena dos Monstros

  // NEW UPDATES
  FINAL_BOOK = 'FINAL_BOOK',         // O Livro das Sílabas Perdidas (Boss)
  DELIVERY = 'DELIVERY',             // Entrega Perfeita
  WORD_SEARCH = 'WORD_SEARCH',       // Caça-Palavras Mágico
}

export enum WolfState {
  IDLE = 'IDLE',           // Normal state
  LISTENING = 'LISTENING', // Waiting for user to click a syllable
  CONFIRMING = 'CONFIRMING', // Modal is open "Is this the syllable?"
  SPEAKING = 'SPEAKING',   // Currently reading
  NO_CHARGES = 'NO_CHARGES', // Out of energy
  SLEEPING = 'SLEEPING',    // Inactive for too long
  WAKING = 'WAKING',        // Transition from sleep
  CELEBRATING = 'CELEBRATING', // Level complete
  WORRIED = 'WORRIED',       // User is taking too long or making mistakes
  RUNNING = 'RUNNING'        // Active movement
}

export type SkinType = 'steve' | 'alex' | 'zombie' | 'skeleton';
export type WolfSkinType = 'DEFAULT' | 'MAGIC' | 'SPACE' | 'PIRATE' | 'NINJA' | 'LIGHT' | 'COSMIC' | 'READER' | 'SAGE';
export type VoiceEffectType = 'NORMAL' | 'ECHO' | 'HIGH' | 'ROBOT';
export type ThemeType = 'DEFAULT' | 'FOREST' | 'ICE' | 'DESERT' | 'NEON';

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'NIGHT';
export type WeatherType = 'CLEAR' | 'RAIN' | 'SNOW' | 'FOG';
export type CardRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
export type CardType = 'CARD' | 'STICKER' | 'MEDAL';

export interface Card {
  id: string;
  name: string;
  image: string; // Emoji or Icon
  rarity: CardRarity;
  type: CardType;
  description: string;
}

export interface BiomeModule {
  id: string;
  title: string;
  type: ModuleType;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  minLevel: number;
  emeraldReward: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (user: UserState) => boolean;
  reward?: {
      emeralds: number;
      item?: string;
  };
}

export interface DailyQuest {
  id: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  isClaimed: boolean;
  type: 'PLAY_GAME' | 'CORRECT_ANSWERS' | 'EARN_EMERALDS';
}

// --- ADAPTIVE LEARNING (INVISIBLE TEACHER) ---
export interface AdaptiveStats {
  errorCount: Record<string, number>; // Maps syllable/type to error count
  averageResponseTime: number;
  totalQuestions: number;
  difficultyMultiplier: number; // 0.8 (Easier) to 1.5 (Harder)
  sentenceLevel: 'SHORT' | 'MEDIUM' | 'LONG'; // For Growing Sentences system
  consecutiveCorrect: number;
}

export interface UserState {
  name: string; // "Lucas Gabriel"
  skin: SkinType;
  xp: number;
  level: number;
  emeralds: number;
  completedModules: string[];
  inventory: string[];
  achievements: string[]; 
  learnedWords: string[]; 
  dailyQuests: DailyQuest[];
  collectedCards: string[];
  mascotXp: number;
  mascotLevel: number;
  lastLoginDate: string;
  
  // Daily Streak System
  loginStreak: number;
  lastRewardClaimedDate: string;

  // New Game Stats for Achievements
  gameStats: {
      syllableGamesPlayed: number;
      fastestCompletionTime: number; // in milliseconds, 0 if none
  };

  // Adaptive System
  adaptiveStats: AdaptiveStats;
  dailyVillagerQuest: { description: string; rewardType: string; isCompleted: boolean; date: string } | null;
  
  // New Customization State
  equippedWolfSkin: WolfSkinType;
  equippedVoiceEffect: VoiceEffectType;
  equippedTheme: ThemeType;

  settings: {
    nightMode: boolean; 
    soundEnabled: boolean;
  };
  
  // Avatar Customization
  avatarAccessories: {
    hat?: string;
    cape?: string;
    outfit?: string;
    expression?: string;
  };
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  category: 'ITEM' | 'VOUCHER' | 'WOLF_SKIN' | 'VOICE_EFFECT' | 'THEME';
  value?: string; // The internal value (e.g., 'PIRATE')
}

// --- Game Content Interfaces ---

export interface SyllableChallenge {
  id: string;
  word: string;
  emoji: string;
  syllables: string[]; 
  distractors: string[]; 
}

export interface FluencyChallenge {
  id: string;
  fullText: string;
  chunks: string[]; 
}

export interface ComprehensionChallenge {
  id: string;
  sentence: string;
  options: { emoji: string; label: string; isCorrect: boolean }[];
}

export interface CreeperChallenge {
  id: string;
  word: string;
  options: { emoji: string; isCorrect: boolean }[];
}

export interface LettersChallenge {
  id: string;
  word: string;
  emoji: string;
}

export interface MineChallenge {
  id: string;
  word: string;
  emoji: string;
  correctSyllables: string[]; 
  distractors: string[];      
}

export interface FieldChallenge {
  id: string;
  instruction: string; 
  target: string;      
  options: string[];   
}

export interface MemoryChallenge {
  id: string;
  pairs: { id: string; content: string; type: 'TEXT' | 'IMAGE' }[];
}

// NEW GAME INTERFACES

export interface BlazeChallenge {
  id: string;
  instruction: string; // "O BLAZE ESTÁ NA PONTE. ESCAPE PELA CAVERNA."
  options: { label: string; emoji: string; isCorrect: boolean }[];
}

export interface FillBlankChallenge {
  id: string;
  sentencePart1: string; // "O PORQUINHO ACHOU UMA"
  sentencePart2: string; // "."
  correctWord: string; // "MAÇÃ"
  options: string[]; // ["MAÇÃ", "PEDRA", "CADEIRA"]
  fullSentence: string; // For reading after
}

export interface StoryCraftChallenge {
    id: string;
    elements: { id: string, label: string, emoji: string, type: 'SUBJECT'|'VERB'|'OBJECT' }[];
    validCombinations: { subject: string, verb: string, object: string, resultSentence: string, animation: string }[];
}

export interface ReverseChallenge {
    id: string;
    scrambled: string[];
    correct: string[];
    fullSentence: string;
}

export interface MonsterChallenge {
    id: string;
    monsterType: 'VOWEL' | 'SYLLABLE' | 'WORD' | 'PHRASE';
    instruction: string;
    options: { text: string; isCorrect: boolean }[];
}

export interface DeliveryChallenge {
    id: string;
    items: { id: string, emoji: string, label: string }[];
    instructionSyllables: string[]; // "LE / VE / O / BO / LO"
    targetCharacter: string; // "O PORQUINHO"
    correctItemId: string; // "CAKE"
}

export interface WordSearchChallenge {
    id: string;
    gridSize: number; // e.g. 6 for 6x6
    targetWord: string; // "MAGIA"
    syllables: string[]; // ["MA", "GI", "A"]
    grid: string[][]; // 2D array of chars
    foundCoordinates: { r: number, c: number }[]; // Correct coordinates
}

export interface FinalBookChallenge {
    id: string;
    sentences: {
        syllables: string[]; // ["O", "LO", "BO"]
        distractors?: string[]; // Extra syllables to clutter the pool
        fullText: string;    // "O LOBO"
    }[];
}

export type GameContent = 
  | SyllableChallenge 
  | FluencyChallenge 
  | ComprehensionChallenge 
  | CreeperChallenge 
  | LettersChallenge
  | MineChallenge
  | FieldChallenge
  | MemoryChallenge
  | BlazeChallenge
  | FillBlankChallenge
  | StoryCraftChallenge
  | ReverseChallenge
  | MonsterChallenge
  | DeliveryChallenge
  | WordSearchChallenge
  | FinalBookChallenge;
