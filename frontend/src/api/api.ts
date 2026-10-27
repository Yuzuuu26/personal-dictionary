import type { CategoryOption, Word } from "../Interface/interface.js";
import { state } from "../script.js";

/* =========================================================
  Config
   ========================================================= */
const API_URL = 'http://localhost:3001/list/all';
const USE_MOCK = true;

// Sample data in the same shape the backend will send.
// Used while USE_MOCK is true, so the page works without a server.
const MOCK_WORDS: Word[] = [
  {
    id: 1,
    name: 'function',
    categories: [{ id: 1, category: 'programming' }],
    definitions: [
      {
        source: 'https://developer.mozilla.org',
        definition: 'A reusable block of code that performs a specific task.',
      },
      {
        source: 'https://en.wikipedia.org',
        definition: 'A procedure that accepts inputs and optionally returns a value.',
      },
    ],
  },
  {
    id: 2,
    name: 'recursion',
    // A word can belong to more than one category
    categories: [
      { id: 1, category: 'programming' },
      { id: 3, category: 'computer science' },
    ],
    definitions: [
      {
        source: 'https://en.wikipedia.org',
        definition: 'A technique where a function solves a problem by calling itself on smaller inputs.',
      },
    ],
  },
  {
    id: 3,
    name: 'latency',
    categories: [{ id: 2, category: 'networking' }],
    definitions: [
      {
        source: 'https://developer.mozilla.org',
        definition: 'The time it takes for data to travel from its source to its destination.',
      },
    ],
  },
    {
        id: 4,
        name: 'la',
        categories: [{ id: 2, category: 'networking' }],
        definitions: [
            {
                source: 'https://developer.mozilla.org',
                definition: 'The time it takes for data to travel from its source to its destination.',
            },
        ],
    },
];

/* =========================================================
  Data
========================================================= */
// Gets the list of words, either from the mock data or from the backend.
export async function fetchWords(): Promise<Word[]> {
  if (USE_MOCK) {
    await new Promise<void>((resolve) => setTimeout(resolve, 400)); // simulate latency
    return MOCK_WORDS;
  }

  const response = await fetch(API_URL);
  // fetch only rejects on network failure, so HTTP errors (404, 500...)
  // have to be turned into errors manually
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as Word[];

}

// Unique categories across all words, keyed by id, with word counts
// Example result: [{ id: 1, category: 'programming', count: 2 }, ...]
export function getCategories(words: Word[]): CategoryOption[] {
  // A Map keyed by category id makes sure each category appears only once
  const map = new Map<number, CategoryOption>();

  words.forEach((word) => {
    // `!` tells TypeScript that categories is not undefined here
    word.categories!.forEach(({ id, category }) => {
      const existing = map.get(id);
      if (existing) {
        // Category already seen: just add one more word to its count
        existing.count += 1;
      } else {
        // First time seeing this category
        map.set(id, { id, category, count: 1 });
      }
    });
  });

  // Turn the Map into an array and sort the categories A–Z
  return [...map.values()].sort((a, b) => a.category.localeCompare(b.category));
}

// Returns only the words that match the current search text AND category.
export function getFilteredWords(): Word[] {
  const query = state.query.trim().toLowerCase();

  return state.words.filter((word) => {
    // Passes if no category is selected, or the word has the selected one
    const matchesCategory =
      state.categoryId === null ||
      word.categories!.some((c) => c.id === state.categoryId);

    // Passes if the search is empty, or the word name contains the text
    // (both lowercased so the search ignores capital letters)
    const matchesQuery = query === '' || word.name.toLowerCase().includes(query);

    // A word is shown only when it passes both checks
    return matchesCategory && matchesQuery;
  });
}
