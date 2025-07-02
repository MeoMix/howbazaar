import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson } from './cardsJsonParser';
import cardsJson from "./data/cards.json" assert { type: "json" };
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

  it('should contain no items with duplicate names', () => {
    const duplicateNames = itemCards.filter(card => itemCards.filter(c => c.name === card.name).length > 1);
    const duplicates = duplicateNames.map(card => ({
      name: card.name,
      id: card.id
    }));

    expect(duplicates).toEqual([]);
  });

  describe('quests', () => {
    it('should unify all of Blank Slate\'s quest reward tooltips involving ability.q1 references', () => {
      const blankSlate = itemCards.find(card => card.name === "Blank Slate")!;

      expect(blankSlate.quests[0].entries[0].rewardTooltips[0]).toEqual(
        'Poison (5/10/15/20).'
      );

      expect(blankSlate.quests[1].entries[0].rewardTooltips[0]).toEqual(
        'Gain (5/10/15/20) Regen for the fight.'
      );

      expect(blankSlate.quests[4].entries[0].rewardTooltips[0]).toEqual(
        'Freeze 1 items for 0.5 second(s).'
      );
    });

    it('should unify Frost Totem\'s quest reward tooltips involving ability.q2 references', () => {
      const frostTotem = itemCards.find(card => card.name === "Frost Totem")!;

      expect(frostTotem.quests[1].entries[0].rewardTooltips[0]).toEqual(
        'When you use an adjacent Relic, charge this 1 second(s).'
      );
    });

    it('should unify Idol of Decay\'s quest reward tooltips involving ability.q1 references', () => {
      const idolOfDecay = itemCards.find(card => card.name === "Idol of Decay")!;

      expect(idolOfDecay.quests[0].entries[0].rewardTooltips[0]).toEqual(
        'When you Poison, this gains (2/4/6/8) Poison for the fight.'
      );
    });

    it('should unify Tomb of the Ancients\'s quest reward tooltips involving ability.q1 references', () => {
      const tombOfTheAncients = itemCards.find(card => card.name === "Tomb of the Ancients")!;

      expect(tombOfTheAncients.quests[0].entries[0].rewardTooltips[0]).toEqual(
        'Poison (5/10/15).'
      );
    });

    it('should contain no quest reward tooltips with {', () => {
      const invalidCards = [];

      for (const card of [...itemCards, ...skillCards]) {
        if ('quests' in card) {
          const questRewardTooltips = card.quests.flatMap(quest => 
            quest.entries.flatMap(entry => entry.rewardTooltips)
          );
          
          const invalidTooltips = questRewardTooltips.filter(tooltip => tooltip.includes('{'));

          if (invalidTooltips.length > 0) {
            invalidCards.push({
              name: card.name,
              tooltips: invalidTooltips,
            });
          }
        }
      }

      // If no invalid tooltips are found, make the assertion to confirm
      expect(invalidCards).toEqual([]);
    });
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
        'When you use the Core or another Ray, your Weapons gain (+4/+6/+8) Damage for the fight.'
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
        'The Property to the left of this has double value in combat and has its cooldown reduced by (5%/10%/15%).'
      );
    });

    it('should unify Beach Ball', () => {
      const beachBall = itemCards.find(card => card.name === "Beach Ball")!;

      expect(beachBall.unifiedTooltips[1]).toEqual(
        'Haste (2/3/4/5) Aquatic or Toy item(s) for 2 second(s).'
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
        'Slow 1 item for 3 second(s).',
      );
    });

    it('should unify Iceberg and not move 0.5 period outside of parentheses', () => {
      const iceberg = itemCards.find(card => card.name === "Iceberg")!;

      expect(iceberg.unifiedTooltips[0]).toEqual(
        'When your enemy uses an item, Freeze it for (0.5/1) second(s).',
      );
    });

    it('should unify Closed Sign', () => {
      const closedSign = itemCards.find(card => card.name === "Closed Sign")!;

      expect(closedSign.unifiedTooltips[0]).toEqual(
        'You have Regen equal to (50%/100%) of the value of adjacent properties.'
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

    it('should unify Upgrade Hammer', () => {
      const upgradeHammer = itemCards.find(card => card.name === "Upgrade Hammer")!;

      expect(upgradeHammer.unifiedTooltips[0]).toEqual(
        'When you sell this, upgrade your leftmost (Bronze/Silver/Gold) (or lower)-tier item.'
      );
    });

    // it('should unify Virus Cooldown', () => {
    //   const virus = itemCards.find(card => card.name === "Virus")!;

    //   expect(virus.unifiedTooltips[0]).toEqual(
    //     'Cooldown (12/5/5) seconds'
    //   );
    // });
  });

  it('should not round half-second cooldown to nearest integer', () => {
    const greenWaspCard = itemCards.find(card => card.name === "GRN-W4SP")!;

    expect(greenWaspCard.tiers.Silver.tooltips[0]).toEqual("Cooldown 6.5 seconds");
  });

  // TODO: This might not be a special test case anymore
  it('should parse "Bill Dozer" correctly with correct cooldown reduction texts for each tier', () => {
    const billDozerCard = itemCards.find(card => card.name === "Bill Dozer")!;

    const searchPhrase = "Your other Friends' cooldowns are reduced by";

    const expectedTooltips = {
      Diamond: `${searchPhrase} 20%.`,
      Gold: `${searchPhrase} 15%.`,
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

    const searchPhrase = "Your items Slow for";

    expect(amberCard.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} 1 more second.`);
  });

  it('should parse "Uwashiwali Bird" correctly by replacing its {aura.1} with a correct value', () => {
    const uwashiwaliBirdCard = itemCards.find(card => card.name === "Uwashiwali Bird")!;

    const searchPhrase = "This has";

    expect(uwashiwaliBirdCard.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase} +1 Multicast for each Property you have.`);
  });

  it('should parse "Healthy Hoarder" correctly by replacing its {aura.0.mod} with a correct value', () => {
    const healthyCollector = skillCards.find(card => card.name === "Healthy Hoarder")!;
    const searchPhrase = "You have +";

    expect(healthyCollector.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}35 Max Health for each Non-Weapon item you have.`);
  });

  it('should parse "Crook" correctly by replacing its {aura.1} with a correct value (by relying on modifiers)', () => {
    const crook = itemCards.find(card => card.name === "Crook")!;
    const searchPhrase = "Your Medium Weapons have +";

    expect(crook.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}8 Damage for each Medium item you have.`);
  });

  it('should parse "Fishing Net" correctly by replacing its {ability.0.targets} with a correct value', () => {
    const fishingNet = itemCards.find(card => card.name === "Fishing Net")!;
    const searchPhrase = "Slow ";

    expect(fishingNet.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}1 item(s) for 3 second(s).`);
  });

  it('should parse "Colossal Popsicle" correctly by replacing {ability.2} with a correct value involving the spawning of additional cards.', () => {
    const colossalPopsicle = itemCards.find(card => card.name === "Colossal Popsicle")!;
    const searchPhrase = "When you sell this, gain ";

    expect(colossalPopsicle.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}2 Icicles.`);
  });

  it('should parse "Magnifying Glass" correctly by replacing +{ability.1} with a correct value involving lookup of AttributeType', () => {
    const colossalPopsicle = itemCards.find(card => card.name === "Magnifying Glass")!;
    const searchPhrase = "When you sell this, your leftmost weapon gains +";

    expect(colossalPopsicle.tiers.Bronze.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}5 damage.`);
  });

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

    expect(cooldownTooltip).toContain("7 seconds");
  });

  it('should fix Multitool\'s extraneous "an" in tooltip', () => {
    const multitool = itemCards.find(card => card.name === "Multitool")!;
    const slowTooltip = multitool.tiers["Bronze"].tooltips.find(tooltip => tooltip.includes("Slow"));

    expect(slowTooltip).toContain("Slow 1 item for 1 second(s).");
  });

  it('should ignore Diamond attributes on Legendaries to fix Eye of the Collosus cooldown', () => {
    const eyeOfTheColossus = itemCards.find(card => card.name === "Eye of the Colossus")!;
    const cooldownTooltip = eyeOfTheColossus.tiers.Legendary.tooltips.find(tooltip => tooltip.includes("Cooldown"));

    expect(cooldownTooltip).toEqual("Cooldown 11 seconds");
  });

  it('should parse Snowflakes half second effect properly', () => {
    const snowflake = itemCards.find(card => card.name === "Snowflake")!;
    expect(snowflake.tiers.Diamond.tooltips[0]).toContain(`+0.5 Freeze duration.`);
  });

  it('should parse "Captain\'s Wheel properly by replacing {aura.1} with correct value', () => {
    const captainWheel = itemCards.find(card => card.name === "Captain's Wheel")!;
    const searchPhrase = "If you have a Vehicle or Large item";

    expect(captainWheel.tiers.Silver.tooltips.find((text) => text.includes(searchPhrase))).toEqual(`${searchPhrase}, reduce this item's cooldown by 2.5 seconds.`);
  });

  it('every card should have a tooltip', () => {
    const invalidCards = [];

    for (const card of [...itemCards, ...skillCards]) {
      const tooltips = Object.values(card.tiers).flatMap(tier => tier.tooltips);

      if (tooltips.length === 0) {
        invalidCards.push({
          name: card.name,
        });
      }
    }

    // If no invalid tooltips are found, make the assertion to confirm
    expect(invalidCards).toEqual([]);
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
    it('should parse "Icy Blue Gumball" correctly by converting +200 Freeze duration to +0.2 Freeze duration', () => {
      const blueGumball = itemCards.find(card => card.name === "Blue Gumball")!;
      const icyBlueGumball = blueGumball.enchantments.find(enchantment => enchantment.type === 'Icy')!;

      expect(icyBlueGumball.tooltips.length).toEqual(1);
      expect(icyBlueGumball.tooltips[0]).toEqual('When you sell this, your leftmost Freeze item gains +0.1 Freeze duration.');
    });

    it('should parse "Deadly Open Sign" correctly', () => {
      const deadlyOpenSign = itemCards.find(card => card.name === "Open Sign")!;
      const deadlyEnchantment = deadlyOpenSign.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Your adjacent Properties have +Crit Chance equal to the value of your highest value item.');
    });

    it('should parse "Deadly Sextant" correctly by replacing its {aura.e1} with a correct value', () => {
      const sextant = itemCards.find(card => card.name === "Sextant")!;
      const deadlyEnchantment = sextant.enchantments.find(enchantment => enchantment.type === 'Deadly')!;

      expect(deadlyEnchantment.tooltips.length).toEqual(1);
      expect(deadlyEnchantment.tooltips[0]).toEqual('Your items have +20% Crit Chance.');
    });

    it('should parse "Restorative Force Field" correctly by replacing its "Heal {ability.e1}." with a reference to Shield Amount', () => {
      const forceField = itemCards.find(card => card.name === "Force Field")!;
      const restorativeEnchantment = forceField.enchantments.find(enchantment => enchantment.type === 'Restorative')!;

      expect(restorativeEnchantment.tooltips.length).toEqual(1);
      expect(restorativeEnchantment.tooltips[0]).toEqual('Heal equal to your Shield.');
    });

    it('should parse "Shielded Bunker" correctly by properly calculating its {ability.e1} value as non-zero', () => {
      const bunker = itemCards.find(card => card.name === "Bunker")!;
      const shieldedEnchantment = bunker.enchantments.find(enchantment => enchantment.type === 'Shielded')!;

      expect(shieldedEnchantment.tooltips.length).toEqual(1);
      expect(shieldedEnchantment.tooltips[0]).toEqual('The first time you fall below half health each fight, Shield 300.');
    });

    it('should parse "Restorative Security Camera" correctly by reading its value from the base items attribute at the default tier', () => {
      const securityCamera = itemCards.find(card => card.name === "Security Camera")!;
      const restorativeEnchantment = securityCamera.enchantments.find(enchantment => enchantment.type === 'Restorative')!;

      expect(restorativeEnchantment.tooltips.length).toEqual(2);
      expect(restorativeEnchantment.tooltips[1]).toEqual('Your other Heal items have +20% Crit Chance.');
    });

    it('should parse "Restorative Beach Ball" correctly by properly parsing {aura.e2.mod}', () => {
      const beachBall = itemCards.find(card => card.name === "Beach Ball")!;
      const restorativeBeachBall = beachBall.enchantments.find(enchantment => enchantment.type === 'Restorative')!;

      expect(restorativeBeachBall.tooltips.length).toEqual(1);
      expect(restorativeBeachBall.tooltips[0]).toEqual('Heal 15 for each Aquatic or Toy item you have.');
    });

    it('should parse "Obsidian Abstrolabe" correctly by properly parsing {aura.e2.mod}', () => {
      const astrolabe = itemCards.find(card => card.name === "Astrolabe")!;
      const obsidianAstrolabe = astrolabe.enchantments.find(enchantment => enchantment.type === 'Obsidian')!;

      expect(obsidianAstrolabe.tooltips.length).toEqual(1);
      expect(obsidianAstrolabe.tooltips[0]).toEqual('Deal 20 damage for each non-Weapon item you have.');
    });

    it('should contain no enchantment tooltips with {, except for Induction Aegis with enchantmentType Heavy', () => {
      const invalidCards = [];

      for (const card of itemCards) {
        const invalidTooltips = card.enchantments
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

    it('should contain no enchantment tooltips with the debug keyword MISSING', () => {
      const invalidCards = [];

      for (const card of itemCards) {
        const invalidTooltips = card.enchantments
          .flatMap(enchantment => enchantment.tooltips.filter(tooltip => tooltip.includes('MISSING')));

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