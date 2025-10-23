import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants';

export const convertDateToFormat = (
  date: any,
  format = DATE_FORMAT
) => (date ? dayjs(date).format(format) : '');

export const parseToDate = (
  date: string,
  format = DATE_FORMAT
) => (date ? dayjs(date, format) : null);
