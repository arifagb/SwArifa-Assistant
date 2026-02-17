import { describe, it, expect } from "vitest";
import {
  searchMonsters,
  getMonster,
  searchDefenses,
  MONSTERS,
  SAMPLE_DEFENSE,
} from "./mock-data";

describe("Mock Data - Monsters", () => {
  it("should find monsters by name", () => {
    const results = searchMonsters("Susano");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("Susano");
  });

  it("should find monsters by partial name", () => {
    const results = searchMonsters("sus");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((m) => m.name === "Susano")).toBe(true);
  });

  it("should be case-insensitive", () => {
    const results1 = searchMonsters("SUSANO");
    const results2 = searchMonsters("susano");
    expect(results1.length).toBe(results2.length);
  });

  it("should return empty array for non-existent monster", () => {
    const results = searchMonsters("NonExistentMonster");
    expect(results.length).toBe(0);
  });

  it("should get monster by ID", () => {
    const monster = getMonster("susano");
    expect(monster).toBeDefined();
    expect(monster?.name).toBe("Susano");
  });

  it("should return undefined for non-existent monster ID", () => {
    const monster = getMonster("nonexistent");
    expect(monster).toBeUndefined();
  });

  it("should have all required monster properties", () => {
    const monster = getMonster("garo");
    expect(monster).toHaveProperty("id");
    expect(monster).toHaveProperty("name");
    expect(monster).toHaveProperty("element");
    expect(monster).toHaveProperty("icon");
  });
});

describe("Mock Data - Defenses", () => {
  it("should find defense by monster composition", () => {
    const defenses = searchDefenses(["susano", "garo", "orion"]);
    expect(defenses.length).toBeGreaterThan(0);
  });

  it("should return empty array for unknown composition", () => {
    const defenses = searchDefenses(["unknown1", "unknown2", "unknown3"]);
    expect(defenses.length).toBe(0);
  });

  it("sample defense should have all required properties", () => {
    expect(SAMPLE_DEFENSE).toHaveProperty("id");
    expect(SAMPLE_DEFENSE).toHaveProperty("composition");
    expect(SAMPLE_DEFENSE).toHaveProperty("counters");
  });

  it("sample defense composition should have 3 monsters", () => {
    expect(SAMPLE_DEFENSE.composition.monsters.length).toBe(3);
  });

  it("sample defense should have counters", () => {
    expect(SAMPLE_DEFENSE.counters.length).toBeGreaterThan(0);
  });

  it("each counter should have required properties", () => {
    const counter = SAMPLE_DEFENSE.counters[0];
    expect(counter).toHaveProperty("id");
    expect(counter).toHaveProperty("composition");
    expect(counter).toHaveProperty("rating");
    expect(counter).toHaveProperty("votes");
    expect(counter).toHaveProperty("author");
    expect(counter).toHaveProperty("date");
    expect(counter).toHaveProperty("strategy");
  });

  it("counter rating should be between 0 and 5", () => {
    SAMPLE_DEFENSE.counters.forEach((counter) => {
      expect(counter.rating).toBeGreaterThanOrEqual(0);
      expect(counter.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe("Mock Data - Monsters Database", () => {
  it("should have multiple monsters in database", () => {
    expect(Object.keys(MONSTERS).length).toBeGreaterThan(20);
  });

  it("all monsters should have valid elements", () => {
    const validElements = ["water", "fire", "wind", "light", "dark"];
    Object.values(MONSTERS).forEach((monster) => {
      expect(validElements).toContain(monster.element);
    });
  });

  it("all monsters should have icons", () => {
    Object.values(MONSTERS).forEach((monster) => {
      expect(monster.icon).toBeTruthy();
      expect(monster.icon.length).toBeGreaterThan(0);
    });
  });
});
