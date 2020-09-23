import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  background-color: ${({ active }) =>
    active ? 'rgba(0, 255, 0, 0.1)' : 'transparent'};
  > .cover {
    vertical-align: middle;
    width: 36px;
    height: 36px;
  }
`;

const Music = ({ active, music, onPlay }) => {
  const { cover, name, singers } = music;
  return (
    <Style active={active}>
      <img className="cover" src={cover} alt="cover" />
      <span>
        {name} - {singers.join(',')}
      </span>
      <button type="button" onClick={onPlay}>
        play
      </button>
    </Style>
  );
};

export default Music;
