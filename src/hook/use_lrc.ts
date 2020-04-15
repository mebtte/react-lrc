import { useState, useEffect } from 'react';

import { LrcLine } from '../type';
import parseLrc from '../util/parse_lrc';

export default (lrc: string) => {
  const [lrcLineList, setLrcLineList] = useState<LrcLine[]>(parseLrc(lrc));

  useEffect(() => {
    setLrcLineList(parseLrc(lrc));
  }, [lrc]);

  return lrcLineList;
};
