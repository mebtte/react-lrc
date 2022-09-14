/* eslint-disable react/no-unstable-nested-components */
import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { MultipleLrc, useRecoverAutoScrollImmediately } from '../../src';
import useTimer from '../use_timer';

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
  lrcs,
  recoverAutoScrollInterval,
  topBlank,
  bottomBlank,
}: {
  lrcs: string[];
  recoverAutoScrollInterval: number;
  topBlank: boolean;
  bottomBlank: boolean;
}) {
  const { currentMillisecond, setCurrentMillisecond, reset, play, pause } =
    useTimer(4);
  const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();

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
        <input
          type="number"
          value={currentMillisecond}
          onChange={(event) =>
            setCurrentMillisecond(Number(event.target.value))
          }
        />
        <button type="button" onClick={recoverAutoScrollImmediately}>
          recover auto scroll immediately
        </button>
      </Panel>
      <div className="lrc-box">
        <MultipleLrc
          lrcs={lrcs}
          lineRenderer={({ active, line: { children } }) => (
            <Line active={active}>
              {children.map((child) => (
                <div>{child.content}</div>
              ))}
            </Line>
          )}
          currentMillisecond={currentMillisecond}
          topBlank={topBlank}
          bottomBlank={bottomBlank}
          style={lrcStyle}
          recoverAutoScrollSingal={signal}
          recoverAutoScrollInterval={recoverAutoScrollInterval}
        />
      </div>
    </Root>
  );
}

export default LrcDemo;
