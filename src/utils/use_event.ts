import { useRef, useCallback } from 'react';

/**
 * stable useCallback
 * @author mebtte<i@mebtte.com>
 */
function useEvent<Callback extends (...args: unknown[]) => unknown>(
  callback: Callback,
) {
  const callbackRef = useRef<Callback>();
  callbackRef.current = callback;

  const memoCallback = useCallback(
    (...args: Parameters<Callback>) => callbackRef.current!(...args),
    [],
  );

  return memoCallback;
}

export default useEvent;
