/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import styled from 'styled-components';
import Lrc from '../../src/components/lrc';

const Line = styled.div`
  > .time {
    color: orange;
    font-family: monospace;
  }
`;

function formatMillisecond(ms: number) {
  const minute = Math.floor(ms / 1000 / 60);
  const second = Math.floor(ms / 1000) % 60;
  const millisecond = ms % 1000;
  return `${minute}:${second.toString().padStart(2, '0')}.${millisecond
    .toString()
    .padStart(3, '0')}`;
}

function StaticLrc({ lrc }: { lrc: string }) {
  return (
    <Lrc
      lrc={lrc}
      lineRenderer={({ line }) => (
        <Line>
          <span className="time">
            {formatMillisecond(line.startMillisecond)}
          </span>
          &nbsp;
          {line.content}
        </Line>
      )}
    />
  );
}

export default StaticLrc;
