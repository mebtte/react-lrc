import './style';

import React, {
  useRef,
  useMemo,
  forwardRef,
  useEffect,
  memo,
  useImperativeHandle,
} from 'react';
import { LineType, LyricLine, parse as parseLrc } from 'clrc';
import {
  LRC_COMPONENT_COMMON_CLASS_NAME,
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_COMMON_CLASS_NAME,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
  LrcProps,
} from './constants';
import useCurrentLyricIndex from './use_current_lyric_index';
import useImmutableId from '../../utils/use_immutable_id';
import useLocalAutoScroll from './use_local_auto_scroll';
import useAutoScrollAction from './use_auto_scroll_action';

/**
 * Lrc component
 * @author mebtte<hi@mebtte.com>
 */
const Lrc = forwardRef<HTMLDivElement, LrcProps>((props: LrcProps, ref) => {
  const {
    lrc,
    lineRenderer,
    currentMillisecond = 0,
    autoScroll = true,
    recoverAutoScrollInterval = 5000,
    topBlank = false,
    bottomBlank = false,
    onLineUpdate,
    scrollToCurrentSignal = false,

    className = '',
    ...otherProps
  } = props;
  const id = useImmutableId();
  const innerRef = useRef<HTMLDivElement>();

  const lyrics = useMemo<LyricLine[]>(
    () =>
      (
        parseLrc(lrc).filter(
          (line) => line.type === LineType.LYRIC,
        ) as LyricLine[]
      ).sort((a, b) => a.startMillisecond - b.startMillisecond),
    [lrc],
  );
  const currentLyricIndex = useCurrentLyricIndex(lyrics, currentMillisecond);
  const localAutoScoll = useLocalAutoScroll({
    id,
    autoScroll,
    recoverAutoScrollInterval,
    scrollToCurrentSignal,
  });

  useAutoScrollAction({
    id,
    localAutoScoll,
    currentLyricIndex,

    lyrics,
    topBlank,
  });

  useEffect(() => {
    if (onLineUpdate) {
      onLineUpdate({
        index: currentLyricIndex,
        line: lyrics[currentLyricIndex] || null,
      });
    }
  }, [onLineUpdate, currentLyricIndex, lyrics]);

  const lyricNodeList = useMemo(
    () =>
      lyrics.map((lyric, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`${LRC_LINE_COMPONENT_COMMON_CLASS_NAME} ${LRC_LINE_COMPONENT_CLASS_NAME_PREFIX}${id}`}
        >
          {lineRenderer({
            index,
            active: currentLyricIndex === index,
            line: lyric,
          })}
        </div>
      )),
    [lyrics, id, lineRenderer, currentLyricIndex],
  );

  useImperativeHandle(ref, () => innerRef.current);

  return (
    <div
      /** tabIndex make focusable and enable to add keyboard listener */
      tabIndex={-1}
      {...otherProps}
      className={`${LRC_COMPONENT_COMMON_CLASS_NAME} ${LRC_COMPONENT_CLASS_NAME_PREFIX}${id} ${className}`}
      ref={innerRef}
    >
      {topBlank && <div className="blank" />}
      {lyricNodeList}
      {bottomBlank && <div className="blank" />}
    </div>
  );
});

export default memo(Lrc);
