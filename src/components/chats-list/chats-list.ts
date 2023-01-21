import * as styles from './chats-list.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsListHeader } from '../chats-list-header/chats-list-header';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { IChat } from '../chat-list-item/chat-list-item';
import { ChatListItem } from '../chat-list-item/chat-list-item';

interface IState {
  chatsToDisplay: Array<IChat>;
}

export class ChatsList extends Block<{ id: string | null }, IState> {
  chats: Array<IChat>;
  state: IState = { chatsToDisplay: [] };

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
    return Template.createElement(
      'div',
      {
        key: 'chats-list',
        class: `${styles.chats_list} ${
          this.props.id ? styles.chats_list_hidden_mobile : ''
        }`,
      },
      Template.createComponent(ChatsListHeader, {
        key: 'chats-header',
        onInput: this.handleSearchQueryInput,
      }),
      Template.createElement('hr', {
        key: 'line',
        class: styles.separator,
      }),
      Template.createElement(
        'ul',
        {
          key: 'chat-listing',
          class: `${styles.chat_listing}`,
        },
        ...this.state.chatsToDisplay.map(chat =>
          Template.createComponent(ChatListItem, {
            key: chat.id,
            ...chat,
          })
        )
      )
    );
  }
}
