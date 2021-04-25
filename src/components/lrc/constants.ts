import { HTMLAttributes, ReactNode } from 'react';
import { LyricLine } from 'clrc';

import getRandomString from '../../utils/get_random_string';

export const LRC_COMPONENT_COMMON_CLASS_NAME = `react_lrc_${getRandomString()}`;
export const LRC_COMPONENT_CLASS_NAME_PREFIX = 'react_lrc_';
export const LRC_LINE_COMPONENT_COMMON_CLASS_NAME = `react_lrc_line_${getRandomString()}`;
export const LRC_LINE_COMPONENT_CLASS_NAME_PREFIX = 'react_lrc_line_';

export type LrcInstance = {
  dom: HTMLDivElement;

  getCurrentLyric: () => LyricLine | null;
};

export type LrcProps = HTMLAttributes<HTMLDivElement> & {
  /** lrc string */
  lrc: string;
  /** lyric line render */
  lineRender: (params: {
    index: number;
    active: boolean;
    line: LyricLine;
  }) => ReactNode;
  currentMillisecond?: number;
  autoScroll?;
};
