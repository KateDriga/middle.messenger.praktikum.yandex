import { ChatsApi } from '../../utils/api/chats-api';
import { Store } from '../../utils/store/store';
import { validateChatName } from '../../utils/util-functions/form-inputs/form-inputs';
import { displayModal } from '../../utils/util-functions/modal';
import { IPageState } from '../../utils/base-components/page-form';
import { handleFormError } from '../../utils/util-functions/api/handle-form-error';

export class ChatsController {
  chatsApi = new ChatsApi();
  store = Store.getInstance();

  public async getAllChats() {
    try {
      this.store.set('loadingState.chatsAreLoading', true);
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
    } catch (e) {
      return handleFormError(e, 'Create Chat');
    } finally {
      this.getAllChats();
    }
  }
}
