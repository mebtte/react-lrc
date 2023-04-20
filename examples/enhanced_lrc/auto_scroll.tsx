/* eslint-disable react/no-unstable-nested-components */
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { EnhancedLrc, useRecoverAutoScrollImmediately } from '../..';
import Control from '../control';
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
const lrcStyle: CSSProperties = {
  height: '100%',
  padding: '5px 0',
};

const Line = styled.div`
  min-height: 10px;
  padding: 5px 20px;

  font-size: 16px;
  text-align: center;
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
    useTimer(1);
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
        <EnhancedLrc
          lrc={lrc}
          lineRenderer={({ active, line: { syllables } }) => (
            <Line>
              {syllables.map((s) => (
                <span
                  style={{
                    color:
                      active && s.startMillisecond < currentMillisecond
                        ? 'red'
                        : 'black',
                  }}
                >
                  {s.content}
                </span>
              ))}
            </Line>
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
