import { FC, ReactNode, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

interface Props {
  children: ReactNode;
}

export const UIProVider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };
  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };

  const addingEntry = () => {
    dispatch({ type: 'UI - is Adding Entry' });
  };
  const addingNotEntry = () => {
    dispatch({ type: 'UI - is Not Adding Entry' });
  };

  const startDraggin = () => {
    dispatch({ type: 'UI - Start Dragging' });
  };
  const endDraggin = () => {
    dispatch({ type: 'UI - End Dragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        addingEntry,
        addingNotEntry,
        startDraggin,
        endDraggin,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
