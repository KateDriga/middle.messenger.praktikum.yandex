import './button.scss';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';

export interface IButtonProps {
  title: string;
  type: 'secondary' | 'primary';
  htmlType: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export class Button extends MyCoolComponent<IButtonProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'button',
      {
        key: this.props.title,
        class: `btn ${this.props.type}`,
        type: this.props.htmlType,
        disabled: this.props.disabled ?? false,
      },
      MyCoolTemplate.createTextElement(this.props.title)
    );
  }
}
