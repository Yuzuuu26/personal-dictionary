export declare function select<T extends HTMLElement>(root: ParentNode, selector: string): T;
export declare const els: {
    form: HTMLFormElement;
    input: HTMLInputElement;
    clearBtn: HTMLButtonElement;
    filters: HTMLDivElement;
    count: HTMLParagraphElement;
    entries: HTMLDivElement;
    loading: HTMLDivElement;
    empty: HTMLDivElement;
    error: HTMLDivElement;
    resetBtn: HTMLButtonElement;
    retryBtn: HTMLButtonElement;
    entryTpl: HTMLTemplateElement;
    defTpl: HTMLTemplateElement;
};
export declare function debounce<A extends unknown[]>(fn: (...args: A) => void, delay?: number): (...args: A) => void;
//# sourceMappingURL=dom.utils.d.ts.map