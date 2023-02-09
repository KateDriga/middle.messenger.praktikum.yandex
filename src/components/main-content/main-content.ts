import * as styles from './main-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ProtectedRoute } from '../../utils/router/protected-route';
import { Loader } from '../loader/loader';

export class MainContent extends Block<{ isLoading: boolean }, null> {
  render(): TVirtualDomNode {
    const key = 'page-content';
    return Template.createElement(
      'main',
      { key: 'page', class: styles.main_content_page },
      this.props.isLoading
        ? Template.createComponent(Loader, { key })
        : Template.createComponent(ProtectedRoute, { key })
    );
  }
}
