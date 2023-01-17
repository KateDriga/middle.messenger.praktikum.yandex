import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IInputProps, Input } from '../input/input';
import { Dropdown, IDropdownProps } from '../dropdown/dropdown';
import { Picture, IPictureProps } from '../picture/picture';
import { IInputFileProps, InputFile } from '../input-file/input-file';

export interface IFormInput {
  htmlType: 'input' | 'select';
  value: string;
  label: string;
  onChange: (e: Event) => void;
}

export function instanceOfIFormInputFieldProps(
  object: IInputProps | IDropdownProps | IPictureProps | IInputFileProps
): object is IInputProps {
  return 'htmlType' in object && object.htmlType === 'input';
}

export function instanceOfIDropdownProps(
  object: IInputProps | IDropdownProps | IPictureProps | IInputFileProps
): object is IDropdownProps {
  return 'htmlType' in object && object.htmlType === 'select';
}

export function instanceOfIPictureProps(
  object: IInputProps | IDropdownProps | IPictureProps | IInputFileProps
): object is IPictureProps {
  return 'picName' in object;
}

export class FormInputField extends MyCoolComponent<
  IInputProps | IDropdownProps | IPictureProps | IInputFileProps,
  null
> {
  render(): TVirtualDomNode {
    return instanceOfIPictureProps(this.props)
      ? MyCoolTemplate.createComponent(Picture, {
          key: 'image',
          ...this.props,
        })
      : instanceOfIFormInputFieldProps(this.props)
      ? MyCoolTemplate.createComponent(Input, { key: 'input', ...this.props })
      : instanceOfIDropdownProps(this.props)
      ? MyCoolTemplate.createComponent(Dropdown, {
          key: 'dropdown',
          ...this.props,
        })
      : MyCoolTemplate.createComponent(InputFile, {
          key: 'input-file',
          ...this.props,
        });
  }
}
