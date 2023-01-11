import {
  OperationTypes,
  TVirtualDomNode,
  TVirtualDomUpdateOperation,
} from './my-cool-template-types';
import { MyCoolTemplate } from './my-cool-template';

export abstract class MyCoolComponent<P, S> {
  protected props: P;
  protected state: S;

  private currentRootNode: TVirtualDomNode;
  private mountedElement: HTMLElement | Text;

  // called when mounted element should receive new state
  protected setState(updater: (s: S) => S) {
    if (!this.mountedElement) {
      throw new Error('Setting state on unmounted component');
    }
    this.state = updater(this.state);
    MyCoolTemplate.applyUpdate(this.mountedElement, this.getUpdateDiff());
  }

  // called when mounted element receives new props
  public setProps(props: P): TVirtualDomUpdateOperation {
    if (this.mountedElement === null) {
      throw new Error('Setting props on unmounted component');
    }
    this.state = this.componentWillReceiveProps(props, this.state);
    this.props = props;
    return this.getUpdateDiff();
  }

  // called when mounting the element to Virtual Dom
  public initProps(props: P): TVirtualDomNode {
    this.props = props;
    this.currentRootNode = this.render();
    return this.currentRootNode;
  }

  // called when the component is mounted in the real DOM
  public notifyMounted(element: HTMLElement | Text) {
    this.mountedElement = element;
    setTimeout(() => this.componentDidMount());
  }

  // called when the component will be unmounted
  public unmount() {
    this.componentWillUnmount();
    this.mountedElement = null;
  }

  private getUpdateDiff(): TVirtualDomUpdateOperation {
    const newRootNode = this.render();
    const diff = MyCoolTemplate.createDiff(this.currentRootNode, newRootNode);
    if (diff.type == OperationTypes.REPLACE) {
      diff.callback = elem => (this.mountedElement = elem);
    }
    this.currentRootNode = newRootNode;
    setTimeout(() => this.componentDidUpdate());
    return diff;
  }

  public scrollToElement(arg?: boolean | ScrollIntoViewOptions) {
    if (!this.mountedElement) {
      throw new Error('Scrolling to unmounted component');
    }
    if (this.mountedElement instanceof Text) {
      throw new Error('Text Element does not support scrollIntoView');
    }
    this.mountedElement.scrollIntoView(arg);
  }

  // Lifecycle Methods
  public componentDidMount() {}
  public componentWillReceiveProps(props: P, state: S): S {
    return state;
  }
  public componentDidUpdate() {}
  public componentWillUnmount() {
    MyCoolTemplate.unmountChildNodes(this.currentRootNode);
  }

  public abstract render(): TVirtualDomNode;
}
