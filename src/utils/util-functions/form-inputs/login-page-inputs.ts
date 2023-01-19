import { IInputProps } from '../../../components/input/input';
import { generateLoginInput, generatePasswordInput } from './form-inputs';

export function generateLoginPageFormInputs(
  clearError: () => void
): Array<IInputProps> {
  const login = generateLoginInput(clearError);
  const password = generatePasswordInput(clearError);
  return [login, password];
}
