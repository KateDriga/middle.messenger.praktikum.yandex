import * as styles from './app.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { MainContent } from '../main-content/main-content';
import { Header } from '../header/header';
import { ROOT_ID } from '../../index';

export class App extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'app', id: ROOT_ID, class: styles.app },
      MyCoolTemplate.createComponent(Header, { key: 'header' }),
      MyCoolTemplate.createComponent(MainContent, { key: 'main-content' })
    );
  }
}
