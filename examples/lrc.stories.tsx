/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory } from '@storybook/react';
import LrcStatic from './lrc.static';
import LrcAutoScroll from './lrc.auto_scroll';
import { lrc } from './data';

export default {
  title: 'Lrc',
};

const StaticTemplate: ComponentStory<typeof LrcStatic> = (args) => (
  <LrcStatic {...args} />
);
export const StaticDisplay = StaticTemplate.bind({});
StaticDisplay.args = {
  lrc,
};

const AutoScrollTemplate: ComponentStory<typeof LrcAutoScroll> = (args) => (
  <LrcAutoScroll {...args} />
);
export const AutoScroll = AutoScrollTemplate.bind({});
AutoScroll.args = {
  lrc,
  topBlank: true,
  bottomBlank: true,
};
