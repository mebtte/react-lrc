import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { INITIAL_TIMESTAMP } from '../data';
import eventemitter, { EventType } from '../eventemitter';
import CustomInput from './custom_input';

const Style = styled.div`
  > .time {
    font-size: 64px;
    font-weight: bold;
    text-align: center;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 5px;
  }
  > .action-box {
    text-align: center;
    > .action {
      margin: 0 10px;
    }
  }
`;

const Time = () => {
  const [currentMillisecond, setCurrentMillisecond] = useState(
    INITIAL_TIMESTAMP,
  );
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (!paused) {
      let lastMillisecond = Date.now();
      const timer = window.setInterval(() => {
        const now = Date.now();
        setCurrentMillisecond((cm) => cm + (now - lastMillisecond));
        lastMillisecond = now;
      }, 97);
      return () => window.clearInterval(timer);
    }
  }, [paused]);

  useEffect(() => {
    eventemitter.trigger(EventType.TIME_UPDATE, currentMillisecond);
  }, [currentMillisecond]);

  return (
    <Style>
      <Typography className="time">{currentMillisecond}</Typography>
      <div className="action-box">
        <Button
          className="action"
          variant="contained"
          color="primary"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? 'play' : 'pause'}
        </Button>
        <Button
          className="action"
          variant="contained"
          color="secondary"
          onClick={() => setCurrentMillisecond(0)}
        >
          reset
        </Button>
      </div>
      <CustomInput onSet={setCurrentMillisecond} />
    </Style>
  );
};

export default Time;
