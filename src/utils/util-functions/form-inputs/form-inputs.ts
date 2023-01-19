import { IInputProps, InputNameTypes } from '../../../components/input/input';
import {
  EMAIL_INPUT,
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  LOGIN_INPUT,
  PASSWORD_INPUT,
  PHONE_CODE_INPUT,
  PHONE_COUNTRY_CODES,
  PHONE_NUMBER_INPUT,
} from '../../const-variables/field-inputs';
import {
  IValidation,
  saveAndTestValue,
} from '../../const-variables/field-validation';
import { IDropdownProps } from '../../../components/dropdown/dropdown';

export function generateEmailInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const email: IInputProps = {
    ...EMAIL_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, email, errorInputs),
    clearError,
  };
  return email;
}

export function generateLoginInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const login: IInputProps = {
    ...LOGIN_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, login, errorInputs),
    clearError,
  };
  return login;
}

export function generatePasswordInput(
  errorInputs: Set<string>,
  clearError: () => void,
  validation?: IValidation
): IInputProps {
  const password: IInputProps = {
    ...PASSWORD_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, password, errorInputs),
    clearError,
  };
  if (validation) {
    password.validation = validation;
  }
  return password;
}

export function generateFirstNameInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const firstName: IInputProps = {
    ...FIRST_NAME_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, firstName, errorInputs),
    clearError,
  };
  return firstName;
}

export function generateLastNameInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const lastName: IInputProps = {
    ...LAST_NAME_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, lastName, errorInputs),
    clearError,
  };
  return lastName;
}

export function generateChatNameInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const chatName: IInputProps = {
    ...FIRST_NAME_INPUT,
    label: 'Chat Name',
    name: InputNameTypes.DISPLAY_NAME,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, chatName, errorInputs),
    clearError,
  };
  return chatName;
}

export function generatePhoneCodeInput(
  errorInputs: Set<string>
): IDropdownProps {
  const phoneCode: IDropdownProps = {
    ...PHONE_CODE_INPUT,
    value: PHONE_COUNTRY_CODES[0],
    onChange: (e: Event) => saveAndTestValue(e, phoneCode, errorInputs),
  };
  return phoneCode;
}

export function generatePhoneNumberInput(
  errorInputs: Set<string>,
  clearError: () => void
): IInputProps {
  const phoneNumber: IInputProps = {
    ...PHONE_NUMBER_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, phoneNumber, errorInputs),
    clearError,
  };
  return phoneNumber;
}
