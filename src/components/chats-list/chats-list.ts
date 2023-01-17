import * as styles from './chats-list.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ChatsListHeader } from '../chats-list-header/chats-list-header';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { IChat } from '../../utils/ts-types/chat-types';
import { ChatListItem } from '../chat-list-item/chat-list-item';

interface IState {
  chatsToDisplay: Array<IChat>;
}

export class ChatsList extends MyCoolComponent<{ id: string | null }, IState> {
  chats: Array<IChat> = [];
  state: IState = {
    chatsToDisplay: [],
  };
  constructor() {
    super();
    // TODO: replace fake data
    this.chats = FAKE_CHATS;
    this.state.chatsToDisplay = this.chats;
    this.handleSearchQueryInput = this.handleSearchQueryInput.bind(this);
  }

  handleSearchQueryInput(e: Event) {
    const searchQuery = (e.target as HTMLInputElement).value;
    this.setState(() => ({
      chatsToDisplay: this.chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'chats-list',
        class: `${styles.chats_list} ${
          this.props.id ? styles.chats_list_hidden_mobile : ''
        }`,
      },
      MyCoolTemplate.createComponent(ChatsListHeader, {
        key: 'chats-header',
        onInput: this.handleSearchQueryInput,
      }),
      MyCoolTemplate.createElement('hr', {
        key: 'line',
        class: styles.separator,
      }),
      MyCoolTemplate.createElement(
        'ul',
        {
          key: 'chat-listing',
          class: `${styles.chat_listing}`,
        },
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
