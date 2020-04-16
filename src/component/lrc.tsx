import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

import { LrcProps } from '../type';
import { AUTO_SCROLL_AFTER_USER_SCROLL } from '../constant';
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
  onCurrentLineChange,
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
          (lrcLineOffsetTopMap.get(Infinity) || 0) / 2,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, autoScroll]);
  useEffect(() => {
    if (onCurrentLineChange) {
      onCurrentLineChange(lrcLineList[currentIndex] || null, currentIndex);
    }
  }, [currentIndex, lrcLineList, onCurrentLineChange]);

  return (
    <div {...props} ref={rootRef}>
      <Blank height="45%" />
      {lrcLineList.map((lrcLine, index) =>
        children(lrcLine, index === currentIndex, index),
      )}
      <Blank height="50%" />
    </div>
  );
};

export default Lrc;
