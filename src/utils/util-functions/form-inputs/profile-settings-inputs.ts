import { IInputProps, InputNameTypes } from '../../../components/input/input';
import { IPictureProps } from '../../../components/picture/picture';
import { IUser } from '../../fake-test-variables/fake-user';
import {
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
} from '../../../components/profile-settings-form/profile-settings-form';

function generateDisabledInputWithRef(input: IInputProps): TInputPropsWithRef {
  input.disabled = true;
  return { ...input, ref: Template.createRef() };
}

export function generateProfileSettingsInputs(
  errorInputs: Set<string>,
  clearError: () => void,
  allowInputEdit: (prop: TInputPropsWithRef) => void,
  focusInput: (prop: TInputPropsWithRef) => void,
  addConfirmPasswordInput: (prop: TInputPropsWithRef) => void,
  user: IUser
): Array<TProfileSettingsInput> {
  const ICON_EDIT: Omit<IPictureProps, 'onClick'> = {
    picName: 'edit',
    type: 'icon',
    style: 'margin-top: 20px',
  };
  const generateEditIcon = (input: TInputPropsWithRef): IPictureProps => {
    return {
      ...ICON_EDIT,
      onClick: () => {
        allowInputEdit(input);
        focusInput(input);
      },
    };
  };

  // email
  const emailInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateEmailInput(errorInputs, clearError)
  );
  emailInput.value = user.email;
  const emailEdit = generateEditIcon(emailInput);

  // login
  const loginInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateLoginInput(errorInputs, clearError)
  );
  loginInput.value = user.login;
  const loginEdit = generateEditIcon(loginInput);

  // first name
  const firstNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateFirstNameInput(errorInputs, clearError)
  );
  firstNameInput.value = user.firstName;
  const firstNameEdit = generateEditIcon(firstNameInput);

  // last name
  const lastNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateLastNameInput(errorInputs, clearError)
  );
  lastNameInput.value = user.lastName;
  const lastNameEdit = generateEditIcon(lastNameInput);

  // chat name
  const chatNameInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generateChatNameInput(errorInputs, clearError)
  );
  chatNameInput.value = user.chatName;
  const chatNameEdit = generateEditIcon(chatNameInput);

  // phone number
  const phoneInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generatePhoneNumberInput(errorInputs, clearError)
  );
  phoneInput.value = user.phone;
  const phoneEdit = generateEditIcon(phoneInput);

  // password
  const passwordInput: TInputPropsWithRef = generateDisabledInputWithRef(
    generatePasswordInput(errorInputs, clearError)
  );
  passwordInput.name = InputNameTypes.OLD_PASSWORD;
  passwordInput.required = false;
  const passwordEdit: IPictureProps = {
    ...ICON_EDIT,
    onClick: () => {
      addConfirmPasswordInput(passwordInput);
      focusInput(passwordInput);
    },
  };

  return [
    [emailInput, emailEdit],
    [loginInput, loginEdit],
    [firstNameInput, firstNameEdit],
    [lastNameInput, lastNameEdit],
    [chatNameInput, chatNameEdit],
    [phoneInput, phoneEdit],
    [passwordInput, passwordEdit],
  ];
}

export function generateConfirmPasswordInput(
  errorInputs: Set<string>,
  clearError: () => void
): TProfileSettingsInput {
  const confirmPasswordInput = generateDisabledInputWithRef(
    generatePasswordInput(errorInputs, clearError)
  );
  confirmPasswordInput.disabled = false;
  confirmPasswordInput.label = 'Confirm Password';
  confirmPasswordInput.name = InputNameTypes.NEW_PASSWORD;
  return confirmPasswordInput;
}
