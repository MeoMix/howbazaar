export default {
    "54c74b82-0a7d-4dab-a335-f3b0b8b2157c": {
        "$type": "TCardItem",
        "Tiers": {
            "Bronze": {
                "AbilityIds": [
                    "0"
                ],
                "Attributes": {
                    "CooldownMax": 4000,
                    "BuyPrice": 2,
                    "SellPrice": 1,
                    "Multicast": 1,
                    "HealAmount": 5
                },
                "AuraIds": [
                    "1"
                ],
                "TooltipIds": [
                    0,
                    1
                ]
            },
            "Silver": {
                "AbilityIds": [
                    "0"
                ],
                "Attributes": {
                    "BuyPrice": 4,
                    "SellPrice": 2,
                    "HealAmount": 15
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
                    "HealAmount": 30
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
                    "HealAmount": 50
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
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Heavy Uwashiwali Bird Ability",
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
                        "MigrationData": "15ea282b-eaca-4c1f-be5f-504f96665dea",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "a1a09811-d2a0-44c0-b88d-827902f7b07d",
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
                    "SlowTargets": 1,
                    "SlowAmount": 1000
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
                                "Key": "294cf6c3-7e35-448f-adcc-4aebcf61b5ca",
                                "Text": "Slow {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Icy": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Icy Uwashiwali Bird Ability",
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
                        "MigrationData": "433cf4c2-05cd-42d7-93f1-d03aa953c926",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "9e1630d7-bc40-4ddb-bf36-31e745be5e35",
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
                                "Key": "43d78bb7-1d18-42a2-a763-51bcda47973b",
                                "Text": "Freeze {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Turbo": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Turbo Uwashiwali Bird Ability",
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
                        "MigrationData": "dc4f85d4-134d-4d35-8fc3-ef52d3423944",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "e2476803-17d3-4e4b-876b-d2941f621f45",
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
                                "Key": "5b843a85-6e5f-4ca5-ac7a-2befc56ccc21",
                                "Text": "Haste {ability.e1.targets} item for {ability.e1} second."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Shielded": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shielded Uwashiwali Bird Ability",
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
                        "MigrationData": "c0b5b16b-f2cb-4894-a267-97e9dc78f0b5",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "bdf51f9e-e519-47c4-b1fa-542b50412301",
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
                    "ShieldApplyAmount": 10
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
                                "Key": "efef46e8-c8a3-405d-bc82-cbf01e222dde",
                                "Text": "Shield {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Restorative": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Restorative Uwashiwali Bird Aura",
                        "InternalDescription": "Restorative 1",
                        "Action": {
                            "$type": "TAuraActionCardModifyAttribute",
                            "AttributeType": "HealAmount",
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
                        "ActiveIn": "HandAndStash",
                        "MigrationData": "",
                        "Prerequisites": null,
                        "TranslationKey": "adb239b2-d071-4ee6-b83a-24b5b7634161",
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
                    "Heal"
                ],
                "Localization": {
                    "Tooltips": []
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Toxic": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Toxic Uwashiwali Bird Ability",
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
                        "MigrationData": "badae0ee-14ed-4b94-9d21-6ed92074052c",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "6d7e7402-3695-4e6a-94b3-5b289aae6fd6",
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
                    "PoisonApplyAmount": 1
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
                                "Key": "079039ec-b280-46ed-847e-07fce36e2120",
                                "Text": "Poison {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Fiery": {
                "Abilities": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Fiery Uwashiwali Bird Ability",
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
                        "MigrationData": "1f5e3f8a-2cff-4790-a843-e3e1c564175f",
                        "Prerequisites": null,
                        "Priority": "Medium",
                        "TranslationKey": "427c48dd-ffac-40de-875d-ad9ac9471094",
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
                    "BurnApplyAmount": 1
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
                                "Key": "f0151390-76da-4395-901b-21e7779124f4",
                                "Text": "Burn {ability.e1}."
                            },
                            "TooltipType": "Active"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            },
            "Shiny": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Shiny Uwashiwali Bird Aura",
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
                        "TranslationKey": "6df46572-afb6-4b28-a5aa-16d80b263c44",
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
                    "Friend"
                ]
            },
            "Deadly": {
                "Abilities": {},
                "Attributes": {},
                "Auras": {
                    "e1": {
                        "Id": "e1",
                        "InternalName": "Deadly Uwashiwali Bird Aura",
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
                        "TranslationKey": "826e2ee1-7da6-4570-a0ef-7f3b4e493de7",
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
                    "Friend"
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
                                "Key": "6cd40fd7-752d-49a7-9211-ed3343058789",
                                "Text": "This cannot be Frozen, Slowed or Destroyed."
                            },
                            "TooltipType": "Passive"
                        }
                    ]
                },
                "Tags": [
                    "Friend"
                ]
            }
        },
        "Type": "Item",
        "Id": "54c74b82-0a7d-4dab-a335-f3b0b8b2157c",
        "Version": "1.0.0",
        "InternalName": "Uwashiwali Bird",
        "InternalDescription": "",
        "StartingTier": "Bronze",
        "Size": "Small",
        "Heroes": [
            "Pygmalien"
        ],
        "Tags": [
            "Friend"
        ],
        "HiddenTags": [
            "Heal"
        ],
        "ArtKey": "5711b25e7e4f12b458bb75b080fbfca8",
        "SpawningEligibility": "Always",
        "CardPackId": "Pygmalien_Core",
        "TranslationKey": "4e95a85466a3a2ae6549383bfe304c23",
        "AudioKey": "",
        "Localization": {
            "Description": null,
            "FlavorText": null,
            "Title": {
                "Key": "4e95a85466a3a2ae6549383bfe304c23",
                "Text": "Uwashiwali Bird"
            },
            "Tooltips": [
                {
                    "Content": {
                        "Key": "c13769283379acda5341aba3c4ae60a1",
                        "Text": "Heal {ability.0}."
                    },
                    "TooltipType": "Active"
                },
                {
                    "Content": {
                        "Key": "04f8c372cd98312de13512356200c515",
                        "Text": "This has +{aura.1.mod} Multicast for each Property you have. [{aura.1}]"
                    },
                    "TooltipType": "Passive"
                }
            ]
        },
        "Abilities": {
            "0": {
                "Id": "0",
                "InternalName": "Uwashiwali Bird 1",
                "InternalDescription": "Heal {ability.0}.",
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
                "MigrationData": "33d73bb9-fba7-4d68-922c-404bb9cde5b8",
                "Prerequisites": null,
                "Priority": "High",
                "TranslationKey": "c13769283379acda5341aba3c4ae60a1",
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
                "InternalName": "Uwashiwali Bird 2",
                "InternalDescription": "This has +{aura.1} Multicast for each Property you have.",
                "Action": {
                    "$type": "TAuraActionCardModifyAttribute",
                    "AttributeType": "Multicast",
                    "Operation": "Add",
                    "Value": {
                        "$type": "TReferenceValueCardCount",
                        "Target": {
                            "$type": "TTargetCardSection",
                            "TargetSection": "SelfHand",
                            "ExcludeSelf": false,
                            "Conditions": {
                                "$type": "TCardConditionalTag",
                                "Tags": [
                                    "Property"
                                ],
                                "Operator": "Any"
                            }
                        },
                        "DefaultValue": 0.0,
                        "Modifier": {
                            "ModifyMode": "Multiply",
                            "Value": 2.0
                        }
                    },
                    "Target": {
                        "$type": "TTargetCardSelf",
                        "Conditions": null
                    }
                },
                "ActiveIn": "HandAndStash",
                "MigrationData": "3e7ae58c-5417-4018-8077-60ecfc69ae85",
                "Prerequisites": null,
                "TranslationKey": "04f8c372cd98312de13512356200c515",
                "VFXConfig": {
                    "VFXIsTakeover": false,
                    "VFXOverrideKey": null,
                    "VFXShouldPlay": true
                }
            }
        }
    }
} as const;