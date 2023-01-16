import * as styles from './button.module.scss';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';

export interface IButtonProps {
  title: string;
  type: 'primary' | 'secondary';
  htmlType: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  isActive?: boolean;
}

export class Button extends MyCoolComponent<IButtonProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'button',
      {
        key: this.props.title,
        class: `${styles.btn} ${
          this.props.type === 'primary' ? styles.primary : styles.secondary
        } ${this.props.isActive ? styles.active : ''}`,
        type: this.props.htmlType,
        disabled: this.props.disabled ?? false,
      },
      MyCoolTemplate.createTextElement(this.props.title)
    );
  }
}
