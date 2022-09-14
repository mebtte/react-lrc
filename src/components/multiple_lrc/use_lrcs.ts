import { LineType, LyricLine, parse } from 'clrc';
import { useMemo } from 'react';
import { Line } from './constants';

export default (lrcs: string[]) => {
  const lines = useMemo<Line[]>(() => {
    const map = new Map<number, Line>();

    for (const lrc of lrcs) {
      const list = parse(lrc).filter(
        (l) => l.type === LineType.LYRIC,
      ) as LyricLine[];
      for (const item of list) {
        const current = map.get(item.startMillisecond) || {
          id: Math.random().toString(),
          startMillisecond: item.startMillisecond,
          children: [],
        };
        current.children.push({
          lineNumber: item.lineNumber,
          raw: item.raw,
          content: item.content,
        });
        map.set(item.startMillisecond, current);
      }
    }

    return [...map.values()];
  }, [lrcs.length, ...lrcs]);

  return lines;
};
