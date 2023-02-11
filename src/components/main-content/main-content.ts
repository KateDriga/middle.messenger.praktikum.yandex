import * as styles from './main-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Loader } from '../loader/loader';
import { Route } from '../../utils/router/route';

export class MainContent extends Block<{ isLoading: boolean }, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'main',
      { key: 'page', class: styles.main_content_page },
      this.props.isLoading
        ? Template.createComponent(Loader, { key: 'loader' })
        : Template.createComponent(Route, {
            key: 'page-content',
          })
    );
  }
}
