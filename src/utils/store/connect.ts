import { Block } from '../base-components/block';
import { TVirtualDomNode } from '../template/template-types';
import { Store, StoreEvents } from './store';
import { TIndexed } from '../util-functions/set';
import { isEqual } from '../util-functions/isEqual';

export function connect<M, P, S extends { stateFromStore: M }>(
  Component: { new (): Block<P, S> },
  mapStateFn: (state: TIndexed) => TIndexed
): { new (): Block<P, S> } {
  return class extends Component {
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
      if (
        !this.state?.stateFromStore ||
        !isEqual(this.state.stateFromStore, updatedStateFromStore)
      ) {
        if (this._isMounted) {
          this.setState(s => ({ ...s, stateFromStore: updatedStateFromStore }));
        } else {
          this.state = {
            ...this.state,
            stateFromStore: mapStateFn(Store.getInstance().getState()),
          };
        }
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
      // render must be implemented in the parent class (Component)
      return super.render();
    }
  };
}
