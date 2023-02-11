import { Block } from '../base-components/block';
import { TVirtualDomNode } from '../template/template-types';
import { Store, StoreEvents } from './store';
import { TIndexed } from '../util-functions/set';
import { isEqual } from '../util-functions/isEqual';
import { Template } from '../template/template';

export interface IMapStateFromStore<T> {
  stateFromStore: T;
}

export function connect<M, S extends IMapStateFromStore<M>>(
  Component: { new (): Block<IMapStateFromStore<M>, S> },
  mapStateFn: (state: TIndexed) => TIndexed
): { new (): Block<IMapStateFromStore<M>, S> } {
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
      Store.getInstance().off(StoreEvents.UPDATED, this.handleStateChange);
      super.componentWillUnmount();
    }

    public render(): TVirtualDomNode {
      return Template.createComponent(Component, {
        key: 'connect',
        ...this.props,
        stateFromStore: this.state.stateFromStore,
      });
    }
  };
}
