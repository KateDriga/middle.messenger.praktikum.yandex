import { Block } from '../base-components/block';

export enum ElementTypes {
  TEXT = 'text',
  ELEMENT = 'element',
  COMPONENT = 'component',
}

interface IVirtualDomUnit {
  type: ElementTypes;
  key: string | number;
}

export interface IRef {
  current: HTMLElement | null;
}

export interface IVirtualDomElement extends IVirtualDomUnit {
  type: ElementTypes.ELEMENT;
  tagName: string;
  ref?: IRef;
  children?: Array<TVirtualDomNode>;
  props?: IVirtualDomEventsAndAttributes;
}

export interface IVirtualDomText extends IVirtualDomUnit {
  type: ElementTypes.TEXT;
  value: string;
}

export interface IVirtualDomComponent extends IVirtualDomUnit {
  type: ElementTypes.COMPONENT;
  instance?: Block<unknown, unknown>;
  props: IVirtualDomEventsAndAttributes;
  component: { new (): Block<unknown, unknown> };
}

export type TVirtualDomNode =
  | IVirtualDomElement
  | IVirtualDomText
  | IVirtualDomComponent;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IVirtualDomEventsAndAttributes {
  [key: string]:
    | string
    | boolean
    | number
    | ((arg?: any) => void)
    | Array<any>
    | Record<string, any>
    | IRef;
}
/* eslint-enable */

export interface IVirtualDomProps extends IVirtualDomEventsAndAttributes {
  key: string | number;
}

export enum OperationTypes {
  UPDATE = 'update',
  REPLACE = 'replace',
  SKIP = 'skip',
  REMOVE = 'remove',
  INSERT = 'insert',
}

interface IOperation {
  type: OperationTypes;
}

export interface IEventsAndAttributesUpdate {
  add: IVirtualDomEventsAndAttributes;
  remove: Record<string, (arg?: unknown) => void>;
}

interface IUpdateOperation extends IOperation {
  type: OperationTypes.UPDATE;
  props: IEventsAndAttributesUpdate;
  children: Array<TVirtualDomChildUpdateOperation>;
}

interface IReplaceOperation extends IOperation {
  type: OperationTypes.REPLACE;
  newNode: TVirtualDomNode;
  callback?: (element: HTMLElement | Text) => void;
}

interface ISkipOperation extends IOperation {
  type: OperationTypes.SKIP;
}

interface IRemoveOperation extends IOperation {
  type: OperationTypes.REMOVE;
}

interface IInsertOperation extends IOperation {
  type: OperationTypes.INSERT;
  node: TVirtualDomNode;
}

export type TVirtualDomUpdateOperation =
  | IUpdateOperation
  | IReplaceOperation
  | ISkipOperation;

export type TVirtualDomChildUpdateOperation =
  | TVirtualDomUpdateOperation
  | IRemoveOperation
  | IInsertOperation;
