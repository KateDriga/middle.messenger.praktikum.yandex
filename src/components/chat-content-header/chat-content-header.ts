import './chat-content-header.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { Picture } from '../picture/picture';

export class ChatContentHeader extends MyCoolComponent<{ id: string }, null> {
  render(): TVirtualDomNode {
    // TODO: replace with info from server
    return MyCoolTemplate.createElement(
      'div',
      { key: 'header-title', class: 'chat_text_area_title' },
      MyCoolTemplate.createComponent(Picture, {
        key: 'avatar',
        picName: 'avatar',
        type: 'image',
        style: 'width: 70px; height: 70px;',
      }),
      MyCoolTemplate.createElement(
        'h2',
        { key: 'chat-name' },
        MyCoolTemplate.createTextElement(
          FAKE_CHATS.find(chat => chat.id.toString() === this.props.id).title
        )
      )
    );
  }
}
