class Eventemitter<EventType extends string> {
  eventTypeMapListeners: Map<EventType, Function[]>;

  constructor() {
    this.eventTypeMapListeners = new Map<EventType, Function[]>();
  }

  listen(eventType: EventType, listener: Function) {
    this.eventTypeMapListeners.set(eventType, [
      ...(this.eventTypeMapListeners.get(eventType) || []),
      listener,
    ]);
  }

  unlisten(eventType: EventType, listener: Function) {
    this.eventTypeMapListeners.set(
      eventType,
      [...(this.eventTypeMapListeners.get(eventType) || [])].filter(
        (l) => l !== listener,
      ),
    );
  }

  trigger(eventType: EventType, data?: any): void {
    const eventTypeListeners = this.eventTypeMapListeners.get(eventType);
    if (!eventTypeListeners || !eventTypeListeners.length) {
      return;
    }
    return eventTypeListeners.forEach((listener) => listener(data));
  }
}

export default Eventemitter;
