import { Block } from '../base-components/block';
import { IVirtualDomProps, TVirtualDomNode } from '../template/template-types';
import { Template } from '../template/template';
import { IRouteInfo, PATH_CHANGE, Router } from './router';

interface IProps {
  defaultComponent?: { new (): Block<unknown, unknown> };
  defaultProps?: IVirtualDomProps;
}

interface IState {
  path: string;
}

export class Route extends Block<IProps, IState> {
  router: Router;
  routeInfo: IRouteInfo | undefined;
  routeParams: Record<string, string>;
  routeQueryParams: Record<string, string>;
  state: IState;

  constructor() {
    super();
    this.router = Router.getInstance();
    this.routeInfo = this.router.getRouteInfo(window.location.pathname);
    this.getParams();
    this.handlePathChange = this.handlePathChange.bind(this);
    this.state = { path: window.location.pathname };
  }

  handlePathChange() {
    if (this.state.path !== window.location.pathname) {
      this.routeInfo = this.router.getRouteInfo(window.location.pathname);
      this.getParams();
      this.setState(() => ({ path: window.location.pathname }));
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
    this.router.on(PATH_CHANGE, this.handlePathChange);
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
    if (this.props.defaultComponent) {
      return Template.createComponent(this.props.defaultComponent, {
        ...this.props.defaultProps,
      });
    }
    return Template.createTextElement('');
  }
}
