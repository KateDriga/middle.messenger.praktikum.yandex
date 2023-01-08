import './main-content.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ROUTES } from '../../utils/const-variables/pages';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { IRoute } from '../../utils/const-variables/pages';

interface IState {
  path: string;
}

export class MainContent extends MyCoolComponent<null, IState> {
  state: IState = { path: window.location.pathname };

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  handlePathChange() {
    this.setState(() => ({ path: window.location.pathname }));
  }

  render(): TVirtualDomNode {
    const route: IRoute | undefined = Object.values(ROUTES).find(
      route => route.path === this.state.path
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
