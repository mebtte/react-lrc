/* eslint-disable react/no-unstable-nested-components */
import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { Lrc, useRecoverAutoScrollImmediately } from '../../src';
import useTimer from '../use_timer';
import Control from '../control';

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
const lrcStyle: CSSProperties = {
  height: '100%',
  padding: '5px 0',
};
const Line = styled.div<{ active }>`
  min-height: 10px;
  padding: 5px 20px;

  font-size: 16px;
  text-align: center;

  ${({ active }) => css`
    color: ${active ? 'green' : 'black'};
  `}
`;

function LrcDemo({
  lrc,
  recoverAutoScrollInterval,
  verticalSpace,
}: {
  lrc: string;
  recoverAutoScrollInterval: number;
  verticalSpace: boolean;
}) {
  const { currentMillisecond, setCurrentMillisecond, reset, play, pause } =
    useTimer(2);
  const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();

  return (
    <Root>
      <Control
        onPlay={play}
        onPause={pause}
        onReset={reset}
        current={currentMillisecond}
        setCurrent={setCurrentMillisecond}
        recoverAutoScrollImmediately={recoverAutoScrollImmediately}
      />
      <div className="lrc-box">
        <Lrc
          lrc={lrc}
          lineRenderer={({ active, line: { content } }) => (
            <Line active={active}>{content}</Line>
          )}
          currentMillisecond={currentMillisecond}
          verticalSpace={verticalSpace}
          style={lrcStyle}
          recoverAutoScrollSingal={signal}
          recoverAutoScrollInterval={recoverAutoScrollInterval}
        />
      </div>
    </Root>
  );
}

export default LrcDemo;
