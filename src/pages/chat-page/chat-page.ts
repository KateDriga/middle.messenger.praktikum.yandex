import * as styles from './chat-page.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsList } from '../../components/chats-list/chats-list';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';

interface IProps {
  params: { id?: string };
}

export class ChatPage extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'chat-page',
        class: styles.chat_page,
      },
      Template.createComponent(ChatsList, {
        key: 'chats-list',
        class: styles.chats_list,
        id: this.props.params.id,
      }),
      Template.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: styles.chats_text_area,
        id: this.props.params.id,
      })
    );
  }
}
