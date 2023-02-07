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

Object.keys(ROUTES).forEach(key => {
  const route = ROUTES[key];
  router.use(route.path, route.display, route.component, props);
});
router.start();

Template.renderDom(ROOT_ID, Template.createComponent(App, { key: ROOT_ID }));
