import * as styles from '../dropdown-chat-options/dropdown-chat-options.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { displayModal } from '../../utils/util-functions/modal';
import {
  getChangeAvatarButtons,
  getChangeAvatarInput,
} from '../../utils/util-functions/form-inputs/chat-options-inputs';
import { Picture } from '../picture/picture';
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api';
import { InputFile } from '../input-file/input-file';
import { ChatsController } from '../../services/controllers/chats-controller';

interface IProps {
  id: string;
  avatar: string;
}

export class DropdownChatOptionsChangeAvatar extends Block<IProps, null> {
  chatsController = new ChatsController();
  avatarRef = Template.createRef();
  newAvatarImage = '';

  constructor() {
    super();
    this.selectChatAvatar = this.selectChatAvatar.bind(this);
    this.changeChatAvatar = this.changeChatAvatar.bind(this);
    this.handleChangeAvatarInput = this.handleChangeAvatarInput.bind(this);
  }

  handleChangeAvatarInput(value: string) {
    this.newAvatarImage = value;
  }

  async changeChatAvatar() {
    if (this.newAvatarImage !== '') {
      await this.chatsController.changeChatAvatar(
        (<HTMLInputElement>this.avatarRef.current).files[0],
        this.props.id
      );
    }
  }

  selectChatAvatar() {
    displayModal({
      type: 'info',
      message: 'Select a new avatar image',
      buttons: getChangeAvatarButtons(this.changeChatAvatar),
      extraContent: Template.createElement(
        'div',
        { key: 'avatar', class: styles.modal_change_avatar },
        Template.createComponent(Picture, {
          key: 'avatar-img',
          picPath: this.props.avatar
            ? `${BASE_URL}${RESOURCES_API_URL}${this.props.avatar}`
            : null,
          picName: 'avatar',
          type: 'image',
        }),
        Template.createComponent(InputFile, {
          key: 'avatar-input',
          ...getChangeAvatarInput(this.handleChangeAvatarInput, this.avatarRef),
        })
      ),
    });
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: 'change-avatar',
        class: styles.menu_option,
        onClick: this.selectChatAvatar,
      },
      Template.createTextElement('Change Chat Image')
    );
  }
}
