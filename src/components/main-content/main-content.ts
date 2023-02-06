import * as styles from './main-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { Route } from '../../utils/router/route';

export class MainContent extends Block<null, null> {
  render(): TVirtualDomNode {
    const key = 'page-content';
    return Template.createElement(
      'main',
      { key: 'page', class: styles.main_content_page },
      Template.createComponent(Route, {
        key,
        defaultComponent: NotFoundPage,
        defaultProps: { key },
      })
    );
  }
}
