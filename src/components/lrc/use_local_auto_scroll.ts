import { useState, useLayoutEffect, useEffect } from 'react';
import { LRC_COMPONENT_CLASS_NAME_PREFIX } from './constants';
import throttle from '../../utils/throttle';

const SCROLLABLE_KEYS = [' ', 'ArrowUp', 'ArrowDown'];

export default ({
  id,
  autoScroll,
  recoverAutoScrollInterval,
  scrollToCurrentSignal,
}: {
  id: string;
  autoScroll: boolean;
  recoverAutoScrollInterval: number;
  scrollToCurrentSignal: boolean;
}) => {
  const [localAutoScroll, setLocalAutoScoll] = useState(autoScroll);

  useLayoutEffect(() => {
    if (autoScroll) {
      setLocalAutoScoll(true);

      const lrcNode = document.querySelector<HTMLDivElement>(
        `.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`,
      );

      let keyboardTimer: number;
      let mouseTimer: number;
      let wheelTimer: number;
      const shieldLocalAutoScroll = () => {
        setLocalAutoScoll(false);
        window.clearTimeout(keyboardTimer);
        window.clearTimeout(mouseTimer);
        window.clearTimeout(wheelTimer);
        return window.setTimeout(
          () => setLocalAutoScoll(true),
          recoverAutoScrollInterval,
        );
      };

      /** detect user scroll by keyboard, space/arrow_up/arrow_down */
      const onKeyDown = throttle((event: KeyboardEvent) => {
        const { key } = event;
        if (SCROLLABLE_KEYS.indexOf(key) >= 0) {
          keyboardTimer = shieldLocalAutoScroll();
        }
      });

      /** detect user scroll by scrollbar drag */
      let mouseDown = false;
      const onMouseDown = () => {
        mouseDown = true;
      };
      const onMouseUp = () => {
        mouseDown = false;
      };
      const onMouseMove = throttle(() => {
        if (mouseDown) {
          mouseTimer = shieldLocalAutoScroll();
        }
      });

      /** detect user scroll by wheel */
      const onWheel = throttle(() => {
        wheelTimer = shieldLocalAutoScroll();
      });

      lrcNode.addEventListener('keydown', onKeyDown);

      lrcNode.addEventListener('mousedown', onMouseDown);
      lrcNode.addEventListener('mouseup', onMouseUp);
      lrcNode.addEventListener('mousemove', onMouseMove);

      lrcNode.addEventListener('wheel', onWheel);
      return () => {
        window.clearTimeout(keyboardTimer);
        window.clearTimeout(mouseTimer);
        window.clearTimeout(wheelTimer);

        lrcNode.removeEventListener('keydown', onKeyDown);

        lrcNode.removeEventListener('mousedown', onMouseDown);
        lrcNode.removeEventListener('mouseup', onMouseUp);
        lrcNode.removeEventListener('mousemove', onMouseMove);

        lrcNode.removeEventListener('wheel', onWheel);
      };
    }
  }, [autoScroll, id, recoverAutoScrollInterval]);

  useEffect(() => {
    setLocalAutoScoll(autoScroll);
  }, [autoScroll]);

  useEffect(() => {
    setLocalAutoScoll(true);
  }, [scrollToCurrentSignal]);

  return localAutoScroll;
};
