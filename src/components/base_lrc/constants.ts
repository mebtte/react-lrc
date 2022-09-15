import { BaseLine, BaseProps } from '../../constants';

export const LINE_CLASSNAME = 'react-lrc-line';

export interface Props<Line extends BaseLine> extends BaseProps<Line> {
  lines: Line[];
}
