import { useState, useLayoutEffect } from 'react';

import { LRC_COMPONENT_CLASS_NAME_PREFIX } from './constants';

const SCROLLABLE_KEYS = [' ', 'ArrowUp', 'ArrowDown'];
const throttle = <F extends (...params: any[]) => any>(
  f: F,
  { wait = 100 }: { wait?: number } = {},
) => {
  let lastEmitTimestamp = 0;
  return (...params: Parameters<F>): ReturnType<F> | undefined => {
    const now = Date.now();
    if (now - lastEmitTimestamp > wait) {
      lastEmitTimestamp = now;
      return f(...params);
    }
  };
};

export default ({
  id,
  autoScroll,
  intervalOfRecoveringAutoScrollAfterUserScroll,
}: {
  id: string;
  autoScroll: boolean;
  intervalOfRecoveringAutoScrollAfterUserScroll: number;
}) => {
  const [localAutoScroll, setLocalAutoScoll] = useState(autoScroll);

  useLayoutEffect(() => {
    if (autoScroll) {
      const lrcNode = document.querySelector<HTMLDivElement>(
        `.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`,
      );

      let keyboardTimer: ReturnType<typeof window.setTimeout>;
      let mouseTimer: ReturnType<typeof window.setTimeout>;
      let wheelTimer: ReturnType<typeof window.setTimeout>;
      const shieldLocalAutoScroll = () => {
        setLocalAutoScoll(false);
        window.clearTimeout(keyboardTimer);
        window.clearTimeout(mouseTimer);
        window.clearTimeout(wheelTimer);
        return window.setTimeout(
          () => setLocalAutoScoll(true),
          intervalOfRecoveringAutoScrollAfterUserScroll,
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
        lrcNode.removeEventListener('keydown', onKeyDown);

        lrcNode.removeEventListener('mousedown', onMouseDown);
        lrcNode.removeEventListener('mouseup', onMouseUp);
        lrcNode.removeEventListener('mousemove', onMouseMove);

        lrcNode.removeEventListener('wheel', onWheel);
      };
    }
  }, [autoScroll, intervalOfRecoveringAutoScrollAfterUserScroll]);

  return localAutoScroll;
};
