interface IRoute {
  title: string;
  path: string;
}

interface IRoutes {
  [key: string]: IRoute;
}

export const ROUTES: IRoutes = {
  home: {
    title: 'Home Page',
    path: '/',
  },
  login: {
    title: 'Sign in Page',
    path: '/login',
  },
  register: {
    title: 'Sign up Page',
    path: '/register',
  },
  chat: {
    title: 'Start Chatting',
    path: '/chat',
  },
  settings: {
    title: 'Settings',
    path: '/settings',
  },
  notFound: {
    title: '404 Page',
    path: '/not-found',
  },
  error: {
    title: 'Server Error',
    path: '/error',
  },
};
