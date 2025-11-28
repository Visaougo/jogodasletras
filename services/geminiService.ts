
import { GoogleGenAI, Type } from "@google/genai";
import { ModuleType } from '../types';
import { 
  FALLBACK_SYLLABLES, 
  FALLBACK_FLUENCY, 
  FALLBACK_COMPREHENSION, 
  FALLBACK_CREEPER, 
  FALLBACK_LETTERS,
  FALLBACK_MINE,
  FALLBACK_FIELD,
  FALLBACK_BLAZE,
  FALLBACK_FILL_BLANK,
  FALLBACK_STORY_CRAFT,
  FALLBACK_REVERSE,
  FALLBACK_MONSTER,
  FALLBACK_FINAL_BOOK,
  FALLBACK_DELIVERY,
  FALLBACK_WORD_SEARCH
} from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Simple in-memory cache
const contentCache: Record<string, any[]> = {};

// Helper to force uppercase on all string fields in the response
const enforceUppercase = (data: any[], type: ModuleType): any[] => {
  return data.map(item => {
    const newItem = { ...item };
    
    // Helper to recursively uppercase
    const upper = (v: any): any => {
        if (typeof v === 'string') return v.toUpperCase();
        if (Array.isArray(v)) return v.map(upper);
        if (typeof v === 'object' && v !== null) {
            const n: any = {};
            for (const k in v) n[k] = upper(v[k]);
            return n;
        }
        return v;
    };

    return upper(newItem);
  });
};

export const generateGameContent = async (moduleType: ModuleType, level: number, difficulty: 'SHORT' | 'MEDIUM' | 'LONG' = 'SHORT'): Promise<any[]> => {
  // If no key or placeholder key, skip straight to fallback
  if (!apiKey || apiKey === 'YOUR_API_KEY') {
    return getFallbackData(moduleType);
  }

  const cacheKey = `${moduleType}_${level}_${difficulty}`;
  if (contentCache[cacheKey]) {
    return contentCache[cacheKey];
  }

  const modelId = "gemini-2.5-flash";
  let prompt = "";
  let responseSchema: any;

  // Science of Reading focused prompts - EXPLICITLY REQUESTING UPPERCASE
  switch (moduleType) {
    case ModuleType.LETTERS:
        prompt = `Generate 5 simple Portuguese words (3-5 letters) for a spelling game. Provide the word and an emoji. OUTPUT UPPERCASE. Format: JSON.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    word: { type: Type.STRING },
                    emoji: { type: Type.STRING }
                },
                required: ["id", "word", "emoji"]
            }
        };
        break;

    case ModuleType.SYLLABLES:
      prompt = `Generate 5 Portuguese words suitable for children learning to read. Break them into syllables. Provide correct syllables and 2-3 distractor syllables that sound similar but are incorrect. Include an emoji for the word. OUTPUT EVERYTHING IN UPPERCASE. Format: JSON.`;
      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            word: { type: Type.STRING },
            emoji: { type: Type.STRING },
            syllables: { type: Type.ARRAY, items: { type: Type.STRING } },
            distractors: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "word", "emoji", "syllables", "distractors"]
        }
      };
      break;

    case ModuleType.FLUENCY:
      prompt = `Generate 5 simple Portuguese sentences for reading fluency practice. Break each sentence into 2-4 natural prosodic chunks (phrasing). OUTPUT EVERYTHING IN UPPERCASE. Format: JSON.`;
      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            fullText: { type: Type.STRING },
            chunks: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "fullText", "chunks"]
        }
      };
      break;

    case ModuleType.COMPREHENSION:
      prompt = `Generate 5 short riddles or simple instructions in Portuguese for a child. E.g., "I provide wool." -> Sheep. Provide 3 options (one correct) represented by an emoji and a label. OUTPUT EVERYTHING IN UPPERCASE. Format: JSON.`;
      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            sentence: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  emoji: { type: Type.STRING },
                  label: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN }
                },
                required: ["emoji", "label", "isCorrect"]
              }
            }
          },
          required: ["id", "sentence", "options"]
        }
      };
      break;

    case ModuleType.CREEPER:
      prompt = `Generate 10 simple Portuguese nouns (animals, nature, objects) for rapid reading. Provide the word and 3 emoji options (1 correct). OUTPUT EVERYTHING IN UPPERCASE. Format: JSON.`;
      responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            word: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  emoji: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN }
                },
                required: ["emoji", "isCorrect"]
              }
            }
          },
          required: ["id", "word", "options"]
        }
      };
      break;
    
    case ModuleType.MINE:
        prompt = `Generate 5 Portuguese words (2-3 syllables) for a syllable construction game. Provide correct syllables in order and distractors. Emoji included. OUTPUT UPPERCASE. Format: JSON.`;
        responseSchema = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              word: { type: Type.STRING },
              emoji: { type: Type.STRING },
              correctSyllables: { type: Type.ARRAY, items: { type: Type.STRING } },
              distractors: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "word", "emoji", "correctSyllables", "distractors"]
          }
        };
        break;
    
    case ModuleType.FIELD:
        prompt = `Generate 5 letter recognition tasks for kids. Instruction (e.g., "FIND THE LETTER A" or "STARTS WITH B"). Target letter and mixed options. OUTPUT UPPERCASE. Format: JSON.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    instruction: { type: Type.STRING },
                    target: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["id", "instruction", "target", "options"]
            }
        };
        break;

    case ModuleType.BLAZE:
        prompt = `Generate 3 "Blaze Escape" challenges. The instruction must describe a path to avoid the Blaze. E.g., "THE BLAZE IS ON THE BRIDGE. ESCAPE VIA THE CAVE." Options: Bridge (wrong), Cave (correct), Forest (wrong). Portuguese Uppercase.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    instruction: { type: Type.STRING },
                    options: {
                        type: Type.ARRAY,
                        items: {
                             type: Type.OBJECT,
                             properties: {
                                 label: { type: Type.STRING },
                                 emoji: { type: Type.STRING },
                                 isCorrect: { type: Type.BOOLEAN }
                             },
                             required: ["label", "emoji", "isCorrect"]
                        }
                    }
                },
                required: ["id", "instruction", "options"]
            }
        };
        break;

    case ModuleType.FILL_BLANK:
        prompt = `Generate 5 fill-in-the-blank sentences in Portuguese. "O [blank] PULA." -> SAPO. Provide parts, correct word, and distractor words. Uppercase.`;
        responseSchema = {
             type: Type.ARRAY,
             items: {
                 type: Type.OBJECT,
                 properties: {
                     id: { type: Type.STRING },
                     sentencePart1: { type: Type.STRING },
                     sentencePart2: { type: Type.STRING },
                     correctWord: { type: Type.STRING },
                     options: { type: Type.ARRAY, items: { type: Type.STRING } },
                     fullSentence: { type: Type.STRING }
                 },
                 required: ["id", "sentencePart1", "sentencePart2", "correctWord", "options", "fullSentence"]
             }
        };
        break;

    case ModuleType.STORY_CRAFT:
        prompt = `Generate 3 story crafting scenarios. Each has a subject (e.g. PIG), verb (e.g. JUMP), and object (e.g. MUD). Provide combinations that make sense and simple sentences. Uppercase Portuguese.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    elements: { 
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                label: { type: Type.STRING },
                                emoji: { type: Type.STRING },
                                type: { type: Type.STRING, enum: ["SUBJECT", "VERB", "OBJECT"] }
                            }
                        }
                    },
                    validCombinations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                subject: { type: Type.STRING },
                                verb: { type: Type.STRING },
                                object: { type: Type.STRING },
                                resultSentence: { type: Type.STRING },
                                animation: { type: Type.STRING }
                            }
                        }
                    }
                },
                required: ["id", "elements", "validCombinations"]
            }
        };
        break;

    case ModuleType.REVERSE:
        prompt = `Generate 3 sentences with scrambled words. Provide the scrambled array and correct order. Uppercase. E.g., ['BOLA', 'A', 'CAIU'] -> ['A', 'BOLA', 'CAIU'].`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    scrambled: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correct: { type: Type.ARRAY, items: { type: Type.STRING } },
                    fullSentence: { type: Type.STRING }
                },
                required: ["id", "scrambled", "correct", "fullSentence"]
            }
        };
        break;

    case ModuleType.MONSTER:
        prompt = `Generate 5 monster battle questions (Reading/Grammar). E.g. "Read the word: FIRE". Options: FIRE, WATER. Uppercase.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    monsterType: { type: Type.STRING, enum: ["VOWEL", "SYLLABLE", "WORD", "PHRASE"] },
                    instruction: { type: Type.STRING },
                    options: { 
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING },
                                isCorrect: { type: Type.BOOLEAN }
                            }
                        }
                    }
                },
                required: ["id", "monsterType", "instruction", "options"]
            }
        };
        break;

    case ModuleType.FINAL_BOOK:
        prompt = `Generate 10 simple, motivational sentences for kids. Split into syllables. Provide 4-6 distractor syllables for each sentence. All uppercase Portuguese. E.g. "O LO-BO A-JU-DA VO-CÊ".`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    sentences: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                syllables: { type: Type.ARRAY, items: { type: Type.STRING } },
                                distractors: { type: Type.ARRAY, items: { type: Type.STRING } },
                                fullText: { type: Type.STRING }
                            }
                        }
                    }
                },
                required: ["id", "sentences"]
            }
        };
        break;
    
    case ModuleType.DELIVERY:
        prompt = `Generate 3 scenarios where the user must give an item to a target (e.g. Give Cake to Child). Provide 3 item options (1 correct, 2 distractors) with generic IDs (e.g. ITEM_1, ITEM_2). Split instruction into syllables.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    items: {
                         type: Type.ARRAY,
                         items: {
                             type: Type.OBJECT,
                             properties: { id: {type:Type.STRING}, emoji: {type:Type.STRING}, label: {type:Type.STRING} }
                         }
                    },
                    instructionSyllables: { type: Type.ARRAY, items: { type: Type.STRING } },
                    targetCharacter: { type: Type.STRING },
                    correctItemId: { type: Type.STRING }
                },
                required: ["id", "instructionSyllables", "targetCharacter", "correctItemId"]
            }
        };
        break;

    case ModuleType.WORD_SEARCH:
        prompt = `Generate 3 word search grids (6x6). Provide target word and syllables and coordinates. Uppercase Portuguese.`;
        responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    gridSize: { type: Type.NUMBER },
                    targetWord: { type: Type.STRING },
                    syllables: { type: Type.ARRAY, items: { type: Type.STRING } },
                    grid: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                    foundCoordinates: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: { r: {type:Type.NUMBER}, c: {type:Type.NUMBER} }
                        }
                    }
                },
                required: ["id", "gridSize", "targetWord", "grid", "foundCoordinates"]
            }
        };
        break;
        
    default:
      return getFallbackData(moduleType);
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are a teacher for 6-year-old children. Use simple vocabulary. OUTPUT ALL TEXT IN UPPERCASE PORTUGUESE (LETRAS MAIÚSCULAS). Ensure JSON is valid.",
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const text = response.text;
    if (text) {
      let data = JSON.parse(text);
      data = enforceUppercase(data, moduleType);
      
      contentCache[cacheKey] = data;
      return data;
    }
    return getFallbackData(moduleType);
  } catch (error: any) {
    console.error("Gemini API Error (Switching to Fallback):", error);
    return getFallbackData(moduleType);
  }
};

function getFallbackData(type: ModuleType): any[] {
  switch (type) {
    case ModuleType.LETTERS: return FALLBACK_LETTERS;
    case ModuleType.SYLLABLES: return FALLBACK_SYLLABLES;
    case ModuleType.FLUENCY: return FALLBACK_FLUENCY;
    case ModuleType.COMPREHENSION: return FALLBACK_COMPREHENSION;
    case ModuleType.CREEPER: return FALLBACK_CREEPER;
    case ModuleType.MINE: return FALLBACK_MINE;
    case ModuleType.FIELD: return FALLBACK_FIELD;
    case ModuleType.BLAZE: return FALLBACK_BLAZE;
    case ModuleType.FILL_BLANK: return FALLBACK_FILL_BLANK;
    case ModuleType.STORY_CRAFT: return FALLBACK_STORY_CRAFT;
    case ModuleType.REVERSE: return FALLBACK_REVERSE;
    case ModuleType.MONSTER: return FALLBACK_MONSTER;
    case ModuleType.FINAL_BOOK: return FALLBACK_FINAL_BOOK;
    case ModuleType.DELIVERY: return FALLBACK_DELIVERY;
    case ModuleType.WORD_SEARCH: return FALLBACK_WORD_SEARCH;
    default: return [];
  }
}
