import * as styles from './chat-page.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ChatsList } from '../../components/chats-list/chats-list';
import { ChatsTextArea } from '../../components/chats-text-area/chats-text-area';
import {
  getChatIdFromPath,
  getRegExpForPath,
  ROUTES,
} from '../../utils/const-variables/pages';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

interface IState {
  chatId: string | null;
}

export class ChatPage extends Block<null, IState> {
  state: IState = {
    chatId: getRegExpForPath(ROUTES.chat.path).test(window.location.pathname)
      ? getChatIdFromPath()
      : null,
  };
  routerService = RouterService.getInstance();

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
  }

  handlePathChange() {
    this.setState(() => ({
      chatId: getRegExpForPath(ROUTES.chat.path).test(window.location.pathname)
        ? getChatIdFromPath()
        : null,
    }));
  }

  componentDidMount() {
    this.routerService.on(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentDidMount();
  }

  componentWillUnmount() {
    this.routerService.off(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'chat-page',
        class: styles.chat_page,
      },
      Template.createComponent(ChatsList, {
        key: 'chats-list',
        class: styles.chats_list,
        id: this.state.chatId,
      }),
      Template.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: styles.chats_text_area,
        id: this.state.chatId,
      })
    );
  }
}
