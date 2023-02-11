import './index.scss';
import { Template } from './utils/template/template';
import { AppWrapper } from './components/app/app-wrapper';
import { Router } from './utils/router/router';
import { ROUTES } from './utils/const-variables/pages';
import { ServerErrorPage } from './pages/server-error/server-error-page';

export const ROOT_ID = 'root';

const router = Router.getInstance();

Object.keys(ROUTES).forEach(key => {
  const route = ROUTES[key];
  router.use(route.path, route.display, route.component, {
    key: 'main-content',
  });
});

Template.renderDom(
  ROOT_ID,
  Template.createComponent(AppWrapper, { key: ROOT_ID })
);

export const renderErrorPage = () => {
  Template.renderDom(
    ROOT_ID,
    Template.createComponent(ServerErrorPage, { key: ROOT_ID })
  );
};
