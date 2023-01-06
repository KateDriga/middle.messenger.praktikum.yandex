import './form-input-field.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IValidation } from '../../utils/const-variables/field-validation';

export interface IFormInputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  validation: IValidation;
  checkError: (hasError: boolean) => void;
  clearError: () => void;
}

export interface IFormInputFieldState {
  hasError: boolean;
}

export class FormInputField extends MyCoolComponent<
  IFormInputFieldProps,
  IFormInputFieldState
> {
  state: IFormInputFieldState = { hasError: false };
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
        onFocus: () => {
          this.setState(() => ({ hasError: false }));
          this.props.clearError();
        },
        onBlur: (e: Event) => {
          this.props.value = (<HTMLInputElement>e.target).value;
          this.setState(() => ({
            hasError: !this.props.validation.rule.test(this.props.value),
          }));
          this.props.checkError(this.state.hasError);
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
