import {
  ElementTypes,
  OperationTypes,
  TVirtualDomNode,
  TVirtualDomUpdateOperation,
} from '../template/template-types';
import { Template } from '../template/template';
import { EventBus, EventBusTypes } from '../../services/event-bus';
import { TListener } from '../../services/observable';

export abstract class Block<P, S> {
  protected props: P;
  protected state: S;

  private currentRootNode: TVirtualDomNode;
  private mountedElement: HTMLElement | Text;
  private readonly eventBus: () => EventBus;

  constructor() {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EventBusTypes.INIT, this._initProps.bind(this));
    eventBus.on(EventBusTypes.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EventBusTypes.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(
      EventBusTypes.FLOW_CWRP,
      this._componentWillReceiveProps.bind(this)
    );
    eventBus.on(EventBusTypes.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(EventBusTypes.FLOW_RENDER, this._render.bind(this));
  }

  private _clearEvents() {
    Object.entries(this.eventBus().listeners).forEach(
      ([event, callbacks]: [string, Array<TListener>]) =>
        callbacks.forEach(callback => this.eventBus().off(event, callback))
    );
  }

  public dispatchInitProps(props: P): TVirtualDomNode {
    this.eventBus().emit(EventBusTypes.INIT, props);
    return this.currentRootNode;
  }

  // called when mounting the element to Virtual Dom
  private _initProps(props: P) {
    this.props = this.initProps(props);
    this.eventBus().emit(EventBusTypes.FLOW_RENDER);
  }
  public initProps(props: P): P {
    return props;
  }

  // called when mounted element should receive new state
  protected setState(updater: (s: S) => S) {
    if (!this.mountedElement) {
      throw new Error('Setting state on unmounted component');
    }
    this.state = updater(this.state);
    const diff = this.getUpdateDiff();
    Template.applyUpdate(this.mountedElement, diff);
  }

  // called when mounted element receives new props
  public setProps(props: P): TVirtualDomUpdateOperation {
    if (!this.mountedElement) {
      throw new Error('Setting props on unmounted component');
    }
    this.eventBus().emit(EventBusTypes.FLOW_CWRP, props, this.state);
    this.props = props;
    return this.getUpdateDiff();
  }

  // called when the component is mounted in the real DOM
  public dispatchComponentDidMount(element: HTMLElement | Text) {
    this.mountedElement = element;
    window.setTimeout(() => this.eventBus().emit(EventBusTypes.FLOW_CDM));
  }

  // called when the component will be unmounted
  public dispatchUnmount() {
    this.eventBus().emit(EventBusTypes.FLOW_CWU);
  }

  private getUpdateDiff(): TVirtualDomUpdateOperation {
    const newRootNode = this.render();
    const diff = Template.createDiff(this.currentRootNode, newRootNode);
    if (diff.type == OperationTypes.REPLACE) {
      diff.callback = elem => (this.mountedElement = elem);
    }
    this.currentRootNode = newRootNode;
    window.setTimeout(() => this.eventBus().emit(EventBusTypes.FLOW_CDU));
    return diff;
  }

  // Lifecycle Flow Events
  private _componentDidMount() {
    this.componentDidMount();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentDidMount() {}

  private _componentWillReceiveProps(props: P, state: S) {
    this.state = this.componentWillReceiveProps(props, state);
  }
  public componentWillReceiveProps(props: P, state: S): S {
    return state;
  }

  private _componentDidUpdate() {
    this.componentDidUpdate();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentDidUpdate() {}

  private _componentWillUnmount() {
    this.componentWillUnmount();
    if (this.currentRootNode.type === ElementTypes.ELEMENT) {
      Template.unmountChildNodes(this.currentRootNode);
    }
    if (this.currentRootNode.type === ElementTypes.COMPONENT) {
      this.currentRootNode.instance?.dispatchUnmount();
    }
    this.mountedElement = null;
    this._clearEvents();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public componentWillUnmount() {}

  private _render() {
    this.currentRootNode = this.render();
  }
  public abstract render(): TVirtualDomNode;
}
