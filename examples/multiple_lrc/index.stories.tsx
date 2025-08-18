import { originalLrc, translatedLrc } from '../data';
import AutoScrollComponent from './auto_scroll';

const meta = {
  title: 'MultipleLrc',
  component: AutoScrollComponent,
};

export default meta;

export const AutoScroll = {
  args: {
    lrcs: [originalLrc, translatedLrc],
    recoverAutoScrollInterval: 5000,
    verticalSpace: true,
  },
};

export const Static = {
  args: {
    lrcs: [originalLrc, translatedLrc],
  },
};
