import { format } from 'date-fns';

export function fDate(value) {
    return format(new Date(value), 'dd/MM/yyyy');
}
