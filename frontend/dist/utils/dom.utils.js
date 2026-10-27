/* =========================================================
  Elements
========================================================= */
// Finds an element by id and returns it with the right type.
// Throws a clear error if the id doesn't exist in the HTML,
// so the rest of the code never has to check for null.
function getEl(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Missing element: #${id}`);
    return el;
}
// Same idea as getEl, but searches inside a given element
// (used for the cloned <template> content) using a CSS selector.
export function select(root, selector) {
    const el = root.querySelector(selector);
    if (!el)
        throw new Error(`Missing element: ${selector}`);
    return el;
}
// All the elements from index.html that the script needs, looked up once.
export const els = {
    form: getEl('search-form'),
    input: getEl('search-input'),
    clearBtn: getEl('clear-btn'),
    filters: getEl('category-filters'), // where the category chips go
    count: getEl('result-count'), // "3 words" text
    entries: getEl('entries'), // where the word entries go
    loading: getEl('state-loading'), // skeleton shown while fetching
    empty: getEl('state-empty'), // "No words found" message
    error: getEl('state-error'), // "Couldn't load" message
    resetBtn: getEl('reset-btn'),
    retryBtn: getEl('retry-btn'),
    entryTpl: getEl('entry-template'), // HTML blueprint for one word
    defTpl: getEl('definition-template'), // HTML blueprint for one definition
};
/* =========================================================
  Events
========================================================= */
// Wraps a function so it only runs after the user stops triggering it
// for `delay` ms. Stops the list from redrawing on every single keystroke.
export function debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
        // Cancel the previous timer and start a new one
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
//# sourceMappingURL=dom.utils.js.map