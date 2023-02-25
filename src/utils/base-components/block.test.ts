import { Block } from './block';
import {
  ElementTypes,
  OperationTypes,
  TVirtualDomNode,
} from '../template/template-types';
import { Template } from '../template/template';

describe('Block Tests', () => {
  it('should set props and emit render', () => {
    const title = 'Title';
    class Test extends Block<{ title: string }, null> {
      render(): TVirtualDomNode {
        return Template.createTextElement(this.props.title);
      }
    }
    jest.spyOn(Test.prototype, 'render');
    const instance = new Test();
    const currentRootNode = instance.dispatchInitProps({ title });
    expect(Test.prototype.render).toHaveBeenCalledTimes(1);
    expect(currentRootNode).toEqual(instance.render());
  });
  it('should throw error, if setState is called on unmounted component', () => {
    class Test extends Block<{ title: string }, null> {
      initProps(props: { title: string }): { title: string } {
        this.setState(() => null);
        return super.initProps(props);
      }
      render(): TVirtualDomNode {
        return Template.createTextElement(this.props.title);
      }
    }
    const instance = new Test();
    const initPropsFn = () =>
      instance.dispatchInitProps({ title: 'title-text' });
    expect(initPropsFn).toThrowError('Setting state on unmounted component');
  });
  it('should update mounted element on setState', () => {
    const title = 'Title';
    const updatedTitle = 'Updated Title';
    class Test extends Block<null, { title: string }> {
      state = { title };
      componentDidMount() {
        this.setState(() => ({ title: updatedTitle }));
        super.componentDidMount();
      }
      render(): TVirtualDomNode {
        return Template.createTextElement(this.state.title);
      }
    }
    const instance = new Test();
    const element = document.createTextNode(title);
    instance.dispatchComponentDidMount(element);
    setTimeout(() => expect(element.nodeValue).toEqual(updatedTitle));
  });
  it('should throw error, if setProps is called on unmounted component', () => {
    class Test extends Block<{ title: string }, null> {
      render(): TVirtualDomNode {
        return Template.createTextElement(this.props.title);
      }
    }
    const instance = new Test();
    const setPropsFn = () => instance.setProps({ title: 'new title' });
    expect(setPropsFn).toThrowError('Setting props on unmounted component');
  });
  it('should return diff on setProps and emit componentWillReceiveProps', () => {
    const title = 'Test Title';
    const updatedTitle = 'Updated Test Title';
    class Test extends Block<{ title: string }, null> {
      render(): TVirtualDomNode {
        return Template.createTextElement(this.props.title);
      }
    }
    jest.spyOn(Test.prototype, 'componentWillReceiveProps');
    const instance = new Test();
    const element = document.createTextNode(title);
    instance.dispatchComponentDidMount(element);
    setTimeout(() => {
      const expectedNewElement = document.createTextNode(updatedTitle);
      expect(instance.setProps({ title: updatedTitle })).toEqual({
        type: OperationTypes.REPLACE,
        newNode: expectedNewElement,
      });
      expect(Test.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
    });
  });
  it('should trigger component did mount', () => {
    const title = 'test';
    class Test extends Block<null, null> {
      counter = 0;
      componentDidMount() {
        this.counter++;
        super.componentDidMount();
      }
      render(): TVirtualDomNode {
        return Template.createTextElement(title);
      }
    }
    jest.spyOn(Test.prototype, 'componentDidMount');
    const instance = new Test();
    instance.dispatchComponentDidMount(document.createElement(title));
    setTimeout(() => {
      expect(Test.prototype.componentDidMount).toHaveBeenCalledTimes(1);
      expect(instance.counter).toBe(1);
    });
  });
  it('should trigger component will unmount', () => {
    class Test extends Block<null, null> {
      render(): TVirtualDomNode {
        return Template.createTextElement('test');
      }
    }
    jest.spyOn(Test.prototype, 'componentWillUnmount');
    const instance = new Test();
    instance.initProps(null);
    instance.dispatchComponentDidMount(document.createTextNode('test'));
    setTimeout(() => {
      instance.dispatchUnmount();
      expect(Test.prototype.componentWillUnmount).toHaveBeenCalledTimes(1);
    });
  });
  it('should trigger component did update', () => {
    class Test extends Block<{ title: string }, null> {
      counter = 0;
      componentDidUpdate() {
        this.counter++;
        super.componentDidUpdate();
      }
      render(): TVirtualDomNode {
        return Template.createTextElement(this.props.title);
      }
    }
    jest.spyOn(Test.prototype, 'componentDidUpdate');
    const instance = new Test();
    instance.dispatchInitProps({ title: 'old' });
    instance.dispatchComponentDidMount(document.createTextNode('old'));
    setTimeout(() => {
      instance.setProps({ title: 'new' });
      expect(Test.prototype.componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(instance.counter).toBe(1);
    });
  });
  it('should return correct virtual dom node', () => {
    class Test extends Block<null, null> {
      render(): TVirtualDomNode {
        return Template.createElement(
          'ul',
          { key: 'list' },
          Template.createElement(
            'li',
            { key: 1 },
            Template.createTextElement('item 1')
          ),
          Template.createElement(
            'li',
            { key: 2 },
            Template.createTextElement('item 2')
          ),
          Template.createElement(
            'li',
            { key: 3 },
            Template.createTextElement('item 3')
          )
        );
      }
    }
    const expectedDomElement = {
      key: 'list',
      type: ElementTypes.ELEMENT,
      tagName: 'ul',
      ref: undefined,
      props: {},
      children: [
        {
          key: 1,
          type: ElementTypes.ELEMENT,
          tagName: 'li',
          ref: undefined,
          props: {},
          children: [
            {
              key: 'text',
              type: ElementTypes.TEXT,
              value: 'item 1',
            },
          ],
        },
        {
          key: 2,
          type: ElementTypes.ELEMENT,
          tagName: 'li',
          ref: undefined,
          props: {},
          children: [
            {
              key: 'text',
              type: ElementTypes.TEXT,
              value: 'item 2',
            },
          ],
        },
        {
          key: 3,
          type: ElementTypes.ELEMENT,
          tagName: 'li',
          ref: undefined,
          props: {},
          children: [
            {
              key: 'text',
              type: ElementTypes.TEXT,
              value: 'item 3',
            },
          ],
        },
      ],
    };
    expect(new Test().render()).toEqual(expectedDomElement);
  });
});
