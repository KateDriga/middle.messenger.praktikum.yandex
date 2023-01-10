import './chat.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ChatsList } from '../../components/chats-list/chats-list';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';

export class ChatPage extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'chat-page',
        class: 'chat_page',
      },
      MyCoolTemplate.createComponent(ChatsList, {
        key: 'chats-list',
        class: 'chats_list',
      }),
      MyCoolTemplate.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: 'chats_text_area',
      })
    );
  }
}
