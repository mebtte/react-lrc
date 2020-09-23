import React, { useMemo, useRef, useImperativeHandle, useEffect } from 'react';

import {
  LrcLine,
  AUTO_SCROLL_AFTER_USER_SCROLL,
  LRC_COMMON_CLASS_NAME,
  LRC_LINE_COMMON_CLASS_NAME,
} from '../constant';
import getRandomString from '../util/get_random_string';
import useLrc from '../util/use_lrc';
import useIndexMapScrollTop from './use_index_map_scroll_top';
import useCurrentIndex from './use_current_index';
import useLocalAutoScroll from './use_local_auto_scroll';

interface Props {
  /** lrc string */
  lrc: string;
  /** lrc line render */
  lineRenderer: ({
    lrcLine,
    index,
    active,
  }: {
    lrcLine: LrcLine;
    index: number;
    active: boolean;
  }) => React.ReactNode;
  /** audio currentTime, millisecond */
  currentTime?: number;
  /** space on lrc component top, percent of lrc component */
  spaceTop?: number;
  /** whether auto scroll  */
  autoScroll?: boolean;
  /** auto scroll after user scroll */
  autoScrollAfterUserScroll?: number;

  className?: string;
  [key: string]: any;
}

const Lrc = React.forwardRef<
  {
    scrollToCurrentLine: () => void;
    getCurrentLine: () => {
      index: number;
      lrcLine: LrcLine | null;
    };
  },
  Props
>(
  (
    {
      lrc,
      lineRenderer,
      currentTime = 0,
      spaceTop = 0.4,
      autoScroll = true,
      autoScrollAfterUserScroll = AUTO_SCROLL_AFTER_USER_SCROLL,

      className = '',
      ...props
    }: Props,
    ref,
  ) => {
    const lrcClassName = useMemo(() => `react_lrc_${getRandomString()}`, []);
    const lrcLineClassName = useMemo(
      () => `react_lrc_line_${getRandomString()}`,
      [],
    );

    const lrcRef = useRef<HTMLDivElement>(null);

    const lrcLineList = useLrc(lrc);
    const indexMapScrollTop = useIndexMapScrollTop({
      lrcLineList,
      spaceTop: autoScroll ? spaceTop : 0,
      lrcClassName,
      lrcLineClassName,
    });
    const currentIndex = useCurrentIndex({ lrcLineList, currentTime });
    const { localAutoScroll, resetLocalAutoScroll } = useLocalAutoScroll({
      autoScroll,
      autoScrollAfterUserScroll,
      lrcClassName,
    });

    // auto scroll
    useEffect(() => {
      if (localAutoScroll) {
        lrcRef.current?.scrollTo({
          left: 0,
          top: indexMapScrollTop[currentIndex] || 0,
          behavior: 'smooth',
        });
      }
    }, [currentIndex, localAutoScroll, indexMapScrollTop]);

    useImperativeHandle(ref, () => ({
      getCurrentLine: () => ({
        index: currentIndex,
        lrcLine: lrcLineList[currentIndex] || null,
      }),
      scrollToCurrentLine: () => {
        resetLocalAutoScroll();
        lrcRef.current?.scrollTo({
          left: 0,
          top: indexMapScrollTop[currentIndex] || 0,
          behavior: 'smooth',
        });
      },
    }));

    return (
      <div
        {...props}
        className={`${LRC_COMMON_CLASS_NAME} ${lrcClassName} ${className}`}
        ref={lrcRef}
      >
        {autoScroll ? <div style={{ height: `${spaceTop * 100}%` }} /> : null}
        {lrcLineList.map((lrcLine, index) => (
          <div
            key={lrcLine.id}
            className={`${LRC_LINE_COMMON_CLASS_NAME} ${lrcLineClassName}`}
          >
            {lineRenderer({ lrcLine, index, active: currentIndex === index })}
          </div>
        ))}
        {autoScroll ? (
          <div style={{ height: `${(1 - spaceTop) * 100}%` }} />
        ) : null}
      </div>
    );
  },
);

export default Lrc;
