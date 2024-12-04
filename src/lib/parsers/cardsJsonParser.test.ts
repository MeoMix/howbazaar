import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson } from './cardsJsonParser';
import cardsJson from "./v2_Cards.json" assert { type: "json" };
import type { ParsedItemCard, ParsedSkillCard } from '$lib/types';
import type { CardsJson } from './types.parser';

describe('cardJsonParser', () => {
  let itemCards: ParsedItemCard[];
  let skillCards: ParsedSkillCard[];

  beforeAll(() => {
    const parsedJson = parseJson(cardsJson as CardsJson);
    itemCards = parsedJson.itemCards;
    skillCards = parsedJson.skillCards;
  });

  describe('unifiedTooltips', () => {
    it('should unify Abacus tooltips', () => {
      const abacus = itemCards.find(card => card.name === "Abacus")!;

      expect(abacus.unifiedTooltips[1]).toEqual(
        'Shield equal to (1x/2x) the value of the adjacent items.'
      );
    });

    it('should unify Agility Boots', () => {
      const agilityBoots = itemCards.find(card => card.name === "Agility Boots")!;

      expect(agilityBoots.unifiedTooltips[0]).toEqual(
        'Adjacent items have (+3%/+6%/+9%/+12%) Crit chance.'
      );
    });

    it('should unify Alpha Ray', () => {
      const alphaRay = itemCards.find(card => card.name === "Alpha Ray")!;

      expect(alphaRay.unifiedTooltips[2]).toEqual(
        'When you use the Core or another Ray, your Weapons gain (+3/+6/+9/+12) Damage for the fight.'
      );
    });

    it('should unify Ambergris', () => {
      const ambergris = itemCards.find(card => card.name === "Ambergris")!;

      expect(ambergris.unifiedTooltips[2]).toEqual(
        'When you buy another Aquatic item, this gains (1/2/3/4) Value.'
      );
    });

    it('should unify Atlas Stone (no changes)', () => {
      const atlasStone = itemCards.find(card => card.name === "Atlas Stone")!;

      expect(atlasStone.unifiedTooltips[2]).toEqual(
        'Double this item\'s damage for the fight.'
      );
    });

    it('should unify Balcony', () => {
      const balcony = itemCards.find(card => card.name === "Balcony")!;

      expect(balcony.unifiedTooltips[0]).toEqual(
        'The Property to the left of this has double value in combat and has its cooldown reduced by (10%/20%/30%).'
      );
    });

    it('should unify Beach Ball', () => {
      const beachBall = itemCards.find(card => card.name === "Beach Ball")!;

      expect(beachBall.unifiedTooltips[1]).toEqual(
        'Haste (1/2/3/4) Aquatic item(s) for 2 second(s).'
      );
    });

    it('should unify Belt', () => {
      const belt = itemCards.find(card => card.name === "Belt")!;

      expect(belt.unifiedTooltips[0]).toEqual(
        'You have (+50%/+75%/+100%) Max Health.'
      );
    });

    it('should unify Clamera', () => {
      const clamera = itemCards.find(card => card.name === "Clamera")!;

      expect(clamera.unifiedTooltips[1]).toEqual(
        'Slow (1/2/3/4) item(s) for 1 second(s).',
      );
    });

    it('should unify Closed Sign', () => {
      const closedSign = itemCards.find(card => card.name === "Closed Sign")!;

      expect(closedSign.unifiedTooltips[0]).toEqual(
        'You have Regeneration equal to (1x/2x) adjacent properties\' values. [0]'
      );
    });

    it('should unify Chocoholic', () => {
      const chocoholic = skillCards.find(card => card.name === "Chocoholic")!;

      expect(chocoholic.unifiedTooltips[0]).toEqual(
        'When you sell a medium or large item, get (1/2) Chocolate Bar(s).'
      );
    });

    it('should unify Scrap Metal', () => {
      const scrapMetal = itemCards.find(card => card.name === "Scrap Metal")!;

      expect(scrapMetal.unifiedTooltips[0]).toEqual(
        'When you sell this, upgrade The Core. (/and reduce its cooldown by 1 second(s).)'
      );
    });

    it('should unify Virus Cooldown', () => {
      const virus = itemCards.find(card => card.name === "Virus")!;

      expect(virus.unifiedTooltips[0]).toEqual(
        'Cooldown (12/5/5) seconds'
      );
    });
  });

  // TODO: This might not be a special test case anymore
  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const billDozerCard = itemCards.find(card => card.name === "Bill Dozer")!;

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
    const amberCard = itemCards.find(card => card.name === "Amber")!;

    const searchPhrase = "Your other Slow items have";

    expect(amberCard.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Slow.`);
  });

  it('should parse "Satchel" correctly by replacing its {aura.2} with a correct value', () => {
    const satchelCard = itemCards.find(card => card.name === "Satchel")!;

    const searchPhrase = "You have";

    expect(satchelCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 4 Regeneration.`);
  });

  it('should parse "Uwashiwali Bird" correctly by replacing its {aura.1} with a correct value', () => {
    const uwashiwaliBirdCard = itemCards.find(card => card.name === "Uwashiwali Bird")!;

    const searchPhrase = "This has";

    expect(uwashiwaliBirdCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Multicast for each Property you have. [0]`);
  });

  it('should parse "Healthy Collector" correctly by replacing its {aura.0.mod} with a correct value', () => {
    const healthyCollector = skillCards.find(card => card.name === "Healthy Collector")!;
    const searchPhrase = "You have +";

    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}35 Max Health for each Non-Weapon item you have. [0]`);
  });

  it('should parse "Memory Card" correctly by replacing its {ability.1} with a correct value', () => {
    const healthyCollector = itemCards.find(card => card.name === "Memory Card")!;
    const searchPhrase = "When you sell this, give The Core + Damage equal to this item's value.";

    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 1`);
  });

  it('should parse "Crook" correctly by replacing its {aura.4} with a correct value (by relying on modifiers)', () => {
    const crook = itemCards.find(card => card.name === "Crook")!;
    const searchPhrase = "Your Medium Weapons have +";

    expect(crook.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}10 Damage for each Medium item you have.`);
  });

  it('should parse "Fire Claw" correctly by replacing its [{aura.1}] with a correct value', () => {
    const fireClaw = itemCards.find(card => card.name === "Fire Claw")!;
    const searchPhrase = "This has + Burn equal to the Burn of your other items. ";

    expect(fireClaw.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}[0]`);
  });

  it('should parse "Fishing Net" correctly by replacing its {ability.0.targets} with a correct value', () => {
    const fishingNet = itemCards.find(card => card.name === "Fishing Net")!;
    const searchPhrase = "Slow ";

    expect(fishingNet.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}1 item for 3 second(s).`);
  });

  it('should parse "Colossal Popsicle" correctly by replacing {ability.2} with a correct value involving the spawning of additional cards.', () => {
    const colossalPopsicle = itemCards.find(card => card.name === "Colossal Popsicle")!;
    const searchPhrase = "When you sell this, gain ";

    expect(colossalPopsicle.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}2 Icicles.`);
  });

  it('should parse "Magnifying Glass" correctly by replacing +{ability.1} with a correct value involving lookup of AttributeType', () => {
    const colossalPopsicle = itemCards.find(card => card.name === "Magnifying Glass")!;
    const searchPhrase = "When you sell this, give your leftmost weapon +";

    expect(colossalPopsicle.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}5 damage.`);
  });

  it('should parse "Tripwire" without a Regen hidden tag', () => {
    const tripwire = itemCards.find(card => card.name === "Tripwire")!;

    expect(tripwire.hiddenTags.includes('Regen')).toBe(false);
  });

  // it('should parse Astrolabe such that related tooltips use identical sentence structure', () => {
  //   const astrolabe = itemCards.find(card => card.name === "Astrolabe")!;

  //   expect(astrolabe.tiers.Silver.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
  //   expect(astrolabe.tiers.Gold.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
  //   expect(astrolabe.tiers.Diamond.tooltips[2]).toContain("When you use a non-weapon item, it and this gains");
  // });

  it('should parse Dooley\'s Scarf such that it does not include duplicate tooltips in Gold/Diamond', () => {
    const dooleysScarf = itemCards.find(card => card.name === "Dooley's Scarf")!;
    expect(dooleysScarf.tiers.Silver.tooltips).toHaveLength(3);
    expect(dooleysScarf.tiers.Gold.tooltips).toHaveLength(3);
    expect(dooleysScarf.tiers.Diamond.tooltips).toHaveLength(3);
  });

  it('should parse Gearnola Bar such that it does not include duplicate tooltips in Diamond', () => {
    const gearnolaBar = itemCards.find(card => card.name === "Gearnola Bar")!;
    expect(gearnolaBar.tiers.Diamond.tooltips).toHaveLength(4);
  });

  it('should round Critical Core\'s CooldownMax to the nearest integer', () => {
    const criticalCore = itemCards.find(card => card.name === "Critical Core")!;
    const cooldownTooltip = criticalCore.tiers["Gold"].tooltips.find(tooltip => tooltip.includes("Cooldown"));

    expect(cooldownTooltip).toContain("6 seconds");
  });

  it('should fix Cybersecurity\'s inconsistent language across tooltips', () => {
    const cybersecurity = itemCards.find(card => card.name === "Cybersecurity")!;
    const damageTooltip = cybersecurity.tiers["Diamond"].tooltips.find(tooltip => tooltip.includes("This deals quadruple damage"));

    expect(damageTooltip).toContain("This deals quadruple damage if it is your only friend.");
  });

  // it('should fix Flamethrower\'s extraneous "of" in tooltip', () => {
  //   const flamethrower = itemCards.find(card => card.name === "Flamethrower")!;
  //   const burnTooltip = flamethrower.tiers["Gold"].tooltips.find(tooltip => tooltip.includes("Burn equal to double"));

  //   expect(burnTooltip).toContain("Burn equal to double this item's damage.");
  // });

  it('should fix Multitool\'s extraneous "an" in tooltip', () => {
    const multitool = itemCards.find(card => card.name === "Multitool")!;
    const slowTooltip = multitool.tiers["Bronze"].tooltips.find(tooltip => tooltip.includes("Slow"));

    expect(slowTooltip).toContain("Slow 1 item for 1 second(s).");
  });

  it('should fix Critical Core\'s tooltip to not contain a typo "1"', () => {
    const criticalCore = itemCards.find(card => card.name === "Critical Core")!;
    const chargeTooltip = criticalCore.tiers.Bronze.tooltips.find(tooltip => tooltip.includes("When you use any"));

    expect(chargeTooltip).toEqual("When you use any to the left of this, Charge this 1 second(s).");
  });

  it('should ignore Diamond attributes on Legendaries to fix Eye of the Collosus cooldown', () => {
    const eyeOfTheColossus = itemCards.find(card => card.name === "Eye of the Colossus")!;
    const cooldownTooltip = eyeOfTheColossus.tiers.Legendary.tooltips.find(tooltip => tooltip.includes("Cooldown"));

    expect(cooldownTooltip).toEqual("Cooldown 10 seconds");
  });

  it('should contain no tooltips with {', () => {
    const disabledItemIds = [
      // Schematics is disabled due to bug so it's ~ok for Tooltip to be broken
      "f4827638-60ff-4101-a52f-037c04791ee5"
    ];

    const invalidCards = [];

    for (const card of [...itemCards, ...skillCards]) {
      const tooltips = Object.values(card.tiers).flatMap(tier => tier.tooltips);
      const invalidTooltips = tooltips.filter(tooltip => tooltip.includes('{'));

      if (invalidTooltips.length > 0 && !disabledItemIds.includes(card.id)) {
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
      const deadlyOpenSign = itemCards.find(card => card.name === "Open Sign")!;
      const deadlyEnchantment = deadlyOpenSign.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Shield Properties adjacent to this have + Crit Chance equal to the value of your highest value item. [0]');
    });

    // TODO: I think I can remove some logic since they adjusted these tooltips
    // it('should parse "Heavy Fishing Net" correctly by providing a custom tooltip for the enchantment aura', () => {
    //   const fishingNet = itemCards.find(card => card.name === "Fishing Net")!;
    //   const heavyEnchantment = fishingNet.enchantments.find(enchantment => enchantment.type === 'Heavy')!;

    //   expect(heavyEnchantment.tooltips.length).toEqual(1);
    //   expect(heavyEnchantment.tooltips[0]).toEqual('Double Slow');
    // });

    // it('should parse "Obsidian Magnifying Glass" correctly by providing a custom tooltip for the lifesteal attribute', () => {
    //   const magnifyingGlass = itemCards.find(card => card.name === "Magnifying Glass")!;
    //   const heavyEnchantment = magnifyingGlass.enchantments.find(enchantment => enchantment.type === 'Obsidian')!;

    //   expect(heavyEnchantment.tooltips.length).toEqual(1);
    //   // Excludes 100 because 100% is implicit, can add 100% later if fractional lifesteal is introduced.
    //   expect(heavyEnchantment.tooltips[0]).toEqual('Lifesteal');
    // });

    it('should parse "Turbo Bomb Squad" correctly by replacing its {abiltiy.e1} (which is a typo) with a correct value', () => {
      const bombSquad = itemCards.find(card => card.name === "Bomb Squad")!;
      const turboEnchantment = bombSquad.enchantments.find(enchantment => enchantment.type === 'Turbo')!;

      expect(turboEnchantment.tooltips.length).toEqual(1);
      expect(turboEnchantment.tooltips[0]).toEqual('Haste 1 item for 2 second(s).');
    });

    it('should parse "Deadly Port" correctly by replacing its {aura.e1.} (which is a typo) with a correct value', () => {
      const port = itemCards.find(card => card.name === "Port")!;
      const deadlyEnchantment = port.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Your items with Ammo have +20% Crit Chance.');
    });

    // it('should parse "Swash Buckle" correctly by excluding Shiny which is an invalid enchantment', () => {
    //   const swashBuckle = cards.find(card => card.name === "Swash Buckle")!;
    //   const shinyEnchantment = swashBuckle.enchantments.find(enchantment => enchantment.type === 'Shiny')!;

    //   expect(shinyEnchantment).toBeUndefined();
    // });

    it('should parse "Orbital Polisher" correctly by excluding Shiny which is an invalid enchantment', () => {
      const orbitalPolisher = itemCards.find(card => card.name === "Orbital Polisher")!;
      const shinyEnchantment = orbitalPolisher.enchantments.find(enchantment => enchantment.type === 'Shiny')!;

      expect(shinyEnchantment).toBeUndefined();
    });

    it('should parse "Heavy Multitool" correctly by providing a custom tooltip rather than trying to inject variables into the existing tooltip', () => {
      const multitool = itemCards.find(card => card.name === "Multitool")!;
      const heavyEnchantment = multitool.enchantments.find(enchantment => enchantment.type === 'Heavy')!;

      expect(heavyEnchantment.tooltips.length).toEqual(1);
      expect(heavyEnchantment.tooltips[0]).toEqual('+2 Slow');
    });


    // it('should parse "Heavy Induction Aegis" correctly by replacing {ability.e1} with attribute values derived from StartingTier', () => {
    //   const inductionAegis = itemCards.find(card => card.name === "Induction Aegis")!;
    //   const heavyEnchantment = inductionAegis.enchantments.find(enchantment => enchantment.type === 'Heavy')!;

    //   expect(heavyEnchantment.tooltips.length).toEqual(1);
    //   expect(heavyEnchantment.tooltips[0]).toEqual('Slow 1 item for 1 second(s).');
    // });

    it('should parse "Deadly Sextant" correctly by replacing its {aura.0} with a correct value', () => {
      const sextant = itemCards.find(card => card.name === "Sextant")!;
      const deadlyEnchantment = sextant.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Adjacent items have an additional +25% Crit Chance');
    });

    // it('should parse "Deadly Star Chart" correctly by replacing its "2.0 Custom_0" with a correct attribute name', () => {
    //   const starChart = itemCards.find(card => card.name === "Star Chart")!;
    //   const deadlyEnchantment = starChart.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

    //   expect(deadlyEnchantment.tooltips.length).toEqual(1);
    //   expect(deadlyEnchantment.tooltips[0]).toEqual('Double Crit Chance');
    // });

    // it('should parse "Shiny Star Chart" correctly by replacing its "0.5 Custom_1" with a correct attribute name', () => {
    //   const starChart = itemCards.find(card => card.name === "Star Chart")!;
    //   const shinyEnchantment = starChart.enchantments.find(enchantment => enchantment.type === 'Shiny')!;

    //   expect(shinyEnchantment.tooltips.length).toEqual(2);
    //   expect(shinyEnchantment.tooltips[1]).toEqual('Double Cooldown Reduction');
    // });

    it('should parse "Restorative Force Field" correctly by replacing its "Heal {ability.e1}." with a reference to Shield Amount', () => {
      const forceField = itemCards.find(card => card.name === "Force Field")!;
      const restorativeEnchantment = forceField.enchantments.find(enchantment => enchantment.type === 'Restorative')!;

      expect(restorativeEnchantment.tooltips.length).toEqual(1);
      expect(restorativeEnchantment.tooltips[0]).toEqual('Heal equal to your shield.');
    });

    it('should parse "Toxic Flamethrower" correctly by replacing its "{aura.e9}" with a reference to Custom_3 (poison multiplier)', () => {
      const flamethrower = itemCards.find(card => card.name === "Flamethrower")!;
      const toxicEnchantment = flamethrower.enchantments.find(enchantment => enchantment.type === 'Toxic')!;

      expect(toxicEnchantment.tooltips.length).toEqual(1);
      expect(toxicEnchantment.tooltips[0]).toEqual('Poison equal to 2 times this item\'s damage.');
    });

    it('should contain no enchantment tooltips with {, except for Induction Aegis with enchantmentType Heavy', () => {
      const invalidCards = [];

      for (const card of itemCards) {
        const invalidTooltips = card.enchantments
          .filter(enchantment => {
            // I think Heavy Induction Aegis is broken in-game
            return !(card.name === "Induction Aegis" && enchantment.type === "Heavy");
          })
          .flatMap(enchantment => enchantment.tooltips.filter(tooltip => tooltip.includes('{')));

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