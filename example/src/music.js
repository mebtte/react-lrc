import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ playing }) =>
    playing ? 'rgba(49, 194, 124, 0.2)' : 'white'};
  > .cover {
    width: 60px;
    height: 60px;
  }
  > .info {
    flex: 1;
    min-width: 0;
    margin-left: 20px;
    > .name {
      font-size: 14px;
    }
    > .singers {
      font-size: 12px;
      color: gray;
    }
  }
`;

const Music = ({ music, playing, onPlay }) => {
  return (
    <Style playing={playing}>
      <img src={music.cover} alt="cover" className="cover" />
      <div className="info">
        <div className="name">{music.name}</div>
        <div className="singers">{music.singers.join(',')}</div>
        <div className="actions">
          <button type="button" onClick={() => onPlay(music)}>
            {playing ? 'playing' : 'play'}
          </button>
        </div>
      </div>
    </Style>
  );
};

export default Music;
