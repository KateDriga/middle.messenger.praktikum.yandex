import {
  ElementTypes,
  OperationTypes,
  TVirtualDomNode,
  TVirtualDomUpdateOperation,
} from './template-types';
import { Template } from './template';
import { Block } from '../base-components/block';

describe('Template', () => {
  describe('Apply Update', () => {
    it('should return the same text element, if operation type is "skip"', () => {
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.SKIP,
      };
      const textElement: Text = document.createTextNode('Hello!');
      expect(Template.applyUpdate(textElement, operation)).toBe(textElement);
    });
    it('should return the same html element, if operation type is "skip"', () => {
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.SKIP,
      };
      const divElement: HTMLElement = document.createElement('div');
      const text: Text = document.createTextNode('Hi there!');
      divElement.appendChild(text);
      expect(Template.applyUpdate(divElement, operation)).toBe(divElement);
    });
    it('should return new element, if operation type is "replace" (element)', () => {
      const tagName = 'h1';
      const child: TVirtualDomNode = {
        key: 'key',
        type: ElementTypes.TEXT,
        value: 'Welcome!',
      };
      const props = { class: 'header' };
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.REPLACE,
        newNode: {
          key: 'header',
          type: ElementTypes.ELEMENT,
          tagName,
          children: [child],
          props,
        },
      };
      const oldElement: HTMLElement = document.createElement('span');
      oldElement.appendChild(document.createTextNode('Old Text Here'));
      const newElement = Template.applyUpdate(
        oldElement,
        operation
      ) as HTMLElement;
      const newElementAttributes = {};
      for (let i = 0; i < newElement.attributes.length; i++) {
        newElementAttributes[newElement.attributes[i].name] =
          newElement.attributes[i].value;
      }
      expect(newElement.tagName.toLowerCase()).toBe(tagName.toLowerCase());
      expect(newElementAttributes).toMatchObject(props);
      expect(newElement.childNodes[0].nodeType).toEqual(Node.TEXT_NODE);
      expect(newElement.childNodes[0].nodeValue).toEqual(child.value);
    });
    it('should return new element, if operation type is "replace" (component)', () => {
      class Button extends Block<{ title: string; htmlType: string }, null> {
        render(): TVirtualDomNode {
          return Template.createElement(
            'button',
            {
              key: 'button',
              type: this.props.htmlType,
            },
            Template.createTextElement(this.props.title)
          );
        }
      }
      const buttonProps = {
        title: 'Test Button',
        htmlType: 'submit',
      };
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.REPLACE,
        newNode: {
          key: 'button',
          type: ElementTypes.COMPONENT,
          props: buttonProps,
          component: Button,
        },
      };
      const oldElement: Text = document.createTextNode('old text element');
      const newElement = Template.applyUpdate(
        oldElement,
        operation
      ) as HTMLElement;
      const newElementAttributes = {};
      for (let i = 0; i < newElement.attributes.length; i++) {
        newElementAttributes[newElement.attributes[i].name] =
          newElement.attributes[i].value;
      }
      expect(newElement.tagName.toLowerCase()).toBe('button');
      expect(newElementAttributes).toEqual(
        expect.objectContaining({ type: buttonProps.htmlType })
      );
      expect(newElement.childNodes[0].nodeType).toEqual(Node.TEXT_NODE);
      expect(newElement.childNodes[0].nodeValue).toEqual(buttonProps.title);
    });
    it('should throw error for invalid text node', () => {
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.UPDATE,
        props: {
          add: { class: 'new-class' },
          remove: {},
        },
        children: [],
      };
      document.body.innerHTML = `<p>Through-hiking is great!
                        <a href="https://en.wikipedia.org/wiki/Absentee_ballot">casting a ballot</a>is tricky.
                        </p>`;
      const paragraph = document.querySelector('p');
      const updateFn = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: expect to pass invalid node
        Template.applyUpdate(paragraph.childNodes[0], operation);
      };
      expect(updateFn).toThrowError('Invalid update for Text node');
    });
    it('should apply update and return updated element', () => {
      const changeFn = jest.fn();
      const operation: TVirtualDomUpdateOperation = {
        type: OperationTypes.UPDATE,
        props: {
          add: { class: 'new-class', type: 'email' },
          remove: { onChange: changeFn },
        },
        children: [],
      };
      const element = document.createElement('input');
      const updatedElement = Template.applyUpdate(
        element,
        operation
      ) as HTMLElement;
      const newElementAttributes = {};
      for (let i = 0; i < updatedElement.attributes.length; i++) {
        newElementAttributes[updatedElement.attributes[i].name] =
          updatedElement.attributes[i].value;
      }
      expect(updatedElement).toBe(element);
      expect(newElementAttributes).toMatchObject(operation.props.add);
      expect(newElementAttributes).not.toEqual(
        expect.objectContaining({ onChange: operation.props.remove.onChange })
      );
    });
  });
  describe('Create Diff', () => {
    it('should return skip for text node with the same text', () => {
      const text = 'test text';
      const oldNode = Template.createTextElement(text);
      const newNode = Template.createTextElement(text);
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.SKIP,
      });
    });
    it('should return replace for text node with different text', () => {
      const oldNode = Template.createTextElement('old text');
      const newNode = Template.createTextElement('new text');
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.REPLACE,
        newNode,
      });
    });
    it('should return replace for nodes with different types (text and element)', () => {
      const oldNode = Template.createTextElement('old node');
      const newNode = Template.createElement('button', { key: 'button' });
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.REPLACE,
        newNode,
      });
    });
    it('should return replace for nodes with different types (element and component)', () => {
      class Button extends Block<null, null> {
        render(): TVirtualDomNode {
          return Template.createElement('button', { key: 'button-key' });
        }
      }
      const oldNode = Template.createElement('button', { key: 'button' });
      const newNode = Template.createComponent(Button, { key: 'component' });
      expect(Template.createDiff(oldNode, newNode).type).toBe(
        OperationTypes.REPLACE
      );
    });
    it('should return replace for elements with different tags', () => {
      const oldNode = Template.createElement('button', { key: 'button' });
      const newNode = Template.createElement('input', { key: 'input' });
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.REPLACE,
        newNode,
      });
    });
    it('should return skip for existing component with the same props', () => {
      class Button extends Block<{ class: string }, null> {
        render(): TVirtualDomNode {
          return Template.createElement('button', {
            key: 'button-key',
            class: this.props.class,
          });
        }
      }
      const oldNode = Template.createComponent(Button, {
        key: 'component',
        class: 'old',
      });
      oldNode.instance = new oldNode.component();
      const newNode = Template.createComponent(Button, {
        key: 'component',
        class: 'old',
      });
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.SKIP,
      });
      expect(newNode.instance).toEqual(oldNode.instance);
    });
    it('should return replace and set old instance to null (component and element)', () => {
      class Button extends Block<null, null> {
        render(): TVirtualDomNode {
          return Template.createElement('button', { key: 'button' });
        }
      }
      jest
        .spyOn(Button.prototype, 'dispatchUnmount')
        .mockImplementation(() => jest.fn());
      const oldNode = Template.createComponent(Button, { key: 'old-node' });
      oldNode.instance = new oldNode.component();
      const newNode = Template.createElement('h1', { key: 'new-el' });
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.REPLACE,
        newNode,
      });
      expect(oldNode.instance).toBe(null);
    });
    it('should return replace (element and component)', () => {
      class Title extends Block<null, null> {
        render(): TVirtualDomNode {
          return Template.createElement('h2', { key: 'title' });
        }
      }
      const oldNode = Template.createElement('span', { key: 'old' });
      const newNode = Template.createComponent(Title, { key: 'new' });
      expect(JSON.stringify(Template.createDiff(oldNode, newNode))).toEqual(
        JSON.stringify({
          type: OperationTypes.REPLACE,
          newNode: newNode.instance.dispatchInitProps(newNode.props),
          callback: el => newNode.instance.dispatchComponentDidMount(el),
        })
      );
    });
    it('should return update for elements with different props', () => {
      const oldProps = {
        onClick: () => jest.fn(),
        type: 'button',
        name: 'old',
        disabled: true,
      };
      const newProps = {
        onClick: () => jest.fn(),
        type: 'button',
        name: 'new',
        onFocus: () => jest.fn(),
      };
      const oldNode = Template.createElement('button', {
        key: 'button',
        ...oldProps,
      });
      const newNode = Template.createElement('button', {
        key: 'button',
        ...newProps,
      });
      const expectedAddProps = {
        onClick: newProps.onClick,
        onFocus: newProps.onFocus,
        name: newProps.name,
      };
      const expectedRemoveProps = {
        onClick: oldProps.onClick,
        disabled: oldProps.disabled,
      };
      expect(Template.createDiff(oldNode, newNode)).toMatchObject({
        type: OperationTypes.UPDATE,
        props: { add: expectedAddProps, remove: expectedRemoveProps },
        children: [],
      });
    });
  });
  describe('Create component', () => {
    it('should return component object with passed props', () => {
      const props = {
        class: 'some-class',
        id: 'some-id',
        title: 'test-title',
      };
      const key = 'test';
      class TestComponent extends Block<typeof props, null> {
        render(): TVirtualDomNode {
          return Template.createElement('article', {
            key,
            id: this.props.id,
            title: this.props.title,
            class: this.props.class,
          });
        }
      }
      expect(
        Template.createComponent(TestComponent, { ...props, key })
      ).toMatchObject({
        type: ElementTypes.COMPONENT,
        props,
        component: TestComponent,
        key,
      });
    });
    it('should display warning in the console, if component props do not have key', () => {
      jest.spyOn(global.console, 'warn');
      const text = 'Test';
      class TestComponent extends Block<{ text: string }, null> {
        render(): TVirtualDomNode {
          return Template.createTextElement(this.props.text);
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: expect to pass props without key
      expect(Template.createComponent(TestComponent, { text })).toMatchObject({
        type: ElementTypes.COMPONENT,
        props: { text },
        component: TestComponent,
        key: 'key',
      });
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
  describe('Create element', () => {
    it('should return element object with passed props', () => {
      const props = {
        name: 'test-name',
        onClick: jest.fn(),
        src: '/test-src',
      };
      const key = 'test';
      const tag = 'img';
      const ref = Template.createRef();
      expect(
        Template.createElement('img', { ...props, key, ref })
      ).toMatchObject({
        type: ElementTypes.ELEMENT,
        tagName: tag,
        ref,
        props,
        key,
      });
    });
    it('should display warning in the console, if component props do not have key', () => {
      jest.spyOn(global.console, 'warn');
      const tag = 'section';
      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: expect to pass props without key
        Template.createElement(tag, {})
      ).toMatchObject({
        type: ElementTypes.ELEMENT,
        tagName: tag,
        props: {},
        key: 'key',
      });
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
  describe('Create Text Element', () => {
    it('should return text element with passed text', () => {
      const text = 'text for test text node';
      const key = 'test';
      expect(Template.createTextElement(text, key)).toMatchObject({
        type: ElementTypes.TEXT,
        value: text,
        key,
      });
    });
    it('should not display warning in the console, if props do not have key', () => {
      jest.spyOn(global.console, 'warn');
      const text = 'test-test';
      expect(Template.createTextElement(text)).toMatchObject({
        type: ElementTypes.TEXT,
        value: text,
        key: 'text',
      });
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
  describe('Create Ref', () => {
    it('should return object with current field (initial value is null)', () => {
      expect(Template.createRef()).toMatchObject({ current: null });
    });
    it('should return object with current field (initial value is html element)', () => {
      const element = document.createElement('div');
      expect(Template.createRef(element)).toEqual({ current: element });
    });
  });
  describe('Render Dom', () => {
    it("it should throw error, if root element doesn't exist", () => {
      const renderDomFn = () =>
        Template.renderDom('root-id', Template.createTextElement('test'));
      expect(renderDomFn).toThrowError('Root element not found');
    });
    it('should return html element', () => {
      const id = 'root-id';
      const text = 'Welcome!';
      document.body.innerHTML = `<div id="${id}"></div>`;
      const node = Template.createElement(
        'div',
        { key: 'div', id },
        Template.createTextElement(text)
      );
      const expectedHtmlElement = document.createElement('div');
      expectedHtmlElement.id = id;
      expectedHtmlElement.appendChild(document.createTextNode(text));
      expect(Template.renderDom(id, node)).toEqual(expectedHtmlElement);
      expect(document.body.innerHTML).toEqual(`<div id="${id}">${text}</div>`);
    });
  });
});
