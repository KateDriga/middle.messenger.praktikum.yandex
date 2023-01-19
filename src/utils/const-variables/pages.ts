import { Block } from '../block/block';
import { HomePage } from '../../pages/home-page/home-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { ProfileSettingsPage } from '../../pages/profile-settings-page/profile-settings-page';
import { ServerErrorPage } from '../../pages/server-error/server-error-page';
import { ChatPage } from '../../pages/chat-page/chat-page';

export interface IRoute {
  title: string;
  path: string;
  pathRegExp: RegExp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: { new (): Block<any, any> };
}

interface IRoutes {
  [key: string]: IRoute;
}

export const getRegExpForPath = (path: string): RegExp =>
  new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');

export const ROUTES: IRoutes = {
  home: {
    title: 'Home Page',
    path: '/',
    pathRegExp: getRegExpForPath('/'),
    component: HomePage,
  },
  login: {
    title: 'Sign in Page',
    path: '/login',
    pathRegExp: getRegExpForPath('/login'),
    component: LoginPage,
  },
  register: {
    title: 'Sign up Page',
    path: '/register',
    pathRegExp: getRegExpForPath('/register'),
    component: RegisterPage,
  },
  chats: {
    title: 'Start Chatting',
    path: '/chat',
    pathRegExp: getRegExpForPath('/chat'),
    component: ChatPage,
  },
  chat: {
    title: 'Start Chatting',
    path: '/chat/:id',
    pathRegExp: getRegExpForPath('/chat/:id'),
    component: ChatPage,
  },
  settings: {
    title: 'Settings',
    path: '/settings',
    pathRegExp: getRegExpForPath('/settings'),
    component: ProfileSettingsPage,
  },
  notFound: {
    title: '404 Page',
    path: '/not-found',
    pathRegExp: getRegExpForPath('/not-found'),
    component: NotFoundPage,
  },
  error: {
    title: 'Server Error',
    path: '/error',
    pathRegExp: getRegExpForPath('/error'),
    component: ServerErrorPage,
  },
};

export function getChatIdFromPath(): string {
  return window.location.pathname.split(`${ROUTES.chats.path}/`).pop();
}

export function getPathWithoutTrailingSlash(path: string): string {
  return path !== '/' && path.endsWith('/') ? path.replace(/.$/, '') : path;
}
