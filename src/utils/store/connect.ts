import { Block } from '../base-components/block';
import { Store, StoreEvents } from './store';
import { TIndexed } from '../util-functions/set';
import { isEqual } from '../util-functions/isEqual';

export interface IMapStateFromStore<T> {
  stateFromStore: T;
}

export function connect<M, S extends IMapStateFromStore<M>>(
  Component: { new (): Block<unknown, S> },
  mapStateFn: (state: TIndexed) => TIndexed
): { new (): Block<unknown, S> } {
  return class extends Component {
    state: S;
    private _isMounted = false;

    constructor() {
      super();
      this.state = {
        ...this.state,
        stateFromStore: mapStateFn(Store.getInstance().getState()),
      };
      this.handleStateChange = this.handleStateChange.bind(this);
      Store.getInstance().on(StoreEvents.UPDATED, this.handleStateChange);
    }

    handleStateChange() {
      const updatedStateFromStore = mapStateFn(Store.getInstance().getState());
      if (!this._isMounted) {
        this.state = {
          ...this.state,
          stateFromStore: mapStateFn(Store.getInstance().getState()),
        };
      } else if (!isEqual(this.state.stateFromStore, updatedStateFromStore)) {
        this.setState(s => ({
          ...s,
          stateFromStore: mapStateFn(Store.getInstance().getState()),
        }));
      }
    }

    componentDidMount() {
      this._isMounted = true;
      super.componentDidMount();
    }

    componentWillUnmount() {
      this._isMounted = false;
      Store.getInstance().off(StoreEvents.UPDATED, this.handleStateChange);
      super.componentWillUnmount();
    }
  };
}
