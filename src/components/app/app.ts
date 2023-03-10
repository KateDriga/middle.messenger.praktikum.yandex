import styles from './app.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ROOT_ID } from '../../index';
import { Header } from '../header/header';
import { MainContent } from '../main-content/main-content';
import { AuthController } from '../../services/controllers/auth-controller';
import { Store } from '../../utils/store/store';
import { IMapStateFromStore } from '../../utils/store/connect';
import { IAppStateFromStore } from './app-wrapper';

export class App extends Block<null, IMapStateFromStore<IAppStateFromStore>> {
  constructor() {
    super();
    const store = Store.getInstance().getState();
    if (!store.user) {
      new AuthController().getUser();
    }
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'app', id: ROOT_ID, class: styles.app },
      Template.createComponent(Header, { key: 'header' }),
      Template.createComponent(MainContent, {
        key: 'main-content',
        isLoading: this.state.stateFromStore.isLoading,
      })
    );
  }
}
