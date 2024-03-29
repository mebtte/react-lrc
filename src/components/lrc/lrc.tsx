import { type ForwardedRef, forwardRef, type HtmlHTMLAttributes } from 'react';
import BaseLrc from '../base_lrc';
import { type Props, type Line } from './constants';
import useLrc from './use_lrc';

const Lrc = (
  { lrc, ...props }: Props & HtmlHTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const lines = useLrc(lrc);
  return <BaseLrc<Line> {...props} lines={lines} ref={ref} />;
};

export default forwardRef(Lrc);
