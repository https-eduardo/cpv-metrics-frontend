export interface SortingOption {
  [key: string]: {
    order: "desc" | "asc";
    relation?: string;
  };
}
