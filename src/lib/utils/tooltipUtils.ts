import type { TierType } from "$lib/types";
import type { KeywordPart } from "./keywordUtil";

export function replaceMultiplier(input: string): string {
  const multiplierMap: Record<string, string> = {
    half: "0.5x",
    double: "2x",
    twice: "2x",
    triple: "3x",
    quadruple: "4x",
  };

  // Match "equal to (double|triple|quadruple)" and preserve the rest of the sentence
  return input.replace(
    /equal to (half|double|twice|triple|quadruple)/,
    (match, multiplier) => `equal to ${multiplierMap[multiplier]}`
  ).replace(
    /equal to (?!0.5x|2x|3x|4x)/, // For cases with "this" or other default words
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

export function normalizePlurality(input: string): string {
  // Step 1: Temporarily replace (s) with a marker
  const placeholder = '__PLURAL_MARKER__';
  const inputWithMarker = input.replace(/\(s\)/g, placeholder);

  // Step 2: Run the plurality normalization as before
  const result = inputWithMarker.replace(/\(([^)]+)\)/g, (match: string, group: string) => {
    const parts = group.split('/');
    const uniqueParts = Array.from(new Set(parts));

    if (uniqueParts.length === 2) {
      const [a, b] = uniqueParts;

      // Case 1: item/items => item(s)
      if (b === `${a}s`) {
        return `${a}(s)`;
      }

      // Case 2: item/item(s) or items/item(s) => item(s)
      if (
        (a === b.replace(placeholder, '')) ||
        (b === a.replace(placeholder, ''))
      ) {
        return a.includes(placeholder) ? a : b;
      }
    }

    if (uniqueParts.length === 1) {
      return match;
    }

    return match;
  });

  // Step 3: Restore (s) from the marker
  return result.replace(new RegExp(placeholder, 'g'), '(s)');
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

export function adjustPunctuationInsideParentheses(input: string): string {
  return input.replace(/\(([^)]+)\)/g, (_, content: string) => {
    // Remove punctuation unless it's between two digits (part of a number)
    const sanitizedContent = content.replace(
      /([.,])/g,
      (match, punct, offset, str) => {
        const prevChar = str[offset - 1];
        const nextChar = str[offset + 1];
        // Keep punctuation if between two digits
        if (/\d/.test(prevChar) && /\d/.test(nextChar)) {
          return punct;
        }
        // Otherwise, remove it (we'll move punctuation outside)
        return '';
      }
    ).trim();

    // Add a period outside if any punctuation was removed (except inside numbers)
    const punctuationRemoved = /([.,])(?!\d)/.test(content);

    return `(${sanitizedContent})${punctuationRemoved ? '.' : ''}`;
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

export type TierPart = {
  type: "tier";
  parts: { text: string; tierType: TierType | null }[];
};

export type TooltipPart = string | KeywordPart | TierPart;

export function highlightTiers(text: string, startingTier: TierType): Array<string | TierPart> {
  if (!text) {
    return [];
  }

  const startTierIndex = tierOrder.indexOf(startingTier);
  if (startTierIndex === -1) {
    console.warn(`Invalid startingTier: ${startingTier}`);
    return [text];
  }

  const output: Array<string | TierPart> = [];
  const regex = /(\([^)]*\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const index = match.index;

    if (index > lastIndex) {
      output.push(text.substring(lastIndex, index));
    }

    const parenthesisContent = match[1].slice(1, -1);
    const containsSlashes = parenthesisContent.includes("/");

    if (containsSlashes) {
      const parts = parenthesisContent.split("/");
      const coloredParts = parts.map((part, i) => ({
        text: part.trim(),
        tierType: tierOrder[startTierIndex + i] ?? null,
      }));

      output.push({
        type: "tier",
        parts: coloredParts,
      });
    } else {
      output.push(match[1]);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    output.push(text.substring(lastIndex));
  }

  return output;
}