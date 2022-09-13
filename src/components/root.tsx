import React, {
  CSSProperties,
  forwardRef,
  HtmlHTMLAttributes,
  memo,
  useMemo,
} from 'react';

const baseStyle: CSSProperties = {
  outline: 'none',
  boxSizing: 'border-box',
  scrollBehavior: 'smooth',
  overflow: 'auto',
};

const Root = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const combinedStyle = useMemo(
      () => ({
        ...baseStyle,
        ...style,
      }),
      [style],
    );

    return <div {...props} style={combinedStyle} ref={ref} />;
  },
);

export default memo(Root);
