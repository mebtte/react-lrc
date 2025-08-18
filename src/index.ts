import Lrc from './components/lrc';
import MultipleLrc from './components/multiple_lrc';
import useRecoverAutoScrollImmediately from './utils/use_recover_auto_scroll_immediately';

export type { Props as LrcProps, Line as LrcLine } from './components/lrc';
export type {
  Line as MultipleLrcLine,
  Props as MultipleLrcProps,
} from './components/multiple_lrc';

export { Lrc, MultipleLrc, useRecoverAutoScrollImmediately };
