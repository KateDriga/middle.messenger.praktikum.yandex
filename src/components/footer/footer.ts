import './footer.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';

export class Footer extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement('div', {
      key: 'footer',
      class: 'footer',
    });
  }
}
