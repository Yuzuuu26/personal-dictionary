import type { Status } from "../Interface/types.js";
import { els } from "../utils/dom.utils.js";

// Shows or hides the loading and error blocks depending on the status.
export function showStatus(status: Status): void {
  els.loading.classList.toggle('hidden', status !== 'loading');
  els.error.classList.toggle('hidden', status !== 'error');

  // While loading or after an error, clear anything left on screen
  if (status !== 'ready') {
    els.entries.replaceChildren();
    els.empty.classList.add('hidden');
    els.count.textContent = '';
  }
}