import { MyCoolComponent } from './my-cool-component';

export enum ElementTypes {
  TEXT = 'text',
  ELEMENT = 'element',
  COMPONENT = 'component',
}

interface IVirtualDomUnit {
  type: ElementTypes;
  key: string | number;
}

export interface IVirtualDomElement extends IVirtualDomUnit {
  type: ElementTypes.ELEMENT;
  tagName: string;
  children?: Array<TVirtualDomNode>;
  props?: IVirtualDomAttributes;
}

export interface IVirtualDomText extends IVirtualDomUnit {
  type: ElementTypes.TEXT;
  value: string;
}

export interface IVirtualDomComponent extends IVirtualDomUnit {
  type: ElementTypes.COMPONENT;
  instance?: MyCoolComponent<any, any>;
  props: IVirtualDomAttributes;
  component: { new (): MyCoolComponent<any, any> };
}

export type TVirtualDomNode =
  | IVirtualDomElement
  | IVirtualDomText
  | IVirtualDomComponent;

export interface IVirtualDomAttributes {
  [key: string]: string | boolean | number | Function;
}

export interface IVirtualDomProps extends IVirtualDomAttributes {
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

export interface IAttributesUpdate {
  add: IVirtualDomAttributes;
  remove: Array<string>;
}

interface IUpdateOperation extends IOperation {
  type: OperationTypes.UPDATE;
  attributes: IAttributesUpdate;
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
