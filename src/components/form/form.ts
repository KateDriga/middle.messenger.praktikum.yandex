import * as styles from './form.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { FormInputField } from '../form-input-field/form-input-field';
import { Button, IButtonProps } from '../button/button';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IInputProps } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import { InputBlock } from '../input-block/input-block';
import { IInputFileProps } from '../input-file/input-file';
import { IPictureProps } from '../picture/picture';

interface IProps {
  title: string;
  inputs: Array<
    | IInputProps
    | IDropdownProps
    | IInputFileProps
    | IPictureProps
    | Array<IInputProps | IDropdownProps | IInputFileProps | IPictureProps>
  >;
  buttons: Array<IButtonProps>;
  submit: () => void;
  reset?: () => void;
  errorText: string;
}

export interface IFormState {
  isValid: boolean;
}

export class Form extends MyCoolComponent<IProps, any> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'form',
      {
        key: 'login-form',
        class: styles.form,
        onSubmit: this.props.submit,
        onReset: this.props.reset,
      },
      MyCoolTemplate.createElement(
        'h2',
        { key: this.props.title, class: styles.form__title },
        MyCoolTemplate.createTextElement(this.props.title)
      ),
      MyCoolTemplate.createElement(
        'div',
        { key: 'form-inputs', class: styles.form_inputs },
        ...this.props.inputs.map((input, idx) =>
          Array.isArray(input)
            ? MyCoolTemplate.createComponent(InputBlock, { key: idx, ...input })
            : MyCoolTemplate.createComponent(FormInputField, {
                key: 'label' in input ? input.label : input.picName,
                ...input,
              })
        )
      ),
      MyCoolTemplate.createElement(
        'div',
        { key: 'form-buttons', class: styles.form_buttons },
        MyCoolTemplate.createElement(
          'span',
          { key: 'error-text', class: styles.form__error_text },
          MyCoolTemplate.createTextElement(this.props.errorText)
        ),
        ...this.props.buttons.map(btn =>
          MyCoolTemplate.createComponent(Button, { key: btn.title, ...btn })
        )
      )
    );
  }
}
