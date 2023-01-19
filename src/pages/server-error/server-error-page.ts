import * as styles from './server-error-page.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export class ServerErrorPage extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'error-page', class: styles.server_error_page },
      Template.createElement('img', {
        key: 'img',
        src: require('../../images/technical-error.webp'),
        alt: 'error image',
        style: 'max-width: 400px',
      }),
      Template.createElement(
        'h1',
        { key: '500' },
        Template.createTextElement('5**')
      ),
      Template.createElement(
        'h2',
        { key: 'info1' },
        Template.createTextElement(
          'We are having technical difficulties and are actively working on a fix.'
        )
      ),
      Template.createElement(
        'h2',
        { key: 'info2' },
        Template.createTextElement(
          'Please try to refresh this page or come back in a few minutes.'
        )
      )
    );
  }
}
