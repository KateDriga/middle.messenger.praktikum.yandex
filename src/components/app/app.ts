import * as styles from './app.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { MainContent } from '../main-content/main-content';
import { Header } from '../header/header';
import { ROOT_ID } from '../../index';
import { AuthController } from '../../services/controllers/auth-controller';
import { Store } from '../../utils/store/store';
import { TIndexed } from '../../utils/util-functions/set';
import { connect } from '../../utils/store/connect';

interface IMapState {
  isLoading: boolean;
}

interface IState {
  stateFromStore: IMapState;
}

class AppClass extends Block<null, IState> {
  constructor() {
    super();
    this.handleAppLoad = this.handleAppLoad.bind(this);
    window.addEventListener('load', this.handleAppLoad);
  }

  handleAppLoad() {
    Store.getInstance().set('isLoading', true);
    new AuthController()
      .getUser()
      .finally(() => Store.getInstance().set('isLoading', false));
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleAppLoad);
    super.componentWillUnmount();
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

function mapLoadingState(state: TIndexed): IMapState {
  return {
    isLoading: state.isLoading,
  };
}

export const App = connect<IMapState, null, IState>(AppClass, mapLoadingState);
