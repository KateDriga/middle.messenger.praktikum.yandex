import { IInputProps, InputNameTypes } from '../../../components/input/input';
import {
  EMAIL_INPUT,
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  LOGIN_INPUT,
  PASSWORD_INPUT,
  PHONE_NUMBER_INPUT,
} from '../../const-variables/field-inputs';
import { IPageState } from '../../base-components/page-form';
import { FIRST_NAME_VALIDATION } from '../../const-variables/field-validation';

export function generateEmailInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...EMAIL_INPUT,
    value: '',
    clearError,
  };
}

export function generateLoginInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...LOGIN_INPUT,
    value: '',
    clearError,
  };
}

export function generatePasswordInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...PASSWORD_INPUT,
    value: '',
    clearError,
  };
}

export function generateFirstNameInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...FIRST_NAME_INPUT,
    value: '',
    clearError,
  };
}

export function generateLastNameInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...LAST_NAME_INPUT,
    value: '',
    clearError,
  };
}

export function generateChatNameInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...FIRST_NAME_INPUT,
    label: 'Chat Name',
    name: InputNameTypes.DISPLAY_NAME,
    value: '',
    clearError,
  };
}

export function generatePhoneNumberInput(
  clearError: () => void
): Omit<IInputProps, 'onChange'> {
  return {
    ...PHONE_NUMBER_INPUT,
    value: '',
    clearError,
  };
}

export function addOnChangeCallback(
  input: Omit<IInputProps, 'onChange'>,
  onChangeCallback: (prop: IInputProps, value: string) => void
): IInputProps {
  const prop = {
    ...input,
    onChange: (value: string) => onChangeCallback(prop, value),
  };
  return prop;
}

export function isPasswordInput(input: IInputProps) {
  return input.name === InputNameTypes.PASSWORD;
}

export function isOldPasswordInput(input: IInputProps) {
  return input.name === InputNameTypes.OLD_PASSWORD;
}

export function isNewPasswordInput(input: IInputProps) {
  return input.name === InputNameTypes.NEW_PASSWORD;
}

export function validateFormInputs(inputs: Array<IInputProps>): IPageState {
  const fieldsValid = inputs.every(
    input =>
      !input.required ||
      input.disabled ||
      input.validation.rule.test(input.value)
  );
  return {
    isValid: fieldsValid,
    errorText: fieldsValid ? null : 'Please check form inputs',
  };
}

export function validateChangePasswordFormInputs(
  inputs: Array<IInputProps>
): IPageState {
  const inputsValidityState = validateFormInputs(inputs);
  return inputsValidityState.isValid
    ? checkNewPasswordsState(inputs)
    : inputsValidityState;
}

export function validateRegisterFormInputs(
  inputs: Array<IInputProps>
): IPageState {
  const inputsValidityState = validateFormInputs(inputs);
  return inputsValidityState.isValid
    ? checkPasswordsState(inputs)
    : inputsValidityState;
}

export function validateChatName(name: string): IPageState {
  const isValid = FIRST_NAME_VALIDATION.rule.test(name);
  return { isValid, errorText: isValid ? null : 'Please check Chat Name' };
}

function checkPasswordsEqual(passwordInputs: Array<IInputProps>): IPageState {
  const passwordsEqual =
    new Set(passwordInputs.map(input => input.value)).size === 1;
  return {
    isValid: passwordsEqual,
    errorText: passwordsEqual ? null : "Passwords don't match",
  };
}

export function checkPasswordsState(inputs: Array<IInputProps>): IPageState {
  return checkPasswordsEqual(inputs.filter(input => isPasswordInput(input)));
}

export function checkNewPasswordsState(inputs: Array<IInputProps>): IPageState {
  return checkPasswordsEqual(inputs.filter(input => isNewPasswordInput(input)));
}

export function generateFormObject(
  inputs: Array<IInputProps>
): Record<string, string> {
  return inputs.reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  );
}
