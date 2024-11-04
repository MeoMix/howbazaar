import { describe, it, expect } from 'vitest';
import { parseJson } from './cardsJsonParser';
import billDozerJson from '../test/json/billDozer';
import amberJson from '../test/json/amber';

describe('cardJsonParser', () => {
  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const parsedOutput = parseJson(billDozerJson);

    const searchPhrase = "Your other Friends' cooldowns are reduced by";

    const expectedTooltips = {
      Diamond: `${searchPhrase} 40%.`,
      Gold: `${searchPhrase} 30%.`,
      Silver: `${searchPhrase} 20%.`,
    };

    // Extract the actual tooltips for each tier using the searchPhrase
    const actualTooltips = {
      // TODO: Need to fix capitalization discrepancies
      Diamond: parsedOutput[0].tiers.Diamond.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Gold: parsedOutput[0].tiers.Gold.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Silver: parsedOutput[0].tiers.Silver.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
    };

    // Check if the extracted texts match the expected values
    expect(actualTooltips).toEqual(expectedTooltips);
  });

  it('should parse "Amber" correctly by replacing its {aura.1} with a correct value', () => {
    const parsedOutput = parseJson(amberJson);

    const searchPhrase = "Your other Slow items have";

    expect(parsedOutput[0].tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Slow.`);
  });
});