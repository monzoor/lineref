import dayjs from 'dayjs';
import { FIELDS } from '@constants/fields';

export const getAssetUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/assets/${name}`;
