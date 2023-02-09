import { IRouteState, Route } from './route';
import { TIndexed } from '../util-functions/set';
import { Router } from './router';
import { getRedirectPath, routeIsAllowed } from '../util-functions/route';
import { TVirtualDomNode } from '../template/template-types';
import { connect } from '../store/connect';

interface IMapState {
  isLoggedIn: boolean;
}

interface IState extends IRouteState {
  stateFromStore: IMapState;
}

class ProtectedRouteClass extends Route<null, IState> {
  router = Router.getInstance();

  initProps(props: null): null {
    this.handlePathChange();
    return super.initProps(props);
  }

  pathIsAllowed(pathname: string) {
    const routeInfo = this.router.getRouteInfo(pathname);
    const isLoggedIn = this.state.stateFromStore.isLoggedIn;
    return routeIsAllowed(routeInfo, isLoggedIn);
  }

  handlePathChange() {
    if (
      this.router.fromPathname &&
      this.pathIsAllowed(this.router.fromPathname)
    ) {
      this.router.replace(this.router.fromPathname);
    } else if (!this.pathIsAllowed(window.location.pathname)) {
      Router.getInstance().replace(
        getRedirectPath(this.state.stateFromStore.isLoggedIn),
        this.router.fromPathname || window.location.pathname
      );
    } else {
      super.handlePathChange();
    }
  }

  render(): TVirtualDomNode {
    const isLoggedIn = this.state.stateFromStore.isLoggedIn;
    if (!routeIsAllowed(this.routeInfo, isLoggedIn)) {
      this.router.replace(
        getRedirectPath(isLoggedIn),
        this.router.fromPathname || window.location.pathname
      );
    }
    return super.render();
  }
}

function mapLoginState(state: TIndexed): IMapState {
  return {
    isLoggedIn: state.user !== null,
  };
}

export const ProtectedRoute = connect<IMapState, unknown, IState>(
  ProtectedRouteClass,
  mapLoginState
);
