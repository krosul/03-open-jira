import {FC, DragEvent, useContext} from 'react';
import {Card, CardActionArea, CardContent, CardHeader, Typography} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import {Entry} from '../../interfaces';
import {UIContext} from '../../context/ui';
import {useRouter} from 'next/router';
import {dateFunction} from '../../utils';

const backgrounsdStatus = {pending: '#2c387e', finished: '#00a152', inProgress: '#aa2e25'};
interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {
  const {description, status, createdAt, _id, title} = entry;
  const router = useRouter();
  const {startDraggin, endDraggin, isDragging} = useContext(UIContext);
  const onDragStart = (e: DragEvent) => {
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
        backgroundColor: backgrounsdStatus[status],
        position: 'relative',
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{fontSize: 25}}>{title}</Typography>
          <Typography sx={{whiteSpace: 'pre-line', mt: 2, ml: 0.8}}>{description}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
          <Typography variant="body2">{dateFunction.getFormatDate(createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
