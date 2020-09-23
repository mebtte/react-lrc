import { LrcLine } from '../constant';
import getRandomString from './get_random_string';

const LRC_LINE = /^(\[[0-9]+:[0-9]+(\.[0-9]+)?\])+.*/;
const LRC_TIMESTAMP_WITH_BRACKET = /\[[0-9]+:[0-9]+(\.[0-9]+)?\]/g;
const LRC_TIMESTAMP = /[0-9]+/g;

export default (lrc: string): LrcLine[] => {
  const lrcLineList: LrcLine[] = [];
  const lineList = lrc.split('\n');
  for (const line of lineList) {
    if (!LRC_LINE.test(line)) {
      continue;
    }
    const timeStringList = line.match(LRC_TIMESTAMP_WITH_BRACKET) as string[];
    const content = line.replace(LRC_TIMESTAMP_WITH_BRACKET, '');
    for (const timeString of timeStringList) {
      const [minute, second, millisecond = '0'] = timeString.match(
        LRC_TIMESTAMP,
      ) as string[];
      lrcLineList.push({
        id: getRandomString(),
        millisecond:
          Number.parseInt(minute, 10) * 60 * 1000 +
          Number.parseInt(second, 10) * 1000 +
          Number.parseInt(millisecond, 10),
        content,
      });
    }
  }
  return lrcLineList.sort((a, b) => a.millisecond - b.millisecond);
};
