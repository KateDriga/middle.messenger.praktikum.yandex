import './chat-page.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ChatsList } from '../../components/chats-list/chats-list';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';
import {
  getChatIdFromPath,
  getRegExpForPath,
  ROUTES,
} from '../../utils/const-variables/pages';

export interface IChatSelectedState {
  chatId: string | null;
}

export class ChatPage extends MyCoolComponent<null, IChatSelectedState> {
  state: IChatSelectedState = {
    chatId: getRegExpForPath(ROUTES.chat.path).test(window.location.pathname)
      ? getChatIdFromPath()
      : null,
  };

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  handlePathChange() {
    this.setState(() => ({
      chatId: getRegExpForPath(ROUTES.chat.path).test(window.location.pathname)
        ? getChatIdFromPath()
        : null,
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePathChange);
    super.componentWillUnmount();
  }

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
        id: this.state.chatId,
      }),
      MyCoolTemplate.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: 'chats_text_area',
        id: this.state.chatId,
      })
    );
  }
}
