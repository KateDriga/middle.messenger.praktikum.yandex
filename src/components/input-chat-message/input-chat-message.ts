import './input-chat-message.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

interface IProps {
  name: string;
  onKeyDown: (e: KeyboardEvent) => void;
}

export class InputChatMessage extends MyCoolComponent<IProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement('textarea', {
      key: 'input',
      class: 'input_chat_message custom_scroll',
      name: this.props.name,
      placeholder: 'Message',
      rows: 3,
      onKeyDown: this.props.onKeyDown,
    });
  }
}
