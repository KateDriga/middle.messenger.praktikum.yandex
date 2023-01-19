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
  clearError: () => void
): Array<IInputProps> {
  const email = generateEmailInput(clearError);
  const login = generateLoginInput(clearError);
  const firstName = generateFirstNameInput(clearError);
  const lastName = generateLastNameInput(clearError);
  const phoneNumber = generatePhoneNumberInput(clearError);
  const passwordCreate = generatePasswordInput(clearError);
  passwordCreate.label = 'Create Password';
  const passwordConfirm = generatePasswordInput(clearError);
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
