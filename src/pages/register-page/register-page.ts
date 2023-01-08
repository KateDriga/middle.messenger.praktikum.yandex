import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { saveAndTestValue } from '../../utils/const-variables/field-validation';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Form, IFormState } from '../../components/form/form';
import { IInputProps } from '../../components/input/input';
import { IDropdownProps } from '../../components/dropdown/dropdown';
import {
  EMAIL_INPUT,
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  LOGIN_INPUT,
  PASSWORD_INPUT,
  PHONE_CODE_INPUT,
  PHONE_COUNTRY_CODES,
  PHONE_NUMBER_INPUT,
} from '../../utils/const-variables/field-inputs';

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
      ...EMAIL_INPUT,
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, email, errorInputs),
      clearError,
    };
    const login: IInputProps = {
      ...LOGIN_INPUT,
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, login, errorInputs),
      clearError,
    };
    const firstName: IInputProps = {
      ...FIRST_NAME_INPUT,
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, firstName, errorInputs),
      clearError,
    };
    const lastName: IInputProps = {
      ...LAST_NAME_INPUT,
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, lastName, errorInputs),
      clearError,
    };
    const phoneCode: IDropdownProps = {
      ...PHONE_CODE_INPUT,
      value: PHONE_COUNTRY_CODES[0],
      onChange: (e: Event) => saveAndTestValue(e, phoneCode, errorInputs),
    };
    const phoneNumber: IInputProps = {
      ...PHONE_NUMBER_INPUT,
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, phoneNumber, errorInputs),
      clearError,
    };
    const passwordCreate: IInputProps = {
      ...PASSWORD_INPUT,
      label: 'Create Password',
      value: '',
      onChange: (e: Event) => saveAndTestValue(e, passwordCreate, errorInputs),
      clearError,
    };
    const passwordConfirm: IInputProps = {
      ...PASSWORD_INPUT,
      label: 'Confirm Password',
      value: '',
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
      if (errorInputs.size === 0) {
        if (passwordCreate.value !== passwordConfirm.value) {
          this.setState(() => ({
            isValid: false,
            errorText: `'${passwordCreate.label}' and '${passwordConfirm.label}' must be equal`,
          }));
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
