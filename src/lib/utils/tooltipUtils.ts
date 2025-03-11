import type { TierType } from "$lib/types";

export function replaceMultiplier(input: string): string {
    const multiplierMap: Record<string, string> = {
        double: "2x",
        twice: "2x",
        triple: "3x",
        quadruple: "4x",
    };

    // Match "equal to (double|triple|quadruple)" and preserve the rest of the sentence
    return input.replace(
        /equal to (double|twice|triple|quadruple)/,
        (match, multiplier) => `equal to ${multiplierMap[multiplier]}`
    ).replace(
        /equal to (?!2x|3x|4x)/, // For cases with "this" or other default words
        "equal to 1x "
    );
}

export function mergeStrings(strings: string[]): string {
    if (strings.length === 0) return "";

    // Tokenize strings into arrays of words, splitting by whitespace
    const tokenized = strings.map(str => str.split(/\s+/));
    const maxTokens = Math.max(...tokenized.map(tokens => tokens.length));

    // Compare tokens column by column
    const mergedTokens: string[] = [];
    for (let i = 0; i < maxTokens; i++) {
        const column = tokenized.map(tokens => tokens[i] || ""); // Get the token at position i or empty string

        // Check if all tokens in the column are identical
        const uniqueTokens = Array.from(new Set(column));
        if (uniqueTokens.length === 1) {
            mergedTokens.push(uniqueTokens[0]); // Use the single identical token
        } else {
            const group = column.join("/").replace(/\/+$/, ""); // Join non-matching tokens, handling empty tokens
            mergedTokens.push(`(${group})`);
        }
    }

    // Reconstruct the merged string
    return cleanup(mergedTokens.join(" ").replace(/\s+/g, " ").trim());
}

function cleanup(input: string) {
    return clean1x(mergeAdjacentParentheses(collapseIdenticalParentheses(convertMultipliersToPercentages(replaceAorAnWithOne(normalizePlurality(adjustPunctuationInsideParentheses(input)))))));
}

// replaceMultipler overreaches sometimes and leaves 1x in situations where the 1x doesn't get combined with 2x/3x
function clean1x(input: string): string {
    // Step 1: Remove all instances of "1x" that are NOT surrounded by parentheses
    const without1x = input.replace(/1x(?![^(]*\))/g, "");

    // Step 2: Collapse multiple consecutive spaces into a single space
    const cleaned = without1x.replace(/\s+/g, " ").trim();

    return cleaned;
}

function collapseIdenticalParentheses(input: string): string {
    // Regular expression to match all substrings within parentheses
    const regex = /\(([^)]+)\)/g;

    // Replace the matched substrings based on the collapsing logic
    return input.replace(regex, (match, group: string) => {
        // Split the content by '/'
        const parts = group.split('/');

        // Only process if there is at least one '/' (i.e., multiple parts)
        if (parts.length > 1) {
            // Check if all parts are identical
            const allIdentical = parts.every(part => part === parts[0]);

            if (allIdentical) {
                return parts[0]; // Replace with the single unique part
            }
        }

        // If conditions are not met, return the original match unmodified
        return match;
    });
}

function convertMultipliersToPercentages(input: string): string {
    return input.replace(/\(([^)]+)\)/g, (match, content: string) => {
        // Split the content inside the parentheses
        const parts = content.split('/');
        // Check if there's an existing percentage in the parts
        const hasPercentage = parts.some((part) => /\+?\d+%/.test(part));

        if (!hasPercentage) {
            // If no percentage exists, return the match unchanged
            return match;
        }

        // Replace 'double', 'triple', 'quadruple' with percentages
        const updatedParts = parts.map((part) => {
            switch (part.trim().toLowerCase()) {
                case 'double':
                    return '+100%';
                case 'triple':
                    return '+200%';
                case 'quadruple':
                    return '+300%';
                default:
                    return part;
            }
        });

        // Join the updated parts back together and return the updated parenthesis
        return `(${updatedParts.join('/')})`;
    });
}

function normalizePlurality(input: string): string {
    return input.replace(/\(([^)]+)\)/g, (match, group) => {
        const parts = group.split('/');
        const uniqueParts = Array.from(new Set(parts));

        // Check if all parts differ solely by plurality (e.g., "item/items/items/items")
        if (
            uniqueParts.length === 2 &&
            uniqueParts[1] === `${uniqueParts[0]}s`
        ) {
            return `${uniqueParts[0]}(s)`; // Replace with the plural form (e.g., "items")
        }

        // Do not alter groups that are simple optional suffixes like "(s)"
        if (uniqueParts.length === 1) {
            return match; // Retain "(s)" or similar cases unchanged
        }

        return match; // Keep original match if no conditions are met
    });
}

/**
 * Function to merge adjacent parenthesis groups of the form `(/word)`
 * into a single group with words separated by spaces.
 * 
 * @param input - The input string to process.
 * @returns The processed string with merged parenthesis groups.
 */
function mergeAdjacentParentheses(input: string): string {
    // Regular expression to find two or more adjacent `(/word)` groups.
    const regex = /(\(\/[^)]+\))(?:\s*(\(\/[^)]+\)))+/g;

    // Replace each matched sequence with a single merged group.
    return input.replace(regex, (match) => {
        // Extract all `(/word)` parts within the matched sequence.
        const tokens = match.match(/\(\/[^)]+\)/g);
        if (tokens) {
            // Remove the leading `(/` and trailing `)` from each token to get the word.
            const words = tokens.map(token => token.slice(2, -1));
            // Join the words with a space.
            const mergedContent = words.join(' ');
            // Wrap the merged content back into a single `(/...)` group.
            return `(/${mergedContent})`;
        }
        // If no tokens are found, return the original match unmodified.
        return match;
    });
}

function replaceAorAnWithOne(input: string): string {
    // Regular expression to match text inside parentheses
    const regex = /\(([^)]+)\)/g;

    // Replace matches inside parentheses
    return input.replace(regex, (match) => {
        return match.replace(/\b(a|an)\b/gi, "1");
    });
}

function adjustPunctuationInsideParentheses(input: string): string {
    return input.replace(/\(([^)]+)\)/g, (_, content) => {
        // Remove all periods and commas from inside the parentheses
        const sanitizedContent = content.replace(/[.,]+/g, '').trim();
        // Append a single period or comma outside if any existed inside
        const punctuation = content.match(/[.,]/) ? '.' : '';
        return `(${sanitizedContent})${punctuation}`;
    });
}

export function unifyTooltips(tooltipsByTier: string[][]): string[] {
    const maxTooltips = Math.max(...tooltipsByTier.map(tooltips => tooltips.length));
    const transposed: string[][] = Array.from({ length: maxTooltips }, (_, i) =>
        tooltipsByTier.map(tooltips => tooltips[i]).filter(Boolean)
    );

    return transposed.map(tooltipGroup => {
        const allIdentical = tooltipGroup.every(tooltip => tooltip === tooltipGroup[0]);
        if (allIdentical) {
            return tooltipGroup[0];
        }

        return mergeStrings(tooltipGroup.map(replaceMultiplier));
    });
}

const tierOrder = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"] as const;

// Define keyword mappings for game effect styling
const keywordEffectMap: Record<string, string> = {
  "Crit Chance": "physical",
  "Damage": "physical",
  "Damages": "physical",
  "Heal": "heal",
  "Heals": "heal",
  "Max Health": "heal",
  "Regeneration": "heal",
  "Ammo": "ammo",
  "Max Ammo": "ammo",
  "Shield": "shield",
  "Shields": "shield",
  "Haste": "haste",
  "Hastes": "haste",
  "Charge": "charge",
  "Charges": "charge",
  "Slow": "slow",
  "Slows": "slow",
  "Poison": "poison",
  "Poisons": "poison",
  "Freeze": "freeze",
  "Burn": "burn",
  "Burns": "burn",
  "Friend": "tag",
  "Friends": "tag",
  "Property": "tag",
  "Properties": "tag",
  "Weapon": "tag",
  "Weapons": "tag",
  "Vehicle": "tag",
  "Vehicles": "tag",
  "Tool": "tag",
  "Tools": "tag",
  "Aquatic": "tag",
  "Toy": "tag",
  "Apparel": "tag"
};

// Define types for tooltip rendering
export type TooltipKeywordPart = {
  text: string;
  effect: string;
};

export type TooltipTierPart = {
  bold: boolean;
  parts: { text: string; tierType: TierType | null }[];
  original: string;
};

export type TooltipPart = string | TooltipKeywordPart | TooltipTierPart;

/**
 * Converts a string to title case (first letter of each word capitalized)
 * 
 * @param text The text to convert to title case
 * @returns The title-cased text
 */
function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
}

/**
 * Processes a text string and wraps keywords with their effect styling information
 * 
 * @param text The text to process for keywords
 * @returns An array of text segments with styling information
 */
function processKeywords(text: string): Array<string | TooltipKeywordPart> {
  if (!text) return [text];
  
  const result: Array<string | TooltipKeywordPart> = [];
  let remainingText = text;
  
  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Object.keys(keywordEffectMap).sort((a, b) => b.length - a.length);
  
  while (remainingText.length > 0) {
    let matchFound = false;
    let earliestIndex = remainingText.length;
    let matchedKeyword = "";
    
    // Find the earliest occurring keyword in the remaining text
    for (const keyword of sortedKeywords) {
      // Case insensitive search
      const lowerText = remainingText.toLowerCase();
      const lowerKeyword = keyword.toLowerCase();
      const index = lowerText.indexOf(lowerKeyword);
      
      if (index === -1) continue;
      
      // Check if this is a whole word match by examining characters before and after
      const beforeChar = index === 0 ? ' ' : remainingText[index - 1];
      const afterChar = index + keyword.length >= remainingText.length ? ' ' : remainingText[index + keyword.length];
      
      // Word boundaries are spaces, punctuation, or start/end of string
      const isWordBoundaryBefore = /[\s.,;:!?()\[\]{}]/.test(beforeChar) || index === 0;
      const isWordBoundaryAfter = /[\s.,;:!?()\[\]{}]/.test(afterChar) || index + keyword.length === remainingText.length;
      
      // Only consider valid whole word matches
      if (!isWordBoundaryBefore || !isWordBoundaryAfter) continue;
      
      // If this keyword appears earlier than any previously found keyword, use it
      if (index < earliestIndex) {
        earliestIndex = index;
        matchedKeyword = keyword;
        matchFound = true;
      }
    }
    
    if (matchFound) {
      // Add text before the keyword
      if (earliestIndex > 0) {
        result.push(remainingText.substring(0, earliestIndex));
      }
      
      // Add the keyword with its effect, converting to title case
      const actualKeyword = remainingText.substring(earliestIndex, earliestIndex + matchedKeyword.length);
      result.push({
        text: toTitleCase(actualKeyword),
        effect: keywordEffectMap[matchedKeyword]
      });
      
      // Update remaining text
      remainingText = remainingText.substring(earliestIndex + matchedKeyword.length);
    } else {
      // If no keyword was found, add the remaining text and exit
      result.push(remainingText);
      break;
    }
  }
  
  return result;
}

/**
 * Parses a tooltip string and assigns colors to parts within parentheses.
 *
 * @param {string} str - The tooltip string to parse.
 * @param {string} startingTier - The starting tier of the card.
 * @returns {Array<TooltipPart>} An array of parts where each part is either a string or an object with styling information.
 */
export function parseTooltipForRendering(str: string, startingTier: TierType): Array<TooltipPart> {
    const output: Array<TooltipPart> = [];

    const regex = /(\([^)]*\))/g; // Matches content within parentheses
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      const index = match.index;

      // Add text before the current parenthesis with keyword processing
      if (index > lastIndex) {
        const textBefore = str.substring(lastIndex, index);
        const processedText = processKeywords(textBefore);
        output.push(...processedText);
      }

      // Extract content within parentheses without the parentheses
      const parenthesisContent = match[1].slice(1, -1);

      // Check if the content contains slashes
      const containsSlashes = parenthesisContent.includes("/");

      if (containsSlashes) {
        // Split the content by '/'
        const parts = parenthesisContent.split('/');

        // Determine the starting index based on the startingTier
        let startTierIndex = tierOrder.indexOf(startingTier);
        if (startTierIndex === -1) {
          startTierIndex = 0; // Default to "bronze" if startingTier is invalid
        }

        let coloredParts: { text: string, tierType: TierType | null }[] = [];

        // Assign tiers starting from the startingTier
        parts.forEach((part, i) => {
          const tierIndex = startTierIndex + i;
          if (tierIndex < tierOrder.length) {
            const tierType = tierOrder[tierIndex];
            // Title case the text for tier-colored parts
            coloredParts.push({ text: toTitleCase(part.trim()), tierType });
          } else {
            // If tiers exceed the defined order, render without coloring but still title case
            coloredParts.push({ text: toTitleCase(part.trim()), tierType: null });
          }
        });

        // Add the parenthesis block to the output with bold and colored parts
        output.push({
          bold: true,
          parts: coloredParts,
          original: match[1], // Original parenthesis including parentheses
        });
      } else {
        // No slashes: Process for keywords
        const processedContent = processKeywords(match[1]);
        output.push(...processedContent);
      }

      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last parenthesis with keyword processing
    if (lastIndex < str.length) {
      const remainingText = str.substring(lastIndex);
      const processedRemaining = processKeywords(remainingText);
      output.push(...processedRemaining);
    }

    return output;
}