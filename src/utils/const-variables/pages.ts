import { Block } from '../base-components/block';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ProfileSettingsPage } from '../../pages/profile-settings-page/profile-settings-page';
import { ChatPageWrapper } from '../../pages/chat-page/chat-page-wrapper';

export enum DisplayPageTypes {
  LOGGED_IN_ONLY = 'logged_in',
  LOGGED_OUT_ONLY = 'logged_out',
  ALL_USERS = 'all',
}

export interface IRoute {
  path: string;
  displayType: DisplayPageTypes;
  component: { new (): Block<unknown, unknown> };
}

interface IRoutes {
  [key: string]: IRoute;
}

export const HOME_PAGE = '/';

export const ROUTES: IRoutes = {
  login: {
    path: '/',
    displayType: DisplayPageTypes.LOGGED_OUT_ONLY,
    component: LoginPage,
  },
  register: {
    path: '/sign-up',
    displayType: DisplayPageTypes.LOGGED_OUT_ONLY,
    component: RegisterPage,
  },
  chats: {
    path: '/messenger',
    displayType: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ChatPageWrapper,
  },
  chat: {
    path: '/messenger/:id',
    displayType: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ChatPageWrapper,
  },
  settings: {
    path: '/settings',
    displayType: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ProfileSettingsPage,
  },
};

export function getPathWithoutTrailingSlash(path: string): string {
  return path !== '/' && path.endsWith('/') ? path.replace(/.$/, '') : path;
}
