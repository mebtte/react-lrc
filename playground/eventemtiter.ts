import Eventemitter from 'eventemitter3';

export enum EventType {
  LRC_CHANGE = 'lrc_change',

  TIME_UPDATE = 'time_update',
}

export default new Eventemitter<EventType>();
