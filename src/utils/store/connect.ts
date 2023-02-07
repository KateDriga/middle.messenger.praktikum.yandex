import { Block } from '../base-components/block';
import { TVirtualDomNode } from '../template/template-types';
import { Store, StoreEvents } from './store';
import { TIndexed } from '../util-functions/set';
import { isEqual } from '../util-functions/isEqual';
import { Template } from '../template/template';

export function connect(
  Component: { new (): Block<Record<string, unknown>, unknown> },
  mapStateToProps: (state: TIndexed) => TIndexed
) {
  return class extends Component {
    constructor() {
      super();
      this.handleStateChange = this.handleStateChange.bind(this);
    }

    initProps(props: Record<string, unknown>): Record<string, unknown> {
      const propsWithStateProps = {
        ...props,
        stateFromProps: mapStateToProps(Store.getInstance().getState()),
      };
      return super.initProps(propsWithStateProps);
    }

    handleStateChange() {
      const updatedStateFromProps = mapStateToProps(
        Store.getInstance().getState()
      );
      if (!isEqual(this.props.stateFromProps, updatedStateFromProps)) {
        this.setProps({
          ...this.props,
          stateFromProps: updatedStateFromProps,
        });
      }
    }

    componentDidMount() {
      Store.getInstance().on(StoreEvents.UPDATED, this.handleStateChange);
      super.componentDidMount();
    }

    componentWillUnmount() {
      Store.getInstance().off(StoreEvents.UPDATED, this.handleStateChange);
      super.componentWillUnmount();
    }

    public render(): TVirtualDomNode {
      return Template.createComponent(Component, {
        ...this.props,
        key: 'connect',
      });
    }
  };
}
