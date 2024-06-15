import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useEffect,
  type HtmlHTMLAttributes,
  type KeyboardEvent,
  type WheelEvent,
  type PointerEvent,
  type ForwardedRef,
} from 'react';
import { LINE_CLASSNAME, type Props } from './constants';
import Root from './root';
import Space from './space';
import useLineIndex from './use_line_index';
import { type BaseLine, DEFAULT_PROPS } from '../../constants';
import useAutoScroll from './use_auto_scroll';
import useEvent from '../../utils/use_event';
import useScrollAction from './use_scroll_action';

const space = <Space />;

function BaseLrc<Line extends BaseLine>(
  {
    lines,
    lineRenderer,
    currentMillisecond = DEFAULT_PROPS.currentMillisecond,
    verticalSpace = DEFAULT_PROPS.verticalSpace,
    recoverAutoScrollInterval = DEFAULT_PROPS.recoverAutoScrollInterval,
    recoverAutoScrollSingal = DEFAULT_PROPS.recoverAutoScrollSingal,
    onLineUpdate,
    onAutoScrollChange,

    onWheel,
    onKeyDown,
    onPointerDown,
    onPointerUp,
    onPointerMove,

    ...props
  }: Props<Line> & HtmlHTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineIndex = useLineIndex(lines, currentMillisecond);
  const {
    autoScroll,
    onWheel: onLocalAutoScrollWheel,
    onKeyDown: onLocalAutoScrollKeyDown,
    onPointerDown: onLocalAutoScrollPointerDown,
    onPointerUp: onLocalAutoScrollPointerUp,
    onPointerMove: onLocalAutoScrollPointerMove,
  } = useAutoScroll({
    recoverAutoScrollInterval,
    recoverAutoScrollSingal,
    onAutoScrollChange,
  });

  useScrollAction({
    root: rootRef.current,
    autoScroll,
    lineIndex,
    lines,
    verticalSpace,
  });

  useEffect(() => {
    if (onLineUpdate) {
      onLineUpdate({
        index: lineIndex,
        line: lines[lineIndex] ?? null,
      });
    }
  }, [onLineUpdate, lineIndex, lines]);

  useImperativeHandle(ref, () => rootRef.current!);

  const onWheelWrapper = useEvent((event: WheelEvent<HTMLDivElement>) => {
    onLocalAutoScrollWheel();
    return onWheel && onWheel(event);
  });
  const onKeyDownWrapper = useEvent((event: KeyboardEvent<HTMLDivElement>) => {
    onLocalAutoScrollKeyDown(event);
    return onKeyDown && onKeyDown(event);
  });
  const onPointerDownWrapper = useEvent(
    (event: PointerEvent<HTMLDivElement>) => {
      onLocalAutoScrollPointerDown();
      return onPointerDown?.(event);
    },
  );
  const onPointerUpWrapper = useEvent((event: PointerEvent<HTMLDivElement>) => {
    onLocalAutoScrollPointerUp();
    return onPointerUp?.(event);
  });
  const onPointerMoveWrapper = useEvent(
    (event: PointerEvent<HTMLDivElement>) => {
      onLocalAutoScrollPointerMove();
      return onPointerMove?.(event);
    },
  );

  const lineNodes = useMemo(
    () =>
      lines.map((line, index) => (
        <div key={line.id} className={LINE_CLASSNAME}>
          {lineRenderer({ index, active: lineIndex === index, line })}
        </div>
      )),
    [lineIndex, lineRenderer, lines],
  );
  return (
    <Root
      /** tabIndex make focusable and enable to add keyboard listener */
      tabIndex={-1}
      {...props}
      onWheel={onWheelWrapper}
      onKeyDown={onKeyDownWrapper}
      onPointerDown={onPointerDownWrapper}
      onPointerUp={onPointerUpWrapper}
      onPointerMove={onPointerMoveWrapper}
      ref={rootRef}
    >
      {verticalSpace ? space : null}
      {lineNodes}
      {verticalSpace ? space : null}
    </Root>
  );
}

export default forwardRef(BaseLrc) as <Line extends BaseLine>(
  props: Props<Line> &
    HtmlHTMLAttributes<HTMLDivElement> & {
      ref: React.ForwardedRef<HTMLDivElement>;
    },
) => ReturnType<typeof BaseLrc>;
