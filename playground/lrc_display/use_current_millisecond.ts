import { useEffect, useState } from 'react';

import { INITIAL_TIMESTAMP } from '../data';
import eventemitter, { EventType } from '../eventemitter';

export default () => {
  const [currentMillisecond, setCurrentMillisecond] = useState(
    INITIAL_TIMESTAMP,
  );

  useEffect(() => {
    const onTimeUpdate = (cm: number) => setCurrentMillisecond(cm);
    eventemitter.listen(EventType.TIME_UPDATE, onTimeUpdate);
    return () => eventemitter.unlisten(EventType.TIME_UPDATE, onTimeUpdate);
  }, []);

  return currentMillisecond;
};
