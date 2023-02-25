import { BaseApi } from './base-api';
import { RESOURCES_API_URL } from '../const-variables/api';
import { IResponse } from '../../services/http-transport';

export class ResourcesApi extends BaseApi {
  constructor() {
    super(RESOURCES_API_URL);
  }

  public async uploadFile(data: FormData): Promise<IResponse> {
    return await this.httpTransport.post('', { data });
  }
}
