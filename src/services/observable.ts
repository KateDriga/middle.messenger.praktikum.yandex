// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TListener = (args?: any) => void;

export class Observable {
  listeners: Record<string, Array<TListener>>;
  constructor(listeners: Record<string, Array<TListener>> = {}) {
    this.listeners = listeners;
  }

  on(event: string, callback: TListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: TListener) {
    if (!this.listeners[event]) {
      throw new Error(`Unsubscribing from the unknown event: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: Array<any>) {
    if (!this.listeners[event]) {
      throw new Error(`Emitting event with the unknown name: ${event}`);
    }
    this.listeners[event].forEach(listener => listener(...args));
  }
}
