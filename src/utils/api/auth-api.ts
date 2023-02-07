import { BaseApi } from './base-api';
import { AUTH_API_URL, AuthApiPaths } from '../const-variables/api';
import { IResponse } from '../../services/http-transport';

export class AuthApi extends BaseApi {
  constructor() {
    super(AUTH_API_URL);
  }

  public async signUp(data: Record<string, string>): Promise<IResponse> {
    return await this.httpTransport.post(AuthApiPaths.SIGN_UP, {
      data,
    });
  }

  public async signIn(data: Record<string, string>): Promise<IResponse> {
    return await this.httpTransport.post(AuthApiPaths.SIGN_IN, {
      data,
    });
  }

  public async getUser(): Promise<IResponse> {
    return await this.httpTransport.get(AuthApiPaths.USER);
  }

  public async logout(): Promise<IResponse> {
    return await this.httpTransport.post(AuthApiPaths.LOGOUT);
  }
}
