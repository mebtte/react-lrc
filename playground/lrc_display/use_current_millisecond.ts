import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

import eventemitter, { EventType } from '../eventemtiter';

export default () => {
  const [currentMillisecond, setCurrentMillisecond] = useState(0);

  useEffect(() => {
    const onTimeUpdate = throttle(
      (cm: number) => setCurrentMillisecond(cm),
      300,
    );
    eventemitter.on(EventType.TIME_UPDATE, onTimeUpdate);
    return () => void eventemitter.off(EventType.TIME_UPDATE, onTimeUpdate);
  }, []);

  return currentMillisecond;
};
