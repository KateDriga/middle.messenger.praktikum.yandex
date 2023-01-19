import { IInputProps } from '../../../components/input/input';
import { PASSWORD_VALIDATION } from '../../const-variables/field-validation';
import { generateLoginInput, generatePasswordInput } from './form-inputs';

export function generateLoginPageFormInputs(
  errorInputs: Set<string>,
  clearError: () => void
): Array<IInputProps> {
  const login = generateLoginInput(errorInputs, clearError);
  const password = generatePasswordInput(
    errorInputs,
    clearError,
    PASSWORD_VALIDATION
  );
  return [login, password];
}
