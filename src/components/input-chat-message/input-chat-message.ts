import styles from './input-chat-message.module.scss';
import { Block } from '../../utils/base-components/block';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

interface IProps {
  name: string;
  onKeyDown: (e: KeyboardEvent) => void;
  newMessageRef: IRef;
}

export class InputChatMessage extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement('textarea', {
      key: 'input',
      class: `${styles.input_chat_message}`,
      name: this.props.name,
      placeholder: 'Message',
      onKeyDown: this.props.onKeyDown,
      ref: this.props.newMessageRef,
    });
  }
}
