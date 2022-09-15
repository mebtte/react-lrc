/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import styled from 'styled-components';
import { Lrc } from '../..';
import { formatMillisecond } from '../utils';

const Line = styled.div`
  > .time {
    color: orange;
    font-family: monospace;
  }
`;

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
