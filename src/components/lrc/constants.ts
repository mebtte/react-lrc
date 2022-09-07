import { HTMLAttributes, ReactNode } from 'react';
import getRandomString from '../../utils/get_random_string';

export const LRC_COMPONENT_COMMON_CLASS_NAME = `react_lrc_${getRandomString()}`;
export const LRC_COMPONENT_CLASS_NAME_PREFIX = 'react_lrc_';
export const LRC_LINE_COMPONENT_COMMON_CLASS_NAME = `react_lrc_line_${getRandomString()}`;
export const LRC_LINE_COMPONENT_CLASS_NAME_PREFIX = 'react_lrc_line_';

export interface LrcLine {
  lineNumber: number;
  raw: string;
  startMillisecond: number;
  content: string;
}

export type LrcProps = HTMLAttributes<HTMLDivElement> & {
  /** lrc string */
  lrc: string;
  /** how to render a line */
  lineRenderer: (params: {
    index: number;
    active: boolean;
    line: LrcLine;
  }) => ReactNode;
  currentMillisecond?: number;
  // whether to scroll automatically
  autoScroll?: boolean;
  scrollToCurrentSignal?: boolean;
  recoverAutoScrollInterval?: number;
  /** add blank space on top of lrc */
  topBlank?: boolean;
  /** add blank space on bottom of lrc */
  bottomBlank?: boolean;
  /** call when current line changed */
  onLineUpdate?: (line: { index: number; line: LrcLine | null }) => void;
};
