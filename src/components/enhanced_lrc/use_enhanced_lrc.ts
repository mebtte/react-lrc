import { LyricExtLine as ClrcLyricExtLine, LineType, parse } from 'clrc';
import { useMemo } from 'react';
import getRandomString from '../../utils/get_random_string';
import { Line } from './constants';

type timed = { startMillisecond: number };

const byTime = (a: timed, b: timed) => a.startMillisecond - b.startMillisecond;

function useEnhLrc(lrc: string) {
  const lines = useMemo<Line[]>(
    () =>
      (
        parse(lrc, { enhanced: true }).filter(
          (line) => line.type === LineType.LYRIC_ENH,
        ) as ClrcLyricExtLine[]
      )
        .map((l) => ({
          id: getRandomString(),
          lineNumber: l.lineNumber,
          raw: l.raw,
          startMillisecond: l.startMillisecond,
          content: l.content,
          syllables: l.syllables
            .map((s) => ({
              id: getRandomString(),
              sylNumber: s.sylNumber,
              raw: s.raw,
              startMillisecond: s.startMillisecond,
              content: s.content,
            }))
            .sort(byTime),
        }))
        .sort(byTime),
    [lrc],
  );

  return lines;
}

export default useEnhLrc;
