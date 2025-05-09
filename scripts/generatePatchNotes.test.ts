import { describe, it, expect } from 'vitest';
import type { ParsedItemCard, ParsedSkillCard, TierType, Tag, HiddenTag, Size, Hero, EnchantmentType, CorePackId, CustomTag } from '../src/lib/types';
import { getPatchNotes } from './generatePatchNotes';

// Helper function to create tiers object
const createTiers = () => ({
    Bronze: { tooltips: [] },
    Silver: { tooltips: [] },
    Gold: { tooltips: [] },
    Diamond: { tooltips: [] },
    Legendary: { tooltips: [] }
});

// Helper function to create default mock item content
const createMockItem = (overrides: Partial<ParsedItemCard> = {}): ParsedItemCard => {
    const defaultContent: ParsedItemCard = {
        id: 'test-id',
        name: 'Test Item',
        startingTier: 'Bronze' as TierType,
        tags: ['Weapon'] as Tag[],
        hiddenTags: [] as HiddenTag[],
        customTags: [] as CustomTag[],
        size: 'Medium' as Size,
        heroes: ['Pygmalien', 'Common'] as Hero[],
        unifiedTooltips: ['Deal 10 damage'],
        enchantments: [],
        tiers: createTiers(),
        packId: 'Core' as CorePackId
    };
    return structuredClone({ ...defaultContent, ...overrides });
};

// Helper function to create default mock skill content
const createMockSkill = (overrides: Partial<ParsedSkillCard> = {}): ParsedSkillCard => {
    const defaultContent: ParsedSkillCard = {
        id: 'test-skill-id',
        name: 'Test Skill',
        startingTier: 'Bronze' as TierType,
        tags: [] as Tag[],
        hiddenTags: [] as HiddenTag[],
        customTags: [] as CustomTag[],
        size: 'Medium' as Size,
        heroes: ['Pygmalien', 'Common'] as Hero[],
        unifiedTooltips: ['Your weapons deal +5 damage'],
        tiers: createTiers(),
        packId: 'Core' as CorePackId,
        artKey: 'Icon_Skill_Test.png'
    };
    return structuredClone({ ...defaultContent, ...overrides });
};

// Helper function to create empty arrays for items/skills when not testing them
const emptyItems: ParsedItemCard[] = [];
const emptySkills: ParsedSkillCard[] = [];

describe('getPatchNotes', () => {
    it('should detect name and tier changes', () => {
        const oldItems = [createMockItem({
            name: 'Old Name',
            startingTier: 'Bronze' as TierType
        })];

        const newItems = [createMockItem({
            name: 'New Name',
            startingTier: 'Silver' as TierType
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items['test-id']).toMatchObject({
            metadata: {
                id: 'test-id',
                name: 'New Name',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Silver'
            },
            name: {
                oldValue: 'Old Name',
                newValue: 'New Name'
            },
            startingTier: {
                oldValue: 'Bronze',
                newValue: 'Silver'
            }
        });
    });

    it('should detect tag and hidden tag changes', () => {
        const oldItems = [createMockItem({
            tags: ['Weapon', 'Core'] as Tag[],
            hiddenTags: ['HealthMax', 'Health'] as HiddenTag[]
        })];

        const newItems = [createMockItem({
            tags: ['Weapon', 'Shield'] as Tag[],
            hiddenTags: ['HealthMax', 'Damage'] as HiddenTag[]
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items['test-id']).toMatchObject({
            metadata: {
                id: 'test-id',
                name: 'Test Item',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Bronze'
            },
            tags: {
                added: expect.arrayContaining(['Shield']),
                removed: expect.arrayContaining(['Core'])
            },
            hiddenTags: {
                added: expect.arrayContaining(['Damage']),
                removed: expect.arrayContaining(['Health'])
            }
        });
    });

    it('should detect tooltip and enchantment changes', () => {
        const oldItems = [createMockItem({
            unifiedTooltips: ['Deal 10 damage', 'Gain 5 shield'],
            enchantments: [{
                type: 'Toxic' as EnchantmentType,
                tooltips: ['Deal 5 poison damage']
            }]
        })];

        const newItems = [createMockItem({
            unifiedTooltips: ['Deal 15 damage', 'Gain 10 shield'],
            enchantments: [{
                type: 'Toxic' as EnchantmentType,
                tooltips: ['Deal 10 poison damage']
            }]
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items['test-id']).toMatchObject({
            metadata: {
                id: 'test-id',
                name: 'Test Item',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Bronze'
            },
            tooltips: [
                { index: 0, oldValue: 'Deal 10 damage', newValue: 'Deal 15 damage' },
                { index: 1, oldValue: 'Gain 5 shield', newValue: 'Gain 10 shield' }
            ],
            enchantments: {
                added: [],
                removed: [],
                modified: [{
                    type: 'Toxic',
                    tooltipChanges: [
                        { index: 0, oldValue: 'Deal 5 poison damage', newValue: 'Deal 10 poison damage' }
                    ]
                }]
            }
        });
    });

    it('should handle new and removed items', () => {
        const oldItems = [createMockItem({
            id: 'removed-id',
            name: 'Removed Item'
        })];

        const newItems = [createMockItem({
            id: 'new-id',
            name: 'New Item'
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items).toMatchObject({
            'removed-id': {
                metadata: {
                    id: 'removed-id',
                    name: 'Removed Item',
                    previousStartingTier: 'Bronze',
                    currentStartingTier: 'Bronze'
                },
                name: {
                    oldValue: 'Removed Item',
                    newValue: null
                },
                tags: {
                    added: [],
                    removed: expect.arrayContaining(['Weapon'])
                },
                heroes: {
                    added: [],
                    removed: expect.arrayContaining(['Pygmalien', 'Common'])
                },
                tooltips: [
                    { index: 0, oldValue: 'Deal 10 damage', newValue: null }
                ]
            },
            'new-id': {
                metadata: {
                    id: 'new-id',
                    name: 'New Item',
                    previousStartingTier: 'Bronze',
                    currentStartingTier: 'Bronze'
                },
                name: {
                    oldValue: null,
                    newValue: 'New Item'
                },
                tags: {
                    added: expect.arrayContaining(['Weapon']),
                    removed: []
                },
                heroes: {
                    added: expect.arrayContaining(['Pygmalien', 'Common']),
                    removed: []
                },
                tooltips: [
                    { index: 0, oldValue: null, newValue: 'Deal 10 damage' }
                ]
            }
        });
    });

    it('should detect skill changes', () => {
        const oldSkills = [createMockSkill({
            name: 'Old Skill',
            startingTier: 'Bronze' as TierType,
            heroes: ['Pygmalien'] as Hero[],
            unifiedTooltips: ['Your weapons deal +5 damage']
        })];

        const newSkills = [createMockSkill({
            name: 'New Skill',
            startingTier: 'Silver' as TierType,
            heroes: ['Pygmalien', 'Dooley'] as Hero[],
            unifiedTooltips: ['Your weapons deal +10 damage']
        })];

        const patchNotes = getPatchNotes(emptyItems, emptyItems, oldSkills, newSkills, "test");

        expect(patchNotes.skills['test-skill-id']).toMatchObject({
            metadata: {
                id: 'test-skill-id',
                name: 'New Skill',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Silver',
                heroes: ['Pygmalien', 'Dooley']
            },
            name: {
                oldValue: 'Old Skill',
                newValue: 'New Skill'
            },
            startingTier: {
                oldValue: 'Bronze',
                newValue: 'Silver'
            },
            heroes: {
                added: ['Dooley'],
                removed: []
            },
            tooltips: [
                { index: 0, oldValue: 'Your weapons deal +5 damage', newValue: 'Your weapons deal +10 damage' }
            ]
        });
    });

    it('should not detect changes when tooltips are reordered', () => {
        const oldItems = [createMockItem({
            unifiedTooltips: ['Deal 10 damage', 'Gain 5 shield']
        })];

        const newItems = [createMockItem({
            unifiedTooltips: ['Gain 5 shield', 'Deal 10 damage']
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");
        expect(patchNotes.items['test-id']).toBeUndefined();
    });

    it('should return empty patch notes when no changes occur', () => {
        const items = [createMockItem()];
        const skills = [createMockSkill()];
        const patchNotes = getPatchNotes(items, items, skills, skills, "test");
        expect(patchNotes.items).toEqual({});
        expect(patchNotes.skills).toEqual({});
    });

    it('should handle partial enchantment tooltip changes', () => {
        const oldItems = [createMockItem({
            enchantments: [{
                type: 'Toxic' as EnchantmentType,
                tooltips: ['Deal 5 poison damage', 'Gain 3 poison shield']
            }]
        })];

        const newItems = [createMockItem({
            enchantments: [{
                type: 'Toxic' as EnchantmentType,
                tooltips: ['Deal 10 poison damage', 'Gain 3 poison shield']
            }]
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items['test-id']).toMatchObject({
            metadata: {
                id: 'test-id',
                name: 'Test Item',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Bronze'
            },
            enchantments: {
                added: [],
                removed: [],
                modified: [{
                    type: 'Toxic',
                    tooltipChanges: [
                        { index: 0, oldValue: 'Deal 5 poison damage', newValue: 'Deal 10 poison damage' }
                    ]
                }]
            }
        });
    });

    it('should handle multiple enchantment changes', () => {
        const oldItems = [createMockItem({
            enchantments: [
                {
                    type: 'Toxic' as EnchantmentType,
                    tooltips: ['Deal 5 poison damage']
                },
                {
                    type: 'Frozen' as EnchantmentType,
                    tooltips: ['Gain 3 frost shield']
                }
            ]
        })];

        const newItems = [createMockItem({
            enchantments: [
                {
                    type: 'Toxic' as EnchantmentType,
                    tooltips: ['Deal 10 poison damage']
                },
                {
                    type: 'Frozen' as EnchantmentType,
                    tooltips: ['Gain 5 frost shield']
                }
            ]
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");

        expect(patchNotes.items['test-id']).toMatchObject({
            metadata: {
                id: 'test-id',
                name: 'Test Item',
                previousStartingTier: 'Bronze',
                currentStartingTier: 'Bronze'
            },
            enchantments: {
                added: [],
                removed: [],
                modified: [
                    {
                        type: 'Toxic',
                        tooltipChanges: [
                            { index: 0, oldValue: 'Deal 5 poison damage', newValue: 'Deal 10 poison damage' }
                        ]
                    },
                    {
                        type: 'Frozen',
                        tooltipChanges: [
                            { index: 0, oldValue: 'Gain 3 frost shield', newValue: 'Gain 5 frost shield' }
                        ]
                    }
                ]
            }
        });
    });

    it('should handle reordered enchantments', () => {
        const oldItems = [createMockItem({
            enchantments: [
                {
                    type: 'Toxic' as EnchantmentType,
                    tooltips: ['Deal 5 poison damage']
                },
                {
                    type: 'Frozen' as EnchantmentType,
                    tooltips: ['Gain 3 frost shield']
                }
            ]
        })];

        const newItems = [createMockItem({
            enchantments: [
                {
                    type: 'Frozen' as EnchantmentType,
                    tooltips: ['Gain 3 frost shield']
                },
                {
                    type: 'Toxic' as EnchantmentType,
                    tooltips: ['Deal 5 poison damage']
                }
            ]
        })];

        const patchNotes = getPatchNotes(oldItems, newItems, emptySkills, emptySkills, "test");
        expect(patchNotes.items['test-id']).toBeUndefined();
    });
}); 