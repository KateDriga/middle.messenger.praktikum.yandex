import styles from './chat-text-area.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatContentWrapper } from '../chat-content/chat-content-wrapper';

interface IProps {
  id: string | null;
  unknownId: boolean;
}

export class ChatsTextArea extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'chat-text-area',
        class: `${styles.chat_text_area} ${
          !this.props.id ? styles.chat_text_area_hidden_mobile : ''
        }`,
      },
      this.props.id && !this.props.unknownId
        ? Template.createComponent(ChatContentWrapper, {
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
            Template.createTextElement(
              this.props.unknownId
                ? 'Please select a known chat'
                : 'Select a chat to send a message'
            )
          )
    );
  }
}
