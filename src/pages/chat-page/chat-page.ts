import * as styles from './chat-page.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';
import { IChat } from '../../components/chat-list-item-content/chat-list-item-content';
import { ChatsList } from '../../components/chats-list/chats-list';

interface IProps {
  id: string | null;
  chats: Array<Omit<IChat, 'isActive' | 'listRef'>> | null;
}

export class ChatPage extends Block<IProps, null> {
  render(): TVirtualDomNode {
    const unknownId: boolean =
      this.props.id &&
      this.props.chats &&
      !this.props.chats.find(chat => chat.id.toString() === this.props.id);
    return Template.createElement(
      'div',
      {
        key: 'messenger',
        class: styles.chat_page,
      },
      Template.createComponent(ChatsList, {
        key: 'chats-list',
        class: styles.chats_list,
        id: this.props.id,
        chats: this.props.chats,
      }),
      Template.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: styles.chats_text_area,
        id: this.props.id,
        unknownId,
      })
    );
  }
}
