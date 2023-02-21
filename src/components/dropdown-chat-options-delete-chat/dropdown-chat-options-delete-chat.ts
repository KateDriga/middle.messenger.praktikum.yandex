import styles from '../dropdown-chat-options/dropdown-chat-options.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { ChatsController } from '../../services/controllers/chats-controller';
import { displayModal } from '../../utils/util-functions/modal';
import { getDeleteChatButtons } from '../../utils/util-functions/form-inputs/chat-options-inputs';
import { Template } from '../../utils/template/template';

interface IProps {
  id: string;
  chatTitle: string;
}

export class DropdownChatOptionsDeleteChat extends Block<IProps, null> {
  chatsController = new ChatsController();

  constructor() {
    super();
    this.confirmChatDelete = this.confirmChatDelete.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
  }

  confirmChatDelete() {
    displayModal({
      type: 'info',
      message: `You are going to delete chat "${this.props.chatTitle}". Are you sure?`,
      buttons: getDeleteChatButtons(this.deleteChat),
    });
  }

  async deleteChat() {
    await this.chatsController.deleteChat(this.props.id);
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'delete-chat',
        class: styles.menu_option,
        onClick: this.confirmChatDelete,
      },
      Template.createTextElement('Delete Chat')
    );
  }
}
