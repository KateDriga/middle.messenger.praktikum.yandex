import * as styles from './chat-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import {
  FAKE_MESSAGES_RECEIVED,
  FAKE_MESSAGES_SENT,
  IMessage,
} from '../../utils/fake-test-variables/fake-messages';
import { ChatMessage } from '../chat-message/chat-message';
import { ChatContentHeader } from '../chat-content-header/chat-content-header';
import { ChatContentFooter } from '../chat-content-footer/chat-content-footer';
import { MESSAGE_VALIDATION } from '../../utils/const-variables/field-validation';

interface IState {
  messages: Array<IMessage & { type: string }>;
}

export class ChatContent extends Block<{ id: string }, IState> {
  state: IState = { messages: [] };
  testInterval;
  newMessageRef = Template.createRef();

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

  sendMessage(e: KeyboardEvent | MouseEvent) {
    if (e instanceof MouseEvent || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      const textValue = (<HTMLInputElement>this.newMessageRef.current).value;
      if (MESSAGE_VALIDATION.rule.test(textValue)) {
        const newMessage = {
          type: 'sent',
          time: new Date().toISOString(),
          text: textValue,
        };
        (<HTMLInputElement>this.newMessageRef.current).value = '';
        this.setState(() => ({
          messages: [...this.state.messages, newMessage],
        }));
      }
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.testInterval);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'messages', class: styles.chat_content },
      Template.createComponent(ChatContentHeader, {
        key: 'chat-content-header',
        id: this.props.id,
      }),
      Template.createElement('hr', {
        key: 'separator-header',
        class: styles.separator,
      }),
      Template.createElement(
        'ul',
        {
          key: 'messages-list',
          class: `${styles.messages_list}`,
        },
        ...this.state.messages.map((ms, idx) =>
          Template.createComponent(ChatMessage, {
            key: this.props.id,
            id: this.props.id,
            // TODO: scroll to first unread message
            shouldScroll: idx === this.state.messages.length - 1,
            ...ms,
          })
        )
      ),
      Template.createElement('hr', {
        key: 'separator-footer',
        class: styles.separator,
      }),
      Template.createComponent(ChatContentFooter, {
        key: 'chat-content-footer',
        onSendMessage: this.sendMessage,
        newMessageRef: this.newMessageRef,
      })
    );
  }
}
