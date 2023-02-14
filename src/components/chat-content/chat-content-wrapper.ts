import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ChatContent } from './chat-content';
import { IChat } from '../chat-list-item-content/chat-list-item-content';
import { mapChatsState } from '../../pages/chat-page/chat-page-wrapper';

interface IMapState {
  chats: Array<Omit<IChat, 'isActive' | 'listRef'>> | null;
}

interface IProps {
  id: string | null;
}

interface IPropsState extends IProps, IMapStateFromStore<IMapState> {}

class ChatContentClass extends Block<IPropsState, null> {
  render(): TVirtualDomNode {
    return Template.createComponent(ChatContent, {
      key: 'chat-content',
      id: this.props.id,
      chats: this.props.stateFromStore.chats,
    });
  }
}

export const ChatContentWrapper = connect(ChatContentClass, mapChatsState);
