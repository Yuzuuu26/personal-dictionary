// Only types are imported here. `import type` is erased when compiled,
// so nothing from these files ends up in the final JavaScript.
import type { State } from './Interface/interface.js'
import { showStatus } from './components/status.component.js'
import { fetchWords } from './api/api.js';
import { render } from './components/filters.component.js';
import { setupEvents } from './controllers/event.controller.js';
/* =========================================================
  State
   ========================================================= */
// The single place that holds everything the page needs to remember.
// Events update this object, then the render functions redraw from it.
export const state: State = {
  words: [],        // every word loaded from the backend
  query: '',        // current text in the search box
  categoryId: null, // selected category id, or null for "All"
};

/* =========================================================
  Init
   ========================================================= */
// Loads the words and draws the page. Runs once on page load,
// and again whenever the user presses "Try again".
export async function init(): Promise<void> {
  showStatus('loading');

  try {
    state.words = await fetchWords();
    setupEvents();
    showStatus('ready');
    render();
  } catch (error: unknown) {
    // Log the real error for debugging, show the friendly message on screen
    console.error(error);
    showStatus('error');
  }
}

// Start the app
void init();