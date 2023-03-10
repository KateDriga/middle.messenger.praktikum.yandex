import { IInputProps, InputNameTypes } from '../../components/input/input';
import {
  EMAIL_VALIDATION,
  FIRST_NAME_VALIDATION,
  LAST_NAME_VALIDATION,
  LOGIN_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_NUMBER_VALIDATION,
} from './field-validation';

type TUserInput = Omit<IInputProps, 'value' | 'onChange' | 'clearError'>;

export const EMAIL_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'Email',
  type: 'email',
  placeholder: 'user-email@yandex.ru',
  name: InputNameTypes.EMAIL,
  required: true,
  validation: EMAIL_VALIDATION,
};

export const LOGIN_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'Login',
  type: 'text',
  placeholder: 'inanivanov',
  name: InputNameTypes.LOGIN,
  required: true,
  validation: LOGIN_VALIDATION,
};

export const FIRST_NAME_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'First Name',
  type: 'text',
  placeholder: 'Ivan',
  name: InputNameTypes.FIRST_NAME,
  required: true,
  validation: FIRST_NAME_VALIDATION,
};

export const LAST_NAME_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'Last Name',
  type: 'text',
  placeholder: 'Ivanov',
  name: InputNameTypes.SECOND_NAME,
  required: true,
  validation: LAST_NAME_VALIDATION,
};

export const PHONE_NUMBER_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'Phone number',
  type: 'tel',
  placeholder: '+79991234567',
  name: InputNameTypes.PHONE,
  required: true,
  validation: PHONE_NUMBER_VALIDATION,
};

export const PASSWORD_INPUT: TUserInput = {
  htmlType: 'input',
  label: 'Password',
  type: 'password',
  placeholder: 'Password',
  name: InputNameTypes.PASSWORD,
  required: true,
  validation: PASSWORD_VALIDATION,
};
