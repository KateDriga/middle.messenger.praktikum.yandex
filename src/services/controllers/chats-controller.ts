import { ChatsApi } from '../../utils/api/chats-api';
import { Store } from '../../utils/store/store';
import { validateChatName } from '../../utils/util-functions/form-inputs/form-inputs';
import { displayModal } from '../../utils/util-functions/modal';
import { IPageState } from '../../utils/base-components/page-form';
import {
  handleChatErrors,
  handleFormErrors,
} from '../../utils/util-functions/api/handle-errors';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { TUser } from '../../components/profile-settings-form/profile-settings-form';

export class ChatsController {
  private chatsApi = new ChatsApi();
  private store = Store.getInstance();

  public async getAllChats() {
    try {
      // loader should be displayed only once
      if (!this.store.getState().chats) {
        this.store.set('loadingState.chatsAreLoading', true);
      }
      const response = await this.chatsApi.getAllChats();
      this.store.set('chats', JSON.parse(response.data));
    } catch (e) {
      console.error('Get All Chats error:', e);
    } finally {
      this.store.set('loadingState.chatsAreLoading', false);
    }
  }

  public async createChat(title: string): Promise<IPageState | void> {
    const chatState = validateChatName(title);
    if (!chatState.isValid) {
      return chatState;
    }
    try {
      await this.chatsApi.createChat(title);
      displayModal({
        type: 'success',
        message: `Congratulations! You've created a new chat "${title}"`,
      });
      await this.getAllChats();
    } catch (e) {
      return handleFormErrors(e, 'Create Chat');
    }
  }

  public async deleteChat(id: string) {
    try {
      await this.chatsApi.deleteChat(id);
      displayModal({
        type: 'success',
        message: 'Chat was deleted.',
      });
      await this.getAllChats();
      Router.getInstance().go(ROUTES.chats.path);
    } catch (e) {
      handleChatErrors(e, 'Delete Chat');
    }
  }

  public async changeChatAvatar(avatar: File, id: string) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('chatId', id);
    try {
      await this.chatsApi.changeChatAvatar(formData);
      displayModal({
        type: 'success',
        message: "You've set a new chat image!",
      });
      await this.getAllChats();
    } catch (e) {
      handleChatErrors(e, 'Change Chat Avatar');
    }
  }

  public async addUsers(userIds: Array<string>, chatId: string) {
    try {
      await this.chatsApi.addUsers(userIds, chatId);
      displayModal({
        type: 'success',
        message: 'New users were added!',
      });
    } catch (e) {
      handleChatErrors(e, 'Add Users');
    }
  }

  public async getChatUsers(
    id: string
  ): Promise<Array<TUser & { id: string }>> {
    try {
      const response = await this.chatsApi.getChatUsers(id);
      return JSON.parse(response.data);
    } catch (e) {
      handleChatErrors(e, 'Get Chat Users');
    }
  }

  public async removeChatUsers(userIds: Array<string>, chatId: string) {
    try {
      await this.chatsApi.removeChatUsers(userIds, chatId);
      displayModal({
        type: 'success',
        message: 'Users were deleted from this chat.',
      });
      // await this.getAllChats();
    } catch (e) {
      handleChatErrors(e, 'Remove Chat Users');
    }
  }

  public async getChatToken(id: string): Promise<{ token: string }> {
    try {
      const response = await this.chatsApi.getChatToken(id);
      return JSON.parse(response.data);
    } catch (e) {
      handleChatErrors(e, 'Get Chat Token');
    }
  }

  public async getNewMessagesCount(
    id: string
  ): Promise<{ unread_count: number }> {
    try {
      const response = await this.chatsApi.getUnreadCount(id);
      return JSON.parse(response.data);
    } catch (e) {
      handleChatErrors(e, 'Get unread Count');
    }
  }
}
