import styles from './chat-item-add.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Picture } from '../picture/picture';
import { Input } from '../input/input';
import { generateAddChatInput } from '../../utils/util-functions/form-inputs/add-chat';
import { ChatsController } from '../../services/controllers/chats-controller';
import { IPageState } from '../../utils/base-components/page-form';
import { TInputPropsWithRef } from '../../utils/base-components/page-form-edit';

export class ChatItemAddControls extends Block<
  { isVisible: boolean },
  IPageState
> {
  chatController: ChatsController = new ChatsController();
  state: IPageState = { isValid: true, errorText: null };
  input: TInputPropsWithRef;

  constructor() {
    super();
    this.changeInput = this.changeInput.bind(this);
    this.addChat = this.addChat.bind(this);
    this.clearError = this.clearError.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.input = generateAddChatInput(this.changeInput, this.clearError);
  }

  changeInput(value: string) {
    this.input.value = value;
  }

  public clearError() {
    if (!this.state.isValid) {
      this.setState(s => ({ ...s, isValid: true, errorText: null }));
    }
  }

  async addChat() {
    const response = await this.chatController.createChat(this.input.value);
    if (!response) {
      this.input.value = '';
      (this.input.ref.current as HTMLInputElement).value = '';
    } else if (this.state.errorText !== response.errorText) {
      this.setState(s => ({
        ...s,
        isValid: response.isValid,
        errorText: response.errorText,
      }));
    }
  }

  clearInput() {
    this.input.value = '';
    (this.input.ref.current as HTMLInputElement).value = '';
    this.setState(s => ({ ...s, isValid: true, errorText: null }));
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'add-chat' },
      Template.createElement(
        'div',
        { key: 'actions', class: styles.add_chat },
        Template.createComponent(Input, { key: 'input', ...this.input }),
        Template.createComponent(Picture, {
          key: 'add-chat',
          picName: 'add',
          type: 'icon',
          onClick: this.addChat,
        }),
        Template.createComponent(Picture, {
          key: 'add-chat-cancel',
          picName: 'close',
          type: 'icon',
          onClick: this.clearInput,
        })
      ),
      Template.createElement(
        'span',
        { key: 'error-text', class: styles.error_text },
        Template.createTextElement(this.state.errorText || '')
      )
    );
  }
}
