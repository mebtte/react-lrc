/* eslint-disable no-param-reassign */
import { useCallback, useLayoutEffect, useRef } from 'react';
import debounce from '../../utils/debounce';
import { BaseLine } from '../../constants';
import { LINE_CLASSNAME } from './constants';

type IndexMap = {
  height: number;
  offsetTop: number;
};

export default ({
  root,
  autoScroll,
  lineIndex,

  lines,
  topBlank,
}: {
  root: HTMLDivElement | null;
  autoScroll: boolean;
  lineIndex: number;

  lines: BaseLine[];
  topBlank: boolean;
}) => {
  const indexMapRef = useRef<Map<number | string, IndexMap>>(
    new Map<number | string, IndexMap>(),
  );
  const scrollToCurrentLine = useCallback(() => {
    if (!root) {
      return;
    }

    const indexMap = indexMapRef.current.get(lineIndex);
    if (indexMap) {
      root.scrollTop =
        indexMap.offsetTop - root.clientHeight * 0.5 + indexMap.height / 2;
    } else {
      root.scrollTop = 0;
    }
  }, [lineIndex, root]);

  useLayoutEffect(() => {
    if (root) {
      const caculateIndexMap = () => {
        const indexMap = new Map<number | string, IndexMap>();

        const lrcLineNodeList = root.querySelectorAll<HTMLDivElement>(
          `.${LINE_CLASSNAME}`,
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
      resizeDetector.observe(root);
      return () => {
        resizeDetector.disconnect();
      };
    }
  }, [root, lines, topBlank]);

  useLayoutEffect(() => {
    if (autoScroll) {
      scrollToCurrentLine();
    }
  }, [autoScroll, scrollToCurrentLine, lines, topBlank]);
};
