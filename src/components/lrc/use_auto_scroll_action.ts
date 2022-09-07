import { useCallback, useLayoutEffect, useRef } from 'react';
import { LyricLine } from 'clrc';

import {
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
} from './constants';
import debounce from '../../utils/debounce';
import eventemitter, { EventType } from './eventemitter';

type IndexMap = {
  height: number;
  offsetTop: number;
};

export default ({
  id,
  localAutoScoll,
  currentLyricIndex,

  lyrics,
  topBlank,
}: {
  id: string;
  localAutoScoll: boolean;
  currentLyricIndex: number;

  lyrics: LyricLine[];
  topBlank: boolean;
}) => {
  const indexMapRef = useRef<Map<number | string, IndexMap>>(
    new Map<number | string, IndexMap>(),
  );
  const lrcNodeRef = useRef<HTMLDivElement>();
  const scrollToCurrentLine = useCallback(() => {
    const indexMap = indexMapRef.current.get(currentLyricIndex);
    if (indexMap) {
      lrcNodeRef.current.scrollTop =
        indexMap.offsetTop -
        lrcNodeRef.current.clientHeight * 0.45 +
        indexMap.height / 2;
    } else {
      lrcNodeRef.current.scrollTop = 0;
    }
  }, [currentLyricIndex]);

  useLayoutEffect(() => {
    lrcNodeRef.current = document.querySelector(
      `.${LRC_COMPONENT_CLASS_NAME_PREFIX}${id}`,
    );

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
    resizeDetector.observe(lrcNodeRef.current);
    return () => {
      lrcNodeRef.current = null;

      resizeDetector.disconnect();
    };
  }, [id, lyrics, topBlank]);

  useLayoutEffect(() => {
    if (localAutoScoll) {
      scrollToCurrentLine();
    }
  }, [localAutoScoll, scrollToCurrentLine, lyrics, topBlank]);

  useLayoutEffect(() => {
    const unlistenScrollToCurrentLine = eventemitter.listen(
      EventType.SCROLL_TO_CURRENT_LINE,
      () => scrollToCurrentLine(),
    );
    return unlistenScrollToCurrentLine;
  }, [scrollToCurrentLine]);
};
