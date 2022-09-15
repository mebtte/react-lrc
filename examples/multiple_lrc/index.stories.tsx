/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MultipleLrc } from '../../src';
import StaticComponent from './static';
import { originalLrc, translatedLrc } from '../data';
import AutoScrollComponent from './auto_scroll';

export default {
  title: 'MultipleLrc',
  component: MultipleLrc,
} as ComponentMeta<typeof MultipleLrc>;

const AutoScrollTemplate: ComponentStory<typeof AutoScrollComponent> = (
  args,
) => <AutoScrollComponent {...args} />;
export const AutoScroll = AutoScrollTemplate.bind({});
AutoScroll.args = {
  lrcs: [originalLrc, translatedLrc],
  recoverAutoScrollInterval: 5000,
  verticalSpace: true,
};

const StaticTemplate: ComponentStory<typeof StaticComponent> = (args) => (
  <StaticComponent {...args} />
);
export const Static = StaticTemplate.bind({});
Static.args = {
  lrcs: [originalLrc, translatedLrc],
};
