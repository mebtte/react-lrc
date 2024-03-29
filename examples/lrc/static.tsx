/* eslint-disable react/no-unstable-nested-components */
import styled from 'styled-components';
import { Lrc } from '../../src';
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
