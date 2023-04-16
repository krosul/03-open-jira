import {createContext} from 'react';
import {Entry} from '../../interfaces';

export interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string, title: string) => void;
  updatedEntry: (entry: Entry) => void;
  onDeleteEntry: (id: string) => void;
}
export const EntriesContext = createContext({} as ContextProps);
