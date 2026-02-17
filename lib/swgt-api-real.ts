import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";

const SWGT_BASE_URL = "https://swgt.io";
const CACHE_KEY_PREFIX = "swgt_cache_";
const CACHE_EXPIRY_HOURS = 24;

export interface SwgtDefenseReal {
  id: string;
  monsters: [string, string, string];
  rating: number;
  votes: number;
  author: string;
  date: string;
  counters: SwgtCounterReal[];
}

export interface SwgtCounterReal {
  id: string;
  monsters: [string, string, string];
  rating: number;
  votes: number;
  author: string;
  date: string;
  strategy: string;
  buildNotes?: string;
}

/**
 * Buscar defesas do swgt.io usando web scraping
 * Nota: Isso é um exemplo de como estruturar a integração.
 * Para produção, seria ideal ter uma API REST própria do swgt.io
 */
export async function searchDefensesFromSwgtReal(
  monsterNames: string[]
): Promise<SwgtDefenseReal[]> {
  try {
    // Construir URL de busca
    const query = monsterNames.join("+");
    const url = `${SWGT_BASE_URL}/search?q=${encodeURIComponent(query)}`;

    // Verificar cache primeiro
    const cached = await getCachedData(`defenses_${query}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefenseReal[];
    }

    // Fazer requisição
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });

    if (!response.ok) {
      console.error(`Erro ao buscar defesas: ${response.status}`);
      // Retornar cache expirado como fallback
      const expiredCache = await getCachedData(`defenses_${query}`);
      if (expiredCache && Array.isArray(expiredCache)) {
        return expiredCache as SwgtDefenseReal[];
      }
      return [];
    }

    const html = await response.text();

    // Fazer parsing do HTML usando cheerio
    const $ = cheerio.load(html);
    const defenses: SwgtDefenseReal[] = [];

    // Estrutura esperada do swgt.io (ajustar conforme necessário)
    $(".defense-card").each((index: number, element: any) => {
      const $card = $(element);

      const monsterElements = $card.find(".monster-name");
      const monsters = [
        $(monsterElements[0]).text().trim(),
        $(monsterElements[1]).text().trim(),
        $(monsterElements[2]).text().trim(),
      ] as [string, string, string];

      const rating = parseFloat($card.find(".rating").text() || "0");
      const votes = parseInt($card.find(".votes").text() || "0");
      const author = $card.find(".author").text().trim();
      const date = $card.find(".date").text().trim();

      const counters: SwgtCounterReal[] = [];
      $card.find(".counter-item").each((idx: number, counterEl: any) => {
        const $counter = $(counterEl);
        const counterMonsters = [
          $($counter.find(".counter-monster")[0]).text().trim() || "",
          $($counter.find(".counter-monster")[1]).text().trim() || "",
          $($counter.find(".counter-monster")[2]).text().trim() || "",
        ] as [string, string, string];

        counters.push({
          id: `counter_${index}_${idx}`,
          monsters: counterMonsters,
          rating: parseFloat($counter.find(".counter-rating").text() || "0"),
          votes: parseInt($counter.find(".counter-votes").text() || "0"),
          author: $counter.find(".counter-author").text().trim(),
          date: $counter.find(".counter-date").text().trim(),
          strategy: $counter.find(".counter-strategy").text().trim(),
          buildNotes: $counter.find(".counter-notes").text().trim() || undefined,
        });
      });

      defenses.push({
        id: `defense_${index}`,
        monsters,
        rating,
        votes,
        author,
        date,
        counters,
      });
    });

    // Cachear resultados
    await cacheData(`defenses_${query}`, defenses);

    return defenses;
  } catch (error) {
    console.error("Erro ao buscar defesas do swgt.io:", error);

    // Tentar retornar cache como fallback
    const cached = await getCachedData(`defenses_${monsterNames.join("_")}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefenseReal[];
    }

    return [];
  }
}

/**
 * Buscar composições trending do swgt.io
 */
export async function getTrendingDefensesReal(): Promise<SwgtDefenseReal[]> {
  try {
    const url = `${SWGT_BASE_URL}/trending`;

    // Verificar cache
    const cached = await getCachedData("trending_defenses");
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefenseReal[];
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "SwArifaAssistant/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const defenses: SwgtDefenseReal[] = [];

    // Fazer parsing similar ao searchDefensesFromSwgtReal
    $(".trending-defense").each((index: number, element: any) => {
      const $card = $(element);

      const monsterElements = $card.find(".monster-name");
      const monsters = [
        $(monsterElements[0]).text().trim(),
        $(monsterElements[1]).text().trim(),
        $(monsterElements[2]).text().trim(),
      ] as [string, string, string];

      defenses.push({
        id: `trending_${index}`,
        monsters,
        rating: parseFloat($card.find(".rating").text() || "0"),
        votes: parseInt($card.find(".votes").text() || "0"),
        author: $card.find(".author").text().trim(),
        date: $card.find(".date").text().trim(),
        counters: [],
      });
    });

    // Cachear resultados
    await cacheData("trending_defenses", defenses);

    return defenses;
  } catch (error) {
    console.error("Erro ao buscar trending defenses:", error);

    const cached = await getCachedData("trending_defenses");
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefenseReal[];
    }

    return [];
  }
}

/**
 * Cache data locally with expiry
 */
async function cacheData(key: string, data: unknown): Promise<void> {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;
    const expiryTime = Date.now() + CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

    const cacheObject = {
      data,
      expiryTime,
    };

    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheObject));
  } catch (error) {
    console.error("Erro ao cachear dados:", error);
  }
}

/**
 * Get cached data if not expired
 */
async function getCachedData(key: string): Promise<unknown | null> {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${key}`;
    const cached = await AsyncStorage.getItem(cacheKey);

    if (!cached) {
      return null;
    }

    const cacheObject = JSON.parse(cached);
    const isExpired = Date.now() > cacheObject.expiryTime;

    if (isExpired) {
      await AsyncStorage.removeItem(cacheKey);
      return null;
    }

    return cacheObject.data;
  } catch (error) {
    console.error("Erro ao recuperar dados em cache:", error);
    return null;
  }
}

/**
 * Clear all cached data
 */
export async function clearCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
    await AsyncStorage.multiRemove(cacheKeys);
  } catch (error) {
    console.error("Erro ao limpar cache:", error);
  }
}
