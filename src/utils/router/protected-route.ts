import { Route } from './route';
import { connect } from '../store/connect';
import { TIndexed } from '../util-functions/set';
import { Router } from './router';
import { getRedirectPath, routeIsAllowed } from '../util-functions/route';
import { TVirtualDomNode } from '../template/template-types';

class AuthRoute extends Route {
  handlePathChange() {
    const updatedRouteInfo = Router.getInstance().getRouteInfo(
      window.location.pathname
    );
    const isLoggedIn = this.props.stateFromProps.isLoggedIn;
    if (!routeIsAllowed(updatedRouteInfo, isLoggedIn)) {
      Router.getInstance().replace(getRedirectPath(isLoggedIn));
    } else {
      super.handlePathChange();
    }
  }

  render(): TVirtualDomNode {
    const isLoggedIn = this.props.stateFromProps.isLoggedIn;
    if (!routeIsAllowed(this.routeInfo, isLoggedIn)) {
      Router.getInstance().replace(getRedirectPath(isLoggedIn));
    }
    return super.render();
  }
}

function mapLoginStateToProps(state: TIndexed): { isLoggedIn: boolean } {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
}

export const ProtectedRoute = connect(AuthRoute, mapLoginStateToProps);
