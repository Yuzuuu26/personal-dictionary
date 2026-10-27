/* =========================================================
  Elements
========================================================= */
// Finds an element by id and returns it with the right type.
// Throws a clear error if the id doesn't exist in the HTML,
// so the rest of the code never has to check for null.
function getEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: #${id}`);
  return el as T;
}

// Same idea as getEl, but searches inside a given element
// (used for the cloned <template> content) using a CSS selector.
export function select<T extends HTMLElement>(root: ParentNode, selector: string): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

// All the elements from index.html that the script needs, looked up once.
export const els = {
  form: getEl<HTMLFormElement>('search-form'),
  input: getEl<HTMLInputElement>('search-input'),
  clearBtn: getEl<HTMLButtonElement>('clear-btn'),
  filters: getEl<HTMLDivElement>('category-filters'),   // where the category chips go
  count: getEl<HTMLParagraphElement>('result-count'),   // "3 words" text
  entries: getEl<HTMLDivElement>('entries'),            // where the word entries go
  loading: getEl<HTMLDivElement>('state-loading'),      // skeleton shown while fetching
  empty: getEl<HTMLDivElement>('state-empty'),          // "No words found" message
  error: getEl<HTMLDivElement>('state-error'),          // "Couldn't load" message
  resetBtn: getEl<HTMLButtonElement>('reset-btn'),
  retryBtn: getEl<HTMLButtonElement>('retry-btn'),
  entryTpl: getEl<HTMLTemplateElement>('entry-template'),      // HTML blueprint for one word
  defTpl: getEl<HTMLTemplateElement>('definition-template'),   // HTML blueprint for one definition
};


/* =========================================================
  Events
========================================================= */
// Wraps a function so it only runs after the user stops triggering it
// for `delay` ms. Stops the list from redrawing on every single keystroke.
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay = 200
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    // Cancel the previous timer and start a new one
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}