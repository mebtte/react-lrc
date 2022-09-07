import { useCallback, useState } from 'react';

function useScrollToCurrent() {
  const [signal, setSignal] = useState(false);
  const scrollToCurrent = useCallback(() => setSignal((s) => !s), []);

  return { signal, scrollToCurrent };
}

export default useScrollToCurrent;
