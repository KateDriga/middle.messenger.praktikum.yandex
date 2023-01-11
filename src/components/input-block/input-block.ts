import './input-block.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { FormInputField } from '../form-input-field/form-input-field';
import { IInputProps } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import { IPictureProps } from '../picture/picture';

export class InputBlock extends MyCoolComponent<
  Array<IInputProps | IDropdownProps | IPictureProps>,
  null
> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'input-block', class: 'input_block' },
      ...Object.values(this.props).map(input =>
        MyCoolTemplate.createComponent(FormInputField, {
          key: 'input-field',
          ...input,
        })
      )
    );
  }
}
