import { useEffect, useState } from 'react';

import { INITIAL_TIMESTAMP } from '../data';
import eventemitter, { EventType } from '../eventemtiter';

export default () => {
  const [currentMillisecond, setCurrentMillisecond] = useState(
    INITIAL_TIMESTAMP,
  );

  useEffect(() => {
    const onTimeUpdate = (cm: number) => setCurrentMillisecond(cm);
    eventemitter.on(EventType.TIME_UPDATE, onTimeUpdate);
    return () => void eventemitter.off(EventType.TIME_UPDATE, onTimeUpdate);
  }, []);

  return currentMillisecond;
};
