import React, { ForwardedRef, forwardRef, HtmlHTMLAttributes } from 'react';
import BaseLrc from '../base_lrc';
import { Props, Line } from './constants';
import useLrcs from './use_lrcs';

const Lrc = forwardRef(
  (
    { lrcs, ...props }: Props & HtmlHTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const lines = useLrcs(lrcs);
    return <BaseLrc<Line> {...props} lines={lines} ref={ref} />;
  },
);

export default Lrc;
