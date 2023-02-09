import { Block } from '../base-components/block';
import { TVirtualDomNode } from '../template/template-types';
import { Template } from '../template/template';
import { IRouteInfo, PATH_CHANGE, Router } from './router';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

export interface IRouteState {
  path: string;
}

export class Route<P, S extends IRouteState> extends Block<P, S> {
  router: Router;
  routeInfo: IRouteInfo | undefined;
  routeParams: Record<string, string>;
  routeQueryParams: Record<string, string>;
  state: S;
  isMounted: boolean;

  constructor() {
    super();
    this.router = Router.getInstance();
    this.routeInfo = this.router.getRouteInfo(window.location.pathname);
    this.handlePathChange = this.handlePathChange.bind(this);
    this.getParams = this.getParams.bind(this);
    this.getParams();
    this.router.on(PATH_CHANGE, this.handlePathChange);
    this.state = { ...this.state, path: window.location.pathname };
    this.isMounted = false;
  }

  handlePathChange() {
    if (this.state.path !== window.location.pathname) {
      this.routeInfo = this.router.getRouteInfo(window.location.pathname);
      this.getParams();
      if (this.isMounted) {
        this.setState(s => ({ ...s, path: window.location.pathname }));
      } else {
        this.state = { ...this.state, path: window.location.pathname };
      }
    }
  }

  getParams() {
    const params = window.location.pathname.split('/');
    const regexParams = this.routeInfo?.path.split('/');
    this.routeParams = regexParams?.reduce((acc, param, idx) => {
      if (param.startsWith(':')) {
        return { ...acc, [param.substring(1)]: params[idx] };
      }
      return acc;
    }, {});

    const searchParams = window.location.search;
    this.routeQueryParams = searchParams
      ? Object.fromEntries(new URLSearchParams(searchParams.substring(1)))
      : {};
  }

  componentDidMount() {
    this.isMounted = true;
    super.componentDidMount();
  }

  componentWillUnmount() {
    this.router.off(PATH_CHANGE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    if (this.routeInfo) {
      return Template.createComponent(this.routeInfo.component, {
        ...this.routeInfo.props,
        params: this.routeParams,
        queryParams: this.routeQueryParams,
      });
    }
    return Template.createComponent(NotFoundPage, { key: 'not-found' });
  }
}
