import * as styles from './header.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Navigation } from '../navigation/navigation';

export class Header extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'nav',
      { key: 'nav', class: styles.header },
      Template.createComponent(Navigation, { key: 'nav' })
    );
  }
}
