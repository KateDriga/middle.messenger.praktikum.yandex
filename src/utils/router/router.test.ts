import { PATH_CHANGE, Router } from './router';
import { ROUTES } from '../const-variables/pages';
import { Store } from '../store/store';

jest.mock('../../index.ts');
jest.mock('../template/template.ts');

describe('Router Tests', () => {
  const router = Router.getInstance();
  Object.keys(ROUTES).forEach(key => {
    const route = ROUTES[key];
    router.use(route.path, route.displayType, route.component);
  });
  router.on(PATH_CHANGE, () => jest.fn());

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(`${window.location.origin}${ROUTES.settings.path}`),
    });
  });

  it('should be a singleton', () => {
    const router1 = Router.getInstance();
    const router2 = Router.getInstance();
    expect(router1).toBe(router2);
  });
  it('should return instance with passed routes', () => {
    const router = Router.getInstance();
    expect(router.routes).toContainEqual({
      ...ROUTES.login,
      pathRegExp: /^\/$/,
    });
    expect(router.routes).toContainEqual({
      ...ROUTES.register,
      pathRegExp: /^\/sign-up$/,
    });
    expect(router.routes).toContainEqual({
      ...ROUTES.chats,
      pathRegExp: /^\/messenger$/,
    });
    expect(router.routes).toContainEqual({
      ...ROUTES.chat,
      pathRegExp: /^\/messenger\/([\w-]+)$/,
    });
    expect(router.routes).toContainEqual({
      ...ROUTES.settings,
      pathRegExp: /^\/settings$/,
    });
  });
  it('should not redirect, if current path is allowed on start', () => {
    jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
      user: { id: 111, name: 'user' },
    }));
    jest.spyOn(Router.prototype, 'replace').mockImplementation(() => jest.fn());
    jest.spyOn(Router.prototype, 'go').mockImplementation(() => jest.fn());
    Router.getInstance().start();
    expect(Router.getInstance().replace).not.toHaveBeenCalled();
    expect(Router.getInstance().go).not.toHaveBeenCalled();
  });
  it("should replace current path, if it's not allowed on start", () => {
    jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
      user: null,
    }));
    jest.spyOn(Router.prototype, 'replace').mockImplementation(() => jest.fn());
    Router.getInstance().start();
    expect(Router.getInstance().replace).toHaveBeenCalledTimes(1);
  });
  it('should change state, if path is allowed on go', () => {
    jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
      user: { id: 100, name: 'user' },
    }));
    jest
      .spyOn(Router.prototype, '_onRoute')
      .mockImplementation(() => jest.fn());
    Router.getInstance().start();
    Router.getInstance().go(ROUTES.chats.path);
    expect(Router.getInstance()._onRoute).toHaveBeenCalledTimes(1);
  });
  it('should redirect to default path, if selected path is not allowed', () => {
    jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
      user: { id: 100 },
    }));
    jest
      .spyOn(Router.prototype, '_onRoute')
      .mockImplementation(() => jest.fn());
    Router.getInstance().start();
    Router.getInstance().go(ROUTES.login.path);
    expect(Router.getInstance()._onRoute).toHaveBeenCalledTimes(1);
  });
  describe('get allowed path', () => {
    it('should return passed pathname (user is logged in)', () => {
      jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
        user: { id: 1, name: 'test-user' },
      }));
      Router.getInstance().start();
      let pathname = ROUTES.chats.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(pathname);
      pathname = ROUTES.chat.path.replace(':id', '888');
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(pathname);
      pathname = ROUTES.settings.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(pathname);
    });
    it('should return redirect pathname (user is logged in)', () => {
      jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
        user: { id: 1, name: 'test-user' },
      }));
      Router.getInstance().start();
      let pathname = ROUTES.login.path;
      const expectedPathname = ROUTES.chats.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(
        expectedPathname
      );
      pathname = ROUTES.register.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(
        expectedPathname
      );
    });
    it('should return passed pathname (user is not logged in)', () => {
      jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
        user: null,
      }));
      Router.getInstance().start();
      let pathname = ROUTES.login.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(pathname);
      pathname = ROUTES.register.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(pathname);
    });
    it('should return redirect pathname (user is not logged in)', () => {
      jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
        user: null,
      }));
      Router.getInstance().start();
      let pathname = ROUTES.chats.path;
      const expectedPathname = ROUTES.login.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(
        expectedPathname
      );
      pathname = ROUTES.chat.path.replace(':id', '123');
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(
        expectedPathname
      );
      pathname = ROUTES.settings.path;
      expect(Router.getInstance().getAllowedPath(pathname)).toBe(
        expectedPathname
      );
    });
  });
  describe('go and replace', () => {
    it('should increase history length', () => {
      Router.getInstance().start();
      const length = Router.getInstance().history.length;
      Router.getInstance().go(ROUTES.register.path);
      expect(Router.getInstance().history.length).toBe(length + 1);
    });
    it('should not increase history length, if allowed path equals current path', () => {
      Router.getInstance().start();
      const length = Router.getInstance().history.length;
      Router.getInstance().go(ROUTES.chats.path);
      Router.getInstance().go(ROUTES.chat.path.replace(':id', '17'));
      Router.getInstance().go(ROUTES.settings.path);
      expect(Router.getInstance().history.length).toBe(length);
    });
    it('should not change history length', () => {
      Router.getInstance().start();
      const length = Router.getInstance().history.length;
      Router.getInstance().replace(ROUTES.register.path);
      expect(Router.getInstance().history.length).toBe(length);
    });
  });
  it('should call history back', () => {
    const spy = jest.spyOn(window.history, 'back');
    Router.getInstance().back();
    Router.getInstance().back();
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('should call history forward', () => {
    const spy = jest.spyOn(window.history, 'forward');
    Router.getInstance().forward();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  describe('get route info', () => {
    it('should return undefined for unknown route', () => {
      expect(Router.getInstance().getRouteInfo('/some-path')).toBe(undefined);
    });
    it('should return route info for known route', () => {
      const expectedRouteInfo = {
        ...ROUTES.chats,
        pathRegExp: /^\/messenger$/,
      };
      expect(
        Router.getInstance().getRouteInfo(ROUTES.chats.path)
      ).toMatchObject(expectedRouteInfo);
    });
    it('should return route info for dynamic route', () => {
      const expectedRouteInfo = {
        ...ROUTES.chat,
        pathRegExp: /^\/messenger\/([\w-]+)$/,
      };
      expect(
        Router.getInstance().getRouteInfo(ROUTES.chat.path.replace(':id', '42'))
      ).toMatchObject(expectedRouteInfo);
    });
  });
  it('should return route params for dynamic route', () => {
    jest.spyOn(Store.prototype, 'getState').mockImplementation(() => ({
      user: { id: 12, name: 'test-user' },
    }));
    Router.getInstance().start();
    const expectedParams = { id: '3812' };
    Router.getInstance().go(ROUTES.chat.path.replace(':id', expectedParams.id));
    expect(Router.getInstance().getCurrentRouteParams()).toMatchObject(
      expectedParams
    );
  });
});
