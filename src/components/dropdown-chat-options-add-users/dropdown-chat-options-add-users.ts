import dropdownStyles from '../dropdown-chat-options/dropdown-chat-options.module.scss';
import styles from './dropdown-chat-options-add-users.module.scss';
import { Block } from '../../utils/base-components/block';
import {
  IVirtualDomElement,
  OperationTypes,
  TVirtualDomNode,
} from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { debounce } from '../../utils/util-functions/debounce';
import { IInputProps, Input } from '../input/input';
import { displayModal } from '../../utils/util-functions/modal';
import {
  getAddUsersButtons,
  getAddUsersInput,
} from '../../utils/util-functions/form-inputs/chat-options-inputs';
import { UserController } from '../../services/controllers/user-controller';
import { TUser } from '../profile-settings-form/profile-settings-form';
import { isEqual } from '../../utils/util-functions/isEqual';
import { ItemWithDeleteOption } from '../item-with-delete-option/item-with-delete-option';
import { ChatsController } from '../../services/controllers/chats-controller';

export class DropdownChatOptionsAddUsers extends Block<{ id: string }, null> {
  userController = new UserController();
  chatsController = new ChatsController();
  users: Array<TUser & { id: string }> = [];
  input: IInputProps;
  searchResultsRef = Template.createRef();
  selectedUsersRef = Template.createRef();
  selectedUsers: Array<TUser & { id: string }> = [];

  constructor() {
    super();
    this.displayAddUsersModal = this.displayAddUsersModal.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.createSearchResults = this.createSearchResults.bind(this);
    this.createSelectedUsersResult = this.createSelectedUsersResult.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
    this.resetState = this.resetState.bind(this);
    this.input = getAddUsersInput(debounce(this.findUsers));
  }

  async findUsers(value: string) {
    const users = await this.userController.findUsers(value);
    if (Array.isArray(users) && !isEqual(this.users, users)) {
      this.users = users;
      window.setTimeout(() =>
        Template.applyUpdate(this.searchResultsRef.current, {
          type: OperationTypes.REPLACE,
          newNode: this.createSearchResults(),
        })
      );
    }
  }

  selectUser(user: TUser & { id: string }) {
    this.selectedUsers.push(user);
    Template.applyUpdate(this.searchResultsRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createSearchResults(),
    });
    Template.applyUpdate(this.selectedUsersRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createSelectedUsersResult(),
    });
  }

  removeUser(login: string) {
    this.selectedUsers = this.selectedUsers.filter(
      user => user.login !== login
    );
    Template.applyUpdate(this.searchResultsRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createSearchResults(),
    });
    Template.applyUpdate(this.selectedUsersRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createSelectedUsersResult(),
    });
  }

  hideSearchResults() {
    this.users = [];
    Template.applyUpdate(this.searchResultsRef.current, {
      type: OperationTypes.REPLACE,
      newNode: this.createSearchResults(),
    });
  }

  createSearchResults(): IVirtualDomElement {
    const users = this.users.filter(
      user => !this.selectedUsers.find(selected => selected.id === user.id)
    );
    return Template.createElement(
      'ul',
      {
        key: 'search-results',
        class: styles.search_results,
        ref: this.searchResultsRef,
        onMouseLeave: this.hideSearchResults,
      },
      ...users.map(user =>
        Template.createElement(
          'li',
          {
            key: user.login,
            class: styles.search_item,
            onClick: () => this.selectUser(user),
          },
          Template.createTextElement(user.login)
        )
      )
    );
  }

  createSelectedUsersResult(): IVirtualDomElement {
    return Template.createElement(
      'ul',
      {
        key: 'selected-users',
        ref: this.selectedUsersRef,
        class: styles.selected_users,
        onClick: this.hideSearchResults,
      },
      ...this.selectedUsers.map(user =>
        Template.createElement(
          'li',
          { key: user.id },
          Template.createComponent(ItemWithDeleteOption, {
            key: user.id,
            itemName: user.login,
            removeItem: (login: string) => this.removeUser(login),
          })
        )
      )
    );
  }

  async displayAddUsersModal() {
    displayModal({
      type: 'info',
      message: 'Use search field to find and add users',
      buttons: getAddUsersButtons(this.addUsers),
      extraContent: Template.createElement(
        'div',
        { key: 'search', class: styles.search },
        this.createSelectedUsersResult(),
        Template.createComponent(Input, {
          key: 'search-input',
          ...this.input,
        }),
        this.createSearchResults()
      ),
      onCloseCallback: this.resetState,
    });
  }

  async addUsers() {
    if (this.selectedUsers.length > 0) {
      await this.chatsController.addUsers(
        this.selectedUsers.map(user => user.id),
        this.props.id
      );
      this.resetState();
    }
  }

  resetState() {
    this.users = [];
    this.selectedUsers = [];
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'add-users',
        class: dropdownStyles.menu_option,
        onClick: this.displayAddUsersModal,
      },
      Template.createTextElement('Add Users')
    );
  }
}
