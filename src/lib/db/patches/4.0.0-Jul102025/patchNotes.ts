// Auto-generated file. Do not edit directly.
// TypeScript representation of processed data.
import type { PatchNotes } from '$lib/types';

const data: PatchNotes = {
  "version": "4.0.0-Jul102025",
  "items": {
    "8f6eebd6-db14-48f8-9407-5962772e7dec": {
      "metadata": {
        "id": "8f6eebd6-db14-48f8-9407-5962772e7dec",
        "name": "Recycling Bin",
        "previousStartingTier": "Silver",
        "currentStartingTier": "Silver",
        "currentHero": "Mak",
        "currentSize": "Medium",
        "type": "item"
      },
      "hiddenTags": {
        "added": [
          "Cooldown"
        ],
        "removed": [
          "Regen",
          "AmmoReference"
        ]
      },
      "enchantments": {
        "added": [],
        "removed": [],
        "modified": [
          {
            "type": "Shiny",
            "tooltipChanges": [
              {
                "index": 0,
                "oldValue": "This has double Regen.",
                "newValue": null
              },
              {
                "index": 0,
                "oldValue": null,
                "newValue": "This has double cooldown reduction."
              }
            ]
          }
        ]
      }
    },
    "a35ea0aa-ff0f-4366-b3dd-561cae7ed725": {
      "metadata": {
        "id": "a35ea0aa-ff0f-4366-b3dd-561cae7ed725",
        "name": "Plasma Grenade",
        "previousStartingTier": "Bronze",
        "currentStartingTier": "Bronze",
        "currentHero": "Dooley",
        "currentSize": "Small",
        "type": "item"
      },
      "enchantments": {
        "added": [],
        "removed": [],
        "modified": [
          {
            "type": "Icy",
            "tooltipChanges": [
              {
                "index": 0,
                "oldValue": "Freeze all enemy small items for 0.5 second(s).",
                "newValue": null
              },
              {
                "index": 0,
                "oldValue": null,
                "newValue": "Freeze all enemy items for 0.5 second(s)."
              }
            ]
          }
        ]
      }
    }
  },
  "skills": {}
};

export default data;
