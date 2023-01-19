import { IInputProps } from '../../../components/input/input';
import {
  generateEmailInput,
  generateFirstNameInput,
  generateLastNameInput,
  generateLoginInput,
  generatePasswordInput,
  generatePhoneNumberInput,
} from './form-inputs';

export function generateRegisterPageFormInputs(
  errorInputs: Set<string>,
  clearError: () => void
): Array<IInputProps> {
  const email = generateEmailInput(errorInputs, clearError);
  const login = generateLoginInput(errorInputs, clearError);
  const firstName = generateFirstNameInput(errorInputs, clearError);
  const lastName = generateLastNameInput(errorInputs, clearError);
  const phoneNumber = generatePhoneNumberInput(errorInputs, clearError);
  const passwordCreate = generatePasswordInput(errorInputs, clearError);
  passwordCreate.label = 'Create Password';
  const passwordConfirm = generatePasswordInput(errorInputs, clearError);
  passwordConfirm.label = 'Confirm Password';

  return [
    email,
    login,
    firstName,
    lastName,
    phoneNumber,
    passwordCreate,
    passwordConfirm,
  ];
}
