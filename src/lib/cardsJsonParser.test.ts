import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson } from './cardsJsonParser';
import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import type { CardsJson, ClientSideCard } from './types';

describe('cardJsonParser', () => {
  let cards: ClientSideCard[];

  beforeAll(() => {
    cards = parseJson(cardsJson as CardsJson);
  });

  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const billDozerCard = cards.find(card => card.name === "Bill Dozer")!;

    const searchPhrase = "Your other Friends' cooldowns are reduced by";

    const expectedTooltips = {
      Diamond: `${searchPhrase} 40%.`,
      Gold: `${searchPhrase} 30%.`,
      Silver: `${searchPhrase} 20%.`,
    };

    // Extract the actual tooltips for each tier using the searchPhrase
    const actualTooltips = {
      // TODO: Need to fix capitalization discrepancies
      Diamond: billDozerCard.tiers.Diamond.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Gold: billDozerCard.tiers.Gold.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Silver: billDozerCard.tiers.Silver.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
    };

    // Check if the extracted texts match the expected values
    expect(actualTooltips).toEqual(expectedTooltips);
  });

  it('should parse "Amber" correctly by replacing its {aura.1} with a correct value', () => {
    const amberCard = cards.find(card => card.name === "Amber")!;

    const searchPhrase = "Your other Slow items have";

    expect(amberCard.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Slow.`);
  });

  it('should parse "Satchel" correctly by replacing its {aura.2} with a correct value', () => {
    const satchelCard = cards.find(card => card.name === "Satchel")!;

    const searchPhrase = "You have";

    expect(satchelCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 4 Regeneration.`);
  });

  it('should parse "Uwashiwali Bird" correctly by replacing its {aura.1} with a correct value', () => {
    const uwashiwaliBirdCard = cards.find(card => card.name === "Uwashiwali Bird")!;

    const searchPhrase = "This has";

    // TODO: Would expect this to be [0] rather than [2]
    expect(uwashiwaliBirdCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +2 Multicast for each Property you have. [2]`);
  });

  it('should parse "Healthy Collector" correctly by replacing its {aura.0.mod} with a correct value', () => {
    const healthyCollector = cards.find(card => card.name === "Healthy Collector")!;
    const searchPhrase = "You have +";

    // TODO: would expect this to be [0] rather than [35]
    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}35 Max Health for each Non-Weapon item you have. [35]`);
  });
});