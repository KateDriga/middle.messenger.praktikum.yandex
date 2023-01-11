import './not-found-page.scss';
import '../../common-styles/_page.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';

export class NotFoundPage extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'not-found-page', class: 'not_found_page' },
      MyCoolTemplate.createElement('img', {
        key: 'img',
        src: require('../../images/404-error.png'),
        alt: '404 image',
      }),
      MyCoolTemplate.createElement(
        'h1',
        { key: '404' },
        MyCoolTemplate.createTextElement('404')
      ),
      MyCoolTemplate.createElement(
        'h2',
        { key: 'info' },
        MyCoolTemplate.createTextElement('This page does not exist')
      ),
      MyCoolTemplate.createElement(
        'h3',
        {
          key: 'redirect',
          class: 'redirect',
          onClick: () => navigate(ROUTES.home.path),
        },
        MyCoolTemplate.createTextElement('Go to main')
      )
    );
  }
}
