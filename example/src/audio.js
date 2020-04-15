import React, { useRef, useCallback } from 'react';
import MediaSession from '@mebtte/react-media-session';

import style from './style';

const Audio = ({ music, onPrevious, onNext, onTimeUpdate }) => {
  const audioRef = useRef();
  const onPlay = useCallback(() => audioRef.current.play(), []);
  const onPause = useCallback(() => audioRef.current.pause(), []);

  return (
    <MediaSession
      title={music.name}
      artist={music.singers.join(',')}
      artwork={[
        {
          src: music.cover,
          sizes: '512x512',
        },
      ]}
      onPlay={onPlay}
      onPause={onPause}
      onPreviousTrack={onPrevious}
      onNextTrack={onNext}
    >
      <audio
        src={music.src}
        autoPlay
        loop
        controls
        style={style.audio}
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
      />
    </MediaSession>
  );
};

export default Audio;
