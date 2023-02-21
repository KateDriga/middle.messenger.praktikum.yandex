import styles from './dropdown-chat-options.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { DropdownChatOptionsAddUsers } from '../dropdown-chat-options-add-users/dropdown-chat-options-add-users';
import { DropdownChatOptionsRemoveUsers } from '../dropdown-chat-options-remove-users/dropdown-chat-options-remove-users';
import { DropdownChatOptionsChangeAvatar } from '../dropdown-chat-options-change-avatar/dropdown-chat-options-change-avatar';
import { DropdownChatOptionsDeleteChat } from '../dropdown-chat-options-delete-chat/dropdown-chat-options-delete-chat';

interface IProps {
  chatTitle: string;
  avatar: string;
  id: string;
}

export class DropdownChatOptions extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'dropdown', class: styles.dropdown },
      Template.createElement(
        'div',
        {
          key: 'dropdown-dots',
          class: styles.dropdown_dots,
        },
        Template.createElement('div', { key: 'dot-1' }),
        Template.createElement('div', { key: 'dot-2' }),
        Template.createElement('div', { key: 'dot-3' })
      ),
      Template.createElement(
        'ul',
        {
          key: 'dropdown-content',
          class: styles.dropdown_content,
        },
        Template.createComponent(DropdownChatOptionsAddUsers, {
          key: 'add-users',
          id: this.props.id,
        }),
        Template.createComponent(DropdownChatOptionsRemoveUsers, {
          key: 'remove-users',
          id: this.props.id,
        }),
        Template.createComponent(DropdownChatOptionsChangeAvatar, {
          key: 'change-avatar',
          id: this.props.id,
          avatar: this.props.avatar,
        }),
        Template.createComponent(DropdownChatOptionsDeleteChat, {
          key: 'delete-chat',
          id: this.props.id,
          chatTitle: this.props.chatTitle,
        })
      )
    );
  }
}
