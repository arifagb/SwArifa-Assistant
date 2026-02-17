import AsyncStorage from "@react-native-async-storage/async-storage";

const SWGT_API_BASE = "https://swgt.io";
const CACHE_KEY_PREFIX = "swgt_cache_";
const CACHE_EXPIRY_HOURS = 24;

export interface SwgtDefense {
  id: string;
  monsters: [string, string, string];
  leaderSkill: {
    description: string;
    bonus: string;
  };
  strengths: string[];
  weaknesses: string[];
  notes: string[];
  counters: SwgtCounter[];
}

export interface SwgtCounter {
  id: string;
  monsters: [string, string, string];
  rating: number;
  votes: number;
  author: string;
  date: string;
  strategy: string;
  buildNotes?: string;
  leaderSkill: {
    description: string;
    bonus: string;
  };
}

export interface SwgtMonster {
  id: string;
  name: string;
  element: "water" | "fire" | "wind" | "light" | "dark";
  icon?: string;
}

/**
 * Fetch defenses from swgt.io API
 * Falls back to cache if network request fails
 */
export async function searchDefensesFromSwgt(
  monsterNames: string[]
): Promise<SwgtDefense[]> {
  try {
    // Construct search query
    const query = monsterNames.join("+");
    const url = `${SWGT_API_BASE}/api/search?q=${encodeURIComponent(query)}`;

    // Check cache first
    const cached = await getCachedData(`defenses_${query}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefense[];
    }

    // Fetch from API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as { defenses?: SwgtDefense[] };
    const defenses = data.defenses || [];

    // Cache the results
    await cacheData(`defenses_${query}`, defenses);

    return defenses;
  } catch (error) {
    console.error("Error fetching defenses from swgt.io:", error);

    // Try to return cached data as fallback
    const cached = await getCachedData(`defenses_${monsterNames.join("_")}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefense[];
    }

    return [];
  }
}

/**
 * Search monsters from swgt.io database
 */
export async function searchMonstersFromSwgt(query: string): Promise<SwgtMonster[]> {
  try {
    const url = `${SWGT_API_BASE}/api/monsters?q=${encodeURIComponent(query)}`;

    // Check cache first
    const cached = await getCachedData(`monsters_${query}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtMonster[];
    }

    // Fetch from API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as { monsters?: SwgtMonster[] };
    const monsters = data.monsters || [];

    // Cache the results
    await cacheData(`monsters_${query}`, monsters);

    return monsters;
  } catch (error) {
    console.error("Error fetching monsters from swgt.io:", error);

    // Try to return cached data as fallback
    const cached = await getCachedData(`monsters_${query}`);
    if (cached && Array.isArray(cached)) {
      return cached as SwgtMonster[];
    }

    return [];
  }
}

/**
 * Get all trending defenses from swgt.io
 */
export async function getTrendingDefenses(): Promise<SwgtDefense[]> {
  try {
    const url = `${SWGT_API_BASE}/api/trending`;

    // Check cache first
    const cached = await getCachedData("trending_defenses");
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefense[];
    }

    // Fetch from API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as { defenses?: SwgtDefense[] };
    const defenses = data.defenses || [];

    // Cache the results
    await cacheData("trending_defenses", defenses);

    return defenses;
  } catch (error) {
    console.error("Error fetching trending defenses from swgt.io:", error);

    // Try to return cached data as fallback
    const cached = await getCachedData("trending_defenses");
    if (cached && Array.isArray(cached)) {
      return cached as SwgtDefense[];
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
    console.error("Error caching data:", error);
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
    console.error("Error retrieving cached data:", error);
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
    console.error("Error clearing cache:", error);
  }
}

/**
 * Sync data from swgt.io periodically
 */
export async function syncSwgtData(): Promise<void> {
  try {
    // Fetch trending defenses to keep cache fresh
    await getTrendingDefenses();
  } catch (error) {
    console.error("Error syncing swgt.io data:", error);
  }
}
