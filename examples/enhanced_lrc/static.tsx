/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import styled from 'styled-components';
import { EnhancedLrc } from '../..';
import { formatMillisecond, formatOffset } from '../utils';

const Line = styled.div`
  height: 2em;
  font-size: 30px;

  > .time {
    color: orange;
    font-family: monospace;
    font-size: 0.7em;
  }

  > .anchor:not(under) {
    position: relative;
    display: inline-block;
    white-space: pre;
  }

  .under {
    color: green;
    position: absolute;
    top: 2.3rem;
    font-size: 0.5em;
    font-family: monospace;
    rotate: 45deg;

    &::before {
      content: '+';
    }
  }
`;

function StaticLrc({ lrc }: { lrc: string }) {
  return (
    <EnhancedLrc
      lrc={lrc}
      lineRenderer={({ line }) => (
        <Line>
          <span className="time">
            {formatMillisecond(line.startMillisecond)}
          </span>
          &nbsp;
          {line.syllables.map((syllable) => (
            <div className="anchor">
              {syllable.content}
              {syllable.content &&
                formatOffset(
                  syllable.startMillisecond,
                  line.startMillisecond,
                ) && (
                  <div className="time under" key={syllable.id}>
                    {formatOffset(
                      syllable.startMillisecond,
                      line.startMillisecond,
                    )}
                  </div>
                )}
            </div>
          ))}
        </Line>
      )}
    />
  );
}

export default StaticLrc;
