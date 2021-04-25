import { useLayoutEffect, useRef } from 'react';

import {
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
} from './constants';

type IndexMap = {
  height: number;
  offsetTop: number;
};
const debounce = <F extends (...params: any[]) => any>(
  f: F,
  { wait = 300 }: { wait?: number } = {},
) => {
  let timer: ReturnType<typeof window.setTimeout>;
  return (...params: Parameters<F>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => f(params), wait);
  };
};

export default ({
  id,
  localAutoScoll,
  currentLyricIndex,
}: {
  id: string;
  localAutoScoll: boolean;
  currentLyricIndex: number;
}) => {
  const indexMapRef = useRef<Map<number | string, IndexMap>>(
    new Map<number | string, IndexMap>(),
  );

  useLayoutEffect(() => {
    const caculateIndexMap = () => {
      const indexMap = new Map<number | string, IndexMap>();

      const lrcLineNodeList = document.querySelectorAll<HTMLDivElement>(
        `.${LRC_LINE_COMPONENT_CLASS_NAME_PREFIX}${id}`,
      );
      for (let i = 0, { length } = lrcLineNodeList; i < length; i += 1) {
        const lrcLineNode = lrcLineNodeList[i];
        indexMap.set(i, {
          height: lrcLineNode.clientHeight,
          offsetTop: lrcLineNode.offsetTop,
        });
      }
      indexMapRef.current = indexMap;
    };

    caculateIndexMap();

    const resizeDetector = new window.ResizeObserver(
      debounce(caculateIndexMap),
    );
    resizeDetector.observe(
      document.querySelector(`.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`),
    );
    return () => resizeDetector.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (localAutoScoll) {
      const lrcNode = document.querySelector<HTMLDivElement>(
        `.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`,
      );
      const indexMap = indexMapRef.current.get(currentLyricIndex);
      if (indexMap) {
        lrcNode.scrollTop =
          indexMap.offsetTop -
          lrcNode.clientHeight * 0.45 +
          indexMap.height / 2;
      }
    }
  }, [localAutoScoll, currentLyricIndex]);
};
