// Auto-generated file. Do not edit directly.
// TypeScript representation of processed data.
import type { PatchNotes } from '$lib/types';

const data: PatchNotes = {
  "version": "4.0.0-Jul212025",
  "items": {
    "808ad956-94c2-4510-a06c-396156c59791": {
      "metadata": {
        "id": "808ad956-94c2-4510-a06c-396156c59791",
        "name": "Bladed Hoverboard",
        "previousStartingTier": "Silver",
        "currentStartingTier": "Silver",
        "currentHero": "Vanessa",
        "currentSize": "Medium",
        "type": "item"
      },
      "hiddenTags": {
        "added": [],
        "removed": [
          "Cooldown"
        ]
      }
    },
    "ac05b4d0-9b91-44c9-a4ff-d5606df09775": {
      "metadata": {
        "id": "ac05b4d0-9b91-44c9-a4ff-d5606df09775",
        "name": "Wrist Warrior",
        "previousStartingTier": "Bronze",
        "currentStartingTier": "Silver",
        "currentHero": "Pygmalien",
        "currentSize": "Small",
        "type": "item"
      },
      "startingTier": {
        "oldValue": "Bronze",
        "newValue": "Silver"
      },
      "tooltips": [
        {
          "index": 1,
          "oldValue": "Adjacent items gain (+5/+10/+15/+20) Shield for the fight.",
          "newValue": "Adjacent items gain (+10/+15/+20) Shield for the fight."
        },
        {
          "index": 2,
          "oldValue": "When the item to the left of this Shields, deal (5/10/15/20) damage.",
          "newValue": "When the item to the left of this Shields, deal (10/15/20) damage."
        }
      ],
      "enchantments": {
        "added": [],
        "removed": [],
        "modified": [
          {
            "type": "Icy",
            "tooltipChanges": [
              {
                "index": 0,
                "oldValue": "Freeze 1 small item for 2 second(s).",
                "newValue": null
              },
              {
                "index": 0,
                "oldValue": null,
                "newValue": "Freeze 1 item for 0.5 second(s)."
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
