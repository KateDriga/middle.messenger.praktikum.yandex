import * as styles from './modal.module.scss';
import { Block } from '../../utils/base-components/block';
import {
  OperationTypes,
  TVirtualDomNode,
} from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Button, IButtonProps } from '../button/button';

export interface IModalMessage {
  type: 'success' | 'info' | 'error';
  message: string;
  buttons?: Array<IButtonProps>;
  extraContent?: TVirtualDomNode;
  onCloseCallback?: () => void;
}

export const MODAL_ID = 'modal';

const STATUS_PATHS = {
  success: require('../../images/icons/success.svg'),
  info: require('../../images/icons/info.svg'),
  error: require('../../images/icons/error.svg'),
};

export class Modal extends Block<IModalMessage, null> {
  ref = Template.createRef();

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);
    document.body.addEventListener('keydown', this.closeOnEscape);
  }

  close() {
    if (this.props.onCloseCallback) {
      this.props.onCloseCallback();
    }
    document.body.removeEventListener('keydown', this.closeOnEscape);
    Template.applyUpdate(this.ref.current, {
      type: OperationTypes.REPLACE,
      newNode: Template.createElement('div', { key: MODAL_ID, id: MODAL_ID }),
    });
  }

  closeOnEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'modal', id: MODAL_ID, class: styles.modal, ref: this.ref },
      Template.createElement('div', {
        key: 'modal-overlay',
        class: styles.modal_overlay,
        onClick: this.close,
      }),
      Template.createElement(
        'div',
        {
          key: 'modal-content',
          class: styles.modal_content,
        },
        Template.createElement('img', {
          key: 'close',
          class: styles.modal_close_icon,
          src: require('../../images/icons/close.svg'),
          alt: 'close-icon',
          tabIndex: 0,
          onClick: this.close,
        }),
        Template.createElement(
          'div',
          { key: 'modal-info', class: styles.modal_content_info },
          Template.createElement('img', {
            key: 'status',
            class: styles.modal_status_icon,
            src: STATUS_PATHS[this.props.type],
            alt: 'message-type',
          }),
          Template.createElement(
            'h2',
            {
              key: 'message-text',
              class:
                this.props.type === 'success'
                  ? styles.modal_message_success
                  : this.props.type === 'error'
                  ? styles.modal_message_error
                  : styles.modal_message_info,
            },
            Template.createTextElement(this.props.message)
          )
        ),
        this.props.extraContent
          ? this.props.extraContent
          : Template.createTextElement(''),
        this.props.buttons
          ? Template.createElement(
              'div',
              { key: 'buttons', class: styles.modal_buttons },
              ...this.props.buttons.map(button =>
                Template.createComponent(Button, {
                  key: button.title,
                  ...button,
                  onClick:
                    button.type === 'secondary' ? this.close : button.onClick,
                })
              )
            )
          : Template.createTextElement('')
      )
    );
  }
}
