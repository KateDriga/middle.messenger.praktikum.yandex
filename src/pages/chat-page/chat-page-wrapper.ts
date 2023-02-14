import { TIndexed } from '../../utils/util-functions/set';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { Block } from '../../utils/base-components/block';
import { IChat } from '../../components/chat-list-item-content/chat-list-item-content';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatPage } from './chat-page';
import { Store } from '../../utils/store/store';
import { ChatsController } from '../../services/controllers/chats-controller';

interface IMapState {
  chats: Array<Omit<IChat, 'isActive' | 'listRef'>> | null;
}

interface IProps {
  params: { id?: string };
}

interface IPropsState extends IProps, IMapStateFromStore<IMapState> {}

class ChatPageClass extends Block<IPropsState, null> {
  constructor() {
    super();
    const store = Store.getInstance().getState();
    if (store.chats === null) {
      new ChatsController().getAllChats();
    }
  }

  render(): TVirtualDomNode {
    return Template.createComponent(ChatPage, {
      key: 'chat-page',
      id: this.props.params.id || null,
      chats: this.props.stateFromStore.chats,
    });
  }
}

export function mapChatsState(state: TIndexed): IMapState {
  return {
    chats: state.chats,
  };
}

export const ChatPageWrapper = connect<IMapState, IPropsState>(
  ChatPageClass,
  mapChatsState
);
