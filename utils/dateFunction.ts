import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDate = (date: number) => {
  const actualDate = formatDistanceToNow(date, { locale: es });

  return `Hace ${actualDate}`;
};
