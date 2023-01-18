import * as styles from './main-content.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
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

export class MainContent extends MyCoolComponent<null, IState> {
  state: IState;
  routerService: RouterService;

  constructor() {
    super();
    this.state = {
      path: getPathWithoutTrailingSlash(window.location.pathname),
    };
    this.routerService = RouterService.getInstance();
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
    return MyCoolTemplate.createElement(
      'main',
      { key: 'page', class: styles.main_content_page },
      MyCoolTemplate.createComponent(route?.component ?? NotFoundPage, {
        key: 'page-content',
      })
    );
  }
}
