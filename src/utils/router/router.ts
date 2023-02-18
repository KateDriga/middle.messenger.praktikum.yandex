import { Block } from '../base-components/block';
import { Observable, TListener } from '../../services/observable';
import { IVirtualDomProps } from '../template/template-types';
import {
  DisplayPageTypes,
  getPathWithoutTrailingSlash,
} from '../const-variables/pages';
import { Store, StoreEvents } from '../store/store';
import { getRedirectPath, routeIsAllowed } from '../util-functions/route';

export const PATH_CHANGE = 'path_change';

export interface IRouteInfo {
  path: string;
  pathRegExp: RegExp;
  displayType: DisplayPageTypes;
  component: { new (): Block<unknown, unknown> };
  props: IVirtualDomProps;
}

const getRegExpForPath = (path: string): RegExp =>
  new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');

export class Router extends Observable {
  listeners: { PATH_CHANGE: Array<TListener> };

  private static __instance: Router;

  private _currentPath: string;
  private _isLoggedIn: boolean;

  fromPathname: string | null;
  routes: Array<IRouteInfo>;
  history: History;

  private constructor() {
    super({ PATH_CHANGE: [] });
    this.fromPathname = null;
    this._isLoggedIn = Store.getInstance().getState().user !== null;
    this.routes = [];
    this.history = window.history;
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  public static getInstance() {
    return this.__instance || (this.__instance = new this());
  }

  use(
    pathname: string,
    displayType: DisplayPageTypes,
    component: { new (): Block<unknown, unknown> },
    props: IVirtualDomProps
  ): Router {
    this.routes.push({
      path: pathname,
      displayType,
      pathRegExp: getRegExpForPath(pathname),
      component,
      props,
    });
    return this;
  }

  start() {
    window.onpopstate = event => {
      const path = event.currentTarget.location.pathname;
      const allowedPath = this.getAllowedPath(path);
      this._onRoute(allowedPath);
    };
    window.onbeforeunload = () => {
      Store.getInstance().off(StoreEvents.UPDATED, this.handleStateChange);
    };
    Store.getInstance().on(StoreEvents.UPDATED, this.handleStateChange);
    this._currentPath = window.location.pathname;
    this._isLoggedIn = Store.getInstance().getState().user !== null;
    const allowedPath = this.getAllowedPath(this._currentPath);
    if (this._currentPath !== allowedPath) {
      this.replace(allowedPath, this._currentPath);
    }
  }

  _onRoute(pathname: string) {
    this._currentPath = pathname;
    this.emit(PATH_CHANGE, pathname);
  }

  handleStateChange() {
    const isLoggedIn = Store.getInstance().getState().user !== null;
    if (this._isLoggedIn !== isLoggedIn) {
      this._isLoggedIn = isLoggedIn;
      const allowedPath = this.getAllowedPath(this._currentPath);
      if (this._currentPath !== allowedPath) {
        this.replace(allowedPath, this.fromPathname || this._currentPath);
      }
    }
  }

  getAllowedPath(pathname: string): string {
    const fromPathAllowed =
      this.fromPathname &&
      routeIsAllowed(this.getRouteInfo(this.fromPathname), this._isLoggedIn);
    if (fromPathAllowed) {
      const fromPathname = this.fromPathname;
      this.fromPathname = null;
      return fromPathname;
    }

    const pathnameAllowed = routeIsAllowed(
      this.getRouteInfo(pathname),
      this._isLoggedIn
    );
    return pathnameAllowed ? pathname : getRedirectPath(this._isLoggedIn);
  }

  go(pathname: string, fromPathname: string | null = null) {
    this.fromPathname = fromPathname;
    const allowedPath = this.getAllowedPath(pathname);
    if (this._currentPath !== allowedPath) {
      this.history.pushState({}, '', allowedPath);
      this._onRoute(allowedPath);
    }
  }

  replace(pathname: string, fromPathname: string | null = null) {
    this.fromPathname = fromPathname;
    const allowedPath = this.getAllowedPath(pathname);
    if (this._currentPath !== allowedPath) {
      this.history.replaceState({}, '', allowedPath);
      this._onRoute(allowedPath);
    }
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRouteInfo(pathname: string): IRouteInfo | undefined {
    return this.routes.find(route =>
      route.pathRegExp.test(getPathWithoutTrailingSlash(pathname))
    );
  }

  getCurrentRouteParams() {
    const params = this._currentPath.split('/');
    const regexParams = this.getRouteInfo(this._currentPath)?.path.split('/');
    return regexParams?.reduce((acc, param, idx) => {
      if (param.startsWith(':')) {
        return { ...acc, [param.substring(1)]: params[idx] };
      }
      return acc;
    }, {});
  }
}
