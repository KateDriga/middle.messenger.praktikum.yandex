import styles from './input-block.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { FormInputField } from '../form-input-field/form-input-field';
import { IInputProps } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import { IPictureProps } from '../picture/picture';
import { TInputPropsWithRef } from '../../utils/base-components/page-form-edit';

export class InputBlock extends Block<
  Array<IInputProps | TInputPropsWithRef | IDropdownProps | IPictureProps>,
  null
> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'input-block', class: styles.input_block },
      ...Object.values(this.props).map(input =>
        Template.createComponent(FormInputField, {
          key: 'input-field',
          ...input,
        })
      )
    );
  }
}
