import type { BaseLine, BaseProps } from '../../constants';

export interface Line extends BaseLine {
  lineNumber: number;
  raw: string;
  content: string;
}

export interface Props extends BaseProps<Line> {
  lrc: string;
}
