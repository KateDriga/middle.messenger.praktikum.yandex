import * as styles from './app.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { MainContent } from '../main-content/main-content';
import { Header } from '../header/header';
import { ROOT_ID } from '../../index';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

export class App extends MyCoolComponent<null, null> {
  routerService: RouterService;
  constructor() {
    super();
    this.routerService = RouterService.getInstance();
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
    return MyCoolTemplate.createElement(
      'div',
      { key: 'app', id: ROOT_ID, class: styles.app },
      MyCoolTemplate.createComponent(Header, { key: 'header' }),
      MyCoolTemplate.createComponent(MainContent, { key: 'main-content' })
    );
  }
}
