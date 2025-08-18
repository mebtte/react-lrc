import { type ReactNode } from 'react';

export interface BaseLine {
  id: string;
  startMillisecond: number;
}

export interface BaseProps<Line extends BaseLine> {
  lineRenderer: (payload: {
    index: number;
    active: boolean;
    line: Line;
  }) => ReactNode;
  currentMillisecond?: number;
  verticalSpace?: boolean;
  recoverAutoScrollInterval?: number;
  recoverAutoScrollSingal?: boolean;
  onLineClick?: (payload: { line: Line | null }) => void;
  isOnLineClickRecoverAutoScroll?: boolean;
  onAutoScrollChange?: (payload: { autoScroll: boolean }) => void;
}

export const DEFAULT_PROPS = {
  currentMillisecond: -1,
  verticalSpace: false,
  recoverAutoScrollInterval: 5000,
  recoverAutoScrollSingal: false,
  isOnLineClickRecoverAutoScroll: true,
} as const;
