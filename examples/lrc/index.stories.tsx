import { type StoryFn } from '@storybook/react';
import StaticComponent from './static';
import AutoScrollComponent from './auto_scroll';
import { lrc } from '../data';

export default {
  title: 'Lrc',
};

export const AutoScroll: StoryFn<typeof AutoScrollComponent> = (args) => (
  <AutoScrollComponent {...args} />
);
AutoScroll.args = {
  lrc,
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

export const Static: StoryFn<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
Static.args = {
  lrc,
};
