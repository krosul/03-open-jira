import {FC, ReactNode, useEffect, useReducer} from 'react';

import {EntriesContext, EntriesReducer} from './';
import {Entry} from '../../interfaces';
import {entriesApi} from '../../apis';
import {useSnackbar} from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: ReactNode;
}

export const EntriesProVider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

  const {enqueueSnackbar} = useSnackbar();

  const addNewEntry = async (description: string, title: string) => {
    const {data} = await entriesApi.post<Entry>('/entries', {description, title});
    dispatch({type: 'Entries - Add', payload: data});
  };

  const updatedEntry = async (entry: Entry) => {
    try {
      const {status, description, _id} = entry;
      const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {
        status,
        description,
      });
      dispatch({type: 'Entries - Updated', payload: data});
      enqueueSnackbar('Tarea actualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } catch (error) {
      console.log({error});
    }
  };
  const refreshEntries = async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: 'Entries - Initial Load', payload: data});
  };
  useEffect(() => {
    refreshEntries();
  }, []);
  const onDeleteEntry = async (id: string) => {
    const {data} = await entriesApi.delete('/entries/' + id);
    refreshEntries();
    dispatch({type: 'Entries - Sort on delete entry', payload: id});
  };
  return (
    <EntriesContext.Provider value={{...state, addNewEntry, updatedEntry, onDeleteEntry}}>
      {children}
    </EntriesContext.Provider>
  );
};
