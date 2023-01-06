import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

export class HomePage extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'home-page' },
      MyCoolTemplate.createTextElement('Home page')
    );
  }
}
