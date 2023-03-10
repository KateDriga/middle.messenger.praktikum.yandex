import { TIndexed } from '../util-functions/set';
import { set } from '../util-functions/set';
import { Observable, TListener } from '../../services/observable';

export enum StoreEvents {
  UPDATED = 'updated',
}

const defaultStoreState = {
  user: null,
  chats: null,
  loadingState: {
    userIsLoading: false,
    chatsAreLoading: false,
  },
};

export class Store extends Observable {
  listeners: { [key in StoreEvents as string]: Array<TListener> };
  private state: TIndexed = { ...defaultStoreState };
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
    window.setTimeout(() => this.emit(StoreEvents.UPDATED));
  }

  public resetState() {
    this.state = { ...defaultStoreState };
    window.setTimeout(() => this.emit(StoreEvents.UPDATED));
  }
}
