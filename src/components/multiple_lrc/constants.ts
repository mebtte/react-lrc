import type { BaseLine, BaseProps } from '../../constants';

export interface Line extends BaseLine {
  children: Array<{
    id: string;
    lineNumber: number;
    raw: string;
    content: string;
  }>;
}

export interface Props extends BaseProps<Line> {
  lrcs: string[];
}
