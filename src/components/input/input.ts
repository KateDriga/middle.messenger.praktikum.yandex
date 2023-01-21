import * as styles from './input.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IValidation } from '../../utils/const-variables/field-validation';
import { IFormInput } from '../form-input-field/form-input-field';
import { TInputPropsWithRef } from '../../utils/base-components/page-form-edit';

export enum InputNameTypes {
  EMAIL = 'email',
  LOGIN = 'login',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  PHONE = 'phone',
  PASSWORD = 'password',
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  DISPLAY_NAME = 'display_name',
  MESSAGE = 'message',
}

export interface IInputProps extends IFormInput {
  type: string;
  placeholder: string;
  name: InputNameTypes;
  required: boolean;
  validation: IValidation;
  clearError: () => void;
  htmlType: 'input';
  disabled?: boolean;
  style?: string;
  inputStyle?: string;
}

interface IState {
  hasError: boolean;
}

export class Input extends Block<IInputProps | TInputPropsWithRef, IState> {
  state: IState = { hasError: false };

  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    if (this.state.hasError) {
      this.setState(() => ({ hasError: false }));
    }
    this.props.clearError();
  }

  onBlur(e: Event) {
    this.props.value = (<HTMLInputElement>e.target).value;
    const isErrorInput = !this.props.validation.rule.test(this.props.value);
    if (isErrorInput && !this.state.hasError) {
      this.setState(() => ({ hasError: true }));
    }
    this.props.onBlur(this.props.value);
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'label',
      {
        key: this.props.label,
        class: styles.form_input,
        style: this.props.style,
      },
      Template.createTextElement(this.props.label),
      Template.createElement('input', {
        key: 'input',
        class: styles.form_input_field,
        type: this.props.type,
        placeholder: this.props.placeholder,
        name: this.props.name,
        required: this.props.required,
        disabled: this.props.disabled || false,
        value: this.props.value,
        style: this.props.inputStyle,
        ref: 'ref' in this.props && this.props.ref,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
      }),
      Template.createElement(
        'span',
        { key: 'error-text', class: styles.form_input_error_text },
        Template.createTextElement(
          this.state.hasError ? this.props.validation.errorText : ''
        )
      )
    );
  }
}
