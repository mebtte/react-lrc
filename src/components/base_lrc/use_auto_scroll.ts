import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type KeyboardEvent,
} from 'react';
import throttle from '../../utils/throttle';
import { type Props } from './constants';
import { type BaseLine } from '../../constants';

const SCROLLABLE_KEYS = [' ', 'ArrowUp', 'ArrowDown'];

/**
 * detect user scroll
 * 1. wheel
 * 2. keyboard
 * 3. drag scrollbar
 * @author mebtte<i@mebtte.com>
 */
export default ({
  recoverAutoScrollInterval,
  recoverAutoScrollSingal,
  onAutoScrollChange,
}: {
  recoverAutoScrollInterval: number;
  recoverAutoScrollSingal: boolean;
  onAutoScrollChange: Props<BaseLine>['onAutoScrollChange'];
}) => {
  const [autoScroll, setAutoScroll] = useState(true);

  const timerRef = useRef<ReturnType<typeof globalThis.setTimeout>>();
  const handleUserScroll = useCallback(() => {
    globalThis.clearTimeout(timerRef.current);
    setAutoScroll(false);
    timerRef.current = globalThis.setTimeout(
      () => setAutoScroll(true),
      recoverAutoScrollInterval,
    );
  }, [recoverAutoScrollInterval]);

  const mouseDownRef = useRef(false);
  const onMouseDown = useCallback(() => {
    mouseDownRef.current = true;
  }, []);
  const onMouseUp = useCallback(() => {
    mouseDownRef.current = false;
  }, []);
  const onMouseMove = useMemo(
    () =>
      throttle(() => {
        if (mouseDownRef.current) {
          handleUserScroll();
        }
      }),
    [handleUserScroll],
  );

  const onKeyDown = useMemo(
    () =>
      throttle((event: KeyboardEvent<HTMLDivElement>) => {
        if (SCROLLABLE_KEYS.includes(event.key)) {
          handleUserScroll();
        }
      }),
    [handleUserScroll],
  );
  const onWheel = useMemo(() => throttle(handleUserScroll), [handleUserScroll]);

  useEffect(() => {
    setAutoScroll(true);
  }, [recoverAutoScrollSingal]);

  useEffect(() => {
    if (onAutoScrollChange) {
      onAutoScrollChange({ autoScroll });
    }
  }, [autoScroll, onAutoScrollChange]);

  /**
   * clear timer after unmount
   * @author mebtte<i@mebtte.com>
   */
  useEffect(() => () => globalThis.clearTimeout(timerRef.current), []);

  return {
    autoScroll,
    onWheel,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
