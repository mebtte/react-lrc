import React, { ForwardedRef, forwardRef, HtmlHTMLAttributes } from 'react';
import BaseLrc from '../base_lrc';
import { Props, Line } from './constants';
import useLrc from './use_lrc';

const Lrc = forwardRef(
  (
    { lrc, ...props }: Props & HtmlHTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const lines = useLrc(lrc);
    return <BaseLrc<Line> {...props} lines={lines} ref={ref} />;
  },
);

export default Lrc;
