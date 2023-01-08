import './input.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { IValidation } from '../../utils/const-variables/field-validation';
import { IFormInput } from '../form-input-field/form-input-field';

export interface IInputProps extends IFormInput {
  type: string;
  placeholder: string;
  required: boolean;
  validation: IValidation;
  clearError: () => void;
  htmlType: 'input';
  disabled?: boolean;
}

export interface IFormInputState {
  hasError: boolean;
}

export class Input extends MyCoolComponent<IInputProps, IFormInputState> {
  state: IFormInputState = { hasError: false };
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'label',
      { key: this.props.label, class: 'form__input' },
      MyCoolTemplate.createTextElement(this.props.label),
      MyCoolTemplate.createElement('input', {
        key: 'input',
        class: 'form__input_input_field',
        type: this.props.type,
        placeholder: this.props.placeholder,
        required: this.props.required,
        disabled: this.props.disabled || false,
        value: this.props.value,
        onFocus: () => {
          this.setState(() => ({ hasError: false }));
          this.props.clearError();
        },
        onBlur: (e: Event) => {
          this.props.value = (<HTMLInputElement>e.target).value;
          this.setState(() => ({
            hasError: !this.props.validation.rule.test(this.props.value),
          }));
          this.props.onChange(e);
        },
        onInput: (e: Event) => {
          if (this.props.validation.replaceFn) {
            this.props.validation.replaceFn(e);
          }
        },
      }),
      MyCoolTemplate.createElement(
        'span',
        { key: 'error-text', class: 'form__input_error_text' },
        MyCoolTemplate.createTextElement(
          this.state.hasError ? this.props.validation.errorText : ''
        )
      )
    );
  }
}
