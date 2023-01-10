import { FC, useContext, useMemo, DragEvent } from 'react';

import { Paper } from '@mui/material';
import List from '@mui/material/List';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updatedEntry } = useContext(EntriesContext);
  const { isDragging, endDraggin } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDropEntry = (e: DragEvent) => {
    const id = e.dataTransfer.getData('id');

    console.log({ id });
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updatedEntry(entry);
    endDraggin();
  };

  return (
    <div
      onDragOver={allowDrop}
      onDrop={onDropEntry}
      className={isDragging ? styles.draggin : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 200px)',
          // overflowY: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((e) => (
            <EntryCard key={e._id} entry={e} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
