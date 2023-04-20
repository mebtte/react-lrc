/* eslint-disable react/function-component-definition */
import { StoryObj } from '@storybook/react';
import { originalLrc, translatedLrc } from '../data';
import AutoScrollComponent from './auto_scroll';
import StaticComponent from './static';
import { Renderer } from '../utils';

type CompArgs = {
  lrcs: string[];
  recoverAutoScrollInterval?: number;
  verticalSpace?: boolean;
};

export default {
  title: 'MultipleLrc',
  component: Renderer<CompArgs>,
};

export const AutoScroll: StoryObj<typeof Renderer<CompArgs>> = {
  args: {
    compArgs: {
      lrcs: [originalLrc, translatedLrc],
      recoverAutoScrollInterval: 5000,
      verticalSpace: true,
    },
    component: AutoScrollComponent,
  },
};

export const Static: StoryObj<typeof Renderer<CompArgs>> = {
  args: {
    compArgs: {
      lrcs: [originalLrc, translatedLrc],
    },
    component: StaticComponent,
  },
};
