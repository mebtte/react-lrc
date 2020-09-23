import { useState, useLayoutEffect, useCallback } from 'react';

import { LrcLine } from '../constant';
import debounce from '../util/debounce';

export default ({
  lrcLineList,
  spaceTop,
  lrcClassName,
  lrcLineClassName,
}: {
  lrcLineList: LrcLine[];
  spaceTop: number;
  lrcClassName: string;
  lrcLineClassName: string;
}) => {
  const [indexMapScrollTop, setIndexMapScrollTop] = useState<{
    [key: number]: number;
  }>({});
  const caculate = useCallback(() => {
    console.log('recaculate');
    const lrcNode = document.querySelector<HTMLDivElement>(
      `.${lrcClassName}`,
    ) as HTMLDivElement;
    const map: { [key: number]: number } = {};
    const { clientHeight: lrcNodeHeight } = lrcNode;
    const lrcLineNodeList = document.querySelectorAll<HTMLDivElement>(
      `.${lrcLineClassName}`,
    );
    for (let i = 0, { length } = lrcLineNodeList; i < length; i += 1) {
      const lrcLineNode = lrcLineNodeList[i];
      map[i] = lrcLineNode.offsetTop - lrcNodeHeight * spaceTop;
    }
    setIndexMapScrollTop(map);
  }, [spaceTop, lrcLineClassName, lrcClassName]);

  useLayoutEffect(() => {
    caculate();

    // @ts-ignore
    const resizeObserver = new ResizeObserver(debounce(caculate));
    resizeObserver.observe(
      document.querySelector<HTMLDivElement>(`.${lrcClassName}`),
    );
    return () => resizeObserver.disconnect();
  }, [caculate, lrcLineList, lrcClassName]);

  return indexMapScrollTop;
};
