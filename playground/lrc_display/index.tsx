/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CenterFocusStrong from '@material-ui/icons/CenterFocusStrong';
import Visibility from '@material-ui/icons/Visibility';

import { Lrc, LrcInstance, LyricLine as LyricLineType } from '../../src';
import useLrc from './use_lrc';
import useCurrentMillisecond from './use_current_millisecond';
import LyricLine from './lyric_line';
import useLrcProps from './use_lrc_props';

const ACTION_WIDTH = 60;
const INTERVAL_OF_RECOVERING_AUTO_SCROLL_AFTER_USER_SCROLL = 5000;
const Style = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 20px ${ACTION_WIDTH}px 20px 0;
  position: relative;
  > .lrc {
    flex: 1;
    min-height: 0;
  }
  > .action {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: ${ACTION_WIDTH}px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const lineRenderer = ({
  active,
  line,
}: {
  active: boolean;
  line: LyricLineType;
}) => <LyricLine content={line.content} active={active} />;

const onLineChange = ({
  index,
  line,
}: {
  index: number;
  line: LyricLineType;
}) => {
  console.group('current line changed');
  console.log('index', index);
  console.log('line', line);
  console.groupEnd();
};

const LrcDisplay = () => {
  const lrc = useLrc();
  const currentMillisecond = useCurrentMillisecond();
  const lrcProps = useLrcProps();
  const lrcRef = useRef<LrcInstance>();

  const [toCurrentLineButtonVisible, setToCurrentLineButtonVisible] = useState(
    false,
  );
  const wheelTimer = useRef<ReturnType<typeof window.setTimeout>>();
  const onWheel = throttle(() => {
    setToCurrentLineButtonVisible(true);
    window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(
      () => setToCurrentLineButtonVisible(false),
      INTERVAL_OF_RECOVERING_AUTO_SCROLL_AFTER_USER_SCROLL,
    );
  }, 100);
  const scrollToCurrentLine = () => {
    setToCurrentLineButtonVisible(false);
    window.clearTimeout(wheelTimer.current);
    return lrcRef.current.scrollToCurrentLine();
  };
  const showCurrentLineDetail = () => {
    console.group('current line');
    console.log(lrcRef.current.getCurrentLine());
    console.groupEnd();
  };

  return (
    <Style>
      <Lrc
        ref={lrcRef}
        className="lrc"
        lrc={lrc}
        lineRenderer={lineRenderer}
        currentMillisecond={currentMillisecond}
        onLineChange={onLineChange}
        onWheel={onWheel}
        intervalOfRecoveringAutoScrollAfterUserScroll={
          INTERVAL_OF_RECOVERING_AUTO_SCROLL_AFTER_USER_SCROLL
        }
        {...lrcProps}
      />
      <div className="action">
        {toCurrentLineButtonVisible ? (
          <Tooltip title="Scroll to current line" placement="left">
            <IconButton onClick={scrollToCurrentLine}>
              <CenterFocusStrong />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Show current line detail in console" placement="left">
          <IconButton onClick={showCurrentLineDetail}>
            <Visibility />
          </IconButton>
        </Tooltip>
      </div>
    </Style>
  );
};

export default LrcDisplay;
