import { useMemo } from 'react';

import parseLrc from './parse_lrc';

export default (lrc: string) => {
  const lrcLineList = useMemo(() => parseLrc(lrc), [lrc]);
  return lrcLineList;
};
