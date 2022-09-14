import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  KeyboardEvent,
} from 'react';
import throttle from '../../utils/throttle';

const SCROLLABLE_KEYS = [' ', 'ArrowUp', 'ArrowDown'];

/**
 * detect user scroll
 * 1. wheel
 * 2. keyboard
 * 3. drag scrollbar
 * @author mebtte<hi@mebtte.com>
 */
export default ({
  recoverAutoScrollInterval,
  recoverAutoScrollSingal,
}: {
  recoverAutoScrollInterval: number;
  recoverAutoScrollSingal: boolean;
}) => {
  const [autoScroll, setAutoScroll] = useState(true);

  const timerRef = useRef<number>();
  const handleUserScroll = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setAutoScroll(false);
    timerRef.current = window.setTimeout(
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

  /**
   * clear timer after unmount
   * @author mebtte<hi@mebtte.com>
   */
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return {
    autoScroll,
    onWheel,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
