import { TIndexed } from '../util-functions/set';
import { set } from '../util-functions/set';
import { Observable, TListener } from '../../services/observable';

export enum StoreEvents {
  UPDATED = 'updated',
}

export class Store extends Observable {
  listeners: { [key in StoreEvents as string]: Array<TListener> };
  private state: TIndexed = {
    user: null,
  };
  private static _instance: Store;

  private constructor() {
    super({ [StoreEvents.UPDATED]: [] });
  }
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public getState(): TIndexed {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.UPDATED);
  }
}
