import Eventemitter from '../src/utils/eventemitter';

export enum EventType {
  LRC_CHANGE = 'lrc_change',
  TIME_UPDATE = 'time_update',
  LRC_PROPS_CHANGED = 'lrc_props_changed',
}

export default new Eventemitter<EventType>();
