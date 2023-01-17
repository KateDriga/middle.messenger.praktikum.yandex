import * as styles from './chat-content-footer.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { InputChatMessage } from '../input-chat-message/input-chat-message';
import { Picture } from '../picture/picture';

export class ChatContentFooter extends MyCoolComponent<
  { onSendMessage: (e: KeyboardEvent | MouseEvent) => void },
  null
> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'chat-content-footer', class: styles.chat_content_footer },
      MyCoolTemplate.createComponent(Picture, {
        key: 'chat-message-media',
        picName: 'insertFile',
        type: 'icon',
        // TODO: add file onClick
        onClick: () => null,
      }),
      MyCoolTemplate.createComponent(InputChatMessage, {
        key: 'chat-message-send',
        name: 'message',
        onKeyDown: this.props.onSendMessage,
      }),
      MyCoolTemplate.createComponent(Picture, {
        key: 'chat-message-send-button',
        picName: 'sendMessage',
        type: 'icon',
        onClick: this.props.onSendMessage,
      })
    );
  }
}
