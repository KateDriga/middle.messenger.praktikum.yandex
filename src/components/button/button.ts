import * as styles from './button.module.scss';
import { Template } from '../../utils/template/template';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';

export interface IButtonProps {
  title: string;
  type: 'primary' | 'secondary';
  htmlType: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  isActive?: boolean;
}

export class Button extends Block<IButtonProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'button',
      {
        key: this.props.title,
        class: `${styles.btn} ${
          this.props.type === 'primary' ? styles.primary : styles.secondary
        } ${this.props.isActive ? styles.active : ''}`,
        type: this.props.htmlType,
        disabled: this.props.disabled ?? false,
      },
      Template.createTextElement(this.props.title)
    );
  }
}
