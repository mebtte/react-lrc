import {
  type CSSProperties,
  forwardRef,
  type HtmlHTMLAttributes,
  memo,
  useMemo,
  type ForwardedRef,
} from 'react';

const baseStyle: CSSProperties = {
  outline: 'none',
  boxSizing: 'border-box',
  scrollBehavior: 'smooth',
  overflow: 'auto',
};

function Root(
  { style, ...props }: HtmlHTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const combinedStyle = useMemo(
    () => ({
      ...baseStyle,
      ...style,
    }),
    [style],
  );
  return <div {...props} style={combinedStyle} ref={ref} />;
}

export default memo(forwardRef(Root));
