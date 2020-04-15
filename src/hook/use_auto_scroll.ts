import { useLayoutEffect, useState, RefObject, useEffect } from 'react';

export default ({
  rootRef,
  autoScrollAfterUserScroll,
  scrollToCurrentLineSymbol,
}: {
  rootRef: RefObject<HTMLDivElement>;
  autoScrollAfterUserScroll: number;
  scrollToCurrentLineSymbol: number;
}) => {
  const [autoScroll, setAutoScroll] = useState(true);

  useLayoutEffect(() => {
    (rootRef.current as HTMLDivElement).style.overflow = 'auto';
  }, []);

  // @ts-ignore
  useLayoutEffect(() => {
    if (autoScrollAfterUserScroll) {
      let timer: ReturnType<typeof setTimeout>;
      const wheelListener = () => {
        setAutoScroll(false);
        clearTimeout(timer);
        timer = setTimeout(
          () => setAutoScroll(true),
          autoScrollAfterUserScroll,
        );
      };
      rootRef.current?.addEventListener('wheel', wheelListener);
      return () => rootRef.current?.removeEventListener('wheel', wheelListener);
    }
  }, [autoScrollAfterUserScroll]);

  useEffect(() => {
    setAutoScroll(true);
  }, [scrollToCurrentLineSymbol]);

  return autoScroll;
};
