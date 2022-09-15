import { BaseLine, BaseProps } from '../../constants';

export interface Line extends BaseLine {
  children: {
    lineNumber: number;
    raw: string;
    content: string;
  }[];
}

export interface Props extends BaseProps<Line> {
  lrcs: string[];
}
