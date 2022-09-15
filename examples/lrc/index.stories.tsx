/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory } from '@storybook/react';
import StaticComponent from './static';
import AutoScrollComponent from './auto_scroll';
import { lrc } from '../data';

export default {
  title: 'Lrc',
};

const AutoScrollTemplate: ComponentStory<typeof AutoScrollComponent> = (
  args,
) => <AutoScrollComponent {...args} />;
export const AutoScroll = AutoScrollTemplate.bind({});
AutoScroll.args = {
  lrc,
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

const StaticTemplate: ComponentStory<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
export const Static = StaticTemplate.bind({});
Static.args = {
  lrc,
};
