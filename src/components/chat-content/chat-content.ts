import './chat-content.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import {
  FAKE_MESSAGES_RECEIVED,
  FAKE_MESSAGES_SENT,
  IMessage,
} from '../../utils/fake-test-variables/fake-messages';
import { ChatMessage } from '../chat-message/chat-message';
import { ChatContentHeader } from '../chat-content-header/chat-content-header';
import { ChatContentFooter } from '../chat-content-footer/chat-content-footer';

interface IState {
  messages: Array<IMessage & { type: string }>;
}

const txtMessageNotEmpty = (ms: string): boolean => {
  return ms && ms.trim().replaceAll('\n', '').length !== 0;
};

export class ChatContent extends MyCoolComponent<{ id: string }, IState> {
  state: IState = { messages: [] };
  testInterval;

  constructor() {
    super();
    // TODO replace with data from server
    this.state.messages = FAKE_MESSAGES_SENT.map(ms => ({
      ...ms,
      type: 'sent',
    }))
      .concat(
        FAKE_MESSAGES_RECEIVED.map(ms => ({
          ...ms,
          type: 'received',
        }))
      )
      .sort((a, b) => a.time.localeCompare(b.time));
    this.sendMessage = this.sendMessage.bind(this);
    this.sendAutoTestMessage = this.sendAutoTestMessage.bind(this);

    this.testInterval = window.setInterval(
      () => this.sendAutoTestMessage(),
      5_000
    );
  }

  // TODO: remove fake messages
  sendAutoTestMessage() {
    const random = Math.round(Math.random());
    const newMessage = {
      type: random === 0 ? 'sent' : 'received',
      time: new Date().toISOString(),
      text: "Hi! I'm test 🚀",
    };
    this.setState(() => ({ messages: [...this.state.messages, newMessage] }));
  }

  sendMessage(e: KeyboardEvent) {
    const textValue = (<HTMLInputElement>e.target).value;
    if (e.key === 'Enter' && txtMessageNotEmpty(textValue)) {
      const newMessage = {
        type: 'sent',
        time: new Date().toISOString(),
        text: textValue,
      };
      this.setState(() => ({ messages: [...this.state.messages, newMessage] }));
      (<HTMLInputElement>e.target).value = '';
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.testInterval);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'messages', class: 'chat_content' },
      MyCoolTemplate.createComponent(ChatContentHeader, {
        key: 'chat-content-header',
        id: this.props.id,
      }),
      MyCoolTemplate.createElement('hr', {
        key: 'separator-header',
        class: 'separator',
      }),
      MyCoolTemplate.createElement(
        'ul',
        { key: 'messages-list', class: 'messages_list custom_scroll' },
        ...this.state.messages.map((ms, idx) =>
          MyCoolTemplate.createComponent(ChatMessage, {
            key: this.props.id,
            id: this.props.id,
            // TODO: scroll to first unread message
            shouldScroll: idx === this.state.messages.length - 1,
            ...ms,
          })
        )
      ),
      MyCoolTemplate.createElement('hr', {
        key: 'separator-footer',
        class: 'separator',
      }),
      MyCoolTemplate.createComponent(ChatContentFooter, {
        key: 'chat-content-footer',
        onKeyDown: this.sendMessage,
      })
    );
  }
}
