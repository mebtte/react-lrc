import React, {
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { parse as parseLrc } from 'clrc';

import './style';
import {
  LRC_COMPONENT_COMMON_CLASS_NAME,
  LRC_COMPONENT_CLASS_NAME_PREFIX,
  LRC_LINE_COMPONENT_COMMON_CLASS_NAME,
  LRC_LINE_COMPONENT_CLASS_NAME_PREFIX,
  LrcInstance,
  LrcProps,
} from './constants';
import useCurrentLyricIndex from './use_current_lyric_index';
import useIdRef from './use_id_ref';
import useLocalAutoScroll from './use_local_auto_scroll';
import useAutoScrollAction from './use_auto_scroll_action';
import eventemitter, { EventType } from './eventemitter';

const recoverAutoScroll = () =>
  eventemitter.trigger(EventType.RECOVER_AUTO_SCROLL);

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
  const idRef = useIdRef();
  const rootRef = useRef<HTMLDivElement>();

  const { lyrics } = useMemo(
    () => parseLrc(lrc, { sortByStartTime: true, trimStart: true }),
    [lrc],
  );
  const currentLyricIndex = useCurrentLyricIndex(lyrics, currentMillisecond);
  const localAutoScoll = useLocalAutoScroll({
    id: idRef.current,
    autoScroll,
    intervalOfRecoveringAutoScrollAfterUserScroll,
  });

  useAutoScrollAction({
    id: idRef.current,
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
    getCurrentLine: () => ({
      index: currentLyricIndex,
      line: lyrics[currentLyricIndex] || null,
    }),
    scrollToCurrentLine: recoverAutoScroll,
  }));

  const lyricNodeList = useMemo(
    () =>
      lyrics.map((lyric, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`${LRC_LINE_COMPONENT_COMMON_CLASS_NAME} ${LRC_LINE_COMPONENT_CLASS_NAME_PREFIX}${idRef.current}`}
        >
          {lineRenderer({
            index,
            active: currentLyricIndex === index,
            line: lyric,
          })}
        </div>
      )),
    [lineRenderer, lyrics, currentLyricIndex],
  );
  return (
    <div
      /** tabIndex make focusable and enable to add keyboard listener */
      tabIndex={-1}
      {...otherProps}
      className={`${LRC_COMPONENT_COMMON_CLASS_NAME} ${LRC_COMPONENT_CLASS_NAME_PREFIX}${idRef.current} ${className}`}
      ref={rootRef}
    >
      {topBlank && <div className="blank" />}
      {lyricNodeList}
      {bottomBlank && <div className="blank" />}
    </div>
  );
});

export default Lrc;
