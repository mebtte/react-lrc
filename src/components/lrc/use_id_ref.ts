import { useRef } from 'react';

import getRandomString from '../../utils/get_random_string';

/**
 * prevent to call getRandomString every render
 * even id never change
 */
export default () => {
  const idRef = useRef('');
  if (!idRef.current) {
    idRef.current = getRandomString();
  }
  return idRef;
};
