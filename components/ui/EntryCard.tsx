import { FC, DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunction } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { description, status, createdAt, _id } = entry;
  const router = useRouter();
  const { startDraggin, endDraggin } = useContext(UIContext);
  const onDragStart = (e: DragEvent) => {
    console.log(e);
    e.dataTransfer.setData('id', _id);
    startDraggin();
  };

  const onDragEnd = () => {
    endDraggin();
  };
  const onClick = () => {
    return router.push('/entries/' + _id);
  };
  return (
    <Card
      sx={{
        marginBottom: 1,
        opaticy: 0,
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunction.getFormatDate(createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
