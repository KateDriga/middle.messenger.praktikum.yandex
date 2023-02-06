import './index.scss';
import { Template } from './utils/template/template';
import { App } from './components/app/app';
import { Router } from './utils/router/router';
import { IVirtualDomProps } from './utils/template/template-types';
import { ROUTES } from './utils/const-variables/pages';

export const ROOT_ID = 'root';

const router = Router.getInstance();
const props: IVirtualDomProps = {
  key: 'main-content',
};

router
  .use(ROUTES.login.path, ROUTES.login.component, props)
  .use(ROUTES.register.path, ROUTES.register.component, props)
  .use(ROUTES.chats.path, ROUTES.chats.component, props)
  .use(ROUTES.chat.path, ROUTES.chat.component, props)
  .use(ROUTES.settings.path, ROUTES.settings.component, props)
  .start();

Template.renderDom(ROOT_ID, Template.createComponent(App, { key: ROOT_ID }));
