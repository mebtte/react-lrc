import { Component } from 'react';

export function formatMillisecond(ms: number) {
  const minute = Math.floor(ms / 1000 / 60);
  const second = Math.floor(ms / 1000) % 60;
  const millisecond = ms % 1000;
  return `${minute.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}.${millisecond.toString().padStart(3, '0')}`;
}

export function Renderer<ArgType>({
  compArgs,
  component,
}: {
  compArgs: ArgType;
  component: (args: ArgType) => Component;
}) {
  return component(compArgs);
}
