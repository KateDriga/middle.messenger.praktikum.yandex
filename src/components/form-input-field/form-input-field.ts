import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IInputProps, Input } from '../input/input';
import { Dropdown, IDropdownProps } from '../dropdown/dropdown';
import { Icon, IIconProps } from '../icon/icon';

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

export function instanceOfIIconProps(
  object: IIconProps | any
): object is IIconProps {
  return 'imageName' in object;
}

export class FormInputField extends MyCoolComponent<
  IInputProps | IDropdownProps | IIconProps,
  null
> {
  render(): TVirtualDomNode {
    return instanceOfIIconProps(this.props)
      ? MyCoolTemplate.createComponent(Icon, {
          key: 'icon',
          ...this.props,
          style: 'margin-left: 10px',
        })
      : instanceOfIFormInputFieldProps(this.props)
      ? MyCoolTemplate.createComponent(Input, { key: 'input', ...this.props })
      : MyCoolTemplate.createComponent(Dropdown, {
          key: 'dropdown',
          ...this.props,
        });
  }
}
