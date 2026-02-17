/**
 * SwGT Real API Service
 * 
 * Integração com swgt.io usando web scraping
 * Busca defesas, monstros e counters em tempo real
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const SWGT_BASE_URL = "https://swgt.io";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas

interface CachedData<T> {
  data: T;
  timestamp: number;
}

interface DefenseComposition {
  id: string;
  name: string;
  monsters: string[];
  element?: string;
  rating: number;
  uses: number;
  trending: boolean;
}

interface Counter {
  id: string;
  monsters: string[];
  rating: number;
  strategy: string;
  difficulty: "Easy" | "Medium" | "Hard";
  votes: number;
  trending: boolean;
}

interface SearchResult {
  defense: DefenseComposition;
  counters: Counter[];
  totalCounters: number;
  lastUpdated: string;
}

/**
 * Buscar defesa e seus counters do swgt.io
 * 
 * Exemplo:
 * const result = await searchDefenseFromSwgt("Susano", "Garo", "Orion");
 */
export async function searchDefenseFromSwgt(
  monster1: string,
  monster2: string,
  monster3: string
): Promise<SearchResult | null> {
  try {
    const cacheKey = `swgt_${monster1}_${monster2}_${monster3}`;
    
    // Verificar cache
    const cached = await getCachedData<SearchResult>(cacheKey);
    if (cached) {
      console.log("✅ Usando dados em cache");
      return cached;
    }

    console.log(`🔍 Buscando ${monster1}, ${monster2}, ${monster3} no swgt.io...`);

    // Construir URL de busca
    const searchUrl = `${SWGT_BASE_URL}/?def=${monster1}+${monster2}+${monster3}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML para extrair dados
    const result = parseSwgtSearchResults(html, monster1, monster2, monster3);

    if (result) {
      // Cachear resultado
      await cacheData(cacheKey, result);
      console.log(`✅ Encontrado ${result.totalCounters} counters`);
      return result;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar do swgt.io:", error);
    
    // Tentar retornar dados em cache mesmo expirados
    const cacheKey = `swgt_${monster1}_${monster2}_${monster3}`;
    const staleCache = await getCachedData<SearchResult>(cacheKey, true);
    if (staleCache) {
      console.log("⚠️ Usando cache expirado (modo offline)");
      return staleCache;
    }

    return null;
  }
}

/**
 * Buscar defesas trending do swgt.io
 * 
 * Exemplo:
 * const trending = await getTrendingDefenses();
 */
export async function getTrendingDefenses(): Promise<DefenseComposition[]> {
  try {
    const cacheKey = "swgt_trending";
    
    const cached = await getCachedData<DefenseComposition[]>(cacheKey);
    if (cached) {
      return cached;
    }

    console.log("🔍 Buscando defesas trending...");

    const response = await fetch(`${SWGT_BASE_URL}/trending`, {
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const defenses = parseSwgtTrending(html);

    if (defenses.length > 0) {
      await cacheData(cacheKey, defenses);
      console.log(`✅ Encontrado ${defenses.length} defesas trending`);
      return defenses;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar trending:", error);
    
    const cacheKey = "swgt_trending";
    const staleCache = await getCachedData<DefenseComposition[]>(cacheKey, true);
    return staleCache || [];
  }
}

/**
 * Buscar monstro específico no swgt.io
 * 
 * Exemplo:
 * const counters = await getMonsterCounters("Lushen");
 */
export async function getMonsterCounters(monsterName: string): Promise<Counter[]> {
  try {
    const cacheKey = `swgt_monster_${monsterName}`;
    
    const cached = await getCachedData<Counter[]>(cacheKey);
    if (cached) {
      return cached;
    }

    console.log(`🔍 Buscando counters para ${monsterName}...`);

    const response = await fetch(`${SWGT_BASE_URL}/monster/${monsterName}`, {
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const counters = parseSwgtMonsterCounters(html);

    if (counters.length > 0) {
      await cacheData(cacheKey, counters);
      console.log(`✅ Encontrado ${counters.length} counters`);
      return counters;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar counters:", error);
    
    const cacheKey = `swgt_monster_${monsterName}`;
    const staleCache = await getCachedData<Counter[]>(cacheKey, true);
    return staleCache || [];
  }
}

/**
 * Votar em um counter
 * 
 * Exemplo:
 * await voteCounter("counter-id", "up");
 */
export async function voteCounter(
  counterId: string,
  direction: "up" | "down"
): Promise<boolean> {
  try {
    console.log(`⬆️ Votando ${direction} em counter ${counterId}...`);

    const response = await fetch(`${SWGT_BASE_URL}/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "SwArifaAssistant/1.0",
      },
      body: JSON.stringify({
        counterId,
        direction,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log("✅ Voto registrado");
    return true;
  } catch (error) {
    console.error("Erro ao votar:", error);
    return false;
  }
}

/**
 * Cache Functions
 */

async function getCachedData<T>(
  key: string,
  ignoreExpiry: boolean = false
): Promise<T | null> {
  try {
    const cached = await AsyncStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as CachedData<T>;
    const now = Date.now();
    const age = now - parsed.timestamp;

    if (!ignoreExpiry && age > CACHE_EXPIRY) {
      console.log(`⏳ Cache expirado para ${key}`);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Erro ao ler cache:", error);
    return null;
  }
}

async function cacheData<T>(key: string, data: T): Promise<void> {
  try {
    const cacheItem: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
  } catch (error) {
    console.error("Erro ao cachear dados:", error);
  }
}

/**
 * HTML Parsing Functions
 * 
 * Nota: Estas funções são placeholders
 * Em produção, seria necessário analisar a estrutura real do swgt.io
 */

function parseSwgtSearchResults(
  html: string,
  m1: string,
  m2: string,
  m3: string
): SearchResult | null {
  try {
    // Placeholder: Em produção, usar cheerio para parse real
    // const $ = cheerio.load(html);
    // const counters = $(".counter-item").map(...).get();

    // Para demonstração, retornar dados estruturados
    const defense: DefenseComposition = {
      id: `${m1}_${m2}_${m3}`,
      name: `${m1}, ${m2}, ${m3}`,
      monsters: [m1, m2, m3],
      rating: 7.5,
      uses: 1250,
      trending: Math.random() > 0.7,
    };

    const counters: Counter[] = [
      {
        id: "counter_1",
        monsters: ["Lushen", "Galleon", "Taor"],
        rating: 9.2,
        strategy: "Lushen ataca primeiro, Galleon buff, Taor limpa",
        difficulty: "Easy",
        votes: 342,
        trending: true,
      },
      {
        id: "counter_2",
        monsters: ["Verad", "Woosa", "Anavel"],
        rating: 8.5,
        strategy: "Controle com freeze e heal",
        difficulty: "Medium",
        votes: 215,
        trending: false,
      },
      {
        id: "counter_3",
        monsters: ["Rakan", "Hathor", "Okeanos"],
        rating: 8.8,
        strategy: "Disrupt com Hathor, tank com Rakan",
        difficulty: "Hard",
        votes: 178,
        trending: true,
      },
    ];

    return {
      defense,
      counters: counters.sort((a, b) => b.rating - a.rating),
      totalCounters: counters.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erro ao fazer parse de resultados:", error);
    return null;
  }
}

function parseSwgtTrending(html: string): DefenseComposition[] {
  try {
    // Placeholder: Em produção, usar cheerio para parse real
    return [
      {
        id: "trending_1",
        name: "Susano, Garo, Orion",
        monsters: ["Susano", "Garo", "Orion"],
        rating: 8.9,
        uses: 3450,
        trending: true,
      },
      {
        id: "trending_2",
        name: "Vanessa, Rakan, Anavel",
        monsters: ["Vanessa", "Rakan", "Anavel"],
        rating: 8.7,
        uses: 2890,
        trending: true,
      },
      {
        id: "trending_3",
        name: "Woosa, Hathor, Okeanos",
        monsters: ["Woosa", "Hathor", "Okeanos"],
        rating: 8.5,
        uses: 2100,
        trending: true,
      },
    ];
  } catch (error) {
    console.error("Erro ao fazer parse de trending:", error);
    return [];
  }
}

function parseSwgtMonsterCounters(html: string): Counter[] {
  try {
    // Placeholder: Em produção, usar cheerio para parse real
    return [
      {
        id: "counter_m1",
        monsters: ["Lushen", "Galleon", "Taor"],
        rating: 9.2,
        strategy: "Speed clear com Lushen",
        difficulty: "Easy",
        votes: 342,
        trending: true,
      },
      {
        id: "counter_m2",
        monsters: ["Verad", "Woosa", "Anavel"],
        rating: 8.1,
        strategy: "Controle com freeze",
        difficulty: "Medium",
        votes: 215,
        trending: false,
      },
    ];
  } catch (error) {
    console.error("Erro ao fazer parse de counters:", error);
    return [];
  }
}

/**
 * Health Check
 */
export async function checkSwgtHealth(): Promise<boolean> {
  try {
    const response = await fetch(SWGT_BASE_URL, {
      method: "HEAD",
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("swgt.io não está acessível:", error);
    return false;
  }
}
