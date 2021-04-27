import { useState, ComponentProps, useEffect } from 'react';
import { Lrc } from '../../src';

import { INITIAL_LRC_PROPS } from '../data';
import eventemitter, { EventType } from '../eventemtiter';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default () => {
  const [lrcProps, setLrcProps] = useState<
    Omit<
      ComponentProps<typeof Lrc>,
      | 'lrc'
      | 'lineRenderer'
      | 'currentMillisecond'
      | 'onLineChange'
      | 'intervalOfRecoveringAutoScrollAfterUserScroll'
    >
  >(INITIAL_LRC_PROPS);

  useEffect(() => {
    const onPropsChanged = ({ key, value }) =>
      setLrcProps((lp) => ({
        ...lp,
        [key]: value,
      }));
    eventemitter.on(EventType.LRC_PROPS_CHANGED, onPropsChanged);
    return () =>
      void eventemitter.off(EventType.LRC_PROPS_CHANGED, onPropsChanged);
  }, []);

  return lrcProps;
};
