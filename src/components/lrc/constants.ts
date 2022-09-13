import { HTMLAttributes, ReactNode } from 'react';

export interface LyricLine {
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
    line: LyricLine;
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
  onLineUpdate?: (line: { index: number; line: LyricLine | null }) => void;
};
