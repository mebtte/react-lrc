import { type StoryFn } from '@storybook/react';
import StaticComponent from './static';
import { originalLrc, translatedLrc } from '../data';
import AutoScrollComponent from './auto_scroll';

export default {
  title: 'MultipleLrc',
};

export const AutoScroll: StoryFn<typeof AutoScrollComponent> = (args) => (
  <AutoScrollComponent {...args} />
);
AutoScroll.args = {
  lrcs: [originalLrc, translatedLrc],
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

export const Static: StoryFn<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
Static.args = {
  lrcs: [originalLrc, translatedLrc],
};
