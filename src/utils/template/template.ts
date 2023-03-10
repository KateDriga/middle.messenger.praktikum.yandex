import {
  ElementTypes,
  IEventsAndAttributesUpdate,
  IRef,
  IVirtualDomEventsAndAttributes,
  IVirtualDomComponent,
  IVirtualDomElement,
  IVirtualDomProps,
  IVirtualDomText,
  OperationTypes,
  TVirtualDomChildUpdateOperation,
  TVirtualDomNode,
  TVirtualDomUpdateOperation,
} from './template-types';
import { Block } from '../base-components/block';

const isEvent = (key: string) => key.startsWith('on');
const checkKey = (
  props: IVirtualDomProps,
  elementName: string
): IVirtualDomProps => {
  if (props.key === undefined) {
    console.warn(`Key for ${elementName} element is not defined`);
    props = { ...props, key: 'key' };
  }
  return props;
};
const checkPropsEqual = (
  oldProps: IVirtualDomEventsAndAttributes,
  newProps: IVirtualDomEventsAndAttributes
): boolean => {
  const oldPropsLength = Object.keys(oldProps).length;
  const newPropsLength = Object.keys(newProps).length;
  if (oldPropsLength === newPropsLength) {
    return Object.keys(oldProps).every(
      key =>
        Object.prototype.hasOwnProperty.call(newProps, key) &&
        oldProps[key] === newProps[key]
    );
  }
  return false;
};

function createElement(
  tagName: string,
  props: IVirtualDomProps,
  ...children: Array<TVirtualDomNode>
): IVirtualDomElement {
  const checkedProps = checkKey(props, tagName);
  const key = checkedProps.key;
  delete checkedProps.key;
  let ref: IRef | null;
  if (props.ref && Object.prototype.hasOwnProperty.call(props.ref, 'current')) {
    ref = props.ref as IRef;
    delete checkedProps.ref;
  }
  return {
    type: ElementTypes.ELEMENT,
    tagName,
    ref,
    props: checkedProps,
    children,
    key,
  };
}

function createTextElement(
  value: string | boolean | number,
  key: string | number = 'text'
): IVirtualDomText {
  return {
    type: ElementTypes.TEXT,
    value: value.toString(),
    key,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createComponent<P extends Record<string, any>, S>(
  component: { new (): Block<P, S> },
  props: IVirtualDomProps
): IVirtualDomComponent {
  const checkedProps = checkKey(props, component.name);
  const key = checkedProps.key;
  delete checkedProps.key;
  return {
    type: ElementTypes.COMPONENT,
    props: checkedProps,
    component,
    key,
  };
}

function createDiff(
  oldNode: TVirtualDomNode,
  newNode: TVirtualDomNode
): TVirtualDomUpdateOperation {
  // skip text nodes with the same text
  if (
    oldNode.type === ElementTypes.TEXT &&
    newNode.type === ElementTypes.TEXT &&
    oldNode.value === newNode.value
  ) {
    return { type: OperationTypes.SKIP };
  }
  // replace text node with different text or node of another type
  if (
    oldNode.type === ElementTypes.TEXT ||
    newNode.type === ElementTypes.TEXT ||
    (oldNode.type === ElementTypes.ELEMENT &&
      newNode.type === ElementTypes.ELEMENT &&
      oldNode.tagName !== newNode.tagName)
  ) {
    return { type: OperationTypes.REPLACE, newNode };
  }
  // update existing component
  if (
    oldNode.type === ElementTypes.COMPONENT &&
    newNode.type === ElementTypes.COMPONENT &&
    oldNode.component === newNode.component &&
    oldNode.instance
  ) {
    newNode.instance = oldNode.instance;
    if (checkPropsEqual(oldNode.props, newNode.props)) {
      return { type: OperationTypes.SKIP };
    }
    return newNode.instance.setProps(newNode.props);
  }
  // replace component
  if (oldNode.type === ElementTypes.COMPONENT) {
    oldNode.instance.dispatchUnmount();
    oldNode.instance = null;
    return { type: OperationTypes.REPLACE, newNode };
  }
  // replace with component
  if (newNode.type === ElementTypes.COMPONENT) {
    newNode.instance = new newNode.component();
    return {
      type: OperationTypes.REPLACE,
      newNode: newNode.instance.dispatchInitProps(newNode.props),
      callback: el => newNode.instance.dispatchComponentDidMount(el),
    };
  }

  // update events and attributes
  const propsUpdate: IEventsAndAttributesUpdate = {
    add: Object.keys(newNode.props)
      ?.filter(prop => oldNode.props[prop] !== newNode.props[prop])
      .reduce((acc, prop) => ({ ...acc, [prop]: newNode.props[prop] }), {}),
    remove: Object.keys(oldNode.props)
      ?.filter(
        prop =>
          !Object.keys(newNode.props).includes(prop) ||
          (isEvent(prop) && newNode.props[prop] !== oldNode.props[prop])
      )
      .reduce((acc, prop) => ({ ...acc, [prop]: oldNode.props[prop] }), {}),
  };
  const children: Array<TVirtualDomChildUpdateOperation> = createChildDiff(
    oldNode.children,
    newNode.children
  );

  return { type: OperationTypes.UPDATE, props: propsUpdate, children };
}

function createChildDiff(
  oldChildren: Array<TVirtualDomNode>,
  newChildren: Array<TVirtualDomNode>
): Array<TVirtualDomChildUpdateOperation> {
  const oldChildrenToUpdate: Array<[string | number, TVirtualDomNode]> =
    oldChildren.map(child => [child.key, child]);
  const newChildrenToAdd: Array<[string | number, TVirtualDomNode]> =
    newChildren.map(child => [child.key, child]);

  const operations: TVirtualDomChildUpdateOperation[] = [];

  let [nextUpdateKey] = oldChildrenToUpdate.find(oldEntry =>
    newChildrenToAdd.find(newEntry => oldEntry[0] === newEntry[0])
  ) || [null];

  while (nextUpdateKey) {
    // remove old children before nextUpdateKey
    removeBeforeKey(operations, oldChildrenToUpdate, nextUpdateKey);
    // insert new children before nextUpdateKey
    insertBeforeKey(operations, newChildrenToAdd, nextUpdateKey);
    // add update operation
    operations.push(
      createDiff(oldChildrenToUpdate.shift()[1], newChildrenToAdd.shift()[1])
    );
    // find nextUpdateKey
    [nextUpdateKey] = oldChildrenToUpdate.find(oldEntry =>
      newChildrenToAdd.find(newEntry => oldEntry[0] === newEntry[0])
    ) || [null];
  }
  // remove all remaining old children
  removeBeforeKey(operations, oldChildrenToUpdate, undefined);
  // insert all remaining new children
  insertBeforeKey(operations, newChildrenToAdd, undefined);

  return operations;
}

function removeBeforeKey(
  operations: Array<TVirtualDomChildUpdateOperation>,
  elements: Array<[string | number, TVirtualDomNode]>,
  key: string | number
) {
  while (elements[0] && elements[0][0] !== key) {
    if (elements[0][1].type == ElementTypes.COMPONENT) {
      elements[0][1].instance.dispatchUnmount();
      elements[0][1].instance = null;
    }
    operations.push({ type: OperationTypes.REMOVE });
    elements.shift();
  }
}

function insertBeforeKey(
  operations: Array<TVirtualDomChildUpdateOperation>,
  elements: Array<[string | number, TVirtualDomNode]>,
  key: string | number
) {
  while (elements[0] && elements[0][0] !== key) {
    operations.push({ type: OperationTypes.INSERT, node: elements.shift()[1] });
  }
}

function unmountChildNodes(node: TVirtualDomNode) {
  if (node.type === ElementTypes.ELEMENT) {
    node.children
      .filter(child => child.type !== ElementTypes.TEXT)
      .forEach(child =>
        child.type === ElementTypes.COMPONENT
          ? child.instance.dispatchUnmount()
          : unmountChildNodes(child)
      );
  }
}

function renderElement(node: TVirtualDomNode): HTMLElement | Text {
  // render text
  if (node.type === ElementTypes.TEXT) {
    return document.createTextNode(node.value);
  }
  // render component
  if (node.type === ElementTypes.COMPONENT) {
    let element: HTMLElement | Text;
    if (node.instance) {
      element = renderElement(node.instance.render());
    } else {
      node.instance = new node.component();
      element = renderElement(node.instance.dispatchInitProps(node.props));
    }
    node.instance.dispatchComponentDidMount(element);
    return element;
  }
  // render element
  const element = document.createElement(node.tagName);
  if (node.ref) {
    node.ref.current = element;
  }
  // Add props, classes and events
  addProps(node.props, node.type, element);
  node.children.forEach(child => element.appendChild(renderElement(child)));

  return element;
}

function addProps(
  props: IVirtualDomEventsAndAttributes,
  nodeType: ElementTypes,
  element: HTMLElement
) {
  Object.keys(props).forEach(prop => {
    if (isEvent(prop)) {
      const eventType = prop.substring(2).toLowerCase();
      element.addEventListener(eventType, props[prop] as (e?: Event) => void);
    } else if (prop === 'class') {
      if (nodeType === ElementTypes.ELEMENT) {
        element.className = props[prop].toString();
      }
    } else if (prop === 'value') {
      element.setAttribute('value', props[prop].toString());
    } else {
      element[prop] = props[prop];
    }
  });
}

function applyUpdate(
  element: HTMLElement | Text,
  diff: TVirtualDomUpdateOperation
): HTMLElement | Text {
  if (diff.type === OperationTypes.SKIP) {
    return element;
  }
  if (diff.type === OperationTypes.REPLACE) {
    const newElement = renderElement(diff.newNode);
    element.replaceWith(newElement);
    if (diff.callback) {
      diff.callback(newElement);
    }
    return newElement;
  }
  if ('wholeText' in element) {
    throw new Error('Invalid update for Text node');
  }
  Object.keys(diff.props.remove).forEach(prop => {
    isEvent(prop)
      ? element.removeEventListener(prop, diff.props.remove[prop])
      : prop === 'class'
      ? (element.className = '')
      : element.removeAttribute(prop);
  });
  addProps(diff.props.add, ElementTypes.ELEMENT, element);
  applyChildrenDiff(element, diff.children);

  return element;
}

function applyChildrenDiff(
  element: HTMLElement,
  operations: Array<TVirtualDomChildUpdateOperation>
) {
  let offset = 0;
  operations.forEach((operation, idx) => {
    if (operation.type === OperationTypes.SKIP) {
      return;
    }
    if (operation.type === OperationTypes.INSERT) {
      if (element.childNodes[idx + offset]) {
        element.childNodes[idx + offset].before(renderElement(operation.node));
      } else {
        element.appendChild(renderElement(operation.node));
      }
      return;
    }
    const childElement = element.childNodes[idx + offset] as HTMLElement | Text;
    if (operation.type === OperationTypes.REMOVE) {
      childElement.remove();
      offset--;
      return;
    }

    applyUpdate(childElement, operation);
  });
}

function createRef(initialValue: HTMLElement | null = null): IRef {
  return { current: initialValue };
}

function renderDom(rootId: string, rootNode: TVirtualDomNode): HTMLElement {
  const element = document.getElementById(rootId);
  if (!element) {
    throw new Error('Root element not found');
  }
  const parent = element.parentElement;
  element.replaceWith(renderElement(rootNode));
  return parent.children[0] as HTMLElement;
}

export const Template = {
  applyUpdate,
  createDiff,
  createComponent,
  createElement,
  createTextElement,
  createRef,
  renderDom,
  unmountChildNodes,
};
