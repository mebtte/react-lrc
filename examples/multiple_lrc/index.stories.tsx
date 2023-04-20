/* eslint-disable react/function-component-definition */
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import StaticComponent from './static';
import { originalLrc, translatedLrc } from '../data';
import AutoScrollComponent from './auto_scroll';

export default {
  title: 'MultipleLrc',
} as Meta;

const AutoScrollTemplate: StoryFn<typeof AutoScrollComponent> = (args) => (
  <AutoScrollComponent {...args} />
);
export const AutoScroll = AutoScrollTemplate.bind({});
AutoScroll.args = {
  lrcs: [originalLrc, translatedLrc],
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

const StaticTemplate: StoryFn<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
export const Static = StaticTemplate.bind({});
Static.args = {
  lrcs: [originalLrc, translatedLrc],
};
