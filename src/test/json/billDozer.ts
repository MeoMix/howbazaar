export default {
    "c9f75211-7012-418d-b53f-3f5ac5959b62": {
        "$type": "TCardItem",
        "Tiers": {
            "Silver": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "CooldownMax": 5000,
                    "BuyPrice": 12,
                    "SellPrice": 6,
                    "Multicast": 1,
                    "DamageAmount": 20,
                    "Custom_0": 10,
                    "Custom_1": 90
                },
                "AuraIds": [
                    "2"
                ],
                "TooltipIds": [
                    0,
                    1,
                    2
                ]
            },
            "Gold": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "BuyPrice": 24,
                    "SellPrice": 12,
                    "DamageAmount": 20,
                    "Custom_0": 20,
                    "Custom_1": 80
                },
                "AuraIds": [
                    "2"
                ],
                "TooltipIds": [
                    0,
                    1,
                    3
                ]
            },
            "Diamond": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "BuyPrice": 48,
                    "SellPrice": 24,
                    "DamageAmount": 20,
                    "Custom_0": 30,
                    "Custom_1": 70
                },
                "AuraIds": [
                    "2"
                ],
                "TooltipIds": [
                    0,
                    1,
                    4
                ]
            }
        },
        "Enchantments": {
            "Heavy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Heavy Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionCardSlow",
                            "Target": {
                                "$type": "TTargetCardRandom",
                                "ExcludeSelf": false,
                                "TargetSection": "OpponentHand",
                                "Conditions": {
                                    "$type": "TCardConditionalAttribute",
                                    "Attribute": "CooldownMax",
                                    "ComparisonOperator": "GreaterThan",
                                    "ComparisonValue": {
                                        "$type": "TFixedValue",
                                        "Value": 0.0
                                    }
                                }
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "3212a649-a4c2-4a64-a053-1cf47ad748a7",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "8c60c541-7f67-4360-93eb-cf4985715ac3",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "SlowTargets": 3,
                    "SlowAmount": 2000
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Slow"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "7e803086-d7bc-466f-893d-36557971c53e",
                                "Text": "Slow {ability.e1.targets} items for {ability.e1} seconds."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Icy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Icy Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionCardFreeze",
                            "Target": {
                                "$type": "TTargetCardRandom",
                                "ExcludeSelf": false,
                                "TargetSection": "OpponentHand",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "c34134bb-dbcd-4f97-adad-78a22aaef559",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "ba9cf555-7a26-4858-a872-e558b0701dc0",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "FreezeTargets": 1,
                    "FreezeAmount": 3000
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Freeze"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "d5fb360e-3c1d-48c1-a3c2-6052dd590717",
                                "Text": "Freeze {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Turbo": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Turbo Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionCardHaste",
                            "Target": {
                                "$type": "TTargetCardRandom",
                                "ExcludeSelf": false,
                                "TargetSection": "SelfHand",
                                "Conditions": {
                                    "$type": "TCardConditionalAttribute",
                                    "Attribute": "CooldownMax",
                                    "ComparisonOperator": "GreaterThan",
                                    "ComparisonValue": {
                                        "$type": "TFixedValue",
                                        "Value": 0.0
                                    }
                                }
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "edd36b8e-d9a4-41d4-a5d2-e8cb1eafe5cd",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "b35dfe63-766b-4430-8c73-0b0b55d704ce",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "HasteTargets": 3,
                    "HasteAmount": 2000
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Haste"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "56d6bf96-7eda-4430-b389-250284faa754",
                                "Text": "Haste {ability.e1.targets} items for {ability.e1} seconds."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Shielded": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shielded Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionPlayerShieldApply",
                            "ReferenceValue": null,
                            "Target": {
                                "$type": "TTargetPlayerRelative",
                                "TargetMode": "Self",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "2824700f-9adc-4525-b1c9-0400a2c96459",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "e5d6d0e5-fd3e-47e3-9a92-c22ed6da7bb0",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "ShieldApplyAmount": 75
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Shield"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "11740893-ba13-489b-a41f-6fdb8c69cfb1",
                                "Text": "Shield {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Restorative": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Restorative Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionPlayerHeal",
                            "ReferenceValue": null,
                            "Target": {
                                "$type": "TTargetPlayerRelative",
                                "TargetMode": "Self",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "c16c4f92-5976-4656-b53e-3fa896f3b7c0",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "d748877e-a547-40f1-95b4-1100e50dcc84",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "HealAmount": 110
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Heal"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "ea0a1e40-cb7e-4eae-a3e9-4b9fbb842891",
                                "Text": "Heal {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Toxic": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Toxic Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionPlayerPoisonApply",
                            "ReferenceValue": null,
                            "Target": {
                                "$type": "TTargetPlayerRelative",
                                "TargetMode": "Opponent",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "46e37d48-7b20-4532-a2d5-cf85d9d98687",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "c7173ff5-6682-4d92-ab8d-5532dc124886",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "PoisonApplyAmount": 7
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Poison"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "354d6939-323c-439d-8117-9c207b656fda",
                                "Text": "Poison {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Fiery": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Fiery Bill Dozer Ability",
                        "InternalDescription": "",
                        "Action": {
                            "$type": "TActionPlayerBurnApply",
                            "ReferenceValue": null,
                            "Target": {
                                "$type": "TTargetPlayerRelative",
                                "TargetMode": "Opponent",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "63e1ada4-1dd3-46df-8768-b1d54d5729aa",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "519fbafd-1acc-4d18-ba2b-b5479111551b",
                        "Trigger": {
                            "$type": "TTriggerOnCardFired"
                        },
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "Attributes": {
                    "BurnApplyAmount": 11
                },
                "Auras": {},
                "HasAbilities": true,
                "HasAuras": false,
                "HiddenTags": [
                    "Burn"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "4f7df9ac-7f1c-4be1-b6b8-bc3e900779dc",
                                "Text": "Burn {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Shiny": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shiny Bill Dozer Aura",
                        "InternalDescription": "Shiny 1",
                        "Action": {
                            "$type": "TAuraActionCardModifyAttribute",
                            "AttributeType": "Multicast",
                            "Operation": "Add",
                            "Value": {
                                "$type": "TFixedValue",
                                "Value": 1.0
                            },
                            "Target": {
                                "$type": "TTargetCardSelf",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "",
                        "Prerequisites": null,
                        "TranslationKey": "4494108a-5d23-4749-bc57-a4f17c51e7d5",
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "HasAbilities": false,
                "HasAuras": true,
                "HiddenTags": [
                    "Multicast"
                ],
                "Localization": {
                    "Tooltips": []
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Deadly": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Deadly Bill Dozer Aura",
                        "InternalDescription": "Deadly 50",
                        "Action": {
                            "$type": "TAuraActionCardModifyAttribute",
                            "AttributeType": "CritChance",
                            "Operation": "Add",
                            "Value": {
                                "$type": "TFixedValue",
                                "Value": 50.0
                            },
                            "Target": {
                                "$type": "TTargetCardSelf",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "",
                        "Prerequisites": null,
                        "TranslationKey": "032809d5-f33a-40fd-9c12-d63e485d2656",
                        "VFXConfig": {
                            "VFXIsTakeover": false,
                            "VFXOverrideKey": null,
                            "VFXShouldPlay": true
                        }
                    }
                },
                "HasAbilities": false,
                "HasAuras": true,
                "HiddenTags": [
                    "Crit"
                ],
                "Localization": {
                    "Tooltips": []
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Radiant": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {},
                "HasAbilities": false,
                "HasAuras": false,
                "HiddenTags": [
                    "Slow"
                ],
                "Localization": {
                    "Tooltips": [
                        {
                            "Content": {
                                "Key": "270d3097-6b70-4b4e-9a7d-236c0abd1106",
                                "Text": "This cannot be Frozen, Slowed or Destroyed."
                            },
                            "TooltipType": "Passive"
                        }
                    ]
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            },
            "Obsidian": {
                "Abilities": {},
                "Attributes": {
                    "Lifesteal": 100
                },
                "Auras": {},
                "HasAbilities": false,
                "HasAuras": false,
                "HiddenTags": [
                    "Lifesteal"
                ],
                "Localization": {
                    "Tooltips": []
                },
                "Tags": [
                    "Friend",
                    "Vehicle",
                    "Weapon"
                ]
            }
        },
        "Type": "Item",
        "Id": "c9f75211-7012-418d-b53f-3f5ac5959b62",
        "Version": "1.0.0",
        "InternalName": "Bill Dozer",
        "InternalDescription": "",
        "StartingTier": "Silver",
        "Size": "Large",
        "Heroes": [
            "Dooley"
        ],
        "Tags": [
            "Friend",
            "Vehicle",
            "Weapon"
        ],
        "HiddenTags": [
            "Damage",
            "Cooldown"
        ],
        "ArtKey": "874e76b266dae2f4aaf5fb7fc3253e56",
        "SpawningEligibility": "Always",
        "CardPackId": "Dooley_Core",
        "TranslationKey": "e87d0052458bb02e1215fb564a226d92",
        "AudioKey": "",
        "Localization": {
            "Description": null,
            "FlavorText": null,
            "Title": {
                "Key": "e87d0052458bb02e1215fb564a226d92",
                "Text": "Bill Dozer"
            },
            "Tooltips": [
                {
                    "Content": {
                        "Key": "e87d0052458bb02e1215fb564a226d92",
                        "Text": "Deal {ability.0} damage."
                    },
                    "TooltipType": "Active"
                },
                {
                    "Content": {
                        "Key": "ac2a1b8854f5f76c7e77c5f91da16d0c",
                        "Text": "When you use another Friend, this gains {ability.1} damage for the fight."
                    },
                    "TooltipType": "Passive"
                },
                {
                    "Content": {
                        "Key": "fb2a6f0a175ab5d4658f06e201393105",
                        "Text": "Your other Friends' cooldowns are reduced by 20%."
                    },
                    "TooltipType": "Passive"
                },
                {
                    "Content": {
                        "Key": "fb2a6f0a175ab5d4658f06e201393105",
                        "Text": "Your other Friends' cooldowns are reduced by 30%."
                    },
                    "TooltipType": "Passive"
                },
                {
                    "Content": {
                        "Key": "fb2a6f0a175ab5d4658f06e201393105",
                        "Text": "Your other Friends' cooldowns are reduced by 40%."
                    },
                    "TooltipType": "Passive"
                }
            ]
        },
        "Abilities": {
            "0": {
                "Id": "0",
                "InternalName": "Bill Dozer",
                "InternalDescription": "Deal {ability.0} damage.",
                "Action": {
                    "$type": "TActionPlayerDamage",
                    "ReferenceValue": null,
                    "Target": {
                        "$type": "TTargetPlayerRelative",
                        "TargetMode": "Opponent",
                        "Conditions": null
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "47009f02-bbea-4062-b464-ccda70ec3b80",
                "Prerequisites": null,
                "Priority": "Medium",
                "TranslationKey": "e87d0052458bb02e1215fb564a226d92",
                "Trigger": {
                    "$type": "TTriggerOnCardFired"
                },
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": "Projectile_Blunt_PV",
                    "VFXShouldPlay": true
                }
            },
            "1": {
                "Id": "1",
                "InternalName": "Bill Dozer 2",
                "InternalDescription": "When you use another Friend, this gains {ability.2} damage for the fight.",
                "Action": {
                    "$type": "TActionCardModifyAttribute",
                    "Value": {
                        "$type": "TReferenceValueCardAttribute",
                        "Target": {
                            "$type": "TTargetCardSelf",
                            "Conditions": null
                        },
                        "AttributeType": "Custom_0",
                        "DefaultValue": 0.0,
                        "Modifier": null
                    },
                    "AttributeType": "DamageAmount",
                    "Operation": "Add",
                    "Duration": {
                        "$type": "TDeterminantDuration",
                        "DurationType": "UntilEndOfCombat"
                    },
                    "TargetCount": null,
                    "Target": {
                        "$type": "TTargetCardSelf",
                        "Conditions": null
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "5419b4a9-8fe8-4c50-b707-8dd3d9c93620",
                "Prerequisites": null,
                "Priority": "Low",
                "TranslationKey": "ac2a1b8854f5f76c7e77c5f91da16d0c",
                "Trigger": {
                    "$type": "TTriggerOnItemUsed",
                    "Subject": {
                        "$type": "TTargetCardSection",
                        "TargetSection": "SelfHand",
                        "ExcludeSelf": true,
                        "Conditions": {
                            "$type": "TCardConditionalTag",
                            "Tags": [
                                "Friend"
                            ],
                            "Operator": "Any"
                        }
                    }
                },
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            }
        },
        "Auras": {
            "2": {
                "Id": "2",
                "InternalName": "Bill Dozer 3",
                "InternalDescription": "Your other Friends' cooldowns are reduced by {aura.1}%.",
                "Action": {
                    "$type": "TAuraActionCardModifyAttribute",
                    "AttributeType": "CooldownMax",
                    "Operation": "Multiply",
                    "Value": {
                        "$type": "TReferenceValueCardAttribute",
                        "Target": {
                            "$type": "TTargetCardSelf",
                            "Conditions": null
                        },
                        "AttributeType": "Custom_1",
                        "DefaultValue": 0.0,
                        "Modifier": {
                            "ModifyMode": "Multiply",
                            "Value": 0.01
                        }
                    },
                    "Target": {
                        "$type": "TTargetCardSection",
                        "TargetSection": "SelfHand",
                        "ExcludeSelf": true,
                        "Conditions": {
                            "$type": "TCardConditionalTag",
                            "Tags": [
                                "Friend"
                            ],
                            "Operator": "Any"
                        }
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "d45c0206-7c4b-4db5-a688-3526446e1cff",
                "Prerequisites": null,
                "TranslationKey": "fb2a6f0a175ab5d4658f06e201393105",
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            }
        }
    }
} as const;