import * as styles from './app.module.scss';
import { Block } from '../../utils/base-components/block';
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
    this.windowLoadEvent = this.windowLoadEvent.bind(this);
    this.windowPopstateEvent = this.windowPopstateEvent.bind(this);
    window.addEventListener(HistoryEventTypes.LOAD, this.windowLoadEvent);
    window.addEventListener(
      HistoryEventTypes.POPSTATE,
      this.windowPopstateEvent
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
