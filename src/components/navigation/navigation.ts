import styles from './navigation.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ROUTES } from '../../utils/const-variables/pages';
import { NavLink } from '../../utils/router/nav-link';
import { Button } from '../button/button';

export class Navigation extends Block<null, null> {
  listItems = Object.keys(ROUTES)
    .filter(key => key !== 'chat')
    .map(key =>
      Template.createElement(
        'li',
        { key },
        Template.createComponent(NavLink, {
          key,
          href: ROUTES[key].path,
          component: Button,
          componentProps: {
            key,
            title: ROUTES[key].title,
            type: 'secondary',
            htmlType: 'button',
          },
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
