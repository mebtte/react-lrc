import { BaseLine } from '../../constants';

function useLineIndex(lines: BaseLine[], currentMillisecond: number): number {
  let index = 0;
  for (const { length } = lines; index <= length; index += 1) {
    const line = lines[index];
    if (!line || line.startMillisecond > currentMillisecond) {
      break;
    }
  }
  return index - 1;
}

export default useLineIndex;
