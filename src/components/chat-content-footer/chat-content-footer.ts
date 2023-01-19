import * as styles from './chat-content-footer.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { InputChatMessage } from '../input-chat-message/input-chat-message';
import { Picture } from '../picture/picture';

interface IProps {
  onSendMessage: (e: KeyboardEvent | MouseEvent) => void;
}

export class ChatContentFooter extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'chat-content-footer', class: styles.chat_content_footer },
      Template.createComponent(Picture, {
        key: 'chat-message-media',
        picName: 'insertFile',
        type: 'icon',
        // TODO: add file onClick
        onClick: () => null,
      }),
      Template.createComponent(InputChatMessage, {
        key: 'chat-message-send',
        name: 'message',
        onKeyDown: this.props.onSendMessage,
      }),
      Template.createComponent(Picture, {
        key: 'chat-message-send-button',
        picName: 'sendMessage',
        type: 'icon',
        onClick: this.props.onSendMessage,
      })
    );
  }
}
