import styles from './chats-list.module.scss';
import { Block } from '../../utils/base-components/block';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsListHeader } from '../chats-list-header/chats-list-header';
import { ChatListItem } from '../chat-list-item/chat-list-item';
import { IChat } from '../chat-list-item-content/chat-list-item-content';

interface IProps {
  chats: Array<IChat>;
  id: string | null;
}

interface IState {
  chatsToDisplay: Array<IChat>;
}

export class ChatsList extends Block<IProps, IState> {
  state: IState;
  ref: IRef = Template.createRef();

  constructor() {
    super();
    this.state = { chatsToDisplay: [] };
    this.handleSearchQueryInput = this.handleSearchQueryInput.bind(this);
  }

  initProps(props: IProps): IProps {
    this.state.chatsToDisplay = props.chats || [];
    return super.initProps(props);
  }

  handleSearchQueryInput(e: Event) {
    const searchQuery = (e.target as HTMLInputElement).value;
    this.setState(() => ({
      chatsToDisplay: this.props.chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }

  componentWillReceiveProps(props: IProps, state: IState): IState {
    this.state.chatsToDisplay = props.chats || [];
    return super.componentWillReceiveProps(props, state);
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
          class: styles.chat_listing,
          ref: this.ref,
        },
        ...this.state.chatsToDisplay.map(chat =>
          Template.createComponent(ChatListItem, {
            key: chat.id,
            listRef: this.ref,
            ...chat,
          })
        )
      )
    );
  }
}
