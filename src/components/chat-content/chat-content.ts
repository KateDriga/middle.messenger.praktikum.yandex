import styles from './chat-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { ChatMessage } from '../chat-message/chat-message';
import { ChatContentHeader } from '../chat-content-header/chat-content-header';
import { ChatContentFooter } from '../chat-content-footer/chat-content-footer';
import { MESSAGE_VALIDATION } from '../../utils/const-variables/field-validation';
import { WsContentTypes, WsEvents, WsService } from '../../services/ws-service';
import { ChatsController } from '../../services/controllers/chats-controller';
import { Store } from '../../utils/store/store';
import { IMapStateFromStore } from '../../utils/store/connect';
import { TUser } from '../profile-settings-form/profile-settings-form';
import { InputNameTypes } from '../input/input';
import { IChatStateFromStore } from './chat-content-wrapper';

export interface WsMessage {
  id: number;
  time: string;
  type: 'message' | 'file';
  content: string;
  user_id: string;
}

export interface IMessage extends WsMessage {
  kind: 'sent' | 'received';
  avatar: string;
  ref: IRef;
}

interface IState extends IMapStateFromStore<IChatStateFromStore> {
  messages: Array<IMessage>;
  filesToSend: Array<File>;
}

interface IProps {
  id: string | null;
}

export class ChatContent extends Block<IProps, IState> {
  newMessageRef = Template.createRef();
  newFileRef = Template.createRef();
  chatUsers: Array<TUser> = [];
  userId = Store.getInstance().getState().user.id;
  allOldMessagesLoaded = false;

  wsService: WsService;
  chatsController = new ChatsController();

  isScrolledToBottom = false;
  userSentLasMessage = false;
  scrolledToFirstUnread = false;

  listRef = Template.createRef();
  oldMsObserverRef = Template.createRef();
  observer: IntersectionObserver;

  messagesPerDate: Array<[string, Array<IMessage>]> = [];

  constructor() {
    super();
    this._bindMethods();
    this.state = { ...this.state, messages: [], filesToSend: [] };
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.requestOldMessages();
            observer.unobserve(entry.target);
          }
        });
      },
      { root: this.listRef.current }
    );
  }

  private _bindMethods() {
    this.sendMessage = this.sendMessage.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.wsConnect = this.wsConnect.bind(this);
    this.handleNewMessageReceived = this.handleNewMessageReceived.bind(this);
    this.handleOldMessagesReceived = this.handleOldMessagesReceived.bind(this);
    this.requestInitialMessages = this.requestInitialMessages.bind(this);
    this.requestOldMessages = this.requestOldMessages.bind(this);
    this.getScrollRef = this.getScrollRef.bind(this);
    this.addNewMessageToDateArr = this.addNewMessageToDateArr.bind(this);
    this.addOldMessageToDateArr = this.addOldMessageToDateArr.bind(this);
    this.generateIMessage = this.generateIMessage.bind(this);
  }

  initProps(props: IProps): IProps {
    if (props.id) {
      this.chatsController
        .getChatUsers(props.id)
        .then(res => (this.chatUsers = res));
    }
    return super.initProps(props);
  }

  wsConnect() {
    this.chatsController.getChatToken(this.props.id).then(res => {
      this.wsService = new WsService(this.userId, this.props.id, res.token);
      this.wsService.on(WsEvents.NEW_MESSAGE, this.handleNewMessageReceived);
      this.wsService.on(WsEvents.OLD_MESSAGES, this.handleOldMessagesReceived);
      this.wsService.on(WsEvents.CONNECTED, this.requestInitialMessages);
    });
  }

  requestInitialMessages() {
    if (this.state.stateFromStore.currentChat) {
      this.chatsController
        .getNewMessagesCount(
          this.state.stateFromStore.currentChat.id.toString()
        )
        .then(res => {
          const offset = res.unread_count > 20 ? res.unread_count - 10 : 0;
          this.wsService.send(WsContentTypes.GET_OLD, offset.toString());
        });
    }
  }

  requestOldMessages() {
    if (!this.allOldMessagesLoaded) {
      const offset = this.state.messages[0]?.id || 0;
      this.wsService.send(WsContentTypes.GET_OLD, offset.toString());
    }
  }

  generateIMessage(message: WsMessage): IMessage {
    const sender = this.chatUsers.find(user => user.id === message.user_id);
    return {
      ...message,
      avatar: sender?.[InputNameTypes.AVATAR],
      kind: message.user_id === this.userId ? 'sent' : 'received',
      ref: Template.createRef(),
    };
  }

  handleNewMessageReceived(message: WsMessage) {
    const newMessage = this.generateIMessage(message);
    this.addNewMessageToDateArr(newMessage);
    this.isScrolledToBottom =
      this.listRef.current.scrollTop ===
      this.listRef.current.scrollHeight - this.listRef.current.offsetHeight;
    this.setState(s => ({
      ...s,
      messages: this.state.messages.concat(newMessage),
    }));
    this.chatsController.getAllChats();
  }

  addNewMessageToDateArr(newMessage: IMessage) {
    const date = new Date(newMessage.time).toLocaleDateString();
    const length = this.messagesPerDate.length;
    if (length === 0) {
      this.messagesPerDate[0] = [date, [newMessage]];
    } else if (this.messagesPerDate[length - 1][0] === date) {
      this.messagesPerDate[length - 1][1].push(newMessage);
    } else {
      this.messagesPerDate[length] = [date, [newMessage]];
    }
  }

  addOldMessageToDateArr(oldMessage: IMessage) {
    const date = new Date(oldMessage.time).toLocaleDateString();
    const length = this.messagesPerDate.length;
    if (length === 0) {
      this.messagesPerDate[0] = [date, [oldMessage]];
    } else if (this.messagesPerDate[0][0] === date) {
      this.messagesPerDate[0][1].unshift(oldMessage);
    } else {
      this.messagesPerDate.unshift([date, [oldMessage]]);
    }
  }

  handleOldMessagesReceived(messages: Array<WsMessage>) {
    if (messages.length === 0) {
      this.allOldMessagesLoaded = true;
      return;
    }
    const length = this.state.messages.length;
    // handle old read messages
    if (
      length > 0 &&
      this.state.messages[0].id < messages[messages.length - 1].id
    ) {
      const messagesToAdd: Array<IMessage> = messages.map(ms => {
        const message = this.generateIMessage(ms);
        this.addOldMessageToDateArr(message);
        return message;
      });
      messagesToAdd.reverse();
      this.setState(s => ({
        ...s,
        messages: messagesToAdd.concat(this.state.messages),
      }));
      // handle unread messages
    } else {
      const lastMsId = this.state.messages[length - 1]?.id || 0;
      messages.reverse();
      const filteredMessages = lastMsId
        ? messages.filter(ms => ms.id < lastMsId)
        : messages;
      const messagesToAdd: Array<IMessage> = filteredMessages.map(ms => {
        const message = this.generateIMessage(ms);
        this.addNewMessageToDateArr(message);
        return message;
      });
      this.setState(s => ({
        ...s,
        messages: this.state.messages.concat(messagesToAdd),
      }));
      if (messagesToAdd[messagesToAdd.length - 1].id !== 1) {
        const offset = messages[messages.length - 1].id - 21;
        this.wsService.send(
          WsContentTypes.GET_OLD,
          offset > 0 ? offset.toString() : '0'
        );
      }
    }
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

  sendMessage(e: KeyboardEvent | MouseEvent) {
    if (e instanceof MouseEvent || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      if (this.state.filesToSend.length > 0) {
        // TODO: add send file functionality
      }
      const textValue = (<HTMLInputElement>this.newMessageRef.current).value;
      if (MESSAGE_VALIDATION.rule.test(textValue)) {
        this.wsService.send(WsContentTypes.MESSAGE, textValue);
        (<HTMLInputElement>this.newMessageRef.current).value = '';
        this.userSentLasMessage = true;
      }
    }
  }

  getScrollRef(): IRef | null {
    const currentChat = this.state.stateFromStore.currentChat;
    const length = this.state.messages.length;
    if (!currentChat || length === 0) {
      return null;
    }
    // if the user sent the last message, scroll to the bottom
    if (this.userSentLasMessage) {
      return this.state.messages[length - 1].ref;
    }
    // scroll to first unread message
    if (!this.scrolledToFirstUnread && currentChat.unread_count > 0) {
      this.scrolledToFirstUnread = true;
      return this.state.messages.find(ms => ms.id === currentChat.unread_count)
        ?.ref;
    }
    // if the page is scrolled to the bottom, and new message received
    if (this.isScrolledToBottom) {
      return this.state.messages[length - 1].ref;
    }
    // if the page first mounted and there are no unread messages
    if (!this.oldMsObserverRef.current) {
      return this.state.messages[length - 1].ref;
    }
    return null;
  }

  componentWillReceiveProps(props: IProps, state: IState): IState {
    if (props.id) {
      this.chatsController
        .getChatUsers(props.id)
        .then(res => (this.chatUsers = res));
    }
    return super.componentWillReceiveProps(props, state);
  }

  componentDidMount() {
    this.wsConnect();
    super.componentDidMount();
  }

  componentDidUpdate() {
    const scrollRef = this.getScrollRef();
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    this.isScrolledToBottom = false;
    this.userSentLasMessage = false;
    this.oldMsObserverRef = this.state.messages[1]?.ref;
    window.setTimeout(() => {
      if (this.oldMsObserverRef?.current) {
        this.observer.observe(this.oldMsObserverRef.current);
      }
    }, 300);
    super.componentDidUpdate();
  }

  componentWillUnmount() {
    if (this.wsService) {
      this.wsService.close(1000);
      this.wsService.off(WsEvents.NEW_MESSAGE, this.handleNewMessageReceived);
      this.wsService.off(WsEvents.OLD_MESSAGES, this.handleOldMessagesReceived);
      this.wsService.off(WsEvents.CONNECTED, this.requestInitialMessages);
    }
    this.observer.disconnect();
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    const currentChat = this.state.stateFromStore.currentChat;
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
        'div',
        {
          key: 'messages-list',
          class: styles.messages_list,
          ref: this.listRef,
        },
        ...this.messagesPerDate.map(msBlock => {
          return Template.createElement(
            'div',
            { key: msBlock[0] },
            Template.createElement(
              'h3',
              { key: 'date', class: styles.date },
              Template.createTextElement(msBlock[0])
            ),
            Template.createElement(
              'ul',
              { key: `ms-${msBlock[0]}`, class: styles.inner_messages_list },
              ...msBlock[1].map(ms => {
                return Template.createComponent(ChatMessage, {
                  key: ms.id,
                  isUnread:
                    currentChat?.unread_count > 0 &&
                    ms.id <= currentChat?.unread_count,
                  ...ms,
                });
              })
            )
          );
        })
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
