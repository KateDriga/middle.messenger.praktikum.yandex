import * as styles from './chat-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IMessage } from '../../utils/fake-test-variables/fake-messages';
import { ChatMessage } from '../chat-message/chat-message';
import { ChatContentHeader } from '../chat-content-header/chat-content-header';
import { ChatContentFooter } from '../chat-content-footer/chat-content-footer';
import { MESSAGE_VALIDATION } from '../../utils/const-variables/field-validation';
import { IChat } from '../chat-list-item-content/chat-list-item-content';

interface IState {
  messages: Array<IMessage & { kind: string }>;
  filesToSend: Array<File>;
}

interface IProps {
  chats: Array<Omit<IChat, 'isActive' | 'listRef'>>;
  id: string | null;
}

export class ChatContent extends Block<IProps, IState> {
  state: IState = { messages: [], filesToSend: [] };
  testInterval;
  newMessageRef = Template.createRef();
  newFileRef = Template.createRef();

  constructor() {
    super();
    this._bindMethods();
    // TODO replace with data from server
    // this.state.messages = FAKE_MESSAGES_SENT.map(ms => ({
    //   ...ms,
    //   kind: 'sent',
    // }))
    //   .concat(
    //     FAKE_MESSAGES_RECEIVED.map(ms => ({
    //       ...ms,
    //       kind: 'received',
    //     }))
    //   )
    //   .sort((a, b) => a.time.localeCompare(b.time));
  }

  private _bindMethods() {
    this.sendMessage = this.sendMessage.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  selectFile() {
    this.newFileRef.current.click();
  }

  addFile() {
    const newFile = (<HTMLInputElement>this.newFileRef.current).files[0];
    if (
      newFile &&
      !this.state.filesToSend.some(file => file.name === newFile.name)
    ) {
      this.setState(s => ({
        ...s,
        filesToSend: [...this.state.filesToSend, newFile],
      }));
    }
  }

  removeFile(name: string) {
    this.setState(s => ({
      ...s,
      filesToSend: this.state.filesToSend.filter(file => file.name !== name),
    }));
  }

  // TODO: send message request
  sendMessage(e: KeyboardEvent | MouseEvent) {
    if (e instanceof MouseEvent || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      if (this.state.filesToSend.length > 0) {
        const fileMessages = this.state.filesToSend.map(
          file =>
            ({
              kind: 'sent',
              type: 'file',
              time: new Date().toISOString(),
              content: file.name,
            } as IMessage & { kind: string })
        );
        this.setState(() => ({
          filesToSend: [],
          messages: [...this.state.messages, ...fileMessages],
        }));
      }
      const textValue = (<HTMLInputElement>this.newMessageRef.current).value;
      if (MESSAGE_VALIDATION.rule.test(textValue)) {
        const newMessage: IMessage & { kind: string } = {
          kind: 'sent',
          type: 'message',
          time: new Date().toISOString(),
          content: textValue,
        };
        (<HTMLInputElement>this.newMessageRef.current).value = '';
        this.setState(s => ({
          ...s,
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
    const currentChat = this.props.chats?.find(
      chat => chat.id.toString() === this.props.id
    );
    return Template.createElement(
      'div',
      { key: 'messages', class: styles.chat_content },
      Template.createComponent(ChatContentHeader, {
        key: 'chat-content-header',
        id: this.props.id,
        chat: currentChat,
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
        newMessageRef: this.newMessageRef,
        newFileRef: this.newFileRef,
        onSendMessage: this.sendMessage,
        selectFile: this.selectFile,
        addFile: this.addFile,
        removeFile: this.removeFile,
        fileNames: this.state.filesToSend.map(file => file.name),
      })
    );
  }
}
