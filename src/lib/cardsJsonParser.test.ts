import { describe, it, expect } from 'vitest';
import { parseJson } from './cardsJsonParser';
import billDozerJson from '../test/json/billDozer';
import amberJson from '../test/json/amber';
import satchelJson from '../test/json/satchel';
import uwashiwaliBirdJson from '../test/json/uwashiwaliBird';

describe('cardJsonParser', () => {
  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const parsedOutput = parseJson(billDozerJson)[0];

    const searchPhrase = "Your other Friends' cooldowns are reduced by";

    const expectedTooltips = {
      Diamond: `${searchPhrase} 40%.`,
      Gold: `${searchPhrase} 30%.`,
      Silver: `${searchPhrase} 20%.`,
    };

    // Extract the actual tooltips for each tier using the searchPhrase
    const actualTooltips = {
      // TODO: Need to fix capitalization discrepancies
      Diamond: parsedOutput.tiers.Diamond.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Gold: parsedOutput.tiers.Gold.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
      Silver: parsedOutput.tiers.Silver.tooltips.find((text) =>
        text.includes(searchPhrase)
      ),
    };

    // Check if the extracted texts match the expected values
    expect(actualTooltips).toEqual(expectedTooltips);
  });

  it('should parse "Amber" correctly by replacing its {aura.1} with a correct value', () => {
    const parsedOutput = parseJson(amberJson)[0];

    const searchPhrase = "Your other Slow items have";

    // TODO: Should read +1 Slow
    expect(parsedOutput.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1000 Slow.`);
  });

  it('should parse "Satchel" correctly by replacing its {aura.2} with a correct value', () => {
    const parsedOutput = parseJson(satchelJson)[0];

    const searchPhrase = "You have";

    expect(parsedOutput.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 4 Regeneration.`);
  });

  it.only('should parse "Uwashiwali Bird" correctly by replacing its {aura.1} with a correct value', () => {
    const parsedOutput = parseJson(uwashiwaliBirdJson)[0];

    const searchPhrase = "This has";

    // TODO: Would expect this to be [0] rather than [2]
    expect(parsedOutput.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +2 Multicast for each Property you have. [2]`);
  });
});