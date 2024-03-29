import {useContext} from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Box, TextField} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import {EntriesContext} from '../../context/entries/EntriesContext';
import {UIContext} from '../../context/ui/UIContext';

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [InputValue, setInputValue] = useState('');
  const [Touched, setTouched] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const {addNewEntry} = useContext(EntriesContext);
  const {addingEntry, addingNotEntry, isAddingEntry} = useContext(UIContext);

  const handleChange = (e: ChangeEvent) => {
    const {value} = e.target as HTMLInputElement;
    setInputTitle(value);
  };
  const handleChangeDescription = (e: ChangeEvent) => {
    const {value} = e.target as HTMLInputElement;
    setInputDescription(value);
  };

  const onSave = () => {
    if (!inputTitle.length || !inputDescription.length) return;
    addNewEntry(inputDescription, inputTitle);
    addingNotEntry();
    setInputValue('');
    setTouched(false);
  };

  return (
    <Box sx={{marginBottom: 2, paddingX: 1}}>
      {isAddingEntry ? (
        <>
          <Button startIcon={<AddBoxIcon />} fullWidth variant="outlined">
            Agregar Tarea
          </Button>

          <TextField
            fullWidth
            sx={{marginTop: 3, marginBottom: 1}}
            placeholder="Titulo"
            autoFocus
            multiline
            value={inputTitle}
            label="Mi primera tarea"
            helperText="ingrese un valor"
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            error={inputTitle.length <= 0 && Touched}
          />
          <TextField
            fullWidth
            sx={{marginTop: 3, marginBottom: 1}}
            placeholder="Nueva entrada"
            multiline
            value={inputDescription}
            label="Nueva entrada"
            helperText="ingrese un valor"
            onChange={handleChangeDescription}
            onBlur={() => setTouched(true)}
            error={inputDescription.length <= 0 && Touched}
          />
          <Box display="flex" justifyContent="space-around">
            <Button variant="text" color="secondary" onClick={() => addingEntry()}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<AddIcon />}
              onClick={() => onSave()}
            >
              Agregar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<AddBoxIcon />}
            fullWidth
            variant="outlined"
            onClick={() => addingEntry()}
          >
            Agregar Tarea
          </Button>
        </>
      )}
    </Box>
  );
};
