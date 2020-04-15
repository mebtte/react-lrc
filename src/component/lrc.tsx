import React, { useState, useRef, useLayoutEffect } from 'react';

import { LrcProps } from '../type';
import { AUTO_SCROLL_AFTER_USER_SCROLL, BLANK_HEIGTH } from '../constant';
import useLrc from '../hook/use_lrc';
import useLrcLineOffsetTopMap from '../hook/use_lrc_line_offset_top_map';
import useAutoScroll from '../hook/use_auto_scroll';

import Blank from './blank';

interface Props extends LrcProps {
  scrollToCurrentLineSymbol: number;
}

const Lrc = ({
  lrc,
  currentTime = 0,
  children,
  autoScrollAfterUserScroll = AUTO_SCROLL_AFTER_USER_SCROLL,
  scrollToCurrentLineSymbol,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const autoScroll = useAutoScroll({
    rootRef,
    autoScrollAfterUserScroll,
    scrollToCurrentLineSymbol,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const lrcLineList = useLrc(lrc);
  const lrcLineOffsetTopMap = useLrcLineOffsetTopMap({ lrcLineList, rootRef });

  useLayoutEffect(() => {
    const { length } = lrcLineList;
    let i = 0;
    for (; i < length; i += 1) {
      const { millisecond } = lrcLineList[i];
      if (currentTime < millisecond) {
        break;
      }
    }
    setCurrentIndex(i - 1);
  }, [currentTime, lrcLineList]);

  useLayoutEffect(() => {
    if (autoScroll) {
      rootRef.current?.scrollTo({
        left: 0,
        top:
          (lrcLineOffsetTopMap.get(currentIndex) || 0) -
          (lrcLineOffsetTopMap.get(Infinity) || 0) * BLANK_HEIGTH.TOP,
        behavior: 'smooth',
      });
    }
  }, [autoScroll, currentIndex]);

  return (
    <div {...props} ref={rootRef}>
      <Blank height={`${BLANK_HEIGTH.TOP * 100}%`} />
      {lrcLineList.map((lrcLine, index) =>
        children(lrcLine, index === currentIndex),
      )}
      <Blank height={`${BLANK_HEIGTH.BOTTOM * 100}%`} />
    </div>
  );
};

export default Lrc;
