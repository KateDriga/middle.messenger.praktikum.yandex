import * as styles from './chat-list-item-content.module.scss';
import { Block } from '../../utils/base-components/block';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Picture } from '../picture/picture';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api';
import { Store } from '../../utils/store/store';

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

interface IProps extends IChat {
  isActive: boolean;
  listRef: IRef;
}

export class ChatListItemContent extends Block<IProps, null> {
  ref = Template.createRef();
  login = Store.getInstance().getState().user.login;

  isChatVisible(): boolean {
    const parentRect = this.props.listRef.current.getBoundingClientRect();
    const { top, bottom, height } = this.ref.current.getBoundingClientRect();
    return top <= parentRect.top
      ? parentRect.top - top <= height
      : bottom - parentRect.bottom + height <= height;
  }

  componentDidUpdate() {
    if (this.props.isActive && !this.isChatVisible()) {
      this.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    super.componentDidUpdate();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'chat-list-item',
        ref: this.ref,
        class: `${styles.chat_list_item} ${
          this.props.isActive ? styles.chat_list_item_active : ''
        }`,
      },
      Template.createComponent(Picture, {
        key: 'avatar',
        picName: 'avatar',
        picPath: this.props.avatar
          ? `${BASE_URL}${RESOURCES_API_URL}${this.props.avatar}`
          : null,
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
          Template.createTextElement(
            this.props.last_message
              ? `${
                  this.props.last_message.user.login === this.login
                    ? 'You: '
                    : ''
                }${this.props.last_message.content}`
              : ''
          )
        )
      ),
      Template.createElement(
        'div',
        { key: 'chat-extra', class: styles.chat_list_extra },
        Template.createElement(
          'span',
          { key: 'chat-time', class: styles.chat_list_time },
          Template.createTextElement(
            this.props.last_message?.time
              ? formatMessageDate(this.props.last_message.time)
              : ''
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
    );
  }
}
