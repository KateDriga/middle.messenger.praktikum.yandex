import { IInputProps } from '../../../components/input/input';
import {
  addOnChangeCallback,
  generateLoginInput,
  generatePasswordInput,
} from './form-inputs';

export function generateLoginPageFormInputs(
  clearError: () => void,
  onChangeCallback: (prop: IInputProps, value: string) => void
): Array<IInputProps> {
  const login = generateLoginInput(clearError);
  const password = generatePasswordInput(clearError);
  return [login, password].map(input =>
    addOnChangeCallback(input, onChangeCallback)
  );
}
