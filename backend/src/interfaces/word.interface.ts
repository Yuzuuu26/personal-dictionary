
export interface newWord {
  name: string,
  categories?: Category[],
  definitions: Definition[]
}

export interface newWord {
  name: string,
  categories?: Category[],
  definitions: Definition[]
}

export interface Word {
  id: number
  name: string,
  categories?: Category[],
  definitions: Definition[]
}

export interface Definition {
  source: string;
  definition: string;
}

export interface Category {
  id: number;
  category: string;
}

export interface CategoryOption {
  id: number | null;
  category: string;
  count: number;
}