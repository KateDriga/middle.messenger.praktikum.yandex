import './chat-content-header.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';

export class ChatContentHeader extends MyCoolComponent<{ id: string }, null> {
  render(): TVirtualDomNode {
    // TODO: replace with info from server
    return MyCoolTemplate.createElement(
      'div',
      { key: 'header-title', class: 'chat_text_area_title' },
      MyCoolTemplate.createElement('img', {
        key: 'img',
        class: 'avatar',
        src: require('../../images/fake-test-images/superman.png'),
        alt: 'chat-image',
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
