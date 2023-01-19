import * as styles from './app.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { MainContent } from '../main-content/main-content';
import { Header } from '../header/header';
import { ROOT_ID } from '../../index';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

export class App extends Block<null, null> {
  routerService = RouterService.getInstance();

  constructor() {
    super();
    window.addEventListener(
      HistoryEventTypes.LOAD,
      this.windowLoadEvent.bind(this)
    );
    window.addEventListener(
      HistoryEventTypes.POPSTATE,
      this.windowPopstateEvent.bind(this)
    );
  }

  windowLoadEvent() {
    this.routerService.emit(HistoryEventTypes.LOAD);
  }
  windowPopstateEvent() {
    this.routerService.emit(HistoryEventTypes.POPSTATE);
  }

  componentWillUnmount() {
    window.removeEventListener(HistoryEventTypes.LOAD, this.windowLoadEvent);
    window.removeEventListener(
      HistoryEventTypes.POPSTATE,
      this.windowPopstateEvent
    );
    super.componentWillUnmount();
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
