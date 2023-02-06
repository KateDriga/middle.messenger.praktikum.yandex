import * as styles from './chat-list-item.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ROUTES } from '../../utils/const-variables/pages';
import {
  ChatListItemContent,
  IChat,
} from '../chat-list-item-content/chat-list-item-content';
import { NavLink } from '../../utils/router/nav-link';

export class ChatListItem extends Block<IChat, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'chat-item',
      },
      Template.createComponent(NavLink, {
        key: 'link',
        href: ROUTES.chat.path.replace(':id', this.props.id.toString()),
        component: ChatListItemContent,
        componentProps: { ...this.props, key: this.props.id },
      }),
      Template.createElement('hr', {
        key: 'line-separator',
        class: styles.separator,
      })
    );
  }
}
