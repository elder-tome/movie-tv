import { createContext } from 'react';

type SearchContextData = {
  search: string,
  loadSearch: (search: string) => void
}

export const SearchContext = createContext({} as SearchContextData);