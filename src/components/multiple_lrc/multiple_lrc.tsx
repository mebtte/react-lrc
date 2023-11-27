import { type ForwardedRef, forwardRef, type HtmlHTMLAttributes } from 'react';
import BaseLrc from '../base_lrc';
import { type Props, type Line } from './constants';
import useLrcs from './use_lrcs';

function Lrc(
  { lrcs, ...props }: Props & HtmlHTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const lines = useLrcs(lrcs);
  return <BaseLrc<Line> {...props} lines={lines} ref={ref} />;
}

export default forwardRef(Lrc);
