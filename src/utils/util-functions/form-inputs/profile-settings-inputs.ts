import { IInputProps, InputNameTypes } from '../../../components/input/input';
import { IPictureProps } from '../../../components/picture/picture';
import {
  addOnChangeCallback,
  generateChatNameInput,
  generateEmailInput,
  generateFirstNameInput,
  generateLastNameInput,
  generateLoginInput,
  generatePasswordInput,
  generatePhoneNumberInput,
} from './form-inputs';
import { Template } from '../../template/template';
import {
  TInputPropsWithRef,
  TProfileSettingsInput,
} from '../../base-components/page-form-edit';
import { IInputFileProps } from '../../../components/input-file/input-file';
import { TUser } from '../../../components/profile-settings-form/profile-settings-form';
import { BASE_URL, RESOURCES_API_URL } from '../../const-variables/api';
import { IRef } from '../../template/template-types';

const ICON_EDIT: Omit<IPictureProps, 'onClick'> = {
  picName: 'edit',
  type: 'icon',
  style: 'margin-top: 20px',
};

export function generateProfileSettingsInputs(
  clearError: () => void,
  onChangeCallback: (prop: IInputProps, value: string) => void,
  allowInputEdit: (prop: TInputPropsWithRef) => void,
  user: TUser
): Array<TProfileSettingsInput> {
  const email = generateEmailInput(clearError);
  email.value = user?.[InputNameTypes.EMAIL] || '';
  const login = generateLoginInput(clearError);
  login.value = user?.[InputNameTypes.LOGIN] || '';
  const firstName = generateFirstNameInput(clearError);
  firstName.value = user?.[InputNameTypes.FIRST_NAME] || '';
  const lastName = generateLastNameInput(clearError);
  lastName.value = user?.[InputNameTypes.SECOND_NAME] || '';
  const chatName = generateChatNameInput(clearError);
  chatName.value = user?.[InputNameTypes.DISPLAY_NAME] || '';
  const phone = generatePhoneNumberInput(clearError);
  phone.value = user?.[InputNameTypes.PHONE] || '';

  return [email, login, firstName, lastName, chatName, phone].map(input => {
    const prop = Object.assign(
      addOnChangeCallback({ ...input, disabled: true }, onChangeCallback),
      {
        ref: Template.createRef(),
      }
    );
    const edit = { ...ICON_EDIT, onClick: () => allowInputEdit(prop) };
    return [prop, edit];
  });
}

export function generateNewPasswordInputs(
  onChangeCallback: (prop: IInputProps, value: string) => void,
  clearError: () => void
): Array<TProfileSettingsInput> {
  const newPassword = generatePasswordInput(clearError);
  newPassword.label = 'New Password';
  newPassword.name = InputNameTypes.NEW_PASSWORD;
  const confirmPassword = { ...newPassword, label: 'Confirm Password' };
  return [newPassword, confirmPassword].map(input => [
    Object.assign(addOnChangeCallback(input, onChangeCallback), {
      ref: Template.createRef(),
    }),
  ]);
}

export function generateChangePasswordProfileInputs(
  clearError: () => void,
  onChangeCallback: (prop: IInputProps, value: string) => void,
  addNewPasswordInputs: (prop: TInputPropsWithRef) => void
): Array<TProfileSettingsInput> {
  const password = generatePasswordInput(clearError);
  password.label = 'Old Password';
  password.name = InputNameTypes.OLD_PASSWORD;
  password.disabled = true;
  const oldPassword = Object.assign(
    addOnChangeCallback(password, onChangeCallback),
    {
      ref: Template.createRef(),
    }
  );
  const edit = {
    ...ICON_EDIT,
    onClick: () => addNewPasswordInputs(oldPassword),
  };
  return [[oldPassword, edit]];
}

export function generateChangeAvatarProfileInputs(
  avatarPath: string | null,
  onChangeCallback: (prop: IInputFileProps, value: string) => void,
  ref: IRef
): Array<IInputFileProps | IPictureProps> {
  const avatar: IPictureProps = {
    picPath: avatarPath ? `${BASE_URL}${RESOURCES_API_URL}${avatarPath}` : null,
    picName: 'avatar',
    type: 'image',
  };
  const input: IInputFileProps = {
    label: 'Change Avatar',
    value: '',
    name: 'avatar',
    ref,
    onChange: (value: string) => onChangeCallback(input, value),
    style: 'text-align: center;',
    accept: 'image/*',
  };
  return [avatar, input];
}
