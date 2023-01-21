import * as styles from './chat-text-area.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatContent } from '../chat-content/chat-content';

export class ChatsTextArea extends Block<{ id: string | null }, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'chat-text-area',
        class: `${styles.chat_text_area} ${
          !this.props.id ? styles.chat_text_area_hidden_mobile : ''
        }`,
      },
      this.props.id
        ? Template.createComponent(ChatContent, {
            key: this.props.id,
            id: this.props.id,
          })
        : Template.createElement(
            'div',
            { key: 'chat-content', class: styles.chat_text_area_empty },
            Template.createElement('img', {
              key: 'img',
              class: styles.chat_text_area_img,
              src: require('../../images/chat.png'),
              alt: 'chat image',
            }),
            Template.createTextElement('Select a chat to send a message')
          )
    );
  }
}
