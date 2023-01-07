import './main-content.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ROUTES } from '../../utils/const-variables/pages';
import { HomePage } from '../../pages/home-page/home-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';

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
    return MyCoolTemplate.createElement(
      'div',
      { key: 'page', class: 'main_content_page' },
      this.state.path === ROUTES.home.path
        ? MyCoolTemplate.createComponent(HomePage, { key: 'home' })
        : this.state.path === ROUTES.login.path
        ? MyCoolTemplate.createComponent(LoginPage, { key: 'login' })
        : this.state.path === ROUTES.register.path
        ? MyCoolTemplate.createComponent(RegisterPage, { key: 'register' })
        : MyCoolTemplate.createComponent(NotFoundPage, { key: 'not-found' })
    );
  }
}
