import { format } from 'date-fns';

export function fDate(value) {
  if (value == null) {
    return '';
  }
  if (!(value instanceof Date)) {
    const parsedDate = new Date(value);

    if (!isNaN(parsedDate.getTime())) {
      return format(parsedDate, 'dd/MM/yyyy');
    } else {
      return '';
    }
  }
  return format(value, 'dd/MM/yyyy');
}
