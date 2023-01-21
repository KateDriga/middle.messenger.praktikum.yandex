import { IInputProps } from '../../../components/input/input';
import {
  addOnBlurCallback,
  generateLoginInput,
  generatePasswordInput,
} from './form-inputs';

export function generateLoginPageFormInputs(
  clearError: () => void,
  onBlurCallback: (prop: IInputProps, value: string) => void
): Array<IInputProps> {
  const login = generateLoginInput(clearError);
  const password = generatePasswordInput(clearError);
  return [login, password].map(input =>
    addOnBlurCallback(input, onBlurCallback)
  );
}
