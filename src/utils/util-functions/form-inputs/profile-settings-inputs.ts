import { IInputProps, InputNameTypes } from '../../../components/input/input';
import { IPictureProps } from '../../../components/picture/picture';
import { IDropdownProps } from '../../../components/dropdown/dropdown';
import { IUser } from '../../fake-test-variables/fake-user';
import {
  generateChatNameInput,
  generateEmailInput,
  generateFirstNameInput,
  generateLastNameInput,
  generateLoginInput,
  generatePasswordInput,
  generatePhoneCodeInput,
  generatePhoneNumberInput,
} from './form-inputs';
import { Template } from '../../template/template';
import {
  TInputPropsWithRef,
  IProfileSettingsInput,
} from '../../../components/profile-settings-form/profile-settings-form';

function generateDisabledInputWithRef(input: IInputProps): TInputPropsWithRef {
  input.disabled = true;
  return { ...input, ref: Template.createRef() };
}

export function generateProfileSettingsInputs(
  errorInputs: Set<string>,
  clearError: () => void,
  allowInputEdit: (key: InputNameTypes) => void,
  focusInput: (prop: TInputPropsWithRef) => void,
  addConfirmPasswordInput: () => void,
  user: IUser
): Array<IProfileSettingsInput> {
  const ICON_EDIT: Omit<IPictureProps, 'onClick'> = {
    picName: 'edit',
    type: 'icon',
    style: 'margin-top: 20px',
  };
  const generateEditIcon = (
    key: InputNameTypes,
    input: TInputPropsWithRef
  ): IPictureProps => {
    const edit = {
      ...ICON_EDIT,
      onClick: () => {
        allowInputEdit(key);
        focusInput(input);
        edit.onClick = () => focusInput(input);
      },
    };
    return edit;
  };

  // email
  const emailKey = InputNameTypes.EMAIL;
  const emailInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateEmailInput(errorInputs, clearError)
  );
  emailInput.value = user.email;
  const emailEdit = generateEditIcon(emailKey, emailInput);
  const email: IProfileSettingsInput = {
    key: emailKey,
    value: [emailInput, emailEdit],
  };

  // login
  const loginKey = InputNameTypes.LOGIN;
  const loginInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateLoginInput(errorInputs, clearError)
  );
  loginInput.value = user.login;
  const loginEdit = generateEditIcon(loginKey, loginInput);
  const login: IProfileSettingsInput = {
    key: loginKey,
    value: [loginInput, loginEdit],
  };

  // first name
  const firstNameKey = InputNameTypes.FIRST_NAME;
  const firstNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateFirstNameInput(errorInputs, clearError)
  );
  firstNameInput.value = user.firstName;
  const firstNameEdit = generateEditIcon(firstNameKey, firstNameInput);
  const firstName: IProfileSettingsInput = {
    key: firstNameKey,
    value: [firstNameInput, firstNameEdit],
  };

  // last name
  const lastNameKey = InputNameTypes.SECOND_NAME;
  const lastNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateLastNameInput(errorInputs, clearError)
  );
  lastNameInput.value = user.lastName;
  const lastNameEdit = generateEditIcon(lastNameKey, lastNameInput);
  const lastName: IProfileSettingsInput = {
    key: lastNameKey,
    value: [lastNameInput, lastNameEdit],
  };

  // chat name
  const chatNameKey = InputNameTypes.DISPLAY_NAME;
  const chatNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateChatNameInput(errorInputs, clearError)
  );
  chatNameInput.value = user.chatName;
  const chatNameEdit = generateEditIcon(chatNameKey, chatNameInput);
  const chatName: IProfileSettingsInput = {
    key: chatNameKey,
    value: [chatNameInput, chatNameEdit],
  };

  // phone number
  const phoneKey = InputNameTypes.PHONE;
  const phoneCodeInput: IDropdownProps = generatePhoneCodeInput(errorInputs);
  phoneCodeInput.value = user.phone.code;
  const phoneNumberInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generatePhoneNumberInput(errorInputs, clearError)
  );
  phoneNumberInput.value = user.phone.number;
  const phoneNumberEdit = generateEditIcon(phoneKey, phoneNumberInput);
  const phone: IProfileSettingsInput = {
    key: phoneKey,
    value: [phoneCodeInput, phoneNumberInput, phoneNumberEdit],
  };

  // password
  const passwordKey = InputNameTypes.OLD_PASSWORD;
  const passwordInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generatePasswordInput(errorInputs, clearError)
  );
  passwordInput.name = InputNameTypes.OLD_PASSWORD;
  passwordInput.required = false;
  const passwordEdit: IPictureProps = {
    ...ICON_EDIT,
    onClick: addConfirmPasswordInput,
  };
  const password: IProfileSettingsInput = {
    key: passwordKey,
    value: [passwordInput, passwordEdit],
  };

  return [email, login, firstName, lastName, chatName, phone, password];
}

export function generateConfirmPasswordInput(
  errorInputs: Set<string>,
  clearError: () => void
): IProfileSettingsInput {
  const confirmPasswordInput = generateDisabledInputWithRef(
    generatePasswordInput(errorInputs, clearError)
  );
  confirmPasswordInput.disabled = false;
  confirmPasswordInput.label = 'Confirm Password';
  confirmPasswordInput.name = InputNameTypes.NEW_PASSWORD;
  return { key: InputNameTypes.NEW_PASSWORD, value: [confirmPasswordInput] };
}
