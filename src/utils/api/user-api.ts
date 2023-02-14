import { BaseApi } from './base-api';
import { USER_API_URL, UserApiPaths } from '../const-variables/api';
import { IResponse } from '../../services/http-transport';

export class UserApi extends BaseApi {
  constructor() {
    super(USER_API_URL);
  }

  public async changeProfileSettings(
    data: Record<string, string>
  ): Promise<IResponse> {
    return await this.httpTransport.put(UserApiPaths.CHANGE_SETTINGS, {
      data,
    });
  }

  public async changeAvatar(data: FormData): Promise<IResponse> {
    return await this.httpTransport.put(UserApiPaths.CHANGE_AVATAR, {
      data,
    });
  }

  public async changePassword(
    data: Record<string, string>
  ): Promise<IResponse> {
    return await this.httpTransport.put(UserApiPaths.CHANGE_PASSWORD, {
      data,
    });
  }

  public async findUsers(login: string): Promise<IResponse> {
    return await this.httpTransport.post(UserApiPaths.SEARCH, {
      data: { login },
    });
  }
}
