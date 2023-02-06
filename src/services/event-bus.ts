import { Observable, TListener } from './observable';

export enum EventBusTypes {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CWRP = 'flow:component-will-receive-props',
  FLOW_CWU = 'flow:component-will-unmount',
  FLOW_RENDER = 'flow:render',
}

export class EventBus extends Observable {
  listeners: { [key in EventBusTypes as string]: Array<TListener> };
}
