export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const AUTH_API_URL = '/auth';
export const USER_API_URL = '/user';
export const RESOURCES_API_URL = '/resources';

export enum AuthApiPaths {
  SIGN_UP = '/signup',
  SIGN_IN = '/signin',
  USER = '/user',
  LOGOUT = '/logout',
}

export enum UserApiPaths {
  CHANGE_SETTINGS = '/profile',
  CHANGE_AVATAR = '/profile/avatar',
  CHANGE_PASSWORD = '/password',
}
