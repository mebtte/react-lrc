import { BaseLine, BaseProps } from '../../constants';

export interface Syllable extends BaseLine {
  sylNumber: number;
  raw: string;
  content: string;
}
export interface Line extends BaseLine {
  lineNumber: number;
  raw: string;
  content: string;
  syllables: Syllable[];
}

export interface Props extends BaseProps<Line> {
  lrc: string;
}
