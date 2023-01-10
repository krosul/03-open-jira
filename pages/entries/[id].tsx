import { ChangeEvent, FC, useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MainLayout } from '../../components/layouts';
import { EntryStatus, Entry } from '../../interfaces/entry';

import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunction } from '../../utils';

const dataStatus: EntryStatus[] = ['pending', 'inProgress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [InputValue, setInputValue] = useState(entry.description);
  const [Status, setStatus] = useState<EntryStatus>(entry.status);
  const [Touched, setTouched] = useState(false);
  const { updatedEntry } = useContext(EntriesContext);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const handleClick = () => {
    console.log({ InputValue, Status });
    if (!InputValue.length) return;
    const newEntry: Entry = {
      ...entry,
      status: Status,
      description: InputValue,
    };
    updatedEntry(newEntry);
  };
  return (
    <MainLayout>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={`Creade hace:${dateFunction.getFormatDate(
                entry.createdAt
              )} `}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={InputValue}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                helperText={
                  !InputValue.length && Touched && `Ingresa algun valor`
                }
                error={!InputValue.length && Touched}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={Status} onChange={onStatusChange}>
                  {dataStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleClick}
                disabled={!InputValue.length}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </MainLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.params);
  const { id } = ctx.params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log(entry);

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
