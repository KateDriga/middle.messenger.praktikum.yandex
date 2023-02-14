export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const AUTH_API_URL = '/auth';
export const USER_API_URL = '/user';
export const RESOURCES_API_URL = '/resources';
export const CHATS_API_URL = '/chats';

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
  SEARCH = '/search',
}

export enum ChatsApiPaths {
  CHATS = '',
  AVATAR = '/avatar',
  USERS = '/users',
  GET_USERS = '/:id/users',
}
