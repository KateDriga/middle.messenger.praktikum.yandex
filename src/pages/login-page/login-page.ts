import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Form, IFormState } from '../../components/form/form';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { IInputProps } from '../../components/input/input';
import { generateLoginPageFormInputs } from '../../utils/util-functions/form-inputs/login-page-inputs';
import { DEFAULT_FORM_ERROR_MESSAGE } from '../../utils/const-variables/field-validation';
import {
  generateFormObject,
  validateForm,
} from '../../utils/util-functions/form-inputs/form-inputs';

export interface IFormPageState extends IFormState {
  errorText: string | null;
}

export class LoginPage extends Block<null, IFormPageState> {
  state: IFormPageState = { isValid: true, errorText: null };
  inputs: Array<IInputProps>;
  buttons: Array<IButtonProps> = [
    { title: 'Enter', type: 'primary', htmlType: 'submit' },
    { title: 'Create account', type: 'secondary', htmlType: 'reset' },
  ];

  constructor() {
    super();
    this.inputs = generateLoginPageFormInputs(this.clearError.bind(this));
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  clearError() {
    if (!this.state.isValid) {
      this.setState(() => ({ isValid: true, errorText: null }));
    }
  }

  submitForm(e: Event) {
    e.preventDefault();
    const formState = validateForm(this.inputs);
    if (formState.isValid) {
      const requestBody = generateFormObject(this.inputs);
      console.log('Login', requestBody);
      // TODO: send request, check login and password
      navigate(ROUTES.chats.path);
    } else {
      this.setState(() => formState);
    }
  }

  resetForm() {
    navigate(ROUTES.register.path);
  }

  render(): TVirtualDomNode {
    return Template.createComponent(Form, {
      key: 'login-page',
      title: 'Sign in',
      inputs: this.inputs,
      buttons: this.buttons,
      submit: this.submitForm,
      reset: this.resetForm,
      errorText: !this.state.isValid
        ? this.state.errorText || DEFAULT_FORM_ERROR_MESSAGE
        : '',
    });
  }
}
