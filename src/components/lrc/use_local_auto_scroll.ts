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
  autoScroll,
  recoverAutoScrollInterval,
  scrollToCurrentSignal,
}: {
  autoScroll: boolean;
  recoverAutoScrollInterval: number;
  scrollToCurrentSignal: boolean;
}) => {
  const [localAutoScroll, setLocalAutoScoll] = useState(autoScroll);

  const timerRef = useRef<number>();
  const handleUserScroll = useCallback(() => {
    if (!autoScroll) {
      return;
    }

    window.clearTimeout(timerRef.current);
    setLocalAutoScoll(false);
    timerRef.current = window.setTimeout(
      () => setLocalAutoScoll(true),
      recoverAutoScrollInterval,
    );
  }, [autoScroll, recoverAutoScrollInterval]);

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
    window.clearTimeout(timerRef.current);
    setLocalAutoScoll(autoScroll);
  }, [autoScroll]);

  useEffect(() => {
    setLocalAutoScoll(true);
  }, [scrollToCurrentSignal]);

  /**
   * clear timer after unmount
   * @author mebtte<hi@mebtte.com>
   */
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return {
    localAutoScroll,
    onWheel,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
