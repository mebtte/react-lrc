import { useEffect, useState } from 'react';

import { LRC } from '../data';
import eventemitter, { EventType } from '../eventemtiter';

export default () => {
  const [lrc, setLrc] = useState(LRC);

  useEffect(() => {
    const changeListener = (l: string) => setLrc(l);
    eventemitter.on(EventType.LRC_CHANGE, changeListener);
    return () => void eventemitter.off(EventType.LRC_CHANGE, changeListener);
  }, []);

  return lrc;
};
