import { DisplayPageTypes, ROUTES } from '../const-variables/pages';
import { IRouteInfo } from '../router/router';

export function routeIsAllowed(
  routeInfo: IRouteInfo,
  isLoggedIn: boolean
): boolean {
  return (
    !routeInfo ||
    routeInfo.displayType === DisplayPageTypes.ALL_USERS ||
    (routeInfo.displayType === DisplayPageTypes.LOGGED_IN_ONLY && isLoggedIn) ||
    (routeInfo.displayType === DisplayPageTypes.LOGGED_OUT_ONLY && !isLoggedIn)
  );
}

export function getRedirectPath(isLoggedIn: boolean): string {
  return isLoggedIn ? ROUTES.chats.path : ROUTES.login.path;
}
