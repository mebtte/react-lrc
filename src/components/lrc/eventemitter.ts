import Eventemitter from 'eventemitter3';

export enum EventType {
  RECOVER_AUTO_SCROLL = 'recover_auto_scroll',
}

export default new Eventemitter<EventType>();
