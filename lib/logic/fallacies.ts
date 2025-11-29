import type { Fallacy } from "./types";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLACIES_FILE = path.join(DATA_DIR, "logic", "fallacies.json");

/**
 * Load fallacies from JSON file
 */
export function loadFallacies(): Fallacy[] {
  try {
    if (fs.existsSync(FALLACIES_FILE)) {
      const data = fs.readFileSync(FALLACIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading fallacies:", error);
  }

  // Return default fallacies if file doesn't exist
  return getDefaultFallacies();
}

/**
 * Default fallacies if file doesn't exist
 */
function getDefaultFallacies(): Fallacy[] {
  return [
    {
      id: "ad-hominem",
      name: "Ad Hominem",
      description:
        "Attacking the person making the argument rather than the argument itself.",
      example:
        "You can't trust his opinion on climate change because he's not a scientist.",
      correction:
        "Focus on the argument's evidence and reasoning, not the person's credentials.",
      category: "Relevance",
    },
    {
      id: "straw-man",
      name: "Straw Man",
      description:
        "Misrepresenting an opponent's argument to make it easier to attack.",
      example:
        "They want to raise taxes, which means they want to take all your money.",
      correction: "Address the actual argument, not a distorted version of it.",
      category: "Relevance",
    },
    {
      id: "false-dilemma",
      name: "False Dilemma",
      description: "Presenting only two options when more exist.",
      example: "Either you're with us or against us.",
      correction: "Consider all possible options, not just two extremes.",
      category: "Presumption",
    },
    {
      id: "appeal-to-popularity",
      name: "Appeal to Popularity",
      description: "Assuming something is true because many people believe it.",
      example: "Everyone knows that's true, so it must be.",
      correction:
        "Popularity doesn't determine truth; use evidence and reasoning.",
      category: "Relevance",
    },
    {
      id: "slippery-slope",
      name: "Slippery Slope",
      description:
        "Assuming one event will inevitably lead to a chain of negative events.",
      example:
        "If we allow same-sex marriage, next we'll allow people to marry animals.",
      correction:
        "Provide evidence for each step in the chain, not just assume it.",
      category: "Presumption",
    },
  ];
}

/**
 * Detect fallacies in argument text
 */
export function detectFallacies(text: string, fallacies: Fallacy[]): Fallacy[] {
  const detected: Fallacy[] = [];
  const lowerText = text.toLowerCase();

  for (const fallacy of fallacies) {
    const patterns = getFallacyPatterns(fallacy.name);
    const matches = patterns.some((pattern) =>
      new RegExp(pattern, "i").test(lowerText)
    );

    if (matches) {
      detected.push(fallacy);
    }
  }

  return detected;
}

/**
 * Get regex patterns for fallacy detection
 */
function getFallacyPatterns(fallacyName: string): string[] {
  const patterns: Record<string, string[]> = {
    "Ad Hominem": [
      "you can't trust",
      "because (he|she|they) (is|are)",
      "attacking the person",
    ],
    "Straw Man": ["they want to", "misrepresent", "distorted version"],
    "False Dilemma": ["either.*or", "only two options", "with us or against"],
    "Appeal to Popularity": [
      "everyone knows",
      "everyone believes",
      "most people",
    ],
    "Slippery Slope": ["if.*then.*next", "inevitably lead", "chain of events"],
  };

  return patterns[fallacyName] || [];
}
