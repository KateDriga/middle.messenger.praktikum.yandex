import { BaseApi } from './base-api';
import { CHATS_API_URL, ChatsApiPaths } from '../const-variables/api';
import { IResponse } from '../../services/http-transport';

export class ChatsApi extends BaseApi {
  constructor() {
    super(CHATS_API_URL);
  }

  public async getAllChats(): Promise<IResponse> {
    return await this.httpTransport.get(ChatsApiPaths.CHATS);
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
    return await this.httpTransport.get(ChatsApiPaths.CHATS, { data });
  }

  public async createChat(title: string): Promise<IResponse> {
    return await this.httpTransport.post(ChatsApiPaths.CHATS, {
      data: { title },
    });
  }

  public async deleteChat(id: string): Promise<IResponse> {
    return await this.httpTransport.delete(ChatsApiPaths.CHATS, {
      data: { chatId: id },
    });
  }

  public async changeChatAvatar(data: FormData): Promise<IResponse> {
    return await this.httpTransport.put(ChatsApiPaths.AVATAR, {
      data,
    });
  }

  public async addUsers(
    users: Array<string>,
    chatId: string
  ): Promise<IResponse> {
    return await this.httpTransport.put(ChatsApiPaths.USERS, {
      data: { users, chatId },
    });
  }

  public async getChatUsers(id: string): Promise<IResponse> {
    return await this.httpTransport.get(
      ChatsApiPaths.GET_USERS.replace(':id', id)
    );
  }

  public async removeChatUsers(
    users: Array<string>,
    chatId: string
  ): Promise<IResponse> {
    return await this.httpTransport.delete(ChatsApiPaths.USERS, {
      data: { users, chatId },
    });
  }
}
