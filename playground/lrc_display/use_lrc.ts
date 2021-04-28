import { useEffect, useState } from 'react';

import { LRC } from '../data';
import eventemitter, { EventType } from '../eventemitter';

export default () => {
  const [lrc, setLrc] = useState(LRC);

  useEffect(() => {
    const changeListener = (l: string) => setLrc(l);
    eventemitter.listen(EventType.LRC_CHANGE, changeListener);
    return () => eventemitter.unlisten(EventType.LRC_CHANGE, changeListener);
  }, []);

  return lrc;
};
