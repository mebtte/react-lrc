import React, {
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { LineType, LyricLine, parse as parseLrc } from 'clrc';
import {
  LRC_COMPONENT_COMMON_CLASS_NAME,
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_COMMON_CLASS_NAME,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
  LrcInstance,
  LrcProps,
} from './constants';
import useCurrentLyricIndex from './use_current_lyric_index';
import useId from '../../utils/use_id';
import useLocalAutoScroll from './use_local_auto_scroll';
import useAutoScrollAction from './use_auto_scroll_action';
import eventemitter, { EventType } from './eventemitter';

const scrollToCurrentLine = () =>
  eventemitter.emit(EventType.SCROLL_TO_CURRENT_LINE, null);

/**
 * Lrc component
 * @author mebtte<hi@mebtte.com>
 */
const Lrc = forwardRef<LrcInstance, LrcProps>((props: LrcProps, ref) => {
  const {
    lrc,
    lineRenderer,
    currentMillisecond = 0,
    autoScroll = true,
    intervalOfRecoveringAutoScrollAfterUserScroll = 5000,
    topBlank = false,
    bottomBlank = false,
    onLineChange,

    className = '',
    ...otherProps
  } = props;
  const id = useId();
  const rootRef = useRef<HTMLDivElement>();

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
    intervalOfRecoveringAutoScrollAfterUserScroll,
  });

  useAutoScrollAction({
    id,
    localAutoScoll,
    currentLyricIndex,

    lyrics,
    topBlank,
  });

  useEffect(() => {
    if (onLineChange) {
      onLineChange({
        index: currentLyricIndex,
        line: lyrics[currentLyricIndex] || null,
      });
    }
  }, [onLineChange, currentLyricIndex, lyrics]);
  useImperativeHandle(ref, () => ({
    dom: rootRef.current,
    scrollToCurrentLine,
  }));

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

  return (
    <div
      /** tabIndex make focusable and enable to add keyboard listener */
      tabIndex={-1}
      {...otherProps}
      className={`${LRC_COMPONENT_COMMON_CLASS_NAME} ${LRC_COMPONENT_CLASS_NAME_PREFIX}${id} ${className}`}
      ref={rootRef}
    >
      {topBlank && <div className="blank" />}
      {lyricNodeList}
      {bottomBlank && <div className="blank" />}
    </div>
  );
});

export default Lrc;
