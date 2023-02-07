import * as styles from './app.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { MainContent } from '../main-content/main-content';
import { Header } from '../header/header';
import { ROOT_ID } from '../../index';
import { AuthController } from '../../services/controllers/auth-controller';

export class App extends Block<null, null> {
  constructor() {
    super();
    new AuthController().getUser();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'app', id: ROOT_ID, class: styles.app },
      Template.createComponent(Header, { key: 'header' }),
      Template.createComponent(MainContent, { key: 'main-content' })
    );
  }
}
