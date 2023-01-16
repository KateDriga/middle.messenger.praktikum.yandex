import * as styles from './chat-content-footer.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { InputChatMessage } from '../input-chat-message/input-chat-message';
import { Picture } from '../picture/picture';

export class ChatContentFooter extends MyCoolComponent<
  { onKeyDown: (e: KeyboardEvent) => void },
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
        style: 'width: 30px; height: 30px; margin-top: 10px;',
        // TODO: add file onClick
        onClick: () => null,
      }),
      MyCoolTemplate.createComponent(InputChatMessage, {
        key: 'chat-message-send',
        name: 'message',
        onKeyDown: this.props.onKeyDown,
      })
    );
  }
}
