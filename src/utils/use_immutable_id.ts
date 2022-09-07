import { useMemo } from 'react';
import getRandomString from './get_random_string';

export default () => {
  const id = useMemo(getRandomString, []);
  return id;
};
