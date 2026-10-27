// Tailwind classes for the category chips.
// They live here as strings, so this file must be listed in

import { getCategories, getFilteredWords } from "../api/api.js";
import type { CategoryOption, Word } from "../Interface/interface.js";
import { state } from "../script.js";
import { els, select } from "../utils/dom.utils.js";
import { getHostname } from "../utils/formatters.utils.js";

// Tailwind's content config or the classes won't be generated.
const CHIP_BASE = 'rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700';
const CHIP_ACTIVE = 'border-indigo-700 bg-indigo-700 text-white';
const CHIP_IDLE = 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-800';

// Draws the row of category buttons at the top of the page.
function renderFilters(): void {
    const results = getFilteredWords();
  // "All" comes first, followed by every category found in the data
  const options: CategoryOption[] = [
    { id: null, category: 'All', count: state.words.length },
    ...getCategories(state.words),
  ];

  console.log('words in state:', state.words.length);
  console.log('results after filter:', results.length);
// ...after replaceChildren:

  // Replace whatever buttons are there with a freshly built set
  els.filters.replaceChildren(
    ...options.map((option) => {
      const button = document.createElement('button');
      const isActive = state.categoryId === option.id;

      button.type = 'button';
      // Store the id on the button so the click handler can read it later.
      // "All" uses an empty string because it has no id.
      button.dataset.categoryId = option.id === null ? '' : String(option.id);
      // Tells screen readers whether this chip is currently selected
      button.setAttribute('aria-pressed', String(isActive));
      button.className = `${CHIP_BASE} ${isActive ? CHIP_ACTIVE : CHIP_IDLE}`;
      button.textContent = `${option.category} (${option.count})`;
      return button;
    })
  );
  console.log('entries in DOM:', els.entries.children.length);
  console.log('evenlistener replaceChildren')
}

// Builds the HTML for one word by copying the <template> from index.html
// and filling in the name, categories and definitions.
function buildEntry(word: Word): DocumentFragment {
  const node = els.entryTpl.content.cloneNode(true) as DocumentFragment;

  // textContent (not innerHTML) so text from the backend can't inject HTML
  select(node, '[data-name]').textContent = word.name;

  // Category tags
  const categoryList = select<HTMLUListElement>(node, '[data-categories]');
  word.categories!.forEach(({ id, category }) => {
    const li = document.createElement('li');
    const tag = document.createElement('button');

    tag.type = 'button';
    // The id is stored on the button so clicking it can filter by this category
    tag.dataset.categoryId = String(id);
    tag.title = `Show only ${category}`;
    tag.className =
      'rounded-md bg-indigo-50 px-2 py-1 text-sm text-indigo-800 hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-indigo-700';
    tag.textContent = category;

    li.appendChild(tag);
    categoryList.appendChild(li);
  });

  // Definitions
  const definitionList = select<HTMLOListElement>(node, '[data-definitions]');
  word.definitions.forEach(({ definition, source }) => {
    // Copy the definition template once per definition
    const item = els.defTpl.content.cloneNode(true) as DocumentFragment;
    const link = select<HTMLAnchorElement>(item, '[data-source]');

    select(item, '[data-text]').textContent = definition;
    link.href = source;
    link.textContent = `Source: ${getHostname(source)}`;

    definitionList.appendChild(item);
  });

  return node;
}

// Redraws the list of words, the "empty" message, and the result count.
export function renderResults(): void {
  const results = getFilteredWords();

  // Swap the old entries for the new ones
  els.entries.replaceChildren(...results.map(buildEntry));
  // Show the "No words found" box only when nothing matches
  els.empty.classList.toggle('hidden', results.length > 0);

  els.count.textContent =
    results.length === 1 ? '1 word' : `${results.length} words`;

  // Show the Clear button only when there is something to clear
  els.clearBtn.classList.toggle('hidden', state.query === '');

  console.log('evenlistener renderResult')
}

// Redraws the whole page content (category chips + word list).
export function render(): void {
  console.log('render working')
  renderFilters();
  renderResults();
}