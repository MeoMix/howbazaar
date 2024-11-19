import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson } from './cardsJsonParser';
import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import type { CardsJson, ClientSideCardItem, ClientSideCardSkill } from './types';

describe('cardJsonParser', () => {
  let cards: (ClientSideCardItem | ClientSideCardSkill)[];

  beforeAll(() => {
    cards = parseJson(cardsJson as CardsJson).filter(card => card.type !== "CombatEncounter");
  });

  // it.only('checks for cards with an increasing number of tooltips in higher tiers', () => {
  //   const cardsWithExtraTooltips: { cardName: string; tier: string; additionalTooltipsCount: number }[] = [];

  //   cards.forEach(card => {
  //     let previousTooltipCount = 0;

  //     // Loop through each tier in order (assuming tier order is Bronze, Silver, Gold, Diamond)
  //     Object.entries(card.tiers).forEach(([tierName, tier]) => {
  //       const currentTooltipCount = tier.tooltips ? tier.tooltips.length : 0;

  //       // Check if the current tier has more tooltips than the previous tier
  //       if (currentTooltipCount > previousTooltipCount) {
  //         const additionalTooltipsCount = currentTooltipCount - previousTooltipCount;
  //         cardsWithExtraTooltips.push({
  //           cardName: card.name,
  //           tier: tierName,
  //           additionalTooltipsCount,
  //         });
  //       }

  //       // Update the previousTooltipCount to the current tier's count
  //       previousTooltipCount = currentTooltipCount;
  //     });
  //   });

  //   if (cardsWithExtraTooltips.length > 0) {
  //     console.log("Cards with an increasing number of tooltips in higher tiers:", cardsWithExtraTooltips);
  //   } else {
  //     console.log("No cards have an increasing number of tooltips in higher tiers.");
  //   }

  //   // Optionally assert based on your expectations
  //   expect(cardsWithExtraTooltips.length).toBeGreaterThan(0); // Adjust as needed
  // });


  // it.only('checks for cards with changing cooldowns across tiers', () => {
  //   const cardsWithChangingCooldowns: string[] = [];

  //   cards.forEach(card => {
  //     // Extract cooldown values across tiers
  //     const cooldownValues = Object.entries(card.tiers)
  //       .map(([_, tier]) => {
  //         const cooldownAttribute = tier.attributes.find(attribute => attribute.name === "Cooldown");
  //         return cooldownAttribute ? cooldownAttribute.value : null;
  //       })
  //       .filter(value => value !== null);

  //     // Check if any cooldown value is different from others in the array
  //     const hasChangingCooldown = cooldownValues.some((value, index, arr) => value !== arr[0]);

  //     if (hasChangingCooldown) {
  //       cardsWithChangingCooldowns.push(card.name);
  //     }
  //   });

  //   if (cardsWithChangingCooldowns.length > 0) {
  //     console.log("Cards with changing cooldowns:", cardsWithChangingCooldowns);
  //   } else {
  //     console.log("No cards have changing cooldowns across tiers.");
  //   }

  //   expect(cardsWithChangingCooldowns.length).toBeGreaterThan(0); // Adjust expectation as needed
  // });

  // TODO: This might not be a special test case anymore
  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const billDozerCard = cards.find(card => card.name === "Bill Dozer")!;

    const searchPhrase = "Your other Friends' cooldowns are reduced by";

    const expectedTooltips = {
      Diamond: `${searchPhrase} 30%.`,
      Gold: `${searchPhrase} 20%.`,
      Silver: `${searchPhrase} 10%.`,
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

    expect(uwashiwaliBirdCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Multicast for each Property you have. [0]`);
  });

  it('should parse "Healthy Collector" correctly by replacing its {aura.0.mod} with a correct value', () => {
    const healthyCollector = cards.find(card => card.name === "Healthy Collector")!;
    const searchPhrase = "You have +";

    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}35 Max Health for each Non-Weapon item you have. [0]`);
  });

  it('should parse "Memory Card" correctly by replacing its {ability.1} with a correct value', () => {
    const healthyCollector = cards.find(card => card.name === "Memory Card")!;
    const searchPhrase = "When you sell this, give The Core + Damage equal to this item's value.";

    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 1`);
  });

  it('should parse "Crook" correctly by replacing its {aura.4} with a correct value (by relying on modifiers)', () => {
    const crook = cards.find(card => card.name === "Crook")!;
    const searchPhrase = "Your Weapons have +";

    expect(crook.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}10 Damage for each Medium item you have.`);
  });

  it('should parse "Fire Claw" correctly by replacing its [{aura.1}] with a correct value', () => {
    const fireClaw = cards.find(card => card.name === "Fire Claw")!;
    const searchPhrase = "This has + Burn equal to the Burn of your other items. ";

    expect(fireClaw.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}[0]`);
  });

  it('should parse "Fishing Net" correctly by replacing its {ability.0.targets} with a correct value', () => {
    const fishingNet = cards.find(card => card.name === "Fishing Net")!;
    const searchPhrase = "Slow ";

    expect(fishingNet.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}1 item for 3 second(s).`);
  });

  it('should parse "Colossal Popsicle" correctly by replacing {ability.2} with a correct value involving the spawning of additional cards.', () => {
    const colossalPopsicle = cards.find(card => card.name === "Colossal Popsicle")!;
    const searchPhrase = "When you sell this, gain ";

    expect(colossalPopsicle.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}2 Icicles.`);
  });

  it('should parse "Magnifying Glass" correctly by replacing +{ability.1} with a correct value involving lookup of AttributeType', () => {
    const colossalPopsicle = cards.find(card => card.name === "Magnifying Glass")!;
    const searchPhrase = "When you sell this, give your leftmost weapon +";

    expect(colossalPopsicle.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}5 damage.`);
  });

  it('should parse "Tripwire" without a Regen hidden tag', () => {
    const tripwire = cards.find(card => card.name === "Tripwire")!;

    expect(tripwire.hiddenTags.includes('Regen')).toBe(false);
  });

  it('should parse Astrolabe such that related tooltips use identical sentence structure', () => {
    const astrolabe = cards.find(card => card.name === "Astrolabe")!;

    expect(astrolabe.tiers.Silver.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
    expect(astrolabe.tiers.Gold.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
    expect(astrolabe.tiers.Diamond.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
  });

  it('should parse Dooley\'s Scarf such that it does not include duplicate tooltips in Gold/Diamond', () => {
    const dooleysScarf = cards.find(card => card.name === "Dooley's Scarf")!;
    expect(dooleysScarf.tiers.Silver.tooltips).toHaveLength(3);
    expect(dooleysScarf.tiers.Gold.tooltips).toHaveLength(3);
    expect(dooleysScarf.tiers.Diamond.tooltips).toHaveLength(3);
  });

  it('should parse Gearnola Bar such that it does not include duplicate tooltips in Diamond', () => {
    const gearnolaBar = cards.find(card => card.name === "Gearnola Bar")!;
    expect(gearnolaBar.tiers.Diamond.tooltips).toHaveLength(4);
  });

  it('should round Critical Core\'s CooldownMax to the nearest integer', () => {
    const criticalCore = cards.find(card => card.name === "Critical Core")!;
    const cooldownTooltip = criticalCore.tiers["Gold"].tooltips.find(tooltip => tooltip.includes("Cooldown"));

    expect(cooldownTooltip).toContain("6 seconds");
  });

  it('should fix Cybersecurity\'s inconsistent language across tooltips', () => {
    const cybersecurity = cards.find(card => card.name === "Cybersecurity")!;
    const damageTooltip = cybersecurity.tiers["Diamond"].tooltips.find(tooltip => tooltip.includes("This deals quadruple damage"));

    expect(damageTooltip).toContain("This deals quadruple damage if it is your only friend.");
  });

  it('should fix Flamethrower\'s extraneous "of" in tooltip', () => {
    const flamethrower = cards.find(card => card.name === "Flamethrower")!;
    const burnTooltip = flamethrower.tiers["Gold"].tooltips.find(tooltip => tooltip.includes("Burn equal to double"));

    expect(burnTooltip).toContain("Burn equal to double this item's damage.");
  });

  // it('should fix Critical Core\'s tooltip to not contain a typo "1"', () => {
  //   const criticalCore = cards.find(card => card.name === "Critical Core")!;
  //   const chargeTooltip = criticalCore.tiers["Gold"].tooltips.find(tooltip => tooltip.includes("When you use any"));

  //   expect(chargeTooltip).toEqual("When you use any item to the left of this, Charge this 1 second(s)");
  // });

  it('should contain no tooltips with {', () => {
    const invalidCards = [];

    for (const card of cards) {
      const tooltips = Object.values(card.tiers).flatMap(tier => tier.tooltips);
      const invalidTooltips = tooltips.filter(tooltip => tooltip.includes('{'));

      if (invalidTooltips.length > 0) {
        invalidCards.push({
          name: card.name,
          tooltips: invalidTooltips,
        });
      }
    }

    // If no invalid tooltips are found, make the assertion to confirm
    expect(invalidCards).toEqual([]);
  });

  describe('Enchantments', () => {
    it('should parse "Deadly Open Sign" correctly by creating a verbose tooltip referencing sell value of items and adjacent properties', () => {
      const deadlyOpenSign = cards.find(card => card.name === "Open Sign")!;
      const deadlyEnchantment = deadlyOpenSign.enchantments.find(enchantment => enchantment.name === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Shield Properties adjacent to this have + Crit Chance equal to the value of your highest value item. [0]');
    });

    it('should parse "Heavy Fishing Net" correctly by providing a custom tooltip for the enchantment aura', () => {
      const fishingNet = cards.find(card => card.name === "Fishing Net")!;
      const heavyEnchantment = fishingNet.enchantments.find(enchantment => enchantment.name === 'Heavy')!;

      expect(heavyEnchantment.tooltips.length).toEqual(1);
      expect(heavyEnchantment.tooltips[0]).toEqual('Double Slow');
    });

    it('should parse "Obsidian Magnifying Glass" correctly by providing a custom tooltip for the lifesteal attribute', () => {
      const magnifyingGlass = cards.find(card => card.name === "Magnifying Glass")!;
      const heavyEnchantment = magnifyingGlass.enchantments.find(enchantment => enchantment.name === 'Obsidian')!;

      expect(heavyEnchantment.tooltips.length).toEqual(1);
      // Excludes 100 because 100% is implicit, can add 100% later if fractional lifesteal is introduced.
      expect(heavyEnchantment.tooltips[0]).toEqual('Lifesteal');
    });

    it('should parse "Turbo Bomb Squad" correctly by replacing its {abiltiy.e1} (which is a typo) with a correct value', () => {
      const bombSquad = cards.find(card => card.name === "Bomb Squad")!;
      const turboEnchantment = bombSquad.enchantments.find(enchantment => enchantment.name === 'Turbo')!;

      expect(turboEnchantment.tooltips.length).toEqual(1);
      expect(turboEnchantment.tooltips[0]).toEqual('Haste 1 item for 2 second(s).');
    });

    it('should parse "Deadly Port" correctly by replacing its {aura.e1.} (which is a typo) with a correct value', () => {
      const port = cards.find(card => card.name === "Port")!;
      const deadlyEnchantment = port.enchantments.find(enchantment => enchantment.name === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Your Ammo items have +20% Crit Chance.');
    });

    // it('should parse "Swash Buckle" correctly by excluding Shiny which is an invalid enchantment', () => {
    //   const swashBuckle = cards.find(card => card.name === "Swash Buckle")!;
    //   const shinyEnchantment = swashBuckle.enchantments.find(enchantment => enchantment.name === 'Shiny')!;

    //   expect(shinyEnchantment).toBeUndefined();
    // });

    it('should parse "Orbital Polisher" correctly by excluding Shiny which is an invalid enchantment', () => {
      const orbitalPolisher = cards.find(card => card.name === "Orbital Polisher")!;
      const shinyEnchantment = orbitalPolisher.enchantments.find(enchantment => enchantment.name === 'Shiny')!;

      expect(shinyEnchantment).toBeUndefined();
    });

    it('should parse "Heavy Multitool" correctly by providing a custom tooltip rather than trying to inject variables into the existing tooltip', () => {
      const multitool = cards.find(card => card.name === "Multitool")!;
      const heavyEnchantment = multitool.enchantments.find(enchantment => enchantment.name === 'Heavy')!;

      expect(heavyEnchantment.tooltips.length).toEqual(1);
      expect(heavyEnchantment.tooltips[0]).toEqual('+2 Slow');
    });

    it('should parse "Heavy Induction Aegis" correctly by replacing {ability.e1} with attribute values derived from StartingTier', () => {
      const inductionAegis = cards.find(card => card.name === "Induction Aegis")!;
      const heavyEnchantment = inductionAegis.enchantments.find(enchantment => enchantment.name === 'Heavy')!;

      expect(heavyEnchantment.tooltips.length).toEqual(1);
      expect(heavyEnchantment.tooltips[0]).toEqual('Slow 1 item for 1 second(s).');
    });

    it('should parse "Deadly Sextant" correctly by replacing its {aura.0} with a correct value', () => {
      const sextant = cards.find(card => card.name === "Sextant")!;
      const deadlyEnchantment = sextant.enchantments.find(enchantment => enchantment.name === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Adjacent items have an additional +25% Crit Chance');
    });

    it('should parse "Deadly Star Chart" correctly by replacing its "2.0 Custom_0" with a correct attribute name', () => {
      const starChart = cards.find(card => card.name === "Star Chart")!;
      const deadlyEnchantment = starChart.enchantments.find(enchantment => enchantment.name === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Double Crit Chance');
    });

    it('should parse "Shiny Star Chart" correctly by replacing its "0.5 Custom_1" with a correct attribute name', () => {
      const starChart = cards.find(card => card.name === "Star Chart")!;
      const shinyEnchantment = starChart.enchantments.find(enchantment => enchantment.name === 'Shiny')!;

      expect(shinyEnchantment.tooltips.length).toEqual(2);
      expect(shinyEnchantment.tooltips[1]).toEqual('Double Cooldown Reduction');
    });

    it('should parse "Restorative Force Field" correctly by replacing its "Heal {ability.e1}." with a reference to Shield Amount', () => {
      const forceField = cards.find(card => card.name === "Force Field")!;
      const restorativeEnchantment = forceField.enchantments.find(enchantment => enchantment.name === 'Restorative')!;

      expect(restorativeEnchantment.tooltips.length).toEqual(1);
      expect(restorativeEnchantment.tooltips[0]).toEqual('Heal equal to your shield.');
    });

    it('should contain no enchantment tooltips with {', () => {
      const invalidCards = [];

      for (const card of cards) {
        const tooltips = card.enchantments.flatMap(enchantment => enchantment.tooltips);
        const invalidTooltips = tooltips.filter(tooltip => tooltip.includes('{'));

        if (invalidTooltips.length > 0) {
          invalidCards.push({
            name: card.name,
            tooltips: invalidTooltips,
          });
        }
      }

      // If no invalid tooltips are found, make the assertion to confirm
      expect(invalidCards).toEqual([]);
    });
  });
});