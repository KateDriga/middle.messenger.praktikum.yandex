import './main-content.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import {
  getPathWithoutTrailingSlash,
  IRoute,
  ROUTES,
} from '../../utils/const-variables/pages';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

interface IState {
  path: string;
}

export class MainContent extends MyCoolComponent<null, IState> {
  state: IState = {
    path: getPathWithoutTrailingSlash(window.location.pathname),
  };

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  handlePathChange() {
    this.setState(() => ({
      path: getPathWithoutTrailingSlash(window.location.pathname),
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    const route: IRoute | undefined = Object.values(ROUTES).find(route =>
      this.state.path.match(route.pathRegExp)
    );
    return MyCoolTemplate.createElement(
      'div',
      { key: 'page', class: 'main_content_page' },
      MyCoolTemplate.createComponent(route?.component ?? NotFoundPage, {
        key: 'page-content',
      })
    );
  }
}
