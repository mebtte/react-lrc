import Lrc from './components/lrc';
import MultipleLrc from './components/multiple_lrc';
import useRecoverAutoScrollImmediately from './utils/use_recover_auto_scroll_immediately';

export { Lrc, MultipleLrc, useRecoverAutoScrollImmediately };
export type { Line as LrcLine, Props as LrcProps } from './components/lrc';
export type {
  Line as MultipleLrcLine,
  Props as MultipleLrcProps,
} from './components/multiple_lrc';
