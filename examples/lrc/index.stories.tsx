/* eslint-disable react/function-component-definition */
import { StoryObj } from '@storybook/react';
import { lrc } from '../data';
import AutoScrollComponent from './auto_scroll';
import StaticComponent from './static';
import { Renderer } from '../utils';

type CompArgs = {
  lrc: string;
  recoverAutoScrollInterval?: number;
  verticalSpace?: boolean;
};

export default {
  title: 'Lrc',
  component: Renderer<CompArgs>,
};

export const AutoScroll: StoryObj<typeof Renderer<CompArgs>> = {
  args: {
    compArgs: {
      lrc,
      recoverAutoScrollInterval: 5000,
      verticalSpace: true,
    },
    component: AutoScrollComponent,
  },
};

export const Static: StoryObj<typeof Renderer<CompArgs>> = {
  args: {
    compArgs: {
      lrc,
    },
    component: StaticComponent,
  },
};
