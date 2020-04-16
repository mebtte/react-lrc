import {
  useRef,
  useLayoutEffect,
  RefObject,
  useEffect,
  useCallback,
} from 'react';
import { LrcLine } from '../type';

import { LRC_LINE_CLASS_NAME, RESIZE_INTERVAL } from '../constant';

export default ({
  lrcLineList,
  rootRef,
}: {
  lrcLineList: LrcLine[];
  rootRef: RefObject<HTMLDivElement>;
}) => {
  const map = useRef<Map<number, number>>(new Map());
  const calculate = useCallback(() => {
    map.current = new Map();
    const lineList = document.querySelectorAll(`.${LRC_LINE_CLASS_NAME}`);
    for (let i = 0, { length } = lineList; i < length; i += 1) {
      const line = lineList[i] as HTMLDivElement;
      map.current.set(i, line.offsetTop + line.clientHeight);
    }
    const rect = rootRef.current?.getBoundingClientRect();
    map.current.set(Infinity, rect?.height || 0);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const windowResizeListener = () => {
      clearTimeout(timer);
      timer = setTimeout(calculate, RESIZE_INTERVAL);
    };
    window.addEventListener('resize', windowResizeListener);
    return () => window.removeEventListener('resize', windowResizeListener);
  }, [calculate]);

  useLayoutEffect(() => {
    calculate();
  }, [lrcLineList]);

  return map.current;
};
