import { format } from 'date-fns';

export function fDate(value) {
  const formattedDate = format(value, 'dd/MM/yyyy');
}
