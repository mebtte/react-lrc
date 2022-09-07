/* eslint-disable react/function-component-definition */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultipleLrc from '../src/components/multiple_lrc';
import MultipleLrcNormal from './multiple_lrc.normal';

export default {
  title: 'MultipleLrc',
  component: MultipleLrc,
} as ComponentMeta<typeof MultipleLrc>;

const Template: ComponentStory<typeof MultipleLrcNormal> = () => (
  <MultipleLrcNormal />
);
export const Normal = Template.bind({});
