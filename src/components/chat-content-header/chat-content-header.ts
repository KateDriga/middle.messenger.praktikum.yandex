import * as styles from './chat-content-header.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Picture } from '../picture/picture';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { IChat } from '../chat-list-item-content/chat-list-item-content';
import { DropdownChatOptions } from '../dropdown-chat-options/dropdown-chat-options';
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api';

interface IProps {
  id: string;
  chat: IChat | null;
}

export class ChatContentHeader extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'header-title', class: styles.chat_text_area_title },
      Template.createComponent(Picture, {
        key: 'avatar',
        picName: 'avatar',
        picPath: this.props.chat?.avatar
          ? `${BASE_URL}${RESOURCES_API_URL}${this.props.chat.avatar}`
          : null,
        type: 'image',
        style: 'width: 70px; height: 70px;',
      }),
      Template.createElement(
        'h2',
        { key: 'chat-name' },
        Template.createTextElement(this.props.chat?.title || '')
      ),
      Template.createElement(
        'span',
        {
          key: 'chats',
          class: styles.redirect,
          onClick: () => Router.getInstance().go(ROUTES.chats.path),
        },
        Template.createTextElement('Back to Chats >')
      ),
      Template.createComponent(DropdownChatOptions, {
        key: 'dropdown',
        id: this.props.id,
        chatTitle: this.props.chat?.title,
        avatar: this.props.chat?.avatar,
      })
    );
  }
}
