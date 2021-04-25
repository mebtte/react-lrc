import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
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

/**
 * Lrc component
 * @author mebtte<hi@mebtte.com>
 */
const Lrc = forwardRef<LrcInstance, LrcProps>((props: LrcProps, ref) => {
  const {
    lrc,
    lineRender,
    currentMillisecond = 0,
    className = '',
    ...otherProps
  } = props;
  const idRef = useIdRef();
  const rootRef = useRef<HTMLDivElement>();

  const { lyrics } = useMemo(() => parseLrc(lrc, { sortByStartTime: true }), [
    lrc,
  ]);
  const currentLyricIndex = useCurrentLyricIndex(lyrics, currentMillisecond);

  useImperativeHandle(ref, () => ({
    dom: rootRef.current,
    getCurrentLyric: () => lyrics[currentLyricIndex],
  }));

  const lyricNodeList = useMemo(
    () =>
      lyrics.map((lyric, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`${LRC_LINE_COMPONENT_COMMON_CLASS_NAME} ${LRC_LINE_COMPONENT_CLASS_NAME_PREFIX}${idRef.current}`}
        >
          {lineRender({
            index,
            active: currentLyricIndex === index,
            line: lyric,
          })}
        </div>
      )),
    [lineRender, lyrics, currentLyricIndex],
  );
  return (
    <div
      {...otherProps}
      className={`${LRC_COMPONENT_COMMON_CLASS_NAME} ${LRC_COMPONENT_CLASS_NAME_PREFIX}${idRef.current} ${className}`}
      ref={rootRef}
    >
      {lyricNodeList}
    </div>
  );
});

export default Lrc;
