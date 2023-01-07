import { IInputProps } from '../../components/input/input';
import { IDropdownProps } from '../../components/dropdown/dropdown';
import { instanceOfIFormInputFieldProps } from '../../components/form-input-field/form-input-field';

export interface IValidation {
  rule: RegExp;
  errorText: string;
  replaceFn?: (e: Event) => void;
}

export const LOGIN_VALIDATION: IValidation = {
  rule: /.{5,50}/,
  errorText:
    'Incorrect login (must contain at least 5\u00A0symbols and must not be longer than 50\u00A0characters)',
};

export const PASSWORD_VALIDATION: IValidation = {
  rule: /[^\n]+/,
  errorText: '',
};

export const PASSWORD_REGISTER_VALIDATION: IValidation = {
  rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.,:;$!%*#?&^_-]{8,}$/,
  errorText:
    'Password must contain minimum 8\u00A0characters, at least 1\u00A0uppercase letter, 1\u00A0lowercase letter and 1\u00A0number, spaces are not allowed',
};

export const EMAIL_VALIDATION: IValidation = {
  rule: /[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
  errorText: 'Invalid email',
};

export const FIRST_NAME_VALIDATION: IValidation = {
  rule: /^[A-Za-z]+$/,
  errorText: 'Name must include only letters',
};

export const LAST_NAME_VALIDATION = {
  rule: /^[A-Za-z'-]+$/,
  errorText: 'Incorrect last name',
};

export const PHONE_NUMBER_VALIDATION = {
  rule: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  errorText: 'Invalid phone number',
  replaceFn: (e: Event) => {
    const num = (<HTMLInputElement>e.target).value
      .replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    (<HTMLInputElement>e.target).value = !num[2]
      ? num[1]
      : '(' + num[1] + ') ' + num[2] + (num[3] ? '-' + num[3] : '');
  },
};

export const saveAndTestValue = (
  e: Event,
  props: IInputProps | IDropdownProps,
  errorInputs: Set<string>
) => {
  props.value = (<HTMLInputElement>e.target).value;
  if (instanceOfIFormInputFieldProps(props)) {
    props.validation.rule.test(props.value)
      ? errorInputs.delete(props.label)
      : errorInputs.add(props.label);
  }
};
