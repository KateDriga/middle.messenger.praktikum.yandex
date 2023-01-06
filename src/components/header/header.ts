import './header.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Navigation } from '../navigation/navigation';

export class Header extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'nav',
      { key: 'nav', class: 'header' },
      MyCoolTemplate.createComponent(Navigation, { key: 'nav' })
    );
  }
}
