import { useLayoutEffect, useRef } from 'react';
import { LyricLine } from 'clrc';

import {
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
} from './constants';
import debounce from '../../utils/debounce';

type IndexMap = {
  height: number;
  offsetTop: number;
};

export default ({
  id,
  lyrics,
  localAutoScoll,
  currentLyricIndex,
}: {
  id: string;
  lyrics: LyricLine[];
  localAutoScoll: boolean;
  currentLyricIndex: number;
}) => {
  const indexMapRef = useRef<Map<number | string, IndexMap>>(
    new Map<number | string, IndexMap>(),
  );
  const lrcNodeRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    lrcNodeRef.current = document.querySelector(
      `.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`,
    );

    const caculateIndexMap = () => {
      console.log('caculate');
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
    resizeDetector.observe(lrcNodeRef.current);
    return () => {
      lrcNodeRef.current = null;

      resizeDetector.disconnect();
    };
  }, [lyrics]);

  useLayoutEffect(() => {
    if (localAutoScoll) {
      const indexMap = indexMapRef.current.get(currentLyricIndex);
      if (indexMap) {
        lrcNodeRef.current.scrollTop =
          indexMap.offsetTop -
          lrcNodeRef.current.clientHeight * 0.45 +
          indexMap.height / 2;
      } else {
        lrcNodeRef.current.scrollTop = 0;
      }
    }
  }, [localAutoScoll, currentLyricIndex, lyrics]);
};
