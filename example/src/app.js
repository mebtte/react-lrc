import React, { useState, useRef, useCallback } from 'react';
import { Lrc } from '@mebtte/react-lrc';

import musicList from './data';
import { StyledApp, MusicList, Action } from './style';
import Music from './music';

const lrcStyle = {
  flex: 1,
  minHeight: 0,
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const onTimeUpdate = useCallback(
    (event) => setCurrentTime(event.target.currentTime),
    [],
  );
  const lrcRef = useRef();
  const lineRenderer = useCallback(({ lrcLine, index, active }) => {
    const { content } = lrcLine;
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '10px 0',
          color: active ? 'green' : 'inherit',
        }}
      >
        {content}
      </div>
    );
  }, []);
  const onCurrentLineChange = useCallback((line) => console.log(line), []);

  const currentMusic = musicList[currentIndex];
  return (
    <StyledApp>
      <div className="top">
        <MusicList>
          {musicList.map((music, index) => (
            <Music
              key={music.id}
              active={index === currentIndex}
              music={music}
              onPlay={() => setCurrentIndex(index)}
            />
          ))}
        </MusicList>
        <Action>
          <audio
            src={currentMusic.src}
            autoPlay
            controls
            onTimeUpdate={onTimeUpdate}
          />
          <br />
          <button
            type="button"
            onClick={() =>
              alert(JSON.stringify(lrcRef.current.getCurrentLine()))
            }
          >
            get current line
          </button>
          <button
            type="button"
            onClick={() => lrcRef.current.scrollToCurrentLine()}
          >
            scroll to current line
          </button>
          <a href="https://github.com/mebtte/react-lrc">github</a>
        </Action>
      </div>
      <Lrc
        ref={lrcRef}
        style={lrcStyle}
        lrc={currentMusic.lrc}
        currentTime={currentTime * 1000}
        lineRenderer={lineRenderer}
        onCurrentLineChange={onCurrentLineChange}
      />
    </StyledApp>
  );
};

export default App;
