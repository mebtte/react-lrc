import Eventemitter from 'eventemitter3';

export enum EventType {
  LRC_CHANGE = 'lrc_change',
  TIME_UPDATE = 'time_update',
  LRC_PROPS_CHANGED = 'lrc_props_changed',
}

export default new Eventemitter<EventType>();
