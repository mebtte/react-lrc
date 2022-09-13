import React, {
  useRef,
  useMemo,
  forwardRef,
  useEffect,
  useImperativeHandle,
  WheelEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { LrcProps } from './constants';
import useCurrentLyricIndex from './use_current_lyric_index';
import useLocalAutoScroll from './use_local_auto_scroll';
import useAutoScrollAction from './use_auto_scroll_action';
import useEvent from '../../utils/use_event';
import Blank from '../blank';
import Root from '../root';
import { LINE_CLASSNAME } from '../../constants';
import useLrc from './use_lrc';

/**
 * Lrc component
 * @author mebtte<hi@mebtte.com>
 */
const Lrc = forwardRef<HTMLDivElement, LrcProps>(
  (
    {
      lrc,
      lineRenderer,
      currentMillisecond = 0,
      autoScroll = true,
      recoverAutoScrollInterval = 5000,
      topBlank = false,
      bottomBlank = false,
      onLineUpdate,
      scrollToCurrentSignal = false,

      onWheel,
      onKeyDown,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      ...otherProps
    }: LrcProps,
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const lyrics = useLrc(lrc);
    const currentLyricIndex = useCurrentLyricIndex(lyrics, currentMillisecond);
    const {
      localAutoScroll,
      onWheel: onLocalAutoScrollWheel,
      onKeyDown: onLocalAutoScrollKeyDown,
      onMouseDown: onLocalAutoScrollMouseDown,
      onMouseUp: onLocalAutoScrollMouseUp,
      onMouseMove: onLocalAutoScrollMove,
    } = useLocalAutoScroll({
      autoScroll,
      recoverAutoScrollInterval,
      scrollToCurrentSignal,
    });

    useAutoScrollAction({
      root: rootRef.current,
      localAutoScroll,
      currentLyricIndex,

      lrc,
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
            className={LINE_CLASSNAME}
          >
            {lineRenderer({
              index,
              active: currentLyricIndex === index,
              line: lyric,
            })}
          </div>
        )),
      [lyrics, lineRenderer, currentLyricIndex],
    );

    useImperativeHandle(ref, () => rootRef.current!);

    const onWheelWrapper = useEvent((event: WheelEvent<HTMLDivElement>) => {
      onLocalAutoScrollWheel();
      return onWheel && onWheel(event);
    });
    const onKeyDownWrapper = useEvent(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onLocalAutoScrollKeyDown(event);
        return onKeyDown && onKeyDown(event);
      },
    );
    const onMouseDownWrapper = useEvent((event: MouseEvent<HTMLDivElement>) => {
      onLocalAutoScrollMouseDown();
      return onMouseDown && onMouseDown(event);
    });
    const onMouseUpWrapper = useEvent((event: MouseEvent<HTMLDivElement>) => {
      onLocalAutoScrollMouseUp();
      return onMouseUp && onMouseUp(event);
    });
    const onMouseMoveWrapper = useEvent((event: MouseEvent<HTMLDivElement>) => {
      onLocalAutoScrollMove();
      return onMouseMove && onMouseMove(event);
    });

    return (
      <Root
        /** tabIndex make focusable and enable to add keyboard listener */
        tabIndex={-1}
        {...otherProps}
        onWheel={onWheelWrapper}
        onKeyDown={onKeyDownWrapper}
        onMouseDown={onMouseDownWrapper}
        onMouseUp={onMouseUpWrapper}
        onMouseMove={onMouseMoveWrapper}
        ref={rootRef}
      >
        {topBlank && <Blank />}
        {lyricNodeList}
        {bottomBlank && <Blank />}
      </Root>
    );
  },
);

export default Lrc;
