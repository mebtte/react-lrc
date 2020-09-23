import { useState, useLayoutEffect, useCallback } from 'react';

import throttle from '../util/throttle';

export default ({
  autoScroll,
  autoScrollAfterUserScroll,
  lrcClassName,
}: {
  autoScroll: boolean;
  autoScrollAfterUserScroll: number;
  lrcClassName: string;
}) => {
  const [localAutoScroll, setLocalAutoScroll] = useState(autoScroll);
  const resetLocalAutoScroll = useCallback(
    () => setLocalAutoScroll(autoScroll),
    [autoScroll],
  );

  useLayoutEffect(() => {
    const lrcNode = document.querySelector<HTMLDivElement>(
      `.${lrcClassName}`,
    ) as HTMLDivElement;
    let timer: number;
    const onWheel = throttle(() => {
      setLocalAutoScroll(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => setLocalAutoScroll(autoScroll),
        autoScrollAfterUserScroll,
      );
    });
    lrcNode.addEventListener('wheel', onWheel);
    return () => lrcNode.removeEventListener('wheel', onWheel);
  }, [lrcClassName, autoScrollAfterUserScroll, autoScroll]);

  return { localAutoScroll, resetLocalAutoScroll };
};
