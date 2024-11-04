export default {
    "3ce7312c-aa95-4711-9a2b-827609a380b4": {
        "$type": "TCardItem",
        "Tiers": {
            "Bronze": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "CooldownMax": 8000,
                    "BuyPrice": 4,
                    "SellPrice": 2,
                    "Multicast": 1,
                    "ReloadAmount": 99,
                    "ReloadTargets": 1,
                    "Custom_0": 4,
                    "Custom_1": 1
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
            "Silver": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "BuyPrice": 8,
                    "SellPrice": 4,
                    "Custom_0": 8,
                    "Custom_1": 2
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
                    "BuyPrice": 16,
                    "SellPrice": 8,
                    "Custom_0": 12,
                    "Custom_1": 3
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
            "Diamond": {
                "AbilityIds": [
                    "0",
                    "1"
                ],
                "Attributes": {
                    "BuyPrice": 32,
                    "SellPrice": 16
                },
                "AuraIds": [
                    "2"
                ],
                "TooltipIds": [
                    0,
                    1,
                    2
                ]
            }
        },
        "Enchantments": {
            "Heavy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Heavy Satchel Ability",
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
                        "MigrationData": "66d64904-a012-46ba-a8b2-03364ce72ab1",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "d226d400-1ac8-4f9b-9f14-35f5a6946a87",
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
                    "SlowTargets": 2,
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
                                "Key": "903b4cb7-fa68-4ea7-9132-36697d24c897",
                                "Text": "Slow {ability.e1.targets} items for {ability.e1} seconds."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Icy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Icy Satchel Ability",
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
                        "MigrationData": "87097295-5e69-494e-a7e3-79b58d9a9963",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "3d02f31c-7b48-47b7-a454-9f2696983784",
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
                    "FreezeAmount": 2000
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
                                "Key": "86a58921-2c75-4dde-92bd-c944ed68a09b",
                                "Text": "Freeze {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Turbo": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Turbo Satchel Ability",
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
                        "MigrationData": "42f34df9-5c14-47c8-b90a-b99dc0506b10",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "37093cd6-d1ac-46ed-b802-2896f7810662",
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
                    "HasteTargets": 2,
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
                                "Key": "148654f6-30fb-4966-a05a-94eb4c265b4c",
                                "Text": "Haste {ability.e1.targets} items for {ability.e1} seconds."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Shielded": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shielded Satchel Ability",
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
                        "MigrationData": "ea7def6a-b8cd-4c34-8e9a-0a43d0fbb9ed",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "3cc13895-1ed9-4015-ba6a-2ca79b9c7254",
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
                    "ShieldApplyAmount": 70
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
                                "Key": "d99e0494-9133-4bad-a2a9-20f99926c184",
                                "Text": "Shield {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Restorative": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Restorative Satchel Ability",
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
                        "MigrationData": "222a2ea6-c4a7-429b-8fb4-d7b3da47aa45",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "dcf1f71b-6d8f-4545-badb-8f7b50df20fc",
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
                    "HealAmount": 105
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
                                "Key": "b8129f2d-f2e7-4c45-a68a-f93df29ba911",
                                "Text": "Heal {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Toxic": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Toxic Satchel Ability",
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
                        "MigrationData": "c201ba85-bfdf-45b9-a529-a14a06294acc",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "06b7e807-8c52-446e-85b1-2b0f1af3c390",
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
                                "Key": "4a0c742e-2610-4197-b9e0-75d17772e8d2",
                                "Text": "Poison {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Fiery": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Fiery Satchel Ability",
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
                        "MigrationData": "a93e84d1-2b71-4c97-93cb-c1898d964633",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "84222134-e02d-413d-bed0-87a959317947",
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
                    "BurnApplyAmount": 10
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
                                "Key": "2aa9eca9-de72-4f9b-ac42-482ad00dca43",
                                "Text": "Burn {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            },
            "Shiny": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shiny Satchel Aura",
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
                        "TranslationKey": "8adba16f-da60-47eb-a8f3-e72d9738b5b7",
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
                    "Tool"
                ]
            },
            "Deadly": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Deadly Satchel Aura",
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
                        "TranslationKey": "0ad63f22-960a-48e4-a7da-2b3403dfc9f6",
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
                    "Tool"
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
                                "Key": "81e0dbab-fdac-42f0-8f56-6dade57f65a6",
                                "Text": "This cannot be Frozen, Slowed or Destroyed."
                            },
                            "TooltipType": "Passive"
                        }
                    ]
                },
                "Tags": [
                    "Tool"
                ]
            }
        },
        "Type": "Item",
        "Id": "3ce7312c-aa95-4711-9a2b-827609a380b4",
        "Version": "1.0.0",
        "InternalName": "Satchel",
        "InternalDescription": "",
        "StartingTier": "Bronze",
        "Size": "Medium",
        "Heroes": [
            "Mak"
        ],
        "Tags": [
            "Tool"
        ],
        "HiddenTags": [
            "AmmoReference",
            "Regen"
        ],
        "ArtKey": "07b994cbff3f2e943941a7ba9b285e16",
        "SpawningEligibility": "Always",
        "CardPackId": "Mak_Core",
        "TranslationKey": "dc034dcdb8221c0366357f83aaed6104",
        "AudioKey": "",
        "Localization": {
            "Description": null,
            "FlavorText": null,
            "Title": {
                "Key": "dc034dcdb8221c0366357f83aaed6104",
                "Text": "Satchel"
            },
            "Tooltips": [
                {
                    "Content": {
                        "Key": "3d9dd73916ede9b68aeab76fcf8a947e",
                        "Text": "Reload a potion."
                    },
                    "TooltipType": "Active"
                },
                {
                    "Content": {
                        "Key": "76b51b04c262ffdb3af5b26ca645ed5f",
                        "Text": "You have {aura.2} Regeneration."
                    },
                    "TooltipType": "Passive"
                },
                {
                    "Content": {
                        "Key": "76b51b04c262ffdb3af5b26ca645ed5f",
                        "Text": "When you buy a Potion, increase the Regeneration this item gives by {ability.1}."
                    },
                    "TooltipType": "Passive"
                }
            ]
        },
        "Abilities": {
            "0": {
                "Id": "0",
                "InternalName": "Satchel 1",
                "InternalDescription": "Reload a potion.",
                "Action": {
                    "$type": "TActionCardReload",
                    "Target": {
                        "$type": "TTargetCardRandom",
                        "ExcludeSelf": false,
                        "TargetSection": "SelfHand",
                        "Conditions": {
                            "$type": "TCardConditionalAnd",
                            "Conditions": [
                                {
                                    "$type": "TCardConditionalTag",
                                    "Tags": [
                                        "Potion"
                                    ],
                                    "Operator": "Any"
                                },
                                {
                                    "$type": "TCardConditionalAttribute",
                                    "Attribute": "AmmoMax",
                                    "ComparisonOperator": "GreaterThan",
                                    "ComparisonValue": {
                                        "$type": "TFixedValue",
                                        "Value": 0.0
                                    }
                                }
                            ]
                        }
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "acaa9457-da2a-40be-b278-3221ffa8475e",
                "Prerequisites": null,
                "Priority": "Lowest",
                "TranslationKey": "3d9dd73916ede9b68aeab76fcf8a947e",
                "Trigger": {
                    "$type": "TTriggerOnCardFired"
                },
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            },
            "1": {
                "Id": "1",
                "InternalName": "Satchel 3",
                "InternalDescription": "When you buy a Potion, increase the Regeneration this item gives by {ability.2}.",
                "Action": {
                    "$type": "TActionCardModifyAttribute",
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
                            "Value": 1.0
                        }
                    },
                    "AttributeType": "Custom_1",
                    "Operation": "Add",
                    "Duration": null,
                    "TargetCount": null,
                    "Target": {
                        "$type": "TTargetCardSelf",
                        "Conditions": null
                    }
                },
                "ActiveIn": "HandAndStash",
                "MigrationData": "dedb3d2b-df36-4e48-9615-25f0d84d6783",
                "Prerequisites": null,
                "Priority": "Low",
                "TranslationKey": "c1db006c3cf5c00be610c9d7a2fd0603",
                "Trigger": {
                    "$type": "TTriggerOnCardPurchased",
                    "Subject": {
                        "$type": "TTargetCardTriggerSource",
                        "ExcludeSelf": false,
                        "Conditions": {
                            "$type": "TCardConditionalAnd",
                            "Conditions": [
                                {
                                    "$type": "TCardConditionalType",
                                    "CardType": "Item",
                                    "IsNot": false
                                },
                                {
                                    "$type": "TCardConditionalTag",
                                    "Tags": [
                                        "Potion"
                                    ],
                                    "Operator": "Any"
                                }
                            ]
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
                "InternalName": "Satchel 2",
                "InternalDescription": "You have {ability.1} Regeneration.",
                "Action": {
                    "$type": "TAuraActionPlayerModifyAttribute",
                    "Value": {
                        "$type": "TReferenceValueCardAttribute",
                        "Target": {
                            "$type": "TTargetCardSelf",
                            "Conditions": null
                        },
                        "AttributeType": "Custom_0",
                        "DefaultValue": 0.0,
                        "Modifier": {
                            "ModifyMode": "Multiply",
                            "Value": 1.0
                        }
                    },
                    "AttributeType": "HealthRegen",
                    "Operation": "Add",
                    "Target": {
                        "$type": "TTargetPlayerRelative",
                        "TargetMode": "Self",
                        "Conditions": null
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "11f5896f-bb1f-425b-8931-a7b189a0d144",
                "Prerequisites": null,
                "TranslationKey": "76b51b04c262ffdb3af5b26ca645ed5f",
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            }
        }
    }
} as const;