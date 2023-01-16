import * as styles from './server-error-page.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

export class ServerErrorPage extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'error-page', class: styles.server_error_page },
      MyCoolTemplate.createElement('img', {
        key: 'img',
        src: require('../../images/technical-error.webp'),
        alt: 'error image',
        style: 'max-width: 400px',
      }),
      MyCoolTemplate.createElement(
        'h1',
        { key: '500' },
        MyCoolTemplate.createTextElement('5**')
      ),
      MyCoolTemplate.createElement(
        'h2',
        { key: 'info1' },
        MyCoolTemplate.createTextElement(
          'We are having technical difficulties and are actively working on a fix.'
        )
      ),
      MyCoolTemplate.createElement(
        'h2',
        { key: 'info2' },
        MyCoolTemplate.createTextElement(
          'Please try to refresh this page or come back in a few minutes.'
        )
      )
    );
  }
}
