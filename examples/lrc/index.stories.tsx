/* eslint-disable react/function-component-definition */
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import StaticComponent from './static';
import AutoScrollComponent from './auto_scroll';
import { lrc } from '../data';

export default {
  title: 'Lrc',
} as Meta;

const AutoScrollTemplate: StoryFn<typeof AutoScrollComponent> = (args) => (
  <AutoScrollComponent {...args} />
);

export const AutoScroll = AutoScrollTemplate.bind({});
AutoScroll.args = {
  lrc,
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

const StaticTemplate: StoryFn<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
export const Static = StaticTemplate.bind({});
Static.args = {
  lrc,
};
