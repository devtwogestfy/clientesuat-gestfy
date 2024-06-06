import { format, isValid } from 'date-fns';

export function fDate(value) {
    const date = new Date(value);
    if (!isValid(date)) {
        return value;
    }
    return format(date, 'dd/MM/yyyy');

}
