import { createContext } from 'react';

export interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  addingEntry: () => void;
  addingNotEntry: () => void;
  startDraggin: () => void;
  endDraggin: () => void;
}
export const UIContext = createContext({} as ContextProps);
