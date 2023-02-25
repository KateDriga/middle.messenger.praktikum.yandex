import styles from './header.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export class Header extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'h1',
      { key: 'header', class: styles.header },
      Template.createTextElement('Welcome to Chat')
    );
  }
}
