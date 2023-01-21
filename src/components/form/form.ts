import * as styles from './form.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { FormInputField } from '../form-input-field/form-input-field';
import { Button, IButtonProps } from '../button/button';
import { Template } from '../../utils/template/template';
import { IInputProps } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import { InputBlock } from '../input-block/input-block';
import { IInputFileProps } from '../input-file/input-file';
import { IPictureProps } from '../picture/picture';
import { TInputPropsWithRef } from '../../utils/base-components/page-form-edit';

interface IProps {
  title: string;
  inputs: Array<
    | IInputProps
    | TInputPropsWithRef
    | IDropdownProps
    | IInputFileProps
    | IPictureProps
    | Array<
        | IInputProps
        | TInputPropsWithRef
        | IDropdownProps
        | IInputFileProps
        | IPictureProps
      >
  >;
  buttons: Array<IButtonProps>;
  submit: () => void;
  reset?: () => void;
  errorText: string;
}

export interface IFormState {
  isValid: boolean;
}

export class Form extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'form',
      {
        key: 'login-form',
        class: styles.form,
        onSubmit: this.props.submit,
        onReset: this.props.reset,
      },
      Template.createElement(
        'h2',
        { key: this.props.title, class: styles.form_title },
        Template.createTextElement(this.props.title)
      ),
      Template.createElement(
        'div',
        { key: 'form-inputs', class: styles.form_inputs },
        ...this.props.inputs.map((input, idx) =>
          Array.isArray(input)
            ? Template.createComponent(InputBlock, { key: idx, ...input })
            : Template.createComponent(FormInputField, {
                key: 'label' in input ? input.label : input.picName,
                ...input,
              })
        )
      ),
      Template.createElement(
        'div',
        { key: 'form-buttons', class: styles.form_buttons },
        Template.createElement(
          'span',
          { key: 'error-text', class: styles.form_error_text },
          Template.createTextElement(this.props.errorText)
        ),
        ...this.props.buttons.map(btn =>
          Template.createComponent(Button, { key: btn.title, ...btn })
        )
      )
    );
  }
}
