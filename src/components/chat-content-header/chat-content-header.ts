import * as styles from './chat-content-header.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Picture } from '../picture/picture';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { IChat } from '../chat-list-item-content/chat-list-item-content';

interface IProps {
  id: string;
  chat: Omit<IChat, 'isActive' | 'listRef'> | null;
}

export class ChatContentHeader extends Block<IProps, null> {
  render(): TVirtualDomNode {
    // TODO: replace with info from server
    return Template.createElement(
      'div',
      { key: 'header-title', class: styles.chat_text_area_title },
      Template.createComponent(Picture, {
        key: 'avatar',
        picName: 'avatar',
        picPath: this.props.chat?.avatar,
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
      )
    );
  }
}
