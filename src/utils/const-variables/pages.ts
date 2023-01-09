import { MyCoolComponent } from '../template/my-cool-component';
import { HomePage } from '../../pages/home-page/home-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { ProfileSettingsPage } from '../../pages/profile-settings-page/profile-settings-page';
import { ServerErrorPage } from '../../pages/server-error/server-error-page';

export interface IRoute {
  title: string;
  path: string;
  component: { new (): MyCoolComponent<any, any> };
}

interface IRoutes {
  [key: string]: IRoute;
}

export const ROUTES: IRoutes = {
  home: {
    title: 'Home Page',
    path: '/',
    component: HomePage,
  },
  login: {
    title: 'Sign in Page',
    path: '/login',
    component: LoginPage,
  },
  register: {
    title: 'Sign up Page',
    path: '/register',
    component: RegisterPage,
  },
  chat: {
    title: 'Start Chatting',
    path: '/chat',
    component: NotFoundPage,
  },
  settings: {
    title: 'Settings',
    path: '/settings',
    component: ProfileSettingsPage,
  },
  notFound: {
    title: '404 Page',
    path: '/not-found',
    component: NotFoundPage,
  },
  error: {
    title: 'Server Error',
    path: '/error',
    component: ServerErrorPage,
  },
};
