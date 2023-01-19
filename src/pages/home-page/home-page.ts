import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export class HomePage extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'home-page' },
      Template.createTextElement('Home page')
    );
  }
}
