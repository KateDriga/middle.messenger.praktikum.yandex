import * as styles from './main-content.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import {
  getPathWithoutTrailingSlash,
  IRoute,
  ROUTES,
} from '../../utils/const-variables/pages';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

interface IState {
  path: string;
}

export class MainContent extends Block<null, IState> {
  state: IState = {
    path: getPathWithoutTrailingSlash(window.location.pathname),
  };
  routerService = RouterService.getInstance();

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
  }

  handlePathChange() {
    this.setState(() => ({
      path: getPathWithoutTrailingSlash(window.location.pathname),
    }));
  }

  componentDidMount() {
    this.routerService.on(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentDidMount();
  }

  componentWillUnmount() {
    this.routerService.off(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    const route: IRoute | undefined = Object.values(ROUTES).find(route =>
      this.state.path.match(route.pathRegExp)
    );
    return Template.createElement(
      'main',
      { key: 'page', class: styles.main_content_page },
      Template.createComponent(route?.component ?? NotFoundPage, {
        key: 'page-content',
      })
    );
  }
}
