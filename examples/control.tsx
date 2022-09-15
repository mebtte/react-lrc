import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgb(222 222 222);
`;

function Control({
  onPlay,
  onPause,
  onReset,
  current,
  setCurrent,
  recoverAutoScrollImmediately,
}: {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  current: number;
  setCurrent: (c: number) => void;
  recoverAutoScrollImmediately: () => void;
}) {
  return (
    <Style>
      <button type="button" onClick={onPlay}>
        play
      </button>
      <button type="button" onClick={onPause}>
        pause
      </button>
      <button type="button" onClick={onReset}>
        reset
      </button>
      <input
        type="number"
        value={current}
        onChange={(event) => setCurrent(Number(event.target.value))}
      />
      <button type="button" onClick={recoverAutoScrollImmediately}>
        recover auto scroll immediately
      </button>
    </Style>
  );
}

export default Control;
