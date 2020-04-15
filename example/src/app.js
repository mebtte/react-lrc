import React, { useState, useCallback } from 'react';

import musicList from './data';
import style from './style';

import Music from './music';
import Audio from './audio';
import Lyric from './lyric';

const App = () => {
  const [index, setIndex] = useState(0);
  const onPrevious = useCallback(
    () =>
      setIndex((i) => {
        const target = i - 1;
        if (target < 0) {
          return target + musicList.length;
        }
        return target;
      }),
    [],
  );
  const onNext = useCallback(
    () => setIndex((i) => (i + 1) % musicList.length),
    [],
  );
  const [currentTime, setCurrentTime] = useState(0);
  const onTimeUpdate = useCallback(
    (event) => setCurrentTime(event.target.currentTime),
    [],
  );

  const music = musicList[index];
  return (
    <div style={style.container}>
      <div style={style.part}>
        {musicList.map((m, i) => (
          <Music
            key={m.id}
            music={m}
            playing={i === index}
            onPlay={() => setIndex(i)}
          />
        ))}
        <Audio
          music={music}
          onPrevious={onPrevious}
          onNext={onNext}
          onTimeUpdate={onTimeUpdate}
        />
      </div>
      <Lyric music={music} currentTime={currentTime} />
    </div>
  );
};

export default App;
