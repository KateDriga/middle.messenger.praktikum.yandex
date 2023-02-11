import { BaseApi } from './base-api';
import { CHATS_API_URL, ChatsApiPaths } from '../const-variables/api';
import { IResponse } from '../../services/http-transport';

export class ChatsApi extends BaseApi {
  constructor() {
    super(CHATS_API_URL);
  }

  public async getAllChats(): Promise<IResponse> {
    return await this.httpTransport.get(ChatsApiPaths.GET_CHATS);
  }

  public async getChatsByQuery(
    title?: string,
    limit?: number,
    offset?: number
  ): Promise<IResponse> {
    const data = {
      ...(title && { title }),
      ...(limit && { limit }),
      ...(offset && { offset }),
    };
    return await this.httpTransport.get(ChatsApiPaths.GET_CHATS, { data });
  }

  public async createChat(title: string): Promise<IResponse> {
    return await this.httpTransport.post(ChatsApiPaths.CREATE_CHAT, {
      data: { title },
    });
  }
}
