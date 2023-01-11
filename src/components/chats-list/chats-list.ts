import './chats-list.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ChatsListHeader } from '../chats-list-header/chats-list-header';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { IChat } from '../../utils/ts-types/chat-types';
import { ChatListItem } from '../chat-list-item/chat-list-item';
import { getRegExpForPath, ROUTES } from '../../utils/const-variables/pages';

interface IState {
  chatsToDisplay: Array<IChat>;
  chatSelected: boolean;
}

export class ChatsList extends MyCoolComponent<null, IState> {
  chats: Array<IChat> = [];
  state: IState = {
    chatsToDisplay: [],
    chatSelected: getRegExpForPath(ROUTES.chat.path).test(
      window.location.pathname
    ),
  };
  constructor() {
    super();
    this.chats = FAKE_CHATS;
    this.state.chatsToDisplay = this.chats;
    this.handleSearchQueryInput = this.handleSearchQueryInput.bind(this);
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  handleSearchQueryInput(e: Event) {
    const searchQuery = (e.target as HTMLInputElement).value;
    this.setState(() => ({
      ...this.state,
      chatsToDisplay: this.chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }

  handlePathChange() {
    this.setState(() => ({
      ...this.state,
      chatSelected: getRegExpForPath(ROUTES.chat.path).test(
        window.location.pathname
      ),
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
        key: 'chats-list',
        class: this.state.chatSelected
          ? 'chats_list chats_list_hidden_mobile'
          : 'chats_list',
      },
      MyCoolTemplate.createComponent(ChatsListHeader, {
        key: 'chats-header',
        onInput: this.handleSearchQueryInput,
      }),
      MyCoolTemplate.createElement('hr', { key: 'line', class: 'line' }),
      MyCoolTemplate.createElement(
        'ul',
        { key: 'chat-listing', class: 'chat_listing custom_scroll' },
        ...this.state.chatsToDisplay.map(chat =>
          MyCoolTemplate.createComponent(ChatListItem, {
            key: chat.id,
            ...chat,
          })
        )
      )
    );
  }
}
