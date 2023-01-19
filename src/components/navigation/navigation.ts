import * as styles from './navigation.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ROUTES } from '../../utils/const-variables/pages';
import { Link } from '../link/link';

export class Navigation extends Block<null, null> {
  listItems = Object.keys(ROUTES)
    .filter(key => key !== 'chat')
    .map(key =>
      Template.createElement(
        'li',
        { key },
        Template.createComponent(Link, {
          href: ROUTES[key].path,
          title: ROUTES[key].title,
          isButton: true,
          key,
        })
      )
    );

  render(): TVirtualDomNode {
    return Template.createElement(
      'ul',
      { class: styles.navigation, key: 'nav' },
      ...this.listItems
    );
  }
}
