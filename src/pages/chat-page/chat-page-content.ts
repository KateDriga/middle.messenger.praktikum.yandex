import * as styles from './chat-page.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsList } from '../../components/chats-list/chats-list';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';
import { IChat } from '../../components/chat-list-item-content/chat-list-item-content';

interface IProps {
  id: string;
  unknownChatId: boolean;
  chats: Array<IChat>;
}

export class ChatPageContent extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'messenger',
        class: styles.chat_page,
      },
      Template.createComponent(ChatsList, {
        key: 'chats-list',
        id: this.props.id,
        chats: this.props.chats,
      }),
      Template.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        id: this.props.id,
        unknownId: this.props.unknownChatId,
      })
    );
  }
}
