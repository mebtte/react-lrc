import { LyricLine } from 'clrc';

function useCurrentLyricIndex(
  lyrics: LyricLine[],
  currentMillisecond: number,
): number {
  let index = 0;
  for (const { length } = lyrics; index <= length; index += 1) {
    const lyric = lyrics[index];
    if (!lyric || lyric.startMillisecond > currentMillisecond) {
      break;
    }
  }
  return index - 1;
}

export default useCurrentLyricIndex;
