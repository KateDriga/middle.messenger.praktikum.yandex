import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import {
  EMAIL_VALIDATION,
  FIRST_NAME_VALIDATION,
  LAST_NAME_VALIDATION,
  LOGIN_VALIDATION,
  PASSWORD_REGISTER_VALIDATION,
  PHONE_NUMBER_VALIDATION,
  saveAndTestValue,
} from '../../utils/const-variables/field-validation';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Form, IFormState } from '../../components/form/form';
import { IInputProps } from '../../components/input/input';
import { IDropdownProps } from '../../components/dropdown/dropdown';
import { PHONE_COUNTRY_CODES } from '../../utils/const-variables/field-inputs';

interface IState extends IFormState {
  errorText: string | null;
}

export class RegisterPage extends MyCoolComponent<null, IState> {
  state: IState = { isValid: true, errorText: null };
  render(): TVirtualDomNode {
    const errorInputs = new Set<string>();
    const clearError = () => {
      if (!this.state.isValid) {
        this.setState(() => ({ isValid: true, errorText: null }));
      }
    };
    const email: IInputProps = {
      htmlType: 'input',
      label: 'Email',
      type: 'email',
      placeholder: 'user-email@yandex.ru',
      required: true,
      value: '',
      validation: EMAIL_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, email, errorInputs),
      clearError,
    };
    const login: IInputProps = {
      htmlType: 'input',
      label: 'Login',
      type: 'text',
      placeholder: 'ivanivanov',
      required: true,
      value: '',
      validation: LOGIN_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, login, errorInputs),
      clearError,
    };
    const firstName: IInputProps = {
      htmlType: 'input',
      label: 'First Name',
      type: 'text',
      placeholder: 'Ivan',
      required: true,
      value: '',
      validation: FIRST_NAME_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, firstName, errorInputs),
      clearError,
    };
    const lastName: IInputProps = {
      htmlType: 'input',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Ivanov',
      required: true,
      value: '',
      validation: LAST_NAME_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, lastName, errorInputs),
      clearError,
    };
    const phoneCode: IDropdownProps = {
      htmlType: 'select',
      label: 'Code',
      options: PHONE_COUNTRY_CODES,
      value: PHONE_COUNTRY_CODES[0],
      onChange: (e: Event) => saveAndTestValue(e, phoneCode, errorInputs),
    };
    const phoneNumber: IInputProps = {
      htmlType: 'input',
      label: 'Phone number',
      type: 'tel',
      placeholder: '(999) 123-45-67',
      required: true,
      value: '',
      validation: PHONE_NUMBER_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, phoneNumber, errorInputs),
      clearError,
    };
    const passwordCreate: IInputProps = {
      htmlType: 'input',
      label: 'Create Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      value: '',
      validation: PASSWORD_REGISTER_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, passwordCreate, errorInputs),
      clearError,
    };
    const passwordConfirm: IInputProps = {
      htmlType: 'input',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      value: '',
      validation: PASSWORD_REGISTER_VALIDATION,
      onChange: (e: Event) => saveAndTestValue(e, passwordConfirm, errorInputs),
      clearError,
    };
    const inputs: Array<
      IInputProps | IDropdownProps | Array<IInputProps | IDropdownProps>
    > = [
      email,
      login,
      firstName,
      lastName,
      [phoneCode, phoneNumber],
      passwordCreate,
      passwordConfirm,
    ];
    const buttons: Array<IButtonProps> = [
      { title: 'Sign up', type: 'primary', htmlType: 'submit' },
      { title: 'Sign in', type: 'secondary', htmlType: 'reset' },
    ];
    const onSubmit = (e: Event) => {
      e.preventDefault();
      console.log(
        'state',
        this.state,
        passwordCreate.value === passwordConfirm.value,
        errorInputs
      );
      if (errorInputs.size === 0) {
        if (passwordCreate.value !== passwordConfirm.value) {
          this.setState(() => ({
            isValid: false,
            errorText: `'${passwordCreate.label}' and '${passwordConfirm.label}' must be equal`,
          }));
          console.log('state error', this.state);
        } else {
          // TODO: send request, check response
          navigate(ROUTES.chat.path);
        }
        // TODO: set invalid state on error
        // this.setState(() => ({ isValid: false }));
      }
    };
    const onReset = () => navigate(ROUTES.login.path);

    return MyCoolTemplate.createComponent(Form, {
      key: 'register-page',
      title: 'Sign up',
      inputs,
      buttons,
      submit: onSubmit,
      reset: onReset,
      errorText: !this.state.isValid
        ? this.state.errorText || 'Something went wrong...'
        : '',
    });
  }
}
