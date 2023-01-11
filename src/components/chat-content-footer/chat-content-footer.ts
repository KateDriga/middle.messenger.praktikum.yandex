import './chat-content-footer.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { InputChatMessage } from '../input-chat-message/input-chat-message';
import { Icon } from '../icon/icon';

export class ChatContentFooter extends MyCoolComponent<
  { onKeyDown: (e: KeyboardEvent) => void },
  null
> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'chat-content-footer', class: 'chat_content_footer' },
      MyCoolTemplate.createComponent(Icon, {
        key: 'chat-message-media',
        imageName: 'insertFile',
        style: 'width: 30px; height: 30px; margin-top: 10px;',
        // TODO: add file onClick
        onClick: () => null,
      }),
      MyCoolTemplate.createComponent(InputChatMessage, {
        key: 'chat-message-send',
        onKeyDown: this.props.onKeyDown,
      })
    );
  }
}
