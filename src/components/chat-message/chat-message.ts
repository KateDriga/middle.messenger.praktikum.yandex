import * as styles from './chat-message.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';
import { IMessage } from '../chat-content/chat-content';
import { Picture } from '../picture/picture';
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api';

interface IProps extends IMessage {
  isUnread: boolean;
}

export class ChatMessage extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: this.props.user_id,
        ref: this.props.ref,
        class: `${styles.chat_message} ${
          this.props.kind === 'received'
            ? styles.chat_message_received
            : styles.chat_message_sent
        } ${this.props.isUnread ? styles.chat_message_unread : ''}`,
      },
      this.props.kind === 'received'
        ? Template.createComponent(Picture, {
            key: 'sender-avatar',
            picName: 'avatar',
            picPath: this.props.avatar
              ? `${BASE_URL}${RESOURCES_API_URL}${this.props.avatar}`
              : null,
            type: 'image',
            style: 'width: 40px; height: 40px;',
          })
        : Template.createTextElement(''),
      // TODO: display different elements depending on message type (file/text)
      Template.createElement(
        'div',
        { key: 'ms-content' },
        Template.createElement(
          'p',
          { key: 'message-text', style: 'white-space: pre-wrap;' },
          Template.createTextElement(this.props.content)
        ),
        Template.createElement(
          'p',
          { key: 'message-date', class: styles.chat_message_date },
          Template.createTextElement(formatMessageDate(this.props.time))
        )
      )
    );
  }
}
