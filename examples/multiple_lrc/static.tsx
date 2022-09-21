/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import styled from 'styled-components';
import { MultipleLrc } from '../..';
import { formatMillisecond } from '../utils';

const Line = styled.div<{ active: boolean }>`
  padding: 5px 0;

  display: flex;
  align-items: center;
  gap: 10px;

  > .time {
    color: orange;
    font-family: monospace;
  }
`;

function Static({ lrcs }: { lrcs: string[] }) {
  return (
    <MultipleLrc
      lrcs={lrcs}
      lineRenderer={({ active, line }) => (
        <Line active={active}>
          <div className="time">{formatMillisecond(line.startMillisecond)}</div>
          <div className="list">
            {line.children.map((child) => (
              <div className="item" key={child.id}>
                {child.content}
              </div>
            ))}
          </div>
        </Line>
      )}
    />
  );
}

export default Static;
