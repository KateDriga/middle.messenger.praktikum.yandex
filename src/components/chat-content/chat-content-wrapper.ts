import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ChatContent } from './chat-content';
import { TIndexed } from '../../utils/util-functions/set';
import { IChat } from '../chat-list-item-content/chat-list-item-content';
import { Router } from '../../utils/router/router';

export interface IChatStateFromStore {
  currentChat: IChat | null;
}

function mapActiveChatState(state: TIndexed): IChatStateFromStore {
  const routeParams = Router.getInstance().getCurrentRouteParams();
  return {
    currentChat: routeParams['id']
      ? state.chats?.find(chat => chat.id.toString() === routeParams['id'])
      : null,
  };
}

export const ChatContentWrapper = connect<
  IChatStateFromStore,
  IMapStateFromStore<IChatStateFromStore>
>(ChatContent, mapActiveChatState);
