import { render, renderResults } from "../components/filters.component.js";
import { init, state } from "../script.js";
import { debounce, els } from "../utils/dom.utils.js";

console.log('listeners file loaded');

// events.ts
export function setupEvents(): void {
  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.query = els.input.value;
    renderResults();
  });

  els.input.addEventListener('input', debounce(() => {
    state.query = els.input.value;
    renderResults();
  }));

  // Search as you type (debounced)
  els.input.addEventListener(
    'input',
    debounce(() => { 
      console.log('input fired', els.input.value);
      state.query = els.input.value;
      renderResults();
    })
  );

  // Prevent page reload on Enter
  els.form.addEventListener('submit', (event: SubmitEvent) => {
    console.log('submit', els.input.value);
    event.preventDefault();
    state.query = els.input.value;
    renderResults();
  });

  // "Clear" button inside the search box
  els.clearBtn.addEventListener('click', () => {
      console.log('filters', els.input.value);
    els.input.value = '';
    state.query = '';
    renderResults();
    els.input.focus(); // put the cursor back so the user can type again
  });
}

// Called when a category chip is clicked.
// rawId comes from the button's data attribute, so it's a string.
function setCategory(rawId: string): void {
  const id = rawId === '' ? null : Number(rawId);
  // Clicking the active category again goes back to "All"
  state.categoryId = state.categoryId === id ? null : id;
  render();
}

// Finds the category button that was clicked, even if the click landed
// on something inside it. Returns null if the click wasn't on one.
function findCategoryButton(event: Event): HTMLButtonElement | null {
  const target = event.target;
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLButtonElement>('button[data-category-id]');
}

// Category chips (event delegation)
// One listener on the container handles every chip, including chips
// that are re-created each time renderFilters() runs.
els.filters.addEventListener('click', (event: MouseEvent) => {
  const chip = findCategoryButton(event);
  if (chip) setCategory(chip.dataset.categoryId ?? '');
});

// Category tags inside entries (event delegation)
els.entries.addEventListener('click', (event: MouseEvent) => {
  const tag = findCategoryButton(event);
  if (tag) {
    state.categoryId = Number(tag.dataset.categoryId);
    render();
    // Jump back to the top so the user sees the filter applied
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// "Show all words" button in the empty state: resets search and filter
els.resetBtn.addEventListener('click', () => {
  els.input.value = '';
  state.query = '';
  state.categoryId = null;
  render();
});

// "Try again" button in the error state
els.retryBtn.addEventListener('click', () => {
  void init(); // `void` = we intentionally don't wait for the promise
});
