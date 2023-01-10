import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'Entries - Add'; payload: Entry }
  | { type: 'Entries - Updated'; payload: Entry }
  | { type: 'Entries - Initial Load'; payload: Entry[] };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'Entries - Add':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'Entries - Updated':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case 'Entries - Initial Load':
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
