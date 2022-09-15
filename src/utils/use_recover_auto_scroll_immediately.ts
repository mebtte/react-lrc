import { useCallback, useState } from 'react';

function useRecoverAutoScrollImmediately() {
  const [signal, setSignal] = useState(false);
  const recoverAutoScrollImmediately = useCallback(
    () => setSignal((s) => !s),
    [],
  );

  return { signal, recoverAutoScrollImmediately };
}

export default useRecoverAutoScrollImmediately;
