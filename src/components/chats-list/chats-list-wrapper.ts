import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { IChat } from '../chat-list-item-content/chat-list-item-content';
import { TIndexed } from '../../utils/util-functions/set';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ChatsList } from './chats-list';

interface IMapState {
  chats: Array<Omit<IChat, 'isActive' | 'listRef'>> | null;
}

interface IProps {
  id: string | null;
}

interface IPropsState extends IProps, IMapStateFromStore<IMapState> {}

class ChatsListClass extends Block<IPropsState, null> {
  render(): TVirtualDomNode {
    return Template.createComponent(ChatsList, {
      key: 'chats-list',
      chats: this.props.stateFromStore.chats,
      id: this.props.id,
    });
  }
}

export function mapChatsState(state: TIndexed): IMapState {
  return {
    chats: state.chats,
  };
}

export const ChatsListWrapper = connect<IMapState, IPropsState>(
  ChatsListClass,
  mapChatsState
);
