import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IInputProps, Input } from '../input/input';
import { Dropdown, IDropdownProps } from '../dropdown/dropdown';

export interface IFormInput {
  htmlType: 'input' | 'select';
  value: string;
  label: string;
  onChange: (e: Event) => void;
}

export function instanceOfIFormInputFieldProps(
  object: IInputProps | IDropdownProps
): object is IInputProps {
  return object.htmlType === 'input';
}

export class FormInputField extends MyCoolComponent<
  IInputProps | IDropdownProps,
  null
> {
  render(): TVirtualDomNode {
    return instanceOfIFormInputFieldProps(this.props)
      ? MyCoolTemplate.createComponent(Input, { key: 'input', ...this.props })
      : MyCoolTemplate.createComponent(Dropdown, {
          key: 'dropdown',
          ...this.props,
        });
  }
}
