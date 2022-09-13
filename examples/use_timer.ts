import { useEffect, useState } from 'react';
import useEvent from '../src/utils/use_event';

function useTimer() {
  const [paused, setPaused] = useState(false);
  const play = useEvent(() => setPaused(false));
  const pause = useEvent(() => setPaused(true));

  const [currentMillisecond, setCurrentMillisecond] = useState(0);
  const reset = useEvent(() => setCurrentMillisecond(0));

  useEffect(() => {
    if (!paused) {
      let last = Date.now();
      const timer = window.setInterval(() => {
        const now = Date.now();
        setCurrentMillisecond((cm) => cm + (now - last));
        last = now;
      }, 97);
      return () => window.clearInterval(timer);
    }
  }, [paused]);

  return {
    currentMillisecond,
    setCurrentMillisecond,
    reset,
    paused,
    play,
    pause,
  };
}

export default useTimer;
