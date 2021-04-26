import React from 'react';
import styled from 'styled-components';

import { Lrc, LyricLine as LyricLineType } from '../../src';
import useLrc from './use_lrc';
import useCurrentMillisecond from './use_current_millisecond';
import LyricLine from './lyric_line';
import useLrcProps from './use_lrc_props';

const Style = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  > .lrc {
    flex: 1;
    min-height: 0;
    padding: 20px 0;
  }
`;

const lineRenderer = ({
  active,
  line,
}: {
  active: boolean;
  line: LyricLineType;
}) => <LyricLine content={line.content} active={active} />;

const LrcDisplay = () => {
  const lrc = useLrc();
  const currentMillisecond = useCurrentMillisecond();
  const lrcProps = useLrcProps();

  return (
    <Style>
      <Lrc
        className="lrc"
        lrc={lrc}
        lineRenderer={lineRenderer}
        currentMillisecond={currentMillisecond}
        {...lrcProps}
      />
    </Style>
  );
};

export default LrcDisplay;
