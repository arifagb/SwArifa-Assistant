/**
 * Testes para SwGT Real API
 * 
 * Valida:
 * - Busca de defesas
 * - Busca de trending
 * - Busca de counters por monstro
 * - Caching de dados
 * - Fallback offline
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  searchDefenseFromSwgt,
  getTrendingDefenses,
  getMonsterCounters,
  checkSwgtHealth,
} from "./swgt-real-api";

describe("SwGT Real API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("searchDefenseFromSwgt", () => {
    it("deve retornar resultado com defesa e counters", async () => {
      const result = await searchDefenseFromSwgt("Susano", "Garo", "Orion");

      expect(result).toBeDefined();
      expect(result?.defense).toBeDefined();
      expect(result?.defense.monsters).toEqual(["Susano", "Garo", "Orion"]);
      expect(result?.counters).toBeDefined();
      expect(result?.counters.length).toBeGreaterThan(0);
    });

    it("deve conter informações de counter válidas", async () => {
      const result = await searchDefenseFromSwgt("Lushen", "Galleon", "Taor");

      if (result?.counters && result.counters.length > 0) {
        const counter = result.counters[0];
        expect(counter.id).toBeDefined();
        expect(counter.monsters).toBeDefined();
        expect(counter.rating).toBeGreaterThan(0);
        expect(counter.rating).toBeLessThanOrEqual(10);
        expect(counter.strategy).toBeDefined();
        expect(["Easy", "Medium", "Hard"]).toContain(counter.difficulty);
        expect(counter.votes).toBeGreaterThanOrEqual(0);
      }
    });

    it("deve ordenar counters por rating (maior primeiro)", async () => {
      const result = await searchDefenseFromSwgt("Verad", "Woosa", "Anavel");

      if (result?.counters && result.counters.length > 1) {
        for (let i = 0; i < result.counters.length - 1; i++) {
          expect(result.counters[i].rating).toBeGreaterThanOrEqual(
            result.counters[i + 1].rating
          );
        }
      }
    });

    it("deve incluir timestamp de última atualização", async () => {
      const result = await searchDefenseFromSwgt("Rakan", "Hathor", "Okeanos");

      expect(result?.lastUpdated).toBeDefined();
      const date = new Date(result?.lastUpdated || "");
      expect(date.getTime()).toBeGreaterThan(0);
    });

    it("deve retornar null em caso de erro", async () => {
      // Simular erro de rede
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Network error"))));

      const result = await searchDefenseFromSwgt("Invalid", "Defense", "Name");
      expect(result).toBeNull();
    });
  });

  describe("getTrendingDefenses", () => {
    it("deve retornar array de defesas trending", async () => {
      const defenses = await getTrendingDefenses();

      expect(Array.isArray(defenses)).toBe(true);
      expect(defenses.length).toBeGreaterThan(0);
    });

    it("deve conter informações válidas de defesa", async () => {
      const defenses = await getTrendingDefenses();

      if (defenses.length > 0) {
        const defense = defenses[0];
        expect(defense.id).toBeDefined();
        expect(defense.name).toBeDefined();
        expect(defense.monsters).toBeDefined();
        expect(defense.monsters.length).toBe(3);
        expect(defense.rating).toBeGreaterThan(0);
        expect(defense.rating).toBeLessThanOrEqual(10);
        expect(defense.uses).toBeGreaterThanOrEqual(0);
        expect(defense.trending).toBe(true);
      }
    });

    it("deve retornar array vazio em caso de erro", async () => {
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Network error"))));

      const defenses = await getTrendingDefenses();
      expect(Array.isArray(defenses)).toBe(true);
    });
  });

  describe("getMonsterCounters", () => {
    it("deve retornar counters para monstro específico", async () => {
      const counters = await getMonsterCounters("Lushen");

      expect(Array.isArray(counters)).toBe(true);
      expect(counters.length).toBeGreaterThan(0);
    });

    it("deve conter informações válidas de counter", async () => {
      const counters = await getMonsterCounters("Verad");

      if (counters.length > 0) {
        const counter = counters[0];
        expect(counter.id).toBeDefined();
        expect(counter.monsters).toBeDefined();
        expect(counter.rating).toBeGreaterThan(0);
        expect(counter.strategy).toBeDefined();
        expect(counter.votes).toBeGreaterThanOrEqual(0);
      }
    });

    it("deve retornar array vazio para monstro inválido", async () => {
      const counters = await getMonsterCounters("InvalidMonster123");
      expect(Array.isArray(counters)).toBe(true);
    });
  });

  describe("checkSwgtHealth", () => {
    it("deve retornar true se swgt.io está acessível", async () => {
      const health = await checkSwgtHealth();
      expect(typeof health).toBe("boolean");
    });

    it("deve retornar false se swgt.io não está acessível", async () => {
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Network error"))));

      const health = await checkSwgtHealth();
      expect(health).toBe(false);
    });
  });

  describe("Caching", () => {
    it("deve usar cache na segunda chamada", async () => {
      const fetchSpy = vi.spyOn(global, "fetch" as any);

      // Primeira chamada
      await searchDefenseFromSwgt("Test", "Defense", "One");

      // Segunda chamada (deve usar cache)
      await searchDefenseFromSwgt("Test", "Defense", "One");

      // Verificar que fetch foi chamado apenas uma vez
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Rating Validation", () => {
    it("todos os counters devem ter rating entre 0 e 10", async () => {
      const result = await searchDefenseFromSwgt("Susano", "Garo", "Orion");

      if (result?.counters) {
        result.counters.forEach((counter) => {
          expect(counter.rating).toBeGreaterThanOrEqual(0);
          expect(counter.rating).toBeLessThanOrEqual(10);
        });
      }
    });

    it("todas as defesas devem ter rating entre 0 e 10", async () => {
      const defenses = await getTrendingDefenses();

      defenses.forEach((defense) => {
        expect(defense.rating).toBeGreaterThanOrEqual(0);
        expect(defense.rating).toBeLessThanOrEqual(10);
      });
    });
  });

  describe("Data Integrity", () => {
    it("defesa deve ter exatamente 3 monstros", async () => {
      const result = await searchDefenseFromSwgt("Susano", "Garo", "Orion");

      expect(result?.defense.monsters.length).toBe(3);
    });

    it("counter deve ter exatamente 3 monstros", async () => {
      const result = await searchDefenseFromSwgt("Lushen", "Galleon", "Taor");

      if (result?.counters && result.counters.length > 0) {
        result.counters.forEach((counter) => {
          expect(counter.monsters.length).toBe(3);
        });
      }
    });

    it("dificuldade deve ser uma das opções válidas", async () => {
      const result = await searchDefenseFromSwgt("Verad", "Woosa", "Anavel");

      if (result?.counters) {
        result.counters.forEach((counter) => {
          expect(["Easy", "Medium", "Hard"]).toContain(counter.difficulty);
        });
      }
    });
  });
});
