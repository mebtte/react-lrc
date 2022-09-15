import { useMemo } from 'react';
import { parse, LineType, LyricLine as ClrcLyricLine } from 'clrc';
import { Line } from './constants';

function useLrc(lrc: string) {
  const lines = useMemo<Line[]>(
    () =>
      (
        parse(lrc).filter(
          (line) => line.type === LineType.LYRIC,
        ) as ClrcLyricLine[]
      )
        .map((l) => ({
          id: Math.random().toString(),
          lineNumber: l.lineNumber,
          raw: l.raw,
          startMillisecond: l.startMillisecond,
          content: l.content,
        }))
        .sort((a, b) => a.startMillisecond - b.startMillisecond),
    [lrc],
  );

  return lines;
}

export default useLrc;
