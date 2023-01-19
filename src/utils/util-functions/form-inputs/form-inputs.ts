import { IInputProps, InputNameTypes } from '../../../components/input/input';
import {
  EMAIL_INPUT,
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  LOGIN_INPUT,
  PASSWORD_INPUT,
  PHONE_NUMBER_INPUT,
} from '../../const-variables/field-inputs';
import {
  IValidation,
  saveAndTestValue,
} from '../../const-variables/field-validation';
import { IFormPageState } from '../../../pages/login-page/login-page';

export function generateEmailInput(clearError: () => void): IInputProps {
  const email: IInputProps = {
    ...EMAIL_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, email),
    clearError,
  };
  return email;
}

export function generateLoginInput(clearError: () => void): IInputProps {
  const login: IInputProps = {
    ...LOGIN_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, login),
    clearError,
  };
  return login;
}

export function generatePasswordInput(
  clearError: () => void,
  validation?: IValidation
): IInputProps {
  const password: IInputProps = {
    ...PASSWORD_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, password),
    clearError,
  };
  if (validation) {
    password.validation = validation;
  }
  return password;
}

export function generateFirstNameInput(clearError: () => void): IInputProps {
  const firstName: IInputProps = {
    ...FIRST_NAME_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, firstName),
    clearError,
  };
  return firstName;
}

export function generateLastNameInput(clearError: () => void): IInputProps {
  const lastName: IInputProps = {
    ...LAST_NAME_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, lastName),
    clearError,
  };
  return lastName;
}

export function generateChatNameInput(clearError: () => void): IInputProps {
  const chatName: IInputProps = {
    ...FIRST_NAME_INPUT,
    label: 'Chat Name',
    name: InputNameTypes.DISPLAY_NAME,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, chatName),
    clearError,
  };
  return chatName;
}

export function generatePhoneNumberInput(clearError: () => void): IInputProps {
  const phoneNumber: IInputProps = {
    ...PHONE_NUMBER_INPUT,
    value: '',
    onChange: (e: Event) => saveAndTestValue(e, phoneNumber),
    clearError,
  };
  return phoneNumber;
}

export function validateForm(inputs: Array<IInputProps>): IFormPageState {
  const isValid = inputs.every(input =>
    input.validation.rule.test(input.value)
  );
  return { isValid, errorText: isValid ? null : 'Please check form inputs' };
}

export function checkPasswordsEqual(inputs: Array<IInputProps>): boolean {
  const passwordInputs = inputs.filter(
    input => input.name === InputNameTypes.PASSWORD
  );
  return new Set(passwordInputs.map(input => input.value)).size === 1;
}

export function validateRegisterForm(
  inputs: Array<IInputProps>
): IFormPageState {
  const formState = validateForm(inputs);
  if (!formState.isValid) {
    return formState;
  }
  const passwordsEqual = checkPasswordsEqual(inputs);
  return {
    isValid: passwordsEqual,
    errorText: passwordsEqual ? null : "Passwords don't match",
  };
}

export function generateFormObject(
  inputs: Array<IInputProps>
): Record<string, string> {
  return inputs.reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  );
}
