import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson } from './monstersJsonParser';
import monstersJson from "./data/latest/v2_Monsters.json" assert { type: "json" };
import type { ParsedMonster } from '$lib/types';
import type { MonstersJson } from './types.parser';

describe('monstersJsonParser', () => {
  let monsters: ParsedMonster[];

  beforeAll(() => {
    monsters = parseJson(monstersJson as MonstersJson);
  });

  it('should contain a Coconut Crab with two Sea Shells', () => {
    const coconutCrab = monsters.find(monster => monster.id === "709e1dce-7e91-4612-b010-d107a6800158")!;

    const seaShells = coconutCrab.items.filter(item => item.templateId === "9ad15f24-4def-4d82-8545-d73794cfbaf2");

    expect(seaShells).toHaveLength(2);
  });
});