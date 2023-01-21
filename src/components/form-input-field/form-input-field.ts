import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { IInputProps, Input } from '../input/input';
import { Dropdown, IDropdownProps } from '../dropdown/dropdown';
import { Picture, IPictureProps } from '../picture/picture';
import { IInputFileProps, InputFile } from '../input-file/input-file';
import { TInputPropsWithRef } from '../../utils/base-components/page-form-edit';

export interface IFormInput {
  htmlType: 'input' | 'select';
  value: string;
  label: string;
  onBlur: (value: string) => void;
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

export class FormInputField extends Block<
  | IInputProps
  | TInputPropsWithRef
  | IDropdownProps
  | IPictureProps
  | IInputFileProps,
  null
> {
  render(): TVirtualDomNode {
    return instanceOfIPictureProps(this.props)
      ? Template.createComponent(Picture, {
          key: 'image',
          ...this.props,
        })
      : instanceOfIFormInputFieldProps(this.props)
      ? Template.createComponent(Input, { key: 'input', ...this.props })
      : instanceOfIDropdownProps(this.props)
      ? Template.createComponent(Dropdown, {
          key: 'dropdown',
          ...this.props,
        })
      : Template.createComponent(InputFile, {
          key: 'input-file',
          ...this.props,
        });
  }
}
