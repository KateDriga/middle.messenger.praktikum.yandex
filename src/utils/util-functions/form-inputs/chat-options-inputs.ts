import { IButtonProps } from '../../../components/button/button';
import { IInputFileProps } from '../../../components/input-file/input-file';
import { IRef } from '../../template/template-types';
import { IInputProps } from '../../../components/input/input';
import { LOGIN_SEARCH_VALIDATION } from '../../const-variables/field-validation';

export function getDeleteChatButtons(
  confirmCallback: () => void
): Array<IButtonProps> {
  return [
    {
      title: 'Confirm',
      type: 'primary',
      htmlType: 'submit',
      onClick: confirmCallback,
    },
    { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
  ];
}

export function getChangeAvatarButtons(
  confirmCallback: () => void
): Array<IButtonProps> {
  return [
    {
      title: 'Change Avatar',
      type: 'primary',
      htmlType: 'submit',
      onClick: confirmCallback,
    },
    { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
  ];
}

export function getChangeAvatarInput(
  onChangeCallback: (value: string) => void,
  ref: IRef
): IInputFileProps {
  return {
    label: 'Change Avatar',
    value: '',
    name: 'avatar',
    ref,
    onChange: (value: string) => onChangeCallback(value),
    style: 'text-align: center; display: flex; flex-direction: column;',
    accept: 'image/*',
  };
}

export function getAddUsersButtons(
  confirmCallback: () => void
): Array<IButtonProps> {
  return [
    {
      title: 'Add Users',
      type: 'primary',
      htmlType: 'submit',
      onClick: confirmCallback,
    },
    { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
  ];
}

export function getAddUsersInput(
  onChangeCallback: (value: string) => void
): IInputProps {
  return {
    clearError: () => null,
    htmlType: 'input',
    label: 'Find Users',
    name: 'query',
    onChange: (value: string) => onChangeCallback(value),
    placeholder: 'Ivan',
    required: false,
    type: 'search',
    validation: LOGIN_SEARCH_VALIDATION,
    value: '',
  };
}

export function getRemoveUsersButtons(
  confirmCallback: () => void
): Array<IButtonProps> {
  return [
    {
      title: 'Remove Users',
      type: 'primary',
      htmlType: 'submit',
      onClick: confirmCallback,
    },
    { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
  ];
}
