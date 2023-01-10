import './navigation.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ROUTES } from '../../utils/const-variables/pages';
import { Link } from '../link/link';

export class Navigation extends MyCoolComponent<null, null> {
  listItems = Object.keys(ROUTES)
    .filter(key => key !== 'chat')
    .map(key =>
      MyCoolTemplate.createElement(
        'li',
        { key },
        MyCoolTemplate.createComponent(Link, {
          href: ROUTES[key].path,
          title: ROUTES[key].title,
          isButton: true,
          key,
        })
      )
    );
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'ul',
      { class: 'navigation', key: 'nav' },
      ...this.listItems
    );
  }
}
