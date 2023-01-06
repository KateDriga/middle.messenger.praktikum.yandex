import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Form, IFormState } from '../../components/form/form';
import { IFormInputFieldProps } from '../../components/form-input-field/form-input-field';
import { IButtonProps } from '../../components/button/button';
import {
  LOGIN_VALIDATION,
  PASSWORD_VALIDATION,
} from '../../utils/const-variables/field-validation';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';

export class LoginPage extends MyCoolComponent<null, IFormState> {
  state: IFormState = { isValid: true };
  render(): TVirtualDomNode {
    const errorInputs = new Set<string>();
    const clearError = () => {
      if (!this.state.isValid) {
        this.setState(() => ({ isValid: true }));
      }
    };
    const login: IFormInputFieldProps = {
      label: 'Login',
      type: 'text',
      placeholder: 'Ivan Ivanov',
      required: true,
      value: '',
      validation: LOGIN_VALIDATION,
      checkError: (hasError: boolean) =>
        hasError ? errorInputs.add('login') : errorInputs.delete('login'),
      clearError,
    };
    login.required = false;
    const password: IFormInputFieldProps = {
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      value: '',
      validation: PASSWORD_VALIDATION,
      checkError: (hasError: boolean) =>
        hasError ? errorInputs.add('password') : errorInputs.delete('password'),
      clearError,
    };
    const inputs: Array<IFormInputFieldProps> = [login, password];
    const buttons: Array<IButtonProps> = [
      { title: 'Enter', type: 'primary', htmlType: 'submit' },
      { title: 'Create account', type: 'secondary', htmlType: 'reset' },
    ];
    const onSubmit = (e: Event) => {
      e.preventDefault();
      if (errorInputs.size === 0) {
        // TODO: send request, check login and password
        navigate(ROUTES.chat.path);
        // TODO: set invalid state if login/password pair is not correct
        // this.setState(() => ({ isValid: false }));
      }
    };
    const onReset = () => navigate(ROUTES.register.path);

    return MyCoolTemplate.createComponent(Form, {
      key: 'login-page',
      title: 'Sign in',
      inputs,
      buttons,
      submit: onSubmit,
      reset: onReset,
      errorText: !this.state.isValid ? 'Invalid Login or Password' : '',
    });
  }
}
