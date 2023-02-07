import { Block } from '../base-components/block';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ProfileSettingsPage } from '../../pages/profile-settings-page/profile-settings-page';
import { ChatPage } from '../../pages/chat-page/chat-page';

export enum DisplayPageTypes {
  LOGGED_IN_ONLY = 'logged_in',
  LOGGED_OUT_ONLY = 'logged_out',
  ALL_USERS = 'all',
}

export interface IRoute {
  title: string;
  path: string;
  display: DisplayPageTypes;
  component: { new (): Block<unknown, unknown> };
}

interface IRoutes {
  [key: string]: IRoute;
}

export const HOME_PAGE = '/';

export const ROUTES: IRoutes = {
  login: {
    title: 'Sign in Page',
    path: '/',
    display: DisplayPageTypes.LOGGED_OUT_ONLY,
    component: LoginPage,
  },
  register: {
    title: 'Sign up Page',
    path: '/sign-up',
    display: DisplayPageTypes.LOGGED_OUT_ONLY,
    component: RegisterPage,
  },
  chats: {
    title: 'Start Chatting',
    path: '/messenger',
    display: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ChatPage,
  },
  chat: {
    title: 'Start Chatting',
    path: '/messenger/:id',
    display: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ChatPage,
  },
  settings: {
    title: 'Settings',
    path: '/settings',
    display: DisplayPageTypes.LOGGED_IN_ONLY,
    component: ProfileSettingsPage,
  },
};

export function getPathWithoutTrailingSlash(path: string): string {
  return path !== '/' && path.endsWith('/') ? path.replace(/.$/, '') : path;
}
