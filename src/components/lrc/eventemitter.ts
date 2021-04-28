import Eventemitter from '../../utils/eventemitter';

export enum EventType {
  SCROLL_TO_CURRENT_LINE = 'scroll_to_current_line',
}

export default new Eventemitter<EventType>();
