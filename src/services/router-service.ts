import { Observable } from './observable';
import { TListener } from './event-bus';

export enum HistoryEventTypes {
  LOAD = 'load',
  POPSTATE = 'popstate',
}

export class RouterService extends Observable {
  listeners: { [key in HistoryEventTypes as string]: Array<TListener> };
  private static _instance: RouterService;

  private constructor() {
    super({ [HistoryEventTypes.LOAD]: [], [HistoryEventTypes.POPSTATE]: [] });
  }
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }
}
