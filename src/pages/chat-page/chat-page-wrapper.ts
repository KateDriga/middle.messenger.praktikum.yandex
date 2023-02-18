import { TIndexed } from '../../utils/util-functions/set';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { IChat } from '../../components/chat-list-item-content/chat-list-item-content';
import { ChatPage } from './chat-page';

export interface IChatsStateFromStore {
  chats: Array<IChat> | null;
}

function mapChatsState(state: TIndexed): IChatsStateFromStore {
  return {
    chats: state.chats,
  };
}

export const ChatPageWrapper = connect<
  IChatsStateFromStore,
  IMapStateFromStore<IChatsStateFromStore>
>(ChatPage, mapChatsState);
