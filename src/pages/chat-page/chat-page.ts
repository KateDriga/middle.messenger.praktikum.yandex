import * as styles from './chat-page.module.scss';
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
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

export interface IChatSelectedState {
  chatId: string | null;
}

export class ChatPage extends MyCoolComponent<null, IChatSelectedState> {
  state: IChatSelectedState;
  routerService: RouterService;

  constructor() {
    super();
    this.state = {
      chatId: getRegExpForPath(ROUTES.chat.path).test(window.location.pathname)
        ? getChatIdFromPath()
        : null,
    };
    this.routerService = RouterService.getInstance();
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
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'chat-page',
        class: styles.chat_page,
      },
      MyCoolTemplate.createComponent(ChatsList, {
        key: 'chats-list',
        class: styles.chats_list,
        id: this.state.chatId,
      }),
      MyCoolTemplate.createComponent(ChatsTextArea, {
        key: 'chats-text-area',
        class: styles.chats_text_area,
        id: this.state.chatId,
      })
    );
  }
}
