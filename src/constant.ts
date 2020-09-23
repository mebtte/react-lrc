import getRandomString from './util/get_random_string';

export const LRC_COMMON_CLASS_NAME = `react_lrc_${getRandomString()}_common`;
export const LRC_LINE_COMMON_CLASS_NAME = `react_lrc_line_${getRandomString()}_common`;

export const AUTO_SCROLL_AFTER_USER_SCROLL = 6000;

export interface LrcLine {
  id: string;
  millisecond: number;
  content: string;
}
