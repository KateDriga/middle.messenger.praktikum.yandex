import * as styles from './chat-list-item.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';
import { navigate } from '../../utils/util-functions/router';
import { getChatIdFromPath, ROUTES } from '../../utils/const-variables/pages';
import { Picture } from '../picture/picture';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

interface IUserMessage {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUserMessage;
    time: string;
    content: string;
  };
}

interface IState {
  isActive: boolean;
}

export class ChatListItem extends Block<IChat, IState> {
  state: IState = { isActive: false };
  ref = Template.createRef();
  routerService = RouterService.getInstance();

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
  }

  handlePathChange() {
    this.setState(() => ({
      isActive: getChatIdFromPath() === this.props.id.toString(),
    }));
  }

  initProps(props: IChat): IChat {
    this.state.isActive = getChatIdFromPath() === props.id.toString();
    return super.initProps(props);
  }

  componentDidMount() {
    this.routerService.on(HistoryEventTypes.POPSTATE, this.handlePathChange);
    if (this.state.isActive) {
      setTimeout(() =>
        this.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      );
    }
    super.componentDidMount();
  }

  componentDidUpdate() {
    if (this.state.isActive && this.ref.current.offsetParent === null) {
      this.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    super.componentDidUpdate();
  }

  componentWillUnmount() {
    this.routerService.off(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'chat-item',
        ref: this.ref,
      },
      Template.createElement(
        'div',
        {
          key: 'chat-list-item',
          class: `${styles.chat_list_item} ${
            this.state.isActive ? styles.chat_list_item_active : ''
          }`,
          onClick: () =>
            navigate(ROUTES.chat.path.replace(':id', this.props.id.toString())),
        },
        //TODO: replace image name with info from props
        Template.createComponent(Picture, {
          key: 'avatar',
          picName: 'avatar',
          type: 'image',
          style:
            'width: 50px; height: 50px; align-self: center; margin-left: 5px;',
        }),
        Template.createElement(
          'div',
          { key: 'content', class: styles.chat_list_content },
          Template.createElement(
            'h3',
            { key: 'chat-title', class: styles.chat_list_title },
            Template.createTextElement(this.props.title)
          ),
          Template.createElement(
            'p',
            { key: 'chat-last-message', class: styles.chat_list_last_message },
            Template.createTextElement(this.props.last_message.content)
          )
        ),
        Template.createElement(
          'div',
          { key: 'chat-extra', class: styles.chat_list_extra },
          Template.createElement(
            'span',
            { key: 'chat-time', class: styles.chat_list_time },
            Template.createTextElement(
              formatMessageDate(this.props.last_message.time)
            )
          ),
          Template.createElement(
            'span',
            {
              key: 'chat-unread',
              class: `${
                this.props.unread_count > 0 ? styles.chat_list_unread_count : ''
              }`,
            },
            Template.createTextElement(
              this.props.unread_count > 0 ? this.props.unread_count : ''
            )
          )
        )
      ),
      Template.createElement('hr', {
        key: 'line-separator',
        class: styles.separator,
      })
    );
  }
}
