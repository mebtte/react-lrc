import type { StoryObj, Meta } from '@storybook/react';
import type StaticComponent from './static';
import AutoScrollComponent from './auto_scroll';
import { lrc } from '../data';

const meta: Meta<typeof AutoScrollComponent> = {
  title: 'Lrc',
  component: AutoScrollComponent,
};

export default meta;

export const AutoScroll: StoryObj<typeof AutoScrollComponent> = {
  args: {
    lrc,
    recoverAutoScrollInterval: 3000,
    verticalSpace: true,
  },
};

export const Static: StoryObj<typeof StaticComponent> = {
  args: {
    lrc,
  },
};
