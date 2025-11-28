

import { BiomeModule, ModuleType, ShopItem, SkinType, Achievement, UserState, DailyQuest, Card, MineChallenge, FieldChallenge, BlazeChallenge, FillBlankChallenge, StoryCraftChallenge, ReverseChallenge, MonsterChallenge, FinalBookChallenge, DeliveryChallenge, WordSearchChallenge, MemoryChallenge } from './types';

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 2000, 5000];
export const MASCOT_THRESHOLDS = [0, 50, 200, 500, 1000]; // Mascot levels based on XP

export const BIOMES: BiomeModule[] = [
  {
    id: 'letters_workshop',
    title: 'NÍVEL 0: OFICINA DAS LETRAS',
    type: ModuleType.LETTERS,
    description: 'MONTE PALAVRAS USANDO A BANCADA DE TRABALHO!',
    icon: '🔤',
    color: 'bg-orange-600',
    borderColor: 'border-orange-800',
    minLevel: 0,
    emeraldReward: 2
  },
  {
    id: 'syllables_biome',
    title: 'NÍVEL 1: PLANÍCIE DAS SÍLABAS',
    type: ModuleType.SYLLABLES,
    description: 'CONSTRUA PALAVRAS JUNTANDO OS BLOCOS DE SOM!',
    icon: '🟩',
    color: 'bg-green-600',
    borderColor: 'border-green-800',
    minLevel: 1,
    emeraldReward: 3
  },
  {
    id: 'delivery_farm',
    title: 'NÍVEL 2: ENTREGA PERFEITA',
    type: ModuleType.DELIVERY,
    description: 'LEIA A ORDEM E ENTREGUE O ITEM CORRETO!',
    icon: '🚜',
    color: 'bg-yellow-600',
    borderColor: 'border-yellow-800',
    minLevel: 2,
    emeraldReward: 6
  },
  {
    id: 'fill_blank_library',
    title: 'NÍVEL 3: COMPLETAR A FRASE',
    type: ModuleType.FILL_BLANK,
    description: 'QUAL PALAVRA ESTÁ FALTANDO? COMPLETE A HISTÓRIA.',
    icon: '📖',
    color: 'bg-amber-700',
    borderColor: 'border-amber-900',
    minLevel: 3,
    emeraldReward: 8
  },
  {
    id: 'blaze_escape_nether',
    title: 'NÍVEL 4: ESCAPE DO BLAZE',
    type: ModuleType.BLAZE,
    description: 'LEIA RÁPIDO PARA ESCAPAR DO FOGO DO BLAZE!',
    icon: '🔥',
    color: 'bg-red-700',
    borderColor: 'border-red-900',
    minLevel: 4,
    emeraldReward: 12
  }
];

export const BOSS_BIOME: BiomeModule = {
  id: 'final_book_lost_syllables',
  title: 'MISSÃO FINAL: O LIVRO DAS SÍLABAS PERDIDAS',
  type: ModuleType.FINAL_BOOK,
  description: 'RESTORE AS FRASES MÁGICAS DO LIVRO ANTIGO!',
  icon: '📚',
  color: 'bg-indigo-600',
  borderColor: 'border-indigo-400',
  minLevel: 5,
  emeraldReward: 200
};

export const MINI_GAMES: BiomeModule[] = [
  {
    id: 'mini_memory',
    title: 'JOGO DA MEMÓRIA',
    type: ModuleType.MEMORY,
    description: 'ENCONTRE OS PARES DE SÍLABAS E IMAGENS!',
    icon: '🧠',
    color: 'bg-pink-600',
    borderColor: 'border-pink-800',
    minLevel: 0,
    emeraldReward: 5
  },
  {
    id: 'mini_mine',
    title: 'MINA DAS SÍLABAS',
    type: ModuleType.MINE,
    description: 'TREINE SÍLABAS NOS VAGÕES!',
    icon: '🚃',
    color: 'bg-stone-600',
    borderColor: 'border-stone-800',
    minLevel: 0,
    emeraldReward: 5
  },
  {
    id: 'mini_field',
    title: 'CAMPO DAS LETRAS',
    type: ModuleType.FIELD,
    description: 'ENCONTRE LETRAS E SONS!',
    icon: '🌻',
    color: 'bg-lime-600',
    borderColor: 'border-lime-800',
    minLevel: 0,
    emeraldReward: 5
  },
  {
    id: 'story_crafting',
    title: 'CRAFTING DE HISTÓRIAS',
    type: ModuleType.STORY_CRAFT,
    description: 'MONTE SUA PRÓPRIA HISTÓRIA!',
    icon: '🛠️',
    color: 'bg-orange-800',
    borderColor: 'border-orange-950',
    minLevel: 1,
    emeraldReward: 10
  },
  {
    id: 'word_search',
    title: 'CAÇA-PALAVRAS MÁGICO',
    type: ModuleType.WORD_SEARCH,
    description: 'ENCONTRE AS PALAVRAS ESCONDIDAS NA GRADE!',
    icon: '🔎',
    color: 'bg-purple-600',
    borderColor: 'border-purple-800',
    minLevel: 1,
    emeraldReward: 8
  },
  {
    id: 'reverse_reading',
    title: 'LEITURA INVERSA',
    type: ModuleType.REVERSE,
    description: 'CORRIJA AS FRASES BAGUNÇADAS!',
    icon: '↩️',
    color: 'bg-teal-600',
    borderColor: 'border-teal-800',
    minLevel: 2,
    emeraldReward: 8
  },
  {
    id: 'monster_arena',
    title: 'ARENA DOS MONSTROS',
    type: ModuleType.MONSTER,
    description: 'DERROTE MONSTROS COM O PODER DA LEITURA!',
    icon: '⚔️',
    color: 'bg-red-800',
    borderColor: 'border-red-950',
    minLevel: 3,
    emeraldReward: 15
  }
];

export const SKINS: {id: SkinType; label: string; color: string}[] = [
  { id: 'steve', label: 'STEVE', color: 'bg-cyan-600' },
  { id: 'alex', label: 'ALEX', color: 'bg-green-600' },
  { id: 'zombie', label: 'ZUMBI', color: 'bg-green-800' },
  { id: 'skeleton', label: 'ESQUELETO', color: 'bg-gray-300' }
];

export const AVATAR_ACCESSORIES = {
    hats: [
        { id: 'hat_none', label: 'SEM CHAPÉU', icon: '' },
        { id: 'hat_diamond', label: 'ELMO DE DIAMANTE', icon: '💎' },
        { id: 'hat_wizard', label: 'CHAPÉU DE MAGO', icon: '🧙‍♂️' },
        { id: 'hat_straw', label: 'CHAPÉU DE PALHA', icon: '👒' }
    ],
    capes: [
        { id: 'cape_none', label: 'SEM CAPA', icon: '' },
        { id: 'cape_red', label: 'CAPA VERMELHA', icon: '🧣' },
        { id: 'cape_star', label: 'CAPA ESTRELADA', icon: '✨' }
    ],
    outfits: [
        { id: 'outfit_default', label: 'ROUPA PADRÃO', icon: '👕' },
        { id: 'outfit_knight', label: 'ARMADURA', icon: '🛡️' },
        { id: 'outfit_royal', label: 'ROUPA REAL', icon: '👑' }
    ]
};

export const COLLECTIBLE_CARDS: Card[] = [
  { id: 'c1', name: 'PORQUINHO CURIOSO', image: '🐷', rarity: 'COMMON', type: 'CARD', description: 'UM AMIGO ROSINHA.' },
  { id: 'c2', name: 'OVELHA COLORIDA', image: '🐑', rarity: 'COMMON', type: 'CARD', description: 'DÁ LÃ MACIA.' },
  { id: 'c3', name: 'ESPADA DE MADEIRA', image: '🗡️', rarity: 'COMMON', type: 'CARD', description: 'ARMA PARA INICIANTES.' },
  { id: 'c4', name: 'DIAMANTE BRILHANTE', image: '💎', rarity: 'RARE', type: 'CARD', description: 'MUITO VALIOSO!' },
  { id: 'c5', name: 'ENDERMAN TÍMIDO', image: '👾', rarity: 'RARE', type: 'STICKER', description: 'NÃO OLHE NOS OLHOS.' },
  { id: 'c6', name: 'CREEPER AMIGÁVEL', image: '🧨', rarity: 'EPIC', type: 'STICKER', description: 'ELE NÃO EXPLODE (AS VEZES).' },
  { id: 'c7', name: 'DRAGÃO DO FIM', image: '🐲', rarity: 'LEGENDARY', type: 'MEDAL', description: 'O REI DO MUNDO.' },
  { id: 'c8', name: 'HEROBRINE', image: '👻', rarity: 'LEGENDARY', type: 'MEDAL', description: 'UMA LENDA MISTERIOSA.' },
  { id: 's1', name: 'LOBO FELIZ', image: '🐺', rarity: 'RARE', type: 'STICKER', description: 'SEU MELHOR AMIGO.' },
  { id: 's2', name: 'POÇÃO MÁGICA', image: '🧪', rarity: 'EPIC', type: 'STICKER', description: 'BRILHA NO ESCURO.' },
  { id: 'skin_wolf_light', name: 'EMBLEMA DA LUZ', image: '🌟', rarity: 'LEGENDARY', type: 'MEDAL', description: 'RECOMPENSA DO PORTAL FINAL.' },
  { id: 'item_reader_mark', name: 'MARCA DO LEITOR', image: '🧐', rarity: 'LEGENDARY', type: 'MEDAL', description: 'SÍMBOLO DE SABEDORIA SUPREMA.' },
  { id: 'skin_wolf_crown', name: 'COROA DO SÁBIO', image: '👑', rarity: 'LEGENDARY', type: 'MEDAL', description: 'PARA QUEM LÊ NA VELOCIDADE DA LUZ.' },
];

export const SHOP_ITEMS: ShopItem[] = [
  // Itens Essenciais
  { id: 'wolf', name: 'LOBO DOMESTICADO', price: 25, icon: '🐺', description: 'UM AMIGO QUE LÊ PARA VOCÊ.', category: 'ITEM' },
  
  // Skins de Lobo
  { id: 'skin_wolf_magic', name: 'LOBO MÁGICO', price: 40, icon: '🦄', description: 'UM LOBO COM PODERES MÍSTICOS.', category: 'WOLF_SKIN', value: 'MAGIC' },
  { id: 'skin_wolf_space', name: 'LOBO ESPACIAL', price: 45, icon: '👨‍🚀', description: 'PRONTO PARA VIAJAR NAS ESTRELAS.', category: 'WOLF_SKIN', value: 'SPACE' },
  { id: 'skin_wolf_pirate', name: 'LOBO PIRATA', price: 40, icon: '🏴‍☠️', description: 'EM BUSCA DE TESOUROS.', category: 'WOLF_SKIN', value: 'PIRATE' },
  { id: 'skin_wolf_ninja', name: 'LOBO NINJA', price: 50, icon: '🥷', description: 'SILENCIOSO E RÁPIDO.', category: 'WOLF_SKIN', value: 'NINJA' },
  { id: 'item_reader_mark', name: 'MARCA DO LEITOR', price: 9999, icon: '🧐', description: 'RECOMPENSA LENDÁRIA DO LIVRO.', category: 'WOLF_SKIN', value: 'READER' },
  { id: 'skin_wolf_crown', name: 'COROA DO SÁBIO', price: 9999, icon: '👑', description: 'RECOMPENSA DE VELOCIDADE.', category: 'WOLF_SKIN', value: 'SAGE' },

  // Efeitos de Voz
  { id: 'voice_robot', name: 'VOZ DE ROBÔ', price: 30, icon: '🤖', description: 'FALA DIVERTIDA DE ROBÔ.', category: 'VOICE_EFFECT', value: 'ROBOT' },
  { id: 'voice_echo', name: 'VOZ COM ECO', price: 30, icon: '📢', description: 'PARECE QUE ESTÁ NUMA CAVERNA.', category: 'VOICE_EFFECT', value: 'ECHO' },
  { id: 'voice_high', name: 'VOZ DE ESQUILO', price: 30, icon: '🐿️', description: 'UMA VOZ FINA E ENGRAÇADA.', category: 'VOICE_EFFECT', value: 'HIGH' },

  // Temas de Mundo
  { id: 'theme_neon', name: 'MUNDO NEON', price: 60, icon: '🌆', description: 'CORES BRILHANTES NO ESCURO.', category: 'THEME', value: 'NEON' },
  { id: 'theme_ice', name: 'PLANETA GELADO', price: 55, icon: '❄️', description: 'TUDO CONGELADO E AZUL.', category: 'THEME', value: 'ICE' },
  { id: 'theme_desert', name: 'DESERTO QUENTE', price: 55, icon: '🌵', description: 'AREIA E SOL FORTE.', category: 'THEME', value: 'DESERT' },

  // Outros Itens
  { id: 'diamond_sword', name: 'ESPADA DE DIAMANTE', price: 10, icon: '⚔️', description: 'UMA ESPADA BRILHANTE.', category: 'ITEM' },
  { id: 'map', name: 'MAPA DO TESOURO', price: 8, icon: '🗺️', description: 'LEVA A LUGARES SECRETOS.', category: 'ITEM' },
  
  // Vales Reais
  { id: 'voucher_mod', name: 'VALE MOD', price: 50, icon: '📦', description: 'INSTALAR UM MOD NOVO.', category: 'VOUCHER' },
  { id: 'voucher_build', name: 'VALE CONSTRUÇÃO', price: 70, icon: '🏠', description: 'CONSTRUÇÃO ESPECIAL PARA VOCÊ.', category: 'VOUCHER' },
  { id: 'voucher_creative', name: 'VALE CRIATIVO', price: 35, icon: '🎨', description: '20 MIN DE MODO CRIATIVO.', category: 'VOUCHER' },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'PRIMEIROS PASSOS',
    description: 'COMPLETE SEU PRIMEIRO NÍVEL.',
    icon: '👢',
    condition: (u) => u.completedModules.length >= 1
  },
  {
    id: 'rich_player',
    title: 'RICO EM ESMERALDAS',
    description: 'JUNTE 20 ESMERALDAS.',
    icon: '💎',
    condition: (u) => u.emeralds >= 20
  },
  {
    id: 'reader_master',
    title: 'MESTRE DA LEITURA',
    description: 'COMPLETE 5 NÍVEIS DIFERENTES.',
    icon: '🎓',
    condition: (u) => u.completedModules.length >= 5
  },
  {
    id: 'shopper',
    title: 'CLIENTE VIP',
    description: 'COMPRE UM ITEM NA LOJA.',
    icon: '🛍️',
    condition: (u) => u.inventory.length >= 1
  },
  {
    id: 'boss_slayer',
    title: 'HERÓI DO MUNDO',
    description: 'DERROTE O CHEFÃO FINAL.',
    icon: '🏆',
    condition: (u) => u.completedModules.includes('final_book_lost_syllables')
  },
  {
    id: 'word_collector',
    title: 'COLECIONADOR',
    description: 'APRENDA 10 PALAVRAS.',
    icon: '📚',
    condition: (u) => u.learnedWords.length >= 10
  },
  // NEW ACHIEVEMENTS
  {
    id: 'syllable_master',
    title: 'MESTRE DAS SÍLABAS',
    description: 'JOGUE 10 VEZES JOGOS DE SÍLABAS.',
    icon: '🧱',
    condition: (u) => u.gameStats.syllableGamesPlayed >= 10,
    reward: { emeralds: 50 }
  },
  {
    id: 'card_collector',
    title: 'COLECIONADOR DE CARTAS',
    description: 'TENHA 5 CARTAS RARAS OU SUPERIORES.',
    icon: '🃏',
    condition: (u) => {
        const rareCount = u.collectedCards.filter(id => {
            const card = COLLECTIBLE_CARDS.find(c => c.id === id);
            return card && (card.rarity === 'RARE' || card.rarity === 'EPIC' || card.rarity === 'LEGENDARY');
        }).length;
        return rareCount >= 5;
    },
    reward: { emeralds: 100 }
  },
  {
    id: 'speed_reader',
    title: 'LEITOR VELOZ',
    description: 'COMPLETE UM NÍVEL EM MENOS DE 1 MINUTO.',
    icon: '⚡',
    condition: (u) => u.gameStats.fastestCompletionTime > 0 && u.gameStats.fastestCompletionTime < 60000,
    reward: { emeralds: 30, item: 'skin_wolf_crown' }
  }
];

export const DAILY_QUEST_TEMPLATES: Omit<DailyQuest, 'id' | 'current' | 'isClaimed'>[] = [
  { description: 'ACERTE 3 PALAVRAS', target: 3, reward: 5, type: 'CORRECT_ANSWERS' },
  { description: 'JOGUE 2 FASES', target: 2, reward: 5, type: 'PLAY_GAME' },
  { description: 'GANHE 10 ESMERALDAS', target: 10, reward: 8, type: 'EARN_EMERALDS' },
  { description: 'COMPLETE O MODO CREEPER', target: 1, reward: 10, type: 'PLAY_GAME' }
];

export const WOLF_QUOTES = {
    CORRECT: ["ISSO!", "MUITO BEM!", "UAU!", "QUE LEGAL!", "VOCÊ BRILHA!", "CONTINUE ASSIM!"],
    INCORRECT: ["TUDO BEM!", "TENTE DE NOVO!", "QUASE!", "VAMOS LÁ!", "EU TE AJUDO!"],
    IDLE: ["O QUE VAMOS LER?", "ESTOU CURIOSO!", "OLHE QUANTAS PALAVRAS!", "VOCÊ É MEU MELHOR AMIGO!"],
    CELEBRATION: ["VITÓRIA!", "SOMOS UMA EQUIPE!", "VOCÊ É INCRÍVEL!", "QUE JORNADA!", "MAIS UMA CONQUISTA!"]
};

export const WOLF_SPONTANEOUS_QUOTES = [
    "VI ALGO SE MEXENDO ALI!",
    "EU ADORO ESTE LUGAR!",
    "VOCÊ ESTÁ INDO MUITO BEM!",
    "QUE SILÊNCIO… ESTRANHO…",
    "ACHEI UM CHEIRO DIFERENTE!",
    "OLHA AQUELA NUVEM!",
    "VAMOS LER MAIS?",
    "ESTOU SENTINDO CHEIRO DE AVENTURA!",
    "VOCÊ VIU AQUELE BLOCO?",
    "ADOREI SUA ROUPA HOJE!"
];

export const AMBIENT_MOBS = [
    { id: 'pig', icon: '🐷', animation: 'walk-slow' },
    { id: 'sheep', icon: '🐑', animation: 'bounce-slow' },
    { id: 'bee', icon: '🐝', animation: 'fly-random' },
    { id: 'chicken', icon: '🐔', animation: 'peck' },
    { id: 'villager', icon: '🧑‍🌾', animation: 'walk' },
    { id: 'chest', icon: '🧳', animation: 'hop' } // Walking chest
];

export const WOLF_EVOLUTION_TREE = [
    { level: 1, accessory: null, title: "LOBO BÁSICO" },
    { level: 2, accessory: "red_bandana", title: "BANDANA VERMELHA" },
    { level: 3, accessory: "gold_collar", title: "COLEIRA DOURADA" },
    { level: 4, accessory: "blue_scarf", title: "LENÇO AZUL" },
    { level: 5, accessory: "pixel_glasses", title: "ÓCULOS PIXELADOS" },
    { level: 6, accessory: "mc_cape", title: "CAPINHA" },
    { level: 7, accessory: "backpack", title: "MOCHILINHA" },
    { level: 8, accessory: "mini_hat", title: "CHAPEUZINHO" },
    { level: 9, accessory: "magic_aura", title: "LOBO MÁGICO" },
    { level: 10, accessory: "hero_armor", title: "LOBO HERÓI" }
];

export const INITIAL_USER_STATE: UserState = {
  name: 'LUCAS GABRIEL', // Personalized default
  skin: 'steve' as SkinType,
  xp: 0,
  level: 1,
  emeralds: 0,
  completedModules: [],
  inventory: [],
  achievements: [],
  learnedWords: [],
  dailyQuests: [],
  collectedCards: [],
  mascotXp: 0,
  mascotLevel: 1,
  lastLoginDate: new Date().toDateString(),
  
  // Daily Streak System
  loginStreak: 1,
  lastRewardClaimedDate: "",

  // Stats for Achievements
  gameStats: {
      syllableGamesPlayed: 0,
      fastestCompletionTime: 0
  },

  // Adaptive System
  adaptiveStats: {
    errorCount: {},
    averageResponseTime: 5000, 
    totalQuestions: 0,
    difficultyMultiplier: 1.0,
    sentenceLevel: 'SHORT',
    consecutiveCorrect: 0
  },
  
  dailyVillagerQuest: null,

  // Defaults for new customization
  equippedWolfSkin: 'DEFAULT',
  equippedVoiceEffect: 'NORMAL',
  equippedTheme: 'DEFAULT',
  
  avatarAccessories: {},

  settings: {
    nightMode: false,
    soundEnabled: true
  }
};

// --- FALLBACK CONTENT (ENHANCED FOR OFFLINE PLAY) ---
// ... (The 50+ item lists remain here, unchanged for brevity, as I am only appending the new items/constants above)
export const FALLBACK_LETTERS = [
  { id: '1', word: 'SOL', emoji: '☀️' },
  { id: '2', word: 'LUA', emoji: '🌙' },
  { id: '3', word: 'UVA', emoji: '🍇' },
  { id: '4', word: 'OVO', emoji: '🥚' },
  { id: '5', word: 'BOLA', emoji: '⚽' },
  { id: '6', word: 'PATO', emoji: '🦆' },
  { id: '7', word: 'GATO', emoji: '🐱' },
  { id: '8', word: 'RATO', emoji: '🐭' },
  { id: '9', word: 'CASA', emoji: '🏠' },
  { id: '10', word: 'CARRO', emoji: '🚗' },
  { id: '11', word: 'MESA', emoji: '🪑' },
  { id: '12', word: 'CAMA', emoji: '🛌' },
  { id: '13', word: 'FLOR', emoji: '🌸' },
  { id: '14', word: 'ÁRVORE', emoji: '🌳' },
  { id: '15', word: 'LIVRO', emoji: '📖' },
  { id: '16', word: 'LÁPIS', emoji: '✏️' },
  { id: '17', word: 'BOLO', emoji: '🎂' },
  { id: '18', word: 'DOCE', emoji: '🍬' },
  { id: '19', word: 'PEIXE', emoji: '🐟' },
  { id: '20', word: 'CÃO', emoji: '🐕' },
  { id: '21', word: 'SAPO', emoji: '🐸' },
  { id: '22', word: 'VACA', emoji: '🐄' },
  { id: '23', word: 'BOI', emoji: '🐂' },
  { id: '24', word: 'LEÃO', emoji: '🦁' },
  { id: '25', word: 'TIGRE', emoji: '🐅' },
  { id: '26', word: 'URSO', emoji: '🐻' },
  { id: '27', word: 'MACACO', emoji: '🐒' },
  { id: '28', word: 'ZEBRA', emoji: '🦓' },
  { id: '29', word: 'GIRAFA', emoji: '🦒' },
  { id: '30', word: 'ELEFANTE', emoji: '🐘' },
  { id: '31', word: 'COBRA', emoji: '🐍' },
  { id: '32', word: 'JACARÉ', emoji: '🐊' },
  { id: '33', word: 'PÁSSARO', emoji: '🐦' },
  { id: '34', word: 'CORUJA', emoji: '🦉' },
  { id: '35', word: 'ABELHA', emoji: '🐝' },
  { id: '36', word: 'BORBOLETA', emoji: '🦋' },
  { id: '37', word: 'FORMIGA', emoji: '🐜' },
  { id: '38', word: 'ARANHA', emoji: '🕷️' },
  { id: '39', word: 'CARACOL', emoji: '🐌' },
  { id: '40', word: 'TARTARUGA', emoji: '🐢' },
  { id: '41', word: 'BALÃO', emoji: '🎈' },
  { id: '42', word: 'PIPA', emoji: '🪁' },
  { id: '43', word: 'ROBÔ', emoji: '🤖' },
  { id: '44', word: 'BONECA', emoji: '🎎' },
  { id: '45', word: 'TREM', emoji: '🚂' },
  { id: '46', word: 'BARCO', emoji: '⛵' },
  { id: '47', word: 'AVIÃO', emoji: '✈️' },
  { id: '48', word: 'FOGUETE', emoji: '🚀' },
  { id: '49', word: 'ESTRELA', emoji: '⭐' },
  { id: '50', word: 'CORAÇÃO', emoji: '❤️' }
];

export const FALLBACK_SYLLABLES = [
  { id: 's1', word: 'BOLA', emoji: '⚽', syllables: ['BO', 'LA'], distractors: ['BA', 'LE', 'LO'] },
  { id: 's2', word: 'CASA', emoji: '🏠', syllables: ['CA', 'SA'], distractors: ['CO', 'SE', 'SU'] },
  { id: 's3', word: 'GATO', emoji: '🐱', syllables: ['GA', 'TO'], distractors: ['GO', 'TA', 'TE'] },
  { id: 's4', word: 'SAPO', emoji: '🐸', syllables: ['SA', 'PO'], distractors: ['SO', 'PA', 'PE'] },
  { id: 's5', word: 'DADO', emoji: '🎲', syllables: ['DA', 'DO'], distractors: ['DE', 'DI', 'DU'] },
  { id: 's6', word: 'FACA', emoji: '🔪', syllables: ['FA', 'CA'], distractors: ['FE', 'CO', 'CU'] },
  { id: 's7', word: 'LIXO', emoji: '🗑️', syllables: ['LI', 'XO'], distractors: ['LA', 'XA', 'XE'] },
  { id: 's8', word: 'MOTO', emoji: '🏍️', syllables: ['MO', 'TO'], distractors: ['MA', 'TU', 'TI'] },
  { id: 's9', word: 'NAVIO', emoji: '🚢', syllables: ['NA', 'VI', 'O'], distractors: ['NO', 'VE', 'U'] },
  { id: 's10', word: 'PIPOCA', emoji: '🍿', syllables: ['PI', 'PO', 'CA'], distractors: ['PA', 'PE', 'CO'] },
  { id: 's11', word: 'TOMATE', emoji: '🍅', syllables: ['TO', 'MA', 'TE'], distractors: ['TA', 'ME', 'TI'] },
  { id: 's12', word: 'VACINA', emoji: '💉', syllables: ['VA', 'CI', 'NA'], distractors: ['VO', 'CE', 'NU'] },
  { id: 's13', word: 'XÍCARA', emoji: '☕', syllables: ['XÍ', 'CA', 'RA'], distractors: ['XA', 'CO', 'RE'] },
  { id: 's14', word: 'ZEBRA', emoji: '🦓', syllables: ['ZE', 'BRA'], distractors: ['ZA', 'BRE', 'BRI'] },
  { id: 's15', word: 'JANELA', emoji: '🪟', syllables: ['JA', 'NE', 'LA'], distractors: ['JO', 'NI', 'LE'] },
  { id: 's16', word: 'KWI', emoji: '🥝', syllables: ['KI', 'WI'], distractors: ['KA', 'WA', 'WE'] },
  { id: 's17', word: 'LÂMPADA', emoji: '💡', syllables: ['LÂM', 'PA', 'DA'], distractors: ['LOM', 'PE', 'DE'] },
  { id: 's18', word: 'MOCHILA', emoji: '🎒', syllables: ['MO', 'CHI', 'LA'], distractors: ['MA', 'CHE', 'LI'] },
  { id: 's19', word: 'NUVEM', emoji: '☁️', syllables: ['NU', 'VEM'], distractors: ['NA', 'VAM', 'VOM'] },
  { id: 's20', word: 'ÔNIBUS', emoji: '🚌', syllables: ['Ô', 'NI', 'BUS'], distractors: ['O', 'NE', 'BAS'] },
  { id: 's21', word: 'PETECA', emoji: '🏸', syllables: ['PE', 'TE', 'CA'], distractors: ['PA', 'TI', 'CO'] },
  { id: 's22', word: 'QUEIJO', emoji: '🧀', syllables: ['QUEI', 'JO'], distractors: ['QUA', 'JA', 'JE'] },
  { id: 's23', word: 'ROBÔ', emoji: '🤖', syllables: ['RO', 'BÔ'], distractors: ['RA', 'BA', 'BE'] },
  { id: 's24', word: 'SORVETE', emoji: '🍦', syllables: ['SOR', 'VE', 'TE'], distractors: ['SAR', 'VI', 'TA'] },
  { id: 's25', word: 'TELEFONE', emoji: '📞', syllables: ['TE', 'LE', 'FO', 'NE'], distractors: ['TI', 'LA', 'FA', 'NI'] },
  { id: 's26', word: 'URSO', emoji: '🐻', syllables: ['UR', 'SO'], distractors: ['AR', 'SA', 'SE'] },
  { id: 's27', word: 'VELA', emoji: '🕯️', syllables: ['VE', 'LA'], distractors: ['VA', 'LE', 'LI'] },
  { id: 's28', word: 'XADREZ', emoji: '♟️', syllables: ['XA', 'DREZ'], distractors: ['XE', 'DRIZ', 'DRAZ'] },
  { id: 's29', word: 'YAKISSOBA', emoji: '🍜', syllables: ['YA', 'KIS', 'SO', 'BA'], distractors: ['YO', 'KAS', 'SA', 'BE'] },
  { id: 's30', word: 'ZÍPER', emoji: '🤐', syllables: ['ZÍ', 'PER'], distractors: ['ZA', 'PAR', 'PIR'] },
  { id: 's31', word: 'ABACAXI', emoji: '🍍', syllables: ['A', 'BA', 'CA', 'XI'], distractors: ['E', 'BE', 'CO', 'XE'] },
  { id: 's32', word: 'BANANA', emoji: '🍌', syllables: ['BA', 'NA', 'NA'], distractors: ['BE', 'NO', 'NI'] },
  { id: 's33', word: 'CEBOLA', emoji: '🧅', syllables: ['CE', 'BO', 'LA'], distractors: ['CA', 'BA', 'LE'] },
  { id: 's34', word: 'DINOSSAURO', emoji: '🦕', syllables: ['DI', 'NOS', 'SAU', 'RO'], distractors: ['DA', 'NAS', 'SEU', 'RA'] },
  { id: 's35', word: 'ESCOLA', emoji: '🏫', syllables: ['ES', 'CO', 'LA'], distractors: ['AS', 'CA', 'LE'] },
  { id: 's36', word: 'FOGUETE', emoji: '🚀', syllables: ['FO', 'GUE', 'TE'], distractors: ['FA', 'GA', 'TI'] },
  { id: 's37', word: 'GIRAFA', emoji: '🦒', syllables: ['GI', 'RA', 'FA'], distractors: ['GE', 'RE', 'FE'] },
  { id: 's38', word: 'HIPOPÓTAMO', emoji: '🦛', syllables: ['HI', 'PO', 'PÓ', 'TA', 'MO'], distractors: ['HE', 'PA', 'PE', 'TE', 'MA'] },
  { id: 's39', word: 'IGREJA', emoji: '⛪', syllables: ['I', 'GRE', 'JA'], distractors: ['A', 'GRA', 'JE'] },
  { id: 's40', word: 'JACARÉ', emoji: '🐊', syllables: ['JA', 'CA', 'RÉ'], distractors: ['JE', 'CO', 'RA'] },
  { id: 's41', word: 'LARANJA', emoji: '🍊', syllables: ['LA', 'RAN', 'JA'], distractors: ['LE', 'REN', 'JE'] },
  { id: 's42', word: 'MELANCIA', emoji: '🍉', syllables: ['ME', 'LAN', 'CI', 'A'], distractors: ['MA', 'LEN', 'CE', 'O'] },
  { id: 's43', word: 'NINHO', emoji: '🪺', syllables: ['NI', 'NHO'], distractors: ['NE', 'NHA'] },
  { id: 's44', word: 'ÓCULOS', emoji: '👓', syllables: ['Ó', 'CU', 'LOS'], distractors: ['Á', 'CA', 'LAS'] },
  { id: 's45', word: 'PIMENTA', emoji: '🌶️', syllables: ['PI', 'MEN', 'TA'], distractors: ['PA', 'MAN', 'TE'] },
  { id: 's46', word: 'QUEIJO', emoji: '🧀', syllables: ['QUEI', 'JO'], distractors: ['QUA', 'JA'] },
  { id: 's47', word: 'RELÓGIO', emoji: '⌚', syllables: ['RE', 'LÓ', 'GIO'], distractors: ['RA', 'LÁ', 'GEA'] },
  { id: 's48', word: 'SAPATO', emoji: '👞', syllables: ['SA', 'PA', 'TO'], distractors: ['SE', 'PE', 'TE'] },
  { id: 's49', word: 'TARTARUGA', emoji: '🐢', syllables: ['TAR', 'TA', 'RU', 'GA'], distractors: ['TER', 'TE', 'RA', 'GE'] },
  { id: 's50', word: 'UVA', emoji: '🍇', syllables: ['U', 'VA'], distractors: ['O', 'VE'] }
];

export const FALLBACK_FLUENCY = [
  { id: 'f1', fullText: 'O SOL BRILHA.', chunks: ['O SOL', 'BRILHA.'] },
  { id: 'f2', fullText: 'A BOLA ROLA.', chunks: ['A BOLA', 'ROLA.'] },
  { id: 'f3', fullText: 'O GATO PULA.', chunks: ['O GATO', 'PULA.'] },
  { id: 'f4', fullText: 'EU GOSTO DE LER.', chunks: ['EU GOSTO', 'DE LER.'] },
  { id: 'f5', fullText: 'A CASA É AZUL.', chunks: ['A CASA', 'É AZUL.'] },
  { id: 'f6', fullText: 'O CÃO LATE.', chunks: ['O CÃO', 'LATE.'] },
  { id: 'f7', fullText: 'A FLOR CRESCE.', chunks: ['A FLOR', 'CRESCE.'] },
  { id: 'f8', fullText: 'O PEIXE NADA.', chunks: ['O PEIXE', 'NADA.'] },
  { id: 'f9', fullText: 'A AVE VOA.', chunks: ['A AVE', 'VOA.'] },
  { id: 'f10', fullText: 'O BEBÊ RI.', chunks: ['O BEBÊ', 'RI.'] },
  { id: 'f11', fullText: 'A MÃE CANTA.', chunks: ['A MÃE', 'CANTA.'] },
  { id: 'f12', fullText: 'O PAI DORME.', chunks: ['O PAI', 'DORME.'] },
  { id: 'f13', fullText: 'A CHUVA CAI.', chunks: ['A CHUVA', 'CAI.'] },
  { id: 'f14', fullText: 'O VENTO SOPRA.', chunks: ['O VENTO', 'SOPRA.'] },
  { id: 'f15', fullText: 'O CARRO ANDA.', chunks: ['O CARRO', 'ANDA.'] },
  { id: 'f16', fullText: 'A LUA BRILHA.', chunks: ['A LUA', 'BRILHA.'] },
  { id: 'f17', fullText: 'O TREM APITA.', chunks: ['O TREM', 'APITA.'] },
  { id: 'f18', fullText: 'O SINO TOCA.', chunks: ['O SINO', 'TOCA.'] },
  { id: 'f19', fullText: 'A PORTA ABRE.', chunks: ['A PORTA', 'ABRE.'] },
  { id: 'f20', fullText: 'O LIVRO FECHA.', chunks: ['O LIVRO', 'FECHA.'] },
  { id: 'f21', fullText: 'O PATO NADA NO LAGO.', chunks: ['O PATO', 'NADA', 'NO LAGO.'] },
  { id: 'f22', fullText: 'A VACA COME CAPIM.', chunks: ['A VACA', 'COME', 'CAPIM.'] },
  { id: 'f23', fullText: 'O CAVALO CORRE MUITO.', chunks: ['O CAVALO', 'CORRE', 'MUITO.'] },
  { id: 'f24', fullText: 'A GALINHA BOTA OVO.', chunks: ['A GALINHA', 'BOTA', 'OVO.'] },
  { id: 'f25', fullText: 'O MACACO COME BANANA.', chunks: ['O MACACO', 'COME', 'BANANA.'] },
  { id: 'f26', fullText: 'A MENINA PULA CORDA.', chunks: ['A MENINA', 'PULA', 'CORDA.'] },
  { id: 'f27', fullText: 'O MENINO JOGA BOLA.', chunks: ['O MENINO', 'JOGA', 'BOLA.'] },
  { id: 'f28', fullText: 'O RELÓGIO MARCA A HORA.', chunks: ['O RELÓGIO', 'MARCA', 'A HORA.'] },
  { id: 'f29', fullText: 'O SOL AQUECE A TERRA.', chunks: ['O SOL', 'AQUECE', 'A TERRA.'] },
  { id: 'f30', fullText: 'AS ESTRELAS BRILHAM NO CÉU.', chunks: ['AS ESTRELAS', 'BRILHAM', 'NO CÉU.'] },
  { id: 'f31', fullText: 'EU AMO MINHA FAMÍLIA.', chunks: ['EU AMO', 'MINHA', 'FAMÍLIA.'] },
  { id: 'f32', fullText: 'A COMIDA ESTÁ GOSTOSA.', chunks: ['A COMIDA', 'ESTÁ', 'GOSTOSA.'] },
  { id: 'f33', fullText: 'VAMOS BRINCAR LÁ FORA.', chunks: ['VAMOS', 'BRINCAR', 'LÁ FORA.'] },
  { id: 'f34', fullText: 'HOJE O DIA ESTÁ LINDO.', chunks: ['HOJE', 'O DIA', 'ESTÁ LINDO.'] },
  { id: 'f35', fullText: 'O SAPO MORA NA LAGOA.', chunks: ['O SAPO', 'MORA', 'NA LAGOA.'] },
  { id: 'f36', fullText: 'A ABELHA FAZ MEL.', chunks: ['A ABELHA', 'FAZ', 'MEL.'] },
  { id: 'f37', fullText: 'A FORMIGA TRABALHA MUITO.', chunks: ['A FORMIGA', 'TRABALHA', 'MUITO.'] },
  { id: 'f38', fullText: 'O LEÃO É O REI DA SELVA.', chunks: ['O LEÃO', 'É O REI', 'DA SELVA.'] },
  { id: 'f39', fullText: 'O ELEFANTE TEM UMA TROMBA.', chunks: ['O ELEFANTE', 'TEM', 'UMA TROMBA.'] },
  { id: 'f40', fullText: 'A GIRAFA TEM PESCOÇO LONGO.', chunks: ['A GIRAFA', 'TEM', 'PESCOÇO LONGO.'] },
  { id: 'f41', fullText: 'O PINGUIM VIVE NO GELO.', chunks: ['O PINGUIM', 'VIVE', 'NO GELO.'] },
  { id: 'f42', fullText: 'O URSO DORME NO INVERNO.', chunks: ['O URSO', 'DORME', 'NO INVERNO.'] },
  { id: 'f43', fullText: 'O COELHO COME CENOURA.', chunks: ['O COELHO', 'COME', 'CENOURA.'] },
  { id: 'f44', fullText: 'O RATO ROEU A ROUPA.', chunks: ['O RATO', 'ROEU', 'A ROUPA.'] },
  { id: 'f45', fullText: 'A ARANHA FEZ A TEIA.', chunks: ['A ARANHA', 'FEZ', 'A TEIA.'] },
  { id: 'f46', fullText: 'A BORBOLETA É COLORIDA.', chunks: ['A BORBOLETA', 'É', 'COLORIDA.'] },
  { id: 'f47', fullText: 'O PASSARINHO CANTA ALTO.', chunks: ['O PASSARINHO', 'CANTA', 'ALTO.'] },
  { id: 'f48', fullText: 'A TARTARUGA ANDA DEVAGAR.', chunks: ['A TARTARUGA', 'ANDA', 'DEVAGAR.'] },
  { id: 'f49', fullText: 'O JACARÉ TEM DENTES GRANDES.', chunks: ['O JACARÉ', 'TEM', 'DENTES GRANDES.'] },
  { id: 'f50', fullText: 'A BALEIA VIVE NO MAR.', chunks: ['A BALEIA', 'VIVE', 'NO MAR.'] }
];

export const FALLBACK_COMPREHENSION = [
  { id: 'c1', sentence: 'SOU AMARELA E GOSTO DE MACACOS.', options: [{ emoji: '🍌', label: 'BANANA', isCorrect: true }, { emoji: '🍎', label: 'MAÇÃ', isCorrect: false }, { emoji: '🍇', label: 'UVA', isCorrect: false }] },
  { id: 'c2', sentence: 'TENHO 4 RODAS E ANDO NA RUA.', options: [{ emoji: '🚗', label: 'CARRO', isCorrect: true }, { emoji: '🚲', label: 'BICICLETA', isCorrect: false }, { emoji: '✈️', label: 'AVIÃO', isCorrect: false }] },
  { id: 'c3', sentence: 'VIVO NA ÁGUA E NADO RÁPIDO.', options: [{ emoji: '🐟', label: 'PEIXE', isCorrect: true }, { emoji: '🐦', label: 'PÁSSARO', isCorrect: false }, { emoji: '🐈', label: 'GATO', isCorrect: false }] },
  { id: 'c4', sentence: 'CAIO DO CÉU QUANDO CHOVE.', options: [{ emoji: '💧', label: 'ÁGUA', isCorrect: true }, { emoji: '☀️', label: 'SOL', isCorrect: false }, { emoji: '🌙', label: 'LUA', isCorrect: false }] },
  { id: 'c5', sentence: 'DOU LEITE E FAÇO MUUU.', options: [{ emoji: '🐄', label: 'VACA', isCorrect: true }, { emoji: '🐖', label: 'PORCO', isCorrect: false }, { emoji: '🐎', label: 'CAVALO', isCorrect: false }] },
  { id: 'c6', sentence: 'TENHO TROMBA E SOU GRANDE.', options: [{ emoji: '🐘', label: 'ELEFANTE', isCorrect: true }, { emoji: '🦒', label: 'GIRAFA', isCorrect: false }, { emoji: '🦁', label: 'LEÃO', isCorrect: false }] },
  { id: 'c7', sentence: 'TENHO PESCOÇO LONGO E COMO FOLHAS.', options: [{ emoji: '🦒', label: 'GIRAFA', isCorrect: true }, { emoji: '🦓', label: 'ZEBRA', isCorrect: false }, { emoji: '🐎', label: 'CAVALO', isCorrect: false }] },
  { id: 'c8', sentence: 'VIVO NA COLMEIA E FAÇO MEL.', options: [{ emoji: '🐝', label: 'ABELHA', isCorrect: true }, { emoji: '🐜', label: 'FORMIGA', isCorrect: false }, { emoji: '🦋', label: 'BORBOLETA', isCorrect: false }] },
  { id: 'c9', sentence: 'TENHO JUBAS E RUJO FORTE.', options: [{ emoji: '🦁', label: 'LEÃO', isCorrect: true }, { emoji: '🐯', label: 'TIGRE', isCorrect: false }, { emoji: '🐻', label: 'URSO', isCorrect: false }] },
  { id: 'c10', sentence: 'SOU VERDE E PULO NA LAGOA.', options: [{ emoji: '🐸', label: 'SAPO', isCorrect: true }, { emoji: '🐢', label: 'TARTARUGA', isCorrect: false }, { emoji: '🐊', label: 'JACARÉ', isCorrect: false }] }
];

export const FALLBACK_CREEPER = [
  { id: 'cr1', word: 'MESA', options: [{ emoji: '🪑', isCorrect: true }, { emoji: '🛌', isCorrect: false }, { emoji: '🚪', isCorrect: false }] },
  { id: 'cr2', word: 'FLOR', options: [{ emoji: '🌸', isCorrect: true }, { emoji: '🌳', isCorrect: false }, { emoji: '🍄', isCorrect: false }] },
  { id: 'cr3', word: 'LIVRO', options: [{ emoji: '📖', isCorrect: true }, { emoji: '🖊️', isCorrect: false }, { emoji: '🎒', isCorrect: false }] },
  { id: 'cr4', word: 'CAMA', options: [{ emoji: '🛌', isCorrect: true }, { emoji: '🪑', isCorrect: false }, { emoji: '🚪', isCorrect: false }] },
  { id: 'cr5', word: 'SOL', options: [{ emoji: '☀️', isCorrect: true }, { emoji: '🌙', isCorrect: false }, { emoji: '⭐', isCorrect: false }] },
  { id: 'cr6', word: 'LUA', options: [{ emoji: '🌙', isCorrect: true }, { emoji: '☀️', isCorrect: false }, { emoji: '☁️', isCorrect: false }] },
  { id: 'cr7', word: 'CARRO', options: [{ emoji: '🚗', isCorrect: true }, { emoji: '🚲', isCorrect: false }, { emoji: '🚌', isCorrect: false }] },
  { id: 'cr8', word: 'BOLA', options: [{ emoji: '⚽', isCorrect: true }, { emoji: '🪁', isCorrect: false }, { emoji: '🧩', isCorrect: false }] },
  { id: 'cr9', word: 'GATO', options: [{ emoji: '🐱', isCorrect: true }, { emoji: '🐶', isCorrect: false }, { emoji: '🐭', isCorrect: false }] },
  { id: 'cr10', word: 'CÃO', options: [{ emoji: '🐶', isCorrect: true }, { emoji: '🐱', isCorrect: false }, { emoji: '🐭', isCorrect: false }] }
];

export const FALLBACK_MINE: MineChallenge[] = [
  { id: 'mine1', word: 'CASA', emoji: '🏠', correctSyllables: ['CA', 'SA'], distractors: ['BA', 'CO', 'DA'] },
  { id: 'mine2', word: 'BOLA', emoji: '⚽', correctSyllables: ['BO', 'LA'], distractors: ['PA', 'LO', 'MA'] },
  { id: 'mine3', word: 'GATO', emoji: '🐱', correctSyllables: ['GA', 'TO'], distractors: ['TA', 'GO', 'LI'] },
  { id: 'mine4', word: 'SAPO', emoji: '🐸', correctSyllables: ['SA', 'PO'], distractors: ['SO', 'PA', 'PE'] },
  { id: 'mine5', word: 'DADO', emoji: '🎲', correctSyllables: ['DA', 'DO'], distractors: ['DE', 'DI', 'DU'] },
  { id: 'mine6', word: 'FACA', emoji: '🔪', correctSyllables: ['FA', 'CA'], distractors: ['FE', 'CO', 'CU'] },
  { id: 'mine7', word: 'LIXO', emoji: '🗑️', correctSyllables: ['LI', 'XO'], distractors: ['LA', 'XA', 'XE'] },
  { id: 'mine8', word: 'MOTO', emoji: '🏍️', correctSyllables: ['MO', 'TO'], distractors: ['MA', 'TU', 'TI'] },
  { id: 'mine9', word: 'NAVIO', emoji: '🚢', correctSyllables: ['NA', 'VI', 'O'], distractors: ['NO', 'VE', 'U'] },
  { id: 'mine10', word: 'PIPOCA', emoji: '🍿', correctSyllables: ['PI', 'PO', 'CA'], distractors: ['PA', 'PE', 'CO'] }
];

export const FALLBACK_FIELD: FieldChallenge[] = [
  { id: 'field1', instruction: 'ENCONTRE A LETRA M', target: 'M', options: ['M', 'N', 'W', 'A', 'P'] },
  { id: 'field2', instruction: 'QUAL LETRA COMEÇA GATO?', target: 'G', options: ['G', 'C', 'Q', 'O', 'J'] },
  { id: 'field3', instruction: 'TOQUE NA LETRA A', target: 'A', options: ['A', 'E', 'O', 'V', 'X'] },
  { id: 'field4', instruction: 'ENCONTRE A LETRA B', target: 'B', options: ['B', 'P', 'D', 'R', 'S'] },
  { id: 'field5', instruction: 'QUAL LETRA COMEÇA PATO?', target: 'P', options: ['P', 'B', 'D', 'Q', 'R'] },
  { id: 'field6', instruction: 'TOQUE NA LETRA E', target: 'E', options: ['E', 'F', 'L', 'I', 'H'] },
  { id: 'field7', instruction: 'ENCONTRE A LETRA S', target: 'S', options: ['S', 'Z', 'C', 'X', 'O'] },
  { id: 'field8', instruction: 'QUAL LETRA COMEÇA RATO?', target: 'R', options: ['R', 'B', 'P', 'K', 'S'] },
  { id: 'field9', instruction: 'TOQUE NA LETRA O', target: 'O', options: ['O', 'Q', 'C', 'G', 'D'] },
  { id: 'field10', instruction: 'ENCONTRE A LETRA U', target: 'U', options: ['U', 'V', 'W', 'Y', 'J'] }
];

export const FALLBACK_BLAZE: BlazeChallenge[] = [
  { id: 'bz1', instruction: 'O BLAZE ESTÁ NA PONTE. ESCAPE PELA CAVERNA.', options: [{ label: 'CAVERNA', emoji: '🕳️', isCorrect: true }, { label: 'PONTE', emoji: '🌉', isCorrect: false }, { label: 'FLORESTA', emoji: '🌲', isCorrect: false }] },
  { id: 'bz2', instruction: 'FOGO NO CAMINHO! CORRA PARA O LAGO.', options: [{ label: 'LAGO', emoji: '🌊', isCorrect: true }, { label: 'CAMINHO', emoji: '🛤️', isCorrect: false }, { label: 'CASA', emoji: '🏠', isCorrect: false }] },
  { id: 'bz3', instruction: 'O BLAZE VEM AÍ! SUBA NA ÁRVORE.', options: [{ label: 'ÁRVORE', emoji: '🌳', isCorrect: true }, { label: 'PEDRA', emoji: '🪨', isCorrect: false }, { label: 'RIO', emoji: '💧', isCorrect: false }] },
  { id: 'bz4', instruction: 'PERIGO! ENTRE NA CASA.', options: [{ label: 'CASA', emoji: '🏠', isCorrect: true }, { label: 'JARDIM', emoji: '🌻', isCorrect: false }, { label: 'RUA', emoji: '🛣️', isCorrect: false }] },
  { id: 'bz5', instruction: 'ESCONDA-SE ATRÁS DA PEDRA.', options: [{ label: 'PEDRA', emoji: '🪨', isCorrect: true }, { label: 'FLOR', emoji: '🌸', isCorrect: false }, { label: 'ARBUSTO', emoji: '🌿', isCorrect: false }] },
  { id: 'bz6', instruction: 'CORRA PARA O BARCO.', options: [{ label: 'BARCO', emoji: '⛵', isCorrect: true }, { label: 'CARRO', emoji: '🚗', isCorrect: false }, { label: 'AVIÃO', emoji: '✈️', isCorrect: false }] },
  { id: 'bz7', instruction: 'VÁ PARA A MONTANHA.', options: [{ label: 'MONTANHA', emoji: '🏔️', isCorrect: true }, { label: 'PRAIA', emoji: '🏖️', isCorrect: false }, { label: 'CIDADE', emoji: '🏙️', isCorrect: false }] },
  { id: 'bz8', instruction: 'ENTRE NO TÚNEL.', options: [{ label: 'TÚNEL', emoji: '🚇', isCorrect: true }, { label: 'PONTE', emoji: '🌉', isCorrect: false }, { label: 'ESTRADA', emoji: '🛣️', isCorrect: false }] },
  { id: 'bz9', instruction: 'SUBA A ESCADA.', options: [{ label: 'ESCADA', emoji: '🪜', isCorrect: true }, { label: 'RAMPA', emoji: '📐', isCorrect: false }, { label: 'ELEVADOR', emoji: '🛗', isCorrect: false }] },
  { id: 'bz10', instruction: 'PULE NA PISCINA.', options: [{ label: 'PISCINA', emoji: '🏊', isCorrect: true }, { label: 'CAMA', emoji: '🛌', isCorrect: false }, { label: 'MESA', emoji: '🪑', isCorrect: false }] }
];

export const FALLBACK_FILL_BLANK: FillBlankChallenge[] = [
  { id: 'fb1', sentencePart1: 'O PORQUINHO ACHOU UMA', sentencePart2: '.', correctWord: 'MAÇÃ', options: ['MAÇÃ', 'PEDRA', 'CADEIRA'], fullSentence: 'O PORQUINHO ACHOU UMA MAÇÃ.' },
  { id: 'fb2', sentencePart1: 'A OVELHA TEM LÃ', sentencePart2: '.', correctWord: 'BRANCA', options: ['BRANCA', 'VERDE', 'AZUL'], fullSentence: 'A OVELHA TEM LÃ BRANCA.' },
  { id: 'fb3', sentencePart1: 'O CÉU É', sentencePart2: '.', correctWord: 'AZUL', options: ['AZUL', 'VERMELHO', 'VERDE'], fullSentence: 'O CÉU É AZUL.' },
  { id: 'fb4', sentencePart1: 'A GRAMA É', sentencePart2: '.', correctWord: 'VERDE', options: ['VERDE', 'ROXA', 'LARANJA'], fullSentence: 'A GRAMA É VERDE.' },
  { id: 'fb5', sentencePart1: 'O SOL É', sentencePart2: '.', correctWord: 'QUENTE', options: ['QUENTE', 'FRIO', 'GELADO'], fullSentence: 'O SOL É QUENTE.' },
  { id: 'fb6', sentencePart1: 'A NEVE É', sentencePart2: '.', correctWord: 'FRIA', options: ['FRIA', 'QUENTE', 'MORNA'], fullSentence: 'A NEVE É FRIA.' },
  { id: 'fb7', sentencePart1: 'O PEIXE VIVE NA', sentencePart2: '.', correctWord: 'ÁGUA', options: ['ÁGUA', 'TERRA', 'AR'], fullSentence: 'O PEIXE VIVE NA ÁGUA.' },
  { id: 'fb8', sentencePart1: 'O PÁSSARO VOA NO', sentencePart2: '.', correctWord: 'CÉU', options: ['CÉU', 'MAR', 'CHÃO'], fullSentence: 'O PÁSSARO VOA NO CÉU.' },
  { id: 'fb9', sentencePart1: 'EU COMO', sentencePart2: 'NO ALMOÇO.', correctWord: 'ARROZ', options: ['ARROZ', 'PEDRA', 'SAPATO'], fullSentence: 'EU COMO ARROZ NO ALMOÇO.' },
  { id: 'fb10', sentencePart1: 'EU BEBO', sentencePart2: 'QUANDO TENHO SEDE.', correctWord: 'ÁGUA', options: ['ÁGUA', 'PÃO', 'BOLO'], fullSentence: 'EU BEBO ÁGUA QUANDO TENHO SEDE.' },
  { id: 'fb11', sentencePart1: 'O GATO FAZ', sentencePart2: '.', correctWord: 'MIAU', options: ['MIAU', 'AUAU', 'MUU'], fullSentence: 'O GATO FAZ MIAU.' },
  { id: 'fb12', sentencePart1: 'O CACHORRO FAZ', sentencePart2: '.', correctWord: 'AUAU', options: ['AUAU', 'MIAU', 'MUU'], fullSentence: 'O CACHORRO FAZ AUAU.' },
  { id: 'fb13', sentencePart1: 'A VACA FAZ', sentencePart2: '.', correctWord: 'MUU', options: ['MUU', 'MIAU', 'AUAU'], fullSentence: 'A VACA FAZ MUU.' },
  { id: 'fb14', sentencePart1: 'O LEÃO FAZ', sentencePart2: '.', correctWord: 'ROARR', options: ['ROARR', 'PIU', 'MIAU'], fullSentence: 'O LEÃO FAZ ROARR.' },
  { id: 'fb15', sentencePart1: 'O PATO FAZ', sentencePart2: '.', correctWord: 'QUACK', options: ['QUACK', 'MUU', 'AUAU'], fullSentence: 'O PATO FAZ QUACK.' },
  { id: 'fb16', sentencePart1: 'A BOLA É', sentencePart2: '.', correctWord: 'REDONDA', options: ['REDONDA', 'QUADRADA', 'TRIANGULAR'], fullSentence: 'A BOLA É REDONDA.' },
  { id: 'fb17', sentencePart1: 'O QUADRADO TEM 4', sentencePart2: '.', correctWord: 'LADOS', options: ['LADOS', 'RODAS', 'PERNAS'], fullSentence: 'O QUADRADO TEM 4 LADOS.' },
  { id: 'fb18', sentencePart1: 'O TRIÂNGULO TEM 3', sentencePart2: '.', correctWord: 'LADOS', options: ['LADOS', 'RODAS', 'PERNAS'], fullSentence: 'O TRIÂNGULO TEM 3 LADOS.' },
  { id: 'fb19', sentencePart1: 'A BICICLETA TEM 2', sentencePart2: '.', correctWord: 'RODAS', options: ['RODAS', 'ASAS', 'PERNAS'], fullSentence: 'A BICICLETA TEM 2 RODAS.' },
  { id: 'fb20', sentencePart1: 'O CARRO TEM 4', sentencePart2: '.', correctWord: 'RODAS', options: ['RODAS', 'ASAS', 'PERNAS'], fullSentence: 'O CARRO TEM 4 RODAS.' },
  { id: 'fb21', sentencePart1: 'A ÁRVORE TEM', sentencePart2: '.', correctWord: 'FOLHAS', options: ['FOLHAS', 'RODAS', 'JANELAS'], fullSentence: 'A ÁRVORE TEM FOLHAS.' },
  { id: 'fb22', sentencePart1: 'A FLOR TEM', sentencePart2: '.', correctWord: 'PÉTALAS', options: ['PÉTALAS', 'RODAS', 'JANELAS'], fullSentence: 'A FLOR TEM PÉTALAS.' },
  { id: 'fb23', sentencePart1: 'A CASA TEM', sentencePart2: '.', correctWord: 'PORTA', options: ['PORTA', 'RODAS', 'ASAS'], fullSentence: 'A CASA TEM PORTA.' },
  { id: 'fb24', sentencePart1: 'O CARRO TEM', sentencePart2: '.', correctWord: 'MOTOR', options: ['MOTOR', 'PERNAS', 'ASAS'], fullSentence: 'O CARRO TEM MOTOR.' },
  { id: 'fb25', sentencePart1: 'O AVIÃO TEM', sentencePart2: '.', correctWord: 'ASAS', options: ['ASAS', 'PERNAS', 'MÃOS'], fullSentence: 'O AVIÃO TEM ASAS.' },
  { id: 'fb26', sentencePart1: 'O PÁSSARO TEM', sentencePart2: '.', correctWord: 'ASAS', options: ['ASAS', 'RODAS', 'MÃOS'], fullSentence: 'O PÁSSARO TEM ASAS.' },
  { id: 'fb27', sentencePart1: 'O PEIXE TEM', sentencePart2: '.', correctWord: 'ESCAMAS', options: ['ESCAMAS', 'PELOS', 'PENAS'], fullSentence: 'O PEIXE TEM ESCAMAS.' },
  { id: 'fb28', sentencePart1: 'O GATO TEM', sentencePart2: '.', correctWord: 'PELOS', options: ['PELOS', 'ESCAMAS', 'PENAS'], fullSentence: 'O GATO TEM PELOS.' },
  { id: 'fb29', sentencePart1: 'A GALINHA TEM', sentencePart2: '.', correctWord: 'PENAS', options: ['PENAS', 'PELOS', 'ESCAMAS'], fullSentence: 'A GALINHA TEM PENAS.' },
  { id: 'fb30', sentencePart1: 'O SAPO TEM', sentencePart2: '.', correctWord: 'PELE', options: ['PELE', 'PELOS', 'PENAS'], fullSentence: 'O SAPO TEM PELE.' },
  { id: 'fb31', sentencePart1: 'O DIA TEM', sentencePart2: '.', correctWord: 'SOL', options: ['SOL', 'LUA', 'ESTRELAS'], fullSentence: 'O DIA TEM SOL.' },
  { id: 'fb32', sentencePart1: 'A NOITE TEM', sentencePart2: '.', correctWord: 'LUA', options: ['LUA', 'SOL', 'ARCO-ÍRIS'], fullSentence: 'A NOITE TEM LUA.' },
  { id: 'fb33', sentencePart1: 'O INVERNO É', sentencePart2: '.', correctWord: 'FRIO', options: ['FRIO', 'QUENTE', 'MORNO'], fullSentence: 'O INVERNO É FRIO.' },
  { id: 'fb34', sentencePart1: 'O VERÃO É', sentencePart2: '.', correctWord: 'QUENTE', options: ['QUENTE', 'FRIO', 'GELADO'], fullSentence: 'O VERÃO É QUENTE.' },
  { id: 'fb35', sentencePart1: 'A PRIMAVERA TEM', sentencePart2: '.', correctWord: 'FLORES', options: ['FLORES', 'NEVE', 'GELO'], fullSentence: 'A PRIMAVERA TEM FLORES.' },
  { id: 'fb36', sentencePart1: 'O OUTONO TEM', sentencePart2: '.', correctWord: 'VENTO', options: ['VENTO', 'NEVE', 'CALOR'], fullSentence: 'O OUTONO TEM VENTO.' },
  { id: 'fb37', sentencePart1: 'O FOGO', sentencePart2: '.', correctWord: 'QUEIMA', options: ['QUEIMA', 'MOLHA', 'CONGELA'], fullSentence: 'O FOGO QUEIMA.' },
  { id: 'fb38', sentencePart1: 'A ÁGUA', sentencePart2: '.', correctWord: 'MOLHA', options: ['MOLHA', 'QUEIMA', 'SECA'], fullSentence: 'A ÁGUA MOLHA.' },
  { id: 'fb39', sentencePart1: 'O GELO', sentencePart2: '.', correctWord: 'CONGELA', options: ['CONGELA', 'FERVE', 'ASSADA'], fullSentence: 'O GELO CONGELA.' },
  { id: 'fb40', sentencePart1: 'O SOL', sentencePart2: '.', correctWord: 'ILUMINA', options: ['ILUMINA', 'ESCURECE', 'MOLHA'], fullSentence: 'O SOL ILUMINA.' },
  { id: 'fb41', sentencePart1: 'EU USO', sentencePart2: 'NOS PÉS.', correctWord: 'SAPATO', options: ['SAPATO', 'CHAPÉU', 'LUVA'], fullSentence: 'EU USO SAPATO NOS PÉS.' },
  { id: 'fb42', sentencePart1: 'EU USO', sentencePart2: 'NA CABEÇA.', correctWord: 'CHAPÉU', options: ['CHAPÉU', 'SAPATO', 'MEIA'], fullSentence: 'EU USO CHAPÉU NA CABEÇA.' },
  { id: 'fb43', sentencePart1: 'EU USO', sentencePart2: 'NAS MÃOS.', correctWord: 'LUVA', options: ['LUVA', 'SAPATO', 'CHAPÉU'], fullSentence: 'EU USO LUVA NAS MÃOS.' },
  { id: 'fb44', sentencePart1: 'EU VISTO', sentencePart2: '.', correctWord: 'CAMISA', options: ['CAMISA', 'MESA', 'CADEIRA'], fullSentence: 'EU VISTO CAMISA.' },
  { id: 'fb45', sentencePart1: 'EU COMO COM', sentencePart2: '.', correctWord: 'GARFO', options: ['GARFO', 'PENTE', 'ESCOVA'], fullSentence: 'EU COMO COM GARFO.' },
  { id: 'fb46', sentencePart1: 'EU ESCOVO OS', sentencePart2: '.', correctWord: 'DENTES', options: ['DENTES', 'OLHOS', 'OUVIDOS'], fullSentence: 'EU ESCOVO OS DENTES.' },
  { id: 'fb47', sentencePart1: 'EU LAVO AS', sentencePart2: '.', correctWord: 'MÃOS', options: ['MÃOS', 'LÍNGUA', 'NARIZ'], fullSentence: 'EU LAVO AS MÃOS.' },
  { id: 'fb48', sentencePart1: 'EU PENTEIO O', sentencePart2: '.', correctWord: 'CABELO', options: ['CABELO', 'DENTE', 'UNHA'], fullSentence: 'EU PENTEIO O CABELO.' },
  { id: 'fb49', sentencePart1: 'EU CORTO A', sentencePart2: '.', correctWord: 'UNHA', options: ['UNHA', 'DENTE', 'OLHO'], fullSentence: 'EU CORTO A UNHA.' },
  { id: 'fb50', sentencePart1: 'EU DURMO NA', sentencePart2: '.', correctWord: 'CAMA', options: ['CAMA', 'MESA', 'PIIA'], fullSentence: 'EU DURMO NA CAMA.' }
];

export const FALLBACK_STORY_CRAFT: StoryCraftChallenge[] = [
    {
        id: 'story1',
        elements: [
            { id: 's1', label: 'O LOBO', emoji: '🐺', type: 'SUBJECT' },
            { id: 's2', label: 'A OVELHA', emoji: '🐑', type: 'SUBJECT' },
            { id: 'v1', label: 'CORREU', emoji: '🏃', type: 'VERB' },
            { id: 'v2', label: 'PULOU', emoji: '⬆️', type: 'VERB' },
            { id: 'o1', label: 'NA FLORESTA', emoji: '🌲', type: 'OBJECT' },
            { id: 'o2', label: 'NA ÁGUA', emoji: '🌊', type: 'OBJECT' }
        ],
        validCombinations: [
            { subject: 'O LOBO', verb: 'CORREU', object: 'NA FLORESTA', resultSentence: 'O LOBO CORREU NA FLORESTA.', animation: 'wolf-run' },
            { subject: 'A OVELHA', verb: 'PULOU', object: 'NA ÁGUA', resultSentence: 'A OVELHA PULOU NA ÁGUA.', animation: 'sheep-jump' }
        ]
    }
];

export const FALLBACK_REVERSE: ReverseChallenge[] = [
    { id: 'rev1', scrambled: ['VOOU', 'O', 'PÁSSARO', 'ALTO'], correct: ['O', 'PÁSSARO', 'VOOU', 'ALTO'], fullSentence: 'O PÁSSARO VOOU ALTO.' },
    { id: 'rev2', scrambled: ['GATO', 'LEITE', 'O', 'BEBEU'], correct: ['O', 'GATO', 'BEBEU', 'LEITE'], fullSentence: 'O GATO BEBEU LEITE.' },
    { id: 'rev3', scrambled: ['BOLA', 'A', 'ROLA', 'CHÃO', 'NO'], correct: ['A', 'BOLA', 'ROLA', 'NO', 'CHÃO'], fullSentence: 'A BOLA ROLA NO CHÃO.' },
    { id: 'rev4', scrambled: ['SOL', 'BRILHA', 'O', 'CÉU', 'NO'], correct: ['O', 'SOL', 'BRILHA', 'NO', 'CÉU'], fullSentence: 'O SOL BRILHA NO CÉU.' },
    { id: 'rev5', scrambled: ['PEIXE', 'NADA', 'O', 'RIO', 'NO'], correct: ['O', 'PEIXE', 'NADA', 'NO', 'RIO'], fullSentence: 'O PEIXE NADA NO RIO.' },
    { id: 'rev6', scrambled: ['COMIDA', 'A', 'GOSTOSA', 'ESTÁ'], correct: ['A', 'COMIDA', 'ESTÁ', 'GOSTOSA'], fullSentence: 'A COMIDA ESTÁ GOSTOSA.' },
    { id: 'rev7', scrambled: ['MENINO', 'O', 'CORRE', 'RÁPIDO'], correct: ['O', 'MENINO', 'CORRE', 'RÁPIDO'], fullSentence: 'O MENINO CORRE RÁPIDO.' },
    { id: 'rev8', scrambled: ['FLOR', 'A', 'BONITA', 'É'], correct: ['A', 'FLOR', 'É', 'BONITA'], fullSentence: 'A FLOR É BONITA.' },
    { id: 'rev9', scrambled: ['CÃO', 'O', 'ALTO', 'LATE'], correct: ['O', 'CÃO', 'LATE', 'ALTO'], fullSentence: 'O CÃO LATE ALTO.' },
    { id: 'rev10', scrambled: ['GATO', 'O', 'DORME', 'SOFÁ', 'NO'], correct: ['O', 'GATO', 'DORME', 'NO', 'SOFÁ'], fullSentence: 'O GATO DORME NO SOFÁ.' },
    { id: 'rev11', scrambled: ['ÁGUA', 'A', 'FRIA', 'É'], correct: ['A', 'ÁGUA', 'É', 'FRIA'], fullSentence: 'A ÁGUA É FRIA.' },
    { id: 'rev12', scrambled: ['FOGO', 'O', 'QUENTE', 'É'], correct: ['O', 'FOGO', 'É', 'QUENTE'], fullSentence: 'O FOGO É QUENTE.' },
    { id: 'rev13', scrambled: ['CÉU', 'O', 'AZUL', 'É'], correct: ['O', 'CÉU', 'É', 'AZUL'], fullSentence: 'O CÉU É AZUL.' },
    { id: 'rev14', scrambled: ['GRAMA', 'A', 'VERDE', 'É'], correct: ['A', 'GRAMA', 'É', 'VERDE'], fullSentence: 'A GRAMA É VERDE.' },
    { id: 'rev15', scrambled: ['NEVE', 'A', 'BRANCA', 'É'], correct: ['A', 'NEVE', 'É', 'BRANCA'], fullSentence: 'A NEVE É BRANCA.' },
    { id: 'rev16', scrambled: ['CARRO', 'O', 'RÁPIDO', 'É'], correct: ['O', 'CARRO', 'É', 'RÁPIDO'], fullSentence: 'O CARRO É RÁPIDO.' },
    { id: 'rev17', scrambled: ['AVIÃO', 'O', 'ALTO', 'VOA'], correct: ['O', 'AVIÃO', 'VOA', 'ALTO'], fullSentence: 'O AVIÃO VOA ALTO.' },
    { id: 'rev18', scrambled: ['BARCO', 'O', 'MAR', 'NO', 'NAVEGA'], correct: ['O', 'BARCO', 'NAVEGA', 'NO', 'MAR'], fullSentence: 'O BARCO NAVEGA NO MAR.' },
    { id: 'rev19', scrambled: ['TREM', 'O', 'TRILHO', 'NO', 'ANDA'], correct: ['O', 'TREM', 'ANDA', 'NO', 'TRILHO'], fullSentence: 'O TREM ANDA NO TRILHO.' },
    { id: 'rev20', scrambled: ['ÔNIBUS', 'O', 'GRANDE', 'É'], correct: ['O', 'ÔNIBUS', 'É', 'GRANDE'], fullSentence: 'O ÔNIBUS É GRANDE.' },
    { id: 'rev21', scrambled: ['EU', 'BOLA', 'JOGO'], correct: ['EU', 'JOGO', 'BOLA'], fullSentence: 'EU JOGO BOLA.' },
    { id: 'rev22', scrambled: ['ELA', 'CORDA', 'PULA'], correct: ['ELA', 'PULA', 'CORDA'], fullSentence: 'ELA PULA CORDA.' },
    { id: 'rev23', scrambled: ['NÓS', 'PARQUE', 'VAMOS', 'AO'], correct: ['NÓS', 'VAMOS', 'AO', 'PARQUE'], fullSentence: 'NÓS VAMOS AO PARQUE.' },
    { id: 'rev24', scrambled: ['ELES', 'LIVRO', 'LEEM', 'O'], correct: ['ELES', 'LEEM', 'O', 'LIVRO'], fullSentence: 'ELES LEEM O LIVRO.' },
    { id: 'rev25', scrambled: ['VOCÊ', 'AMIGO', 'É', 'MEU'], correct: ['VOCÊ', 'É', 'MEU', 'AMIGO'], fullSentence: 'VOCÊ É MEU AMIGO.' },
    { id: 'rev26', scrambled: ['MÃE', 'A', 'BOLO', 'FAZ'], correct: ['A', 'MÃE', 'FAZ', 'BOLO'], fullSentence: 'A MÃE FAZ BOLO.' },
    { id: 'rev27', scrambled: ['PAI', 'O', 'TRABALHA', 'FORA'], correct: ['O', 'PAI', 'TRABALHA', 'FORA'], fullSentence: 'O PAI TRABALHA FORA.' },
    { id: 'rev28', scrambled: ['IRMÃO', 'O', 'BRINCA', 'CASA', 'EM'], correct: ['O', 'IRMÃO', 'BRINCA', 'EM', 'CASA'], fullSentence: 'O IRMÃO BRINCA EM CASA.' },
    { id: 'rev29', scrambled: ['IRMÃ', 'A', 'ESTUDA', 'MUITO'], correct: ['A', 'IRMÃ', 'ESTUDA', 'MUITO'], fullSentence: 'A IRMÃ ESTUDA MUITO.' },
    { id: 'rev30', scrambled: ['VOVÓ', 'A', 'HISTÓRIA', 'CONTA'], correct: ['A', 'VOVÓ', 'CONTA', 'HISTÓRIA'], fullSentence: 'A VOVÓ CONTA HISTÓRIA.' },
    { id: 'rev31', scrambled: ['VOVÔ', 'O', 'JORNAL', 'LÊ'], correct: ['O', 'VOVÔ', 'LÊ', 'JORNAL'], fullSentence: 'O VOVÔ LÊ JORNAL.' },
    { id: 'rev32', scrambled: ['TITIA', 'A', 'DOCE', 'FAZ'], correct: ['A', 'TITIA', 'FAZ', 'DOCE'], fullSentence: 'A TITIA FAZ DOCE.' },
    { id: 'rev33', scrambled: ['TITIO', 'O', 'PRESENTE', 'DÁ'], correct: ['O', 'TITIO', 'DÁ', 'PRESENTE'], fullSentence: 'O TITIO DÁ PRESENTE.' },
    { id: 'rev34', scrambled: ['PRIMO', 'O', 'LONGE', 'MORA'], correct: ['O', 'PRIMO', 'MORA', 'LONGE'], fullSentence: 'O PRIMO MORA LONGE.' },
    { id: 'rev35', scrambled: ['PRIMA', 'A', 'PERTO', 'MORA'], correct: ['A', 'PRIMA', 'MORA', 'PERTO'], fullSentence: 'A PRIMA MORA PERTO.' },
    { id: 'rev36', scrambled: ['PROFESSORA', 'A', 'ENSINA', 'BEM'], correct: ['A', 'PROFESSORA', 'ENSINA', 'BEM'], fullSentence: 'A PROFESSORA ENSINA BEM.' },
    { id: 'rev37', scrambled: ['ALUNO', 'O', 'APRENDE', 'RÁPIDO'], correct: ['O', 'ALUNO', 'APRENDE', 'RÁPIDO'], fullSentence: 'O ALUNO APRENDE RÁPIDO.' },
    { id: 'rev38', scrambled: ['ESCOLA', 'A', 'GRANDE', 'É'], correct: ['A', 'ESCOLA', 'É', 'GRANDE'], fullSentence: 'A ESCOLA É GRANDE.' },
    { id: 'rev39', scrambled: ['SALA', 'A', 'LIMPA', 'ESTÁ'], correct: ['A', 'SALA', 'ESTÁ', 'LIMPA'], fullSentence: 'A SALA ESTÁ LIMPA.' },
    { id: 'rev40', scrambled: ['QUADRO', 'O', 'VERDE', 'É'], correct: ['O', 'QUADRO', 'É', 'VERDE'], fullSentence: 'O QUADRO É VERDE.' },
    { id: 'rev41', scrambled: ['LÁPIS', 'O', 'ESCREVE', 'BEM'], correct: ['O', 'LÁPIS', 'ESCREVE', 'BEM'], fullSentence: 'O LÁPIS ESCREVE BEM.' },
    { id: 'rev42', scrambled: ['BORRACHA', 'A', 'APAGA', 'TUDO'], correct: ['A', 'BORRACHA', 'APAGA', 'TUDO'], fullSentence: 'A BORRACHA APAGA TUDO.' },
    { id: 'rev43', scrambled: ['CADERNO', 'O', 'NOVO', 'É'], correct: ['O', 'CADERNO', 'É', 'NOVO'], fullSentence: 'O CADERNO É NOVO.' },
    { id: 'rev44', scrambled: ['MOCHILA', 'A', 'PESADA', 'ESTÁ'], correct: ['A', 'MOCHILA', 'ESTÁ', 'PESADA'], fullSentence: 'A MOCHILA ESTÁ PESADA.' },
    { id: 'rev45', scrambled: ['LANCHE', 'O', 'GOSTOSO', 'É'], correct: ['O', 'LANCHE', 'É', 'GOSTOSO'], fullSentence: 'O LANCHE É GOSTOSO.' },
    { id: 'rev46', scrambled: ['RECREIO', 'O', 'DIVERTIDO', 'É'], correct: ['O', 'RECREIO', 'É', 'DIVERTIDO'], fullSentence: 'O RECREIO É DIVERTIDO.' },
    { id: 'rev47', scrambled: ['AMIGOS', 'OS', 'LEGAIS', 'SÃO'], correct: ['OS', 'AMIGOS', 'SÃO', 'LEGAIS'], fullSentence: 'OS AMIGOS SÃO LEGAIS.' },
    { id: 'rev48', scrambled: ['BRINCADEIRA', 'A', 'BOA', 'É'], correct: ['A', 'BRINCADEIRA', 'É', 'BOA'], fullSentence: 'A BRINCADEIRA É BOA.' },
    { id: 'rev49', scrambled: ['AULA', 'A', 'ACABOU', 'JÁ'], correct: ['A', 'AULA', 'JÁ', 'ACABOU'], fullSentence: 'A AULA JÁ ACABOU.' },
    { id: 'rev50', scrambled: ['CASA', 'PRA', 'VOU', 'EU'], correct: ['EU', 'VOU', 'PRA', 'CASA'], fullSentence: 'EU VOU PRA CASA.' }
];

export const FALLBACK_MONSTER: MonsterChallenge[] = [
    { id: 'mon1', monsterType: 'WORD', instruction: 'LEIA A PALAVRA: FOGO', options: [{text: 'FOGO', isCorrect: true}, {text: 'ÁGUA', isCorrect: false}] },
    { id: 'mon2', monsterType: 'PHRASE', instruction: 'QUAL FRASE ESTÁ CERTA?', options: [{text: 'O PEIXE NADA.', isCorrect: true}, {text: 'O PEIXE VOA.', isCorrect: false}] }
];

export const FALLBACK_FINAL_BOOK: FinalBookChallenge[] = [
    {
        id: 'fb1',
        sentences: [
            { syllables: ['O', 'LO', 'BO', 'A', 'JU', 'DA', 'VO', 'CÊ'], distractors: ['BA', 'CO', 'ME', 'TI'], fullText: 'O LOBO AJUDA VOCÊ' },
            { syllables: ['LE', 'R', 'É', 'U', 'MA', 'A', 'VEN', 'TU', 'RA'], distractors: ['SO', 'PA', 'LA', 'RE'], fullText: 'LER É UMA AVENTURA' },
            { syllables: ['VO', 'CÊ', 'É', 'MUI', 'TO', 'FOR', 'TE'], distractors: ['DE', 'SA', 'PO', 'LU'], fullText: 'VOCÊ É MUITO FORTE' },
            { syllables: ['O', 'MUN', 'DO', 'É', 'GI', 'GAN', 'TE'], distractors: ['PE', 'QU', 'NO', 'RA'], fullText: 'O MUNDO É GIGANTE' },
            { syllables: ['A', 'MI', 'GOS', 'SÃO', 'PRE', 'SEN', 'TES'], distractors: ['BO', 'LA', 'CA', 'SA'], fullText: 'AMIGOS SÃO PRESENTES' },
            { syllables: ['O', 'SOL', 'BRI', 'LHA', 'SE', 'MP', 'RE'], distractors: ['CHU', 'VA', 'VEN', 'TO'], fullText: 'O SOL BRILHA SEMPRE' },
            { syllables: ['VA', 'MOS', 'BRIN', 'CAR', 'JUN', 'TOS'], distractors: ['COR', 'RER', 'PAR', 'TIR'], fullText: 'VAMOS BRINCAR JUNTOS' },
            { syllables: ['SO', 'NHOS', 'PO', 'DEM', 'CRE', 'SCER'], distractors: ['DOR', 'MIR', 'A', 'COR'], fullText: 'SONHOS PODEM CRESCER' },
            { syllables: ['A', 'LU', 'Z', 'VEN', 'CE', 'O', 'ME', 'DO'], distractors: ['ES', 'CU', 'RO', 'NOI'], fullText: 'A LUZ VENCE O MEDO' },
            { syllables: ['VO', 'CÊ', 'É', 'UM', 'GRAN', 'DE', 'HE', 'RÓI'], distractors: ['VI', 'LÃO', 'MA', 'LU'], fullText: 'VOCÊ É UM GRANDE HERÓI' },
            { syllables: ['A', 'PREN', 'DER', 'É', 'DI', 'VER', 'TI', 'DO'], distractors: ['CHA', 'TO', 'RU', 'IM'], fullText: 'APRENDER É DIVERTIDO' },
            { syllables: ['O', 'SA', 'BER', 'NÃO', 'TEM', 'FIM'], distractors: ['ME', 'IO', 'LÁ', 'CÁ'], fullText: 'O SABER NÃO TEM FIM' },
            { syllables: ['A', 'MA', 'GI', 'A', 'ES', 'TÁ', 'NOS', 'LI', 'VROS'], distractors: ['PE', 'DROS', 'CA', 'SAS'], fullText: 'A MAGIA ESTÁ NOS LIVROS' },
            { syllables: ['CA', 'DA', 'PA', 'LA', 'VRA', 'CON', 'TA'], distractors: ['SOM', 'AR', 'LUZ', 'COR'], fullText: 'CADA PALAVRA CONTA' },
            { syllables: ['VO', 'CÊ', 'PO', 'DE', 'VO', 'AR', 'LON', 'GE'], distractors: ['CA', 'IR', 'PER', 'TO'], fullText: 'VOCÊ PODE VOAR LONGE' },
            { syllables: ['A', 'I', 'MA', 'GI', 'NA', 'ÇÃO', 'CRI', 'A'], distractors: ['DES', 'TRÓI', 'PA', 'RA'], fullText: 'A IMAGINAÇÃO CRIA' },
            { syllables: ['SE', 'JA', 'CU', 'RI', 'O', 'SO', 'SEM', 'PRE'], distractors: ['CHA', 'TO', 'NUN', 'CA'], fullText: 'SEJA CURIOSO SEMPRE' },
            { syllables: ['DES', 'CU', 'BRA', 'NO', 'VAS', 'COI', 'SAS'], distractors: ['VE', 'LHAS', 'MES', 'MAS'], fullText: 'DESCUBRA NOVAS COISAS' },
            { syllables: ['O', 'FU', 'TU', 'RO', 'É', 'BRI', 'LHAN', 'TE'], distractors: ['ES', 'CU', 'RO', 'FEI'], fullText: 'O FUTURO É BRILHANTE' },
            { syllables: ['VO', 'CÊ', 'FAZ', 'A', 'DI', 'FE', 'REN', 'ÇA'], distractors: ['I', 'GUAL', 'MES', 'MO'], fullText: 'VOCÊ FAZ A DIFERENÇA' },
            { syllables: ['A', 'ME', 'A', 'NA', 'TU', 'RE', 'ZA'], distractors: ['O', 'DEI', 'E', 'QUEI'], fullText: 'AME A NATUREZA' },
            { syllables: ['CUI', 'DE', 'DOS', 'A', 'NI', 'MAIS'], distractors: ['MA', 'TE', 'FU', 'JA'], fullText: 'CUIDE DOS ANIMAIS' },
            { syllables: ['RES', 'PEI', 'TE', 'AS', 'PES', 'SO', 'AS'], distractors: ['BRI', 'GUE', 'XIN', 'GUE'], fullText: 'RESPEITE AS PESSOAS' },
            { syllables: ['SE', 'JA', 'GEN', 'TIL', 'COM', 'TO', 'DOS'], distractors: ['MAU', 'RU', 'DE', 'CHATO'], fullText: 'SEJA GENTIL COM TODOS' },
            { syllables: ['A', 'JU', 'DE', 'QUEM', 'PRE', 'CI', 'SA'], distractors: ['COR', 'RA', 'SAI', 'A'], fullText: 'AJUDE QUEM PRECISA' },
            { syllables: ['DI', 'GA', 'SEM', 'PRE', 'A', 'VER', 'DA', 'DE'], distractors: ['MEN', 'TI', 'RA', 'FAL'], fullText: 'DIGA SEMPRE A VERDADE' },
            { syllables: ['FA', 'ÇA', 'O', 'SEU', 'ME', 'LHOR'], distractors: ['PI', 'OR', 'NA', 'DA'], fullText: 'FAÇA O SEU MELHOR' },
            { syllables: ['NUN', 'CA', 'DE', 'SIS', 'TA', 'DOS', 'SO', 'NHOS'], distractors: ['PA', 'RE', 'FU', 'JA'], fullText: 'NUNCA DESISTA DOS SONHOS' },
            { syllables: ['A', 'CRE', 'DI', 'TE', 'EM', 'VO', 'CÊ'], distractors: ['DU', 'VI', 'DE', 'NÃO'], fullText: 'ACREDITE EM VOCÊ' },
            { syllables: ['O', 'A', 'MOR', 'É', 'IM', 'POR', 'TAN', 'TE'], distractors: ['Ó', 'DIO', 'RU', 'IM'], fullText: 'O AMOR É IMPORTANTE' },
            { syllables: ['A', 'PAZ', 'TRAZ', 'FE', 'LI', 'CI', 'DA', 'DE'], distractors: ['GUER', 'RA', 'TRIS', 'TE'], fullText: 'A PAZ TRAZ FELICIDADE' },
            { syllables: ['SOR', 'RIA', 'PA', 'RA', 'A', 'VI', 'DA'], distractors: ['CHO', 'RE', 'TRI', 'STE'], fullText: 'SORRIA PARA A VIDA' },
            { syllables: ['CAN', 'TE', 'E', 'DAN', 'CE', 'MUI', 'TO'], distractors: ['PA', 'RE', 'FI', 'QUE'], fullText: 'CANTE E DANCE MUITO' },
            { syllables: ['BRIN', 'QUE', 'COM', 'SEUS', 'A', 'MI', 'GOS'], distractors: ['BRI', 'GUE', 'SO', 'ZINHO'], fullText: 'BRINQUE COM SEUS AMIGOS' },
            { syllables: ['ES', 'TU', 'DE', 'PA', 'RA', 'CRES', 'CER'], distractors: ['DOR', 'MA', 'PA', 'RE'], fullText: 'ESTUDE PARA CRESCER' },
            { syllables: ['LE', 'IA', 'TO', 'DOS', 'OS', 'DI', 'AS'], distractors: ['NUN', 'CA', 'JA', 'MAIS'], fullText: 'LEIA TODOS OS DIAS' },
            { syllables: ['ES', 'CRE', 'VA', 'SU', 'AS', 'I', 'DEI', 'AS'], distractors: ['ES', 'CON', 'DA', 'GUA'], fullText: 'ESCREVA SUAS IDEIAS' },
            { syllables: ['DE', 'SE', 'NHE', 'O', 'SEU', 'MUN', 'DO'], distractors: ['RA', 'BIS', 'QUE', 'SU'], fullText: 'DESENHE O SEU MUNDO' },
            { syllables: ['PIN', 'TE', 'COM', 'CO', 'RES', 'VI', 'VAS'], distractors: ['PRE', 'TO', 'CIN', 'ZA'], fullText: 'PINTE COM CORES VIVAS' },
            { syllables: ['OU', 'ÇA', 'BO', 'AS', 'HIS', 'TÓ', 'RI', 'AS'], distractors: ['RU', 'INS', 'FE', 'IAS'], fullText: 'OUÇA BOAS HISTÓRIAS' },
            { syllables: ['CON', 'TE', 'O', 'QUE', 'A', 'PREN', 'DEU'], distractors: ['ES', 'CON', 'DA', 'GUA'], fullText: 'CONTE O QUE APRENDEU' },
            { syllables: ['SE', 'JA', 'UM', 'BOM', 'LEI', 'TOR'], distractors: ['MAU', 'RU', 'IM', 'CHA'], fullText: 'SEJA UM BOM LEITOR' },
            { syllables: ['A', 'LEI', 'TU', 'RA', 'LI', 'BER', 'TA'], distractors: ['PREN', 'DE', 'FE', 'CHA'], fullText: 'A LEITURA LIBERTA' },
            { syllables: ['O', 'SA', 'BER', 'É', 'PO', 'DER'], distractors: ['FRA', 'CO', 'RU', 'IM'], fullText: 'O SABER É PODER' },
            { syllables: ['VO', 'CÊ', 'É', 'ES', 'PE', 'CI', 'AL'], distractors: ['CO', 'MUM', 'CHA', 'TO'], fullText: 'VOCÊ É ESPECIAL' },
            { syllables: ['O', 'MUN', 'DO', 'PRE', 'CI', 'SA', 'DE', 'TI'], distractors: ['NÃO', 'SAI', 'VA', 'I'], fullText: 'O MUNDO PRECISA DE TI' },
            { syllables: ['BRI', 'LHE', 'CO', 'MO', 'U', 'MA', 'ES', 'TRE', 'LA'], distractors: ['A', 'PA', 'GUE', 'SE'], fullText: 'BRILHE COMO UMA ESTRELA' },
            { syllables: ['VO', 'CÊ', 'CON', 'SE', 'GUE', 'TU', 'DO'], distractors: ['NA', 'DA', 'IM', 'POS'], fullText: 'VOCÊ CONSEGUE TUDO' },
            { syllables: ['PAR', 'A', 'BÉNS', 'PE', 'LA', 'CON', 'QUIS', 'TA'], distractors: ['PER', 'DA', 'ER', 'RO'], fullText: 'PARABÉNS PELA CONQUISTA' },
            { syllables: ['A', 'AVEN', 'TU', 'RA', 'CON', 'TI', 'NU', 'A'], distractors: ['A', 'CA', 'BA', 'FIM'], fullText: 'A AVENTURA CONTINUA' }
        ]
    }
];

export const FALLBACK_DELIVERY: DeliveryChallenge[] = [
    {
        id: 'del1',
        items: [
            { id: 'PUMPKIN', emoji: '🎃', label: 'ABÓBORA' },
            { id: 'BUCKET', emoji: '🪣', label: 'BALDE' },
            { id: 'CAKE', emoji: '🎂', label: 'BOLO' }
        ],
        instructionSyllables: ['DE', 'O', 'BO', 'LO', 'PA', 'RA', 'A', 'CRI', 'AN', 'ÇA'],
        targetCharacter: 'A CRIANÇA',
        correctItemId: 'CAKE'
    },
    {
        id: 'del2',
        items: [
            { id: 'PUMPKIN', emoji: '🎃', label: 'ABÓBORA' },
            { id: 'BUCKET', emoji: '🪣', label: 'BALDE' },
            { id: 'CAKE', emoji: '🎂', label: 'BOLO' }
        ],
        instructionSyllables: ['LE', 'VE', 'O', 'BAL', 'DE', 'PA', 'RA', 'O', 'LO', 'BO'],
        targetCharacter: 'O LOBO',
        correctItemId: 'BUCKET'
    },
    {
        id: 'del3',
        items: [
            { id: 'PUMPKIN', emoji: '🎃', label: 'ABÓBORA' },
            { id: 'BUCKET', emoji: '🪣', label: 'BALDE' },
            { id: 'CAKE', emoji: '🎂', label: 'BOLO' }
        ],
        instructionSyllables: ['PE', 'GUE', 'A', 'A', 'BÓ', 'BO', 'RA'],
        targetCharacter: 'A MESA',
        correctItemId: 'PUMPKIN'
    }
];

export const FALLBACK_WORD_SEARCH: WordSearchChallenge[] = [
    {
        id: 'ws1',
        gridSize: 6,
        targetWord: 'MAGIA',
        syllables: ['MA', 'GI', 'A'],
        grid: [
            ['X', 'M', 'A', 'G', 'I', 'A'],
            ['B', 'O', 'L', 'A', 'S', 'X'],
            ['C', 'A', 'S', 'A', 'M', 'P'],
            ['P', 'A', 'T', 'O', 'J', 'K'],
            ['L', 'U', 'A', 'R', 'T', 'Z'],
            ['S', 'O', 'L', 'V', 'B', 'N']
        ],
        foundCoordinates: [{r:0,c:1}, {r:0,c:2}, {r:0,c:3}, {r:0,c:4}, {r:0,c:5}]
    },
    {
        id: 'ws2',
        gridSize: 6,
        targetWord: 'LIVRO',
        syllables: ['LI', 'VRO'],
        grid: [
            ['Z', 'X', 'C', 'V', 'B', 'N'],
            ['L', 'I', 'V', 'R', 'O', 'M'],
            ['A', 'S', 'D', 'F', 'G', 'H'],
            ['Q', 'W', 'E', 'R', 'T', 'Y'],
            ['U', 'I', 'O', 'P', 'J', 'K'],
            ['L', 'A', 'P', 'I', 'S', 'L']
        ],
        foundCoordinates: [{r:1,c:0}, {r:1,c:1}, {r:1,c:2}, {r:1,c:3}, {r:1,c:4}]
    }
];

export const FALLBACK_MEMORY: MemoryChallenge[] = [
  {
    id: 'mem_1',
    pairs: [
      { id: 'pair_1', content: 'A', type: 'TEXT' },
      { id: 'pair_1', content: '✈️', type: 'IMAGE' },
      { id: 'pair_2', content: 'E', type: 'TEXT' },
      { id: 'pair_2', content: '🐘', type: 'IMAGE' },
      { id: 'pair_3', content: 'I', type: 'TEXT' },
      { id: 'pair_3', content: '🏝️', type: 'IMAGE' },
      { id: 'pair_4', content: 'O', type: 'TEXT' },
      { id: 'pair_4', content: '🥚', type: 'IMAGE' },
      { id: 'pair_5', content: 'U', type: 'TEXT' },
      { id: 'pair_5', content: '🍇', type: 'IMAGE' },
      { id: 'pair_6', content: 'B', type: 'TEXT' },
      { id: 'pair_6', content: '⚽', type: 'IMAGE' }
    ]
  }
];