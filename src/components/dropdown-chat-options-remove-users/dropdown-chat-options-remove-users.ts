import styles from './dropdown-chat-options-remove-users.module.scss';
import dropdownStyles from '../dropdown-chat-options/dropdown-chat-options.module.scss';
import { Block } from '../../utils/base-components/block';
import {
  IVirtualDomElement,
  OperationTypes,
  TVirtualDomNode,
} from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { displayModal } from '../../utils/util-functions/modal';
import { getRemoveUsersButtons } from '../../utils/util-functions/form-inputs/chat-options-inputs';
import { InputNameTypes } from '../input/input';
import { TUser } from '../profile-settings-form/profile-settings-form';
import { ChatsController } from '../../services/controllers/chats-controller';
import { ItemWithDeleteOption } from '../item-with-delete-option/item-with-delete-option';
import { Store } from '../../utils/store/store';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';

export class DropdownChatOptionsRemoveUsers extends Block<
  { id: string },
  null
> {
  chatController = new ChatsController();
  chatUsers: Array<TUser & { id: string }> = [];
  chatUsersRef = Template.createRef();
  chatUsersToDelete: Array<TUser & { id: string }> = [];
  chatUsersToDeleteRef = Template.createRef();

  constructor() {
    super();
    this.displayRemoveUsersModal = this.displayRemoveUsersModal.bind(this);
    this.removeUsers = this.removeUsers.bind(this);
    this.createChatUsersList = this.createChatUsersList.bind(this);
    this.addUserToUsersToDelete = this.addUserToUsersToDelete.bind(this);
    this.cancelUserRemove = this.cancelUserRemove.bind(this);
    this.resetState = this.resetState.bind(this);
    this.applyUpdate = this.applyUpdate.bind(this);
  }

  async removeUsers() {
    if (this.chatUsersToDelete.length > 0) {
      let removingSelf = false;
      const currentUserId = Store.getInstance().getState().user.id;
      const userIdsToDelete = this.chatUsersToDelete.map(user => {
        if (user.id === currentUserId) {
          removingSelf = true;
        }
        return user.id;
      });
      await this.chatController.removeChatUsers(userIdsToDelete, this.props.id);
      this.resetState();
      if (removingSelf) {
        Router.getInstance().replace(ROUTES.chats.path);
      }
    }
  }

  addUserToUsersToDelete(userToDelete: TUser & { id: string }) {
    this.chatUsersToDelete.push(userToDelete);
    this.chatUsers = this.chatUsers.filter(user => user.id !== userToDelete.id);
    this.applyUpdate();
  }

  createChatUsersList(): IVirtualDomElement {
    return Template.createElement(
      'ul',
      {
        key: 'chat-users-list',
        class: styles.users_list,
        ref: this.chatUsersRef,
      },
      ...this.chatUsers.map(user =>
        Template.createElement(
          'li',
          {
            key: user.id,
            class: styles.user,
            onClick: () => this.addUserToUsersToDelete(user),
          },
          Template.createTextElement(
            `${user[InputNameTypes.FIRST_NAME]} ${
              user[InputNameTypes.SECOND_NAME]
            } (${user[InputNameTypes.LOGIN]})`
          )
        )
      )
    );
  }

  createUsersToRemoveList(): IVirtualDomElement {
    return Template.createElement(
      'ul',
      {
        key: 'chat-users-delete',
        class: styles.users_list,
        ref: this.chatUsersToDeleteRef,
      },
      ...this.chatUsersToDelete.map(user =>
        Template.createElement(
          'li',
          { key: user.id },
          Template.createComponent(ItemWithDeleteOption, {
            key: user.id,
            itemName: `${user[InputNameTypes.FIRST_NAME]} ${
              user[InputNameTypes.SECOND_NAME]
            } (${user[InputNameTypes.LOGIN]})`,
            removeItem: this.cancelUserRemove,
          })
        )
      )
    );
  }

  cancelUserRemove(userDetails: string) {
    const login = userDetails.match(/\((.*?)\)/)[1];
    const user = this.chatUsersToDelete.find(user => user.login === login);
    this.chatUsers.push(user);
    this.chatUsersToDelete = this.chatUsersToDelete.filter(
      user => user.login !== login
    );
    this.applyUpdate();
  }

  resetState() {
    this.chatUsers = [];
    this.chatUsersToDelete = [];
  }

  applyUpdate() {
    Template.applyUpdate(this.chatUsersRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createChatUsersList(),
    });
    Template.applyUpdate(this.chatUsersToDeleteRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createUsersToRemoveList(),
    });
  }

  displayRemoveUsersModal() {
    this.chatController.getChatUsers(this.props.id).then(users => {
      this.chatUsers = users;
      Template.applyUpdate(this.chatUsersRef.current, {
        type: OperationTypes.REPLACE,
        newNode: this.createChatUsersList(),
      });
    });
    displayModal({
      type: 'info',
      message: 'To remove a user from this chat click on the username',
      buttons: getRemoveUsersButtons(this.removeUsers),
      extraContent: Template.createElement(
        'div',
        { key: 'users', class: styles.users },
        Template.createElement(
          'div',
          { key: 'all-chat-users', class: styles.users_column },
          Template.createElement(
            'h3',
            { key: 'all-users-title', class: styles.users_title },
            Template.createTextElement('Chat Users')
          ),
          this.createChatUsersList()
        ),
        Template.createElement(
          'div',
          { key: 'delete-chat-users', class: styles.users_column },
          Template.createElement(
            'h3',
            { key: 'delete-users-title', class: styles.users_title },
            Template.createTextElement('Users to Delete')
          ),
          this.createUsersToRemoveList()
        )
      ),
      onCloseCallback: this.resetState,
    });
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'remove-users',
        class: dropdownStyles.menu_option,
        onClick: this.displayRemoveUsersModal,
      },
      Template.createTextElement('Remove Users')
    );
  }
}
