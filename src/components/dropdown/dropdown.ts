import * as styles from './dropdown.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IFormInput } from '../form-input-field/form-input-field';

export interface IDropdownProps extends IFormInput {
  options: Array<string>;
  name: string;
  htmlType: 'select';
  disabled?: boolean;
}

export class Dropdown extends Block<IDropdownProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'dropdown', class: styles.dropdown },
      Template.createElement(
        'label',
        { key: this.props.label, class: styles.dropdown_label },
        Template.createTextElement(this.props.label)
      ),
      Template.createElement(
        'select',
        {
          key: 'select',
          class: styles.form_input_select,
          name: this.props.name,
          disabled: this.props.disabled ?? false,
          onChange: this.props.onBlur,
        },
        ...this.props.options.map(option =>
          Template.createElement(
            'option',
            { key: this.props.label },
            Template.createElement(
              'option',
              { key: option },
              Template.createTextElement(option)
            )
          )
        )
      )
    );
  }
}
