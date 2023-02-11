import * as styles from './messenger.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsListWrapper } from '../chats-list/chats-list-wrapper';
import { ChatsTextArea } from '../chats-text-area/chats-text-area';

export class Messenger extends Block<{ id: string | null }, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'messenger',
        class: styles.chat_page,
      },
      Template.createComponent(ChatsListWrapper, {
        key: 'chats-list',
        class: styles.chats_list,
        id: this.props.id,
      }),
      Template.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: styles.chats_text_area,
        id: this.props.id,
      })
    );
  }
}
