/* eslint-disable react/no-unstable-nested-components */
import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import Lrc from '../src/components/lrc';
import useTimer from './use_timer';

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  > .lrc-box {
    position: relative;

    flex: 1;
    min-height: 0;

    &::before {
      content: '';
      width: 100%;
      height: 1px;

      position: absolute;
      top: 50%;
      left: 0;

      background: rgb(255 0 0 / 0.15);
    }
  }
`;
const Panel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgb(222 222 222);
`;
const lrcStyle: CSSProperties = {
  height: '100%',
};
const Line = styled.div<{ active }>`
  text-align: center;

  ${({ active }) => css`
    color: ${active ? 'green' : 'black'};
  `}
`;

function LrcDemo({
  lrc,
  topBlank,
  bottomBlank,
}: {
  lrc: string;
  topBlank: boolean;
  bottomBlank: boolean;
}) {
  const { currentMillisecond, reset, play, pause } = useTimer();

  return (
    <Root>
      <Panel>
        <button type="button" onClick={play}>
          play
        </button>
        <button type="button" onClick={pause}>
          pause
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
        <div>{currentMillisecond}</div>
      </Panel>
      <div className="lrc-box">
        <Lrc
          lrc={lrc}
          lineRenderer={({ active, line: { content } }) => (
            <Line active={active}>{content}</Line>
          )}
          currentMillisecond={currentMillisecond}
          topBlank={topBlank}
          bottomBlank={bottomBlank}
          style={lrcStyle}
          onScroll={(event) => console.log(event.isTrusted)}
        />
      </div>
    </Root>
  );
}

export default LrcDemo;
