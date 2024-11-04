export default {
    "26ddca65-5309-4600-88f7-1eb5ffbb5788": {
        "$type": "TCardItem",
        "Tiers": {
            "Silver": {
                "AbilityIds": [
                    "0"
                ],
                "Attributes": {
                    "CooldownMax": 5000,
                    "BuyPrice": 4,
                    "SellPrice": 2,
                    "Multicast": 1,
                    "SlowAmount": 3000,
                    "SlowTargets": 1
                },
                "AuraIds": [
                    "1"
                ],
                "TooltipIds": [
                    0,
                    1
                ]
            },
            "Gold": {
                "AbilityIds": [
                    "0"
                ],
                "Attributes": {
                    "BuyPrice": 8,
                    "SellPrice": 4,
                    "SlowAmount": 3000,
                    "SlowTargets": 2
                },
                "AuraIds": [
                    "1"
                ],
                "TooltipIds": [
                    0,
                    1
                ]
            },
            "Diamond": {
                "AbilityIds": [
                    "0"
                ],
                "Attributes": {
                    "BuyPrice": 16,
                    "SellPrice": 8,
                    "SlowAmount": 3000,
                    "SlowTargets": 3
                },
                "AuraIds": [
                    "1"
                ],
                "TooltipIds": [
                    0,
                    1
                ]
            }
        },
        "Enchantments": {
            "Heavy": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Heavy Amber Aura",
                        "InternalDescription": "Heavy 2",
                        "Action": {
                            "$type": "TAuraActionCardModifyAttribute",
                            "AttributeType": "SlowAmount",
                            "Operation": "Multiply",
                            "Value": {
                                "$type": "TFixedValue",
                                "Value": 2.0
                            },
                            "Target": {
                                "$type": "TTargetCardSelf",
                                "Conditions": null
                            }
                        },
                        "ActiveIn": "HandOnly",
                        "MigrationData": "",
                        "Prerequisites": null,
                        "TranslationKey": "a75321d1-bc60-42a9-b295-523768509bad",
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
                    "Slow"
                ],
                "Localization": {
                    "Tooltips": []
                },
                "Tags": []
            },
            "Icy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Icy Amber Ability",
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
                        "MigrationData": "1a96c882-4b9d-4a6e-a332-b23d02a15976",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "064b63a0-703f-4114-b4d8-2266fa7e6bb5",
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
                    "FreezeAmount": 1000
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
                                "Key": "783a9a9a-182c-4c0e-b7d5-b5020ee0600e",
                                "Text": "Freeze {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Turbo": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Turbo Amber Ability",
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
                        "MigrationData": "11f76f0c-45ee-4ae2-9ff8-23c429a0aeff",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "0eae5f65-832c-458e-8a91-e8123c018231",
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
                    "HasteTargets": 1,
                    "HasteAmount": 1000
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
                                "Key": "999106ff-d7de-47e7-80a9-9c693ec23f7e",
                                "Text": "Haste {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Shielded": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shielded Amber Ability",
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
                        "MigrationData": "4bd981d9-7c07-459e-b827-520bfb78ee13",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "0c66e256-e705-4cd8-b90c-c02da3d423ba",
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
                    "ShieldApplyAmount": 25
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
                                "Key": "f2ed2e9f-0dd2-47c2-840c-44c0a46689d6",
                                "Text": "Shield {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Restorative": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Restorative Amber Ability",
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
                        "MigrationData": "e101e484-9e35-4a8b-bee3-6b03572e011b",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "b0d4165f-4fd4-4f39-9413-b9fc25d72474",
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
                    "HealAmount": 40
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
                                "Key": "a4e038cf-9fbb-4491-bce5-b4052eee7d1c",
                                "Text": "Heal {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Toxic": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Toxic Amber Ability",
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
                        "MigrationData": "cffe926b-e0cb-4931-8261-77c6de5db6a8",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "9ec10897-01e9-40f6-bc09-6aebeaf76917",
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
                    "PoisonApplyAmount": 2
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
                                "Key": "40b10370-2c1b-4415-b2a3-ffa28d7debf8",
                                "Text": "Poison {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Fiery": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Fiery Amber Ability",
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
                        "MigrationData": "6f951128-ddc8-437a-a9dc-1bc478663a1b",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "a9830e3b-8063-4fe2-8756-e03e0b362086",
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
                    "BurnApplyAmount": 4
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
                                "Key": "f333204e-0499-4103-b7ff-9c0e802b807a",
                                "Text": "Burn {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": []
            },
            "Shiny": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shiny Amber Aura",
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
                        "TranslationKey": "45543a96-6067-4ea1-8bad-74447986b96d",
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
                "Tags": []
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
                                "Key": "70983057-a0c8-465d-89c8-8da3a4b3e232",
                                "Text": "This cannot be Frozen, Slowed or Destroyed."
                            },
                            "TooltipType": "Passive"
                        }
                    ]
                },
                "Tags": []
            }
        },
        "Type": "Item",
        "Id": "26ddca65-5309-4600-88f7-1eb5ffbb5788",
        "Version": "1.0.0",
        "InternalName": "Amber",
        "InternalDescription": "",
        "StartingTier": "Silver",
        "Size": "Small",
        "Heroes": [
            "Mak"
        ],
        "Tags": [],
        "HiddenTags": [
            "Slow"
        ],
        "ArtKey": "b2c0b0f9756dc7d47b7c0839575e7f53",
        "SpawningEligibility": "Always",
        "CardPackId": "Mak_Core",
        "TranslationKey": "88068e33c78eb72f1b371c7110846085",
        "AudioKey": "",
        "Localization": {
            "Description": null,
            "FlavorText": null,
            "Title": {
                "Key": "88068e33c78eb72f1b371c7110846085",
                "Text": "Amber"
            },
            "Tooltips": [
                {
                    "Content": {
                        "Key": "9b2fc14706ed95f49030e5fb1fd7e3ec",
                        "Text": "Slow {ability.0.targets} items for {ability.0} seconds."
                    },
                    "TooltipType": "Active"
                },
                {
                    "Content": {
                        "Key": "33c8c85f8aea2101439ed6721f2d8637",
                        "Text": "Your other Slow items have +{aura.1} Slow."
                    },
                    "TooltipType": "Passive"
                }
            ]
        },
        "Abilities": {
            "0": {
                "Id": "0",
                "InternalName": "Amber 1",
                "InternalDescription": "Slow an items for {ability.0} seconds.",
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
                "MigrationData": "5a07f097-c30a-46c0-818a-c520c1eb2494",
                "Prerequisites": null,
                "Priority": "Medium",
                "TranslationKey": "9b2fc14706ed95f49030e5fb1fd7e3ec",
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
        "Auras": {
            "1": {
                "Id": "1",
                "InternalName": "Amber 2",
                "InternalDescription": "Increase your other items' Slow by {aura.1} seconds.",
                "Action": {
                    "$type": "TAuraActionCardModifyAttribute",
                    "AttributeType": "SlowAmount",
                    "Operation": "Add",
                    "Value": {
                        "$type": "TFixedValue",
                        "Value": 1000.0
                    },
                    "Target": {
                        "$type": "TTargetCardSection",
                        "TargetSection": "SelfHand",
                        "ExcludeSelf": true,
                        "Conditions": {
                            "$type": "TCardConditionalHiddenTag",
                            "Tags": [
                                "Slow"
                            ],
                            "Operator": "Any"
                        }
                    }
                },
                "ActiveIn": "HandOnly",
                "MigrationData": "c95fa117-ddb4-4558-889f-4563c53811c6",
                "Prerequisites": null,
                "TranslationKey": "33c8c85f8aea2101439ed6721f2d8637",
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            }
        }
    }
} as const;