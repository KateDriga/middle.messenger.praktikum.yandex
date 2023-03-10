import styles from './not-found-page.module.scss';
import '../../common-styles/_page.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { Store } from '../../utils/store/store';

export class NotFoundPage extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'not-found-page', class: styles.not_found_page },
      Template.createElement('img', {
        key: 'img',
        src: require('../../images/404-error.webp'),
        alt: '404 image',
      }),
      Template.createElement(
        'h1',
        { key: '404' },
        Template.createTextElement('404')
      ),
      Template.createElement(
        'h2',
        { key: 'info' },
        Template.createTextElement('This page does not exist')
      ),
      Template.createElement(
        'h3',
        {
          key: 'redirect',
          class: styles.redirect,
          onClick: () =>
            Router.getInstance().replace(
              !Store.getInstance().getState().user
                ? ROUTES.login.path
                : ROUTES.chats.path
            ),
        },
        Template.createTextElement('Go to main')
      )
    );
  }
}
