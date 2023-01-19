import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { Template } from '../../utils/template/template';
import { Form } from '../../components/form/form';
import { IInputProps } from '../../components/input/input';
import { generateRegisterPageFormInputs } from '../../utils/util-functions/form-inputs/register-page-inputs';
import { IFormPageState } from '../login-page/login-page';
import { DEFAULT_FORM_ERROR_MESSAGE } from '../../utils/const-variables/field-validation';
import {
  generateFormObject,
  validateRegisterForm,
} from '../../utils/util-functions/form-inputs/form-inputs';

export class RegisterPage extends Block<null, IFormPageState> {
  state: IFormPageState = { isValid: true, errorText: null };
  inputs: Array<IInputProps>;
  buttons: Array<IButtonProps> = [
    { title: 'Sign up', type: 'primary', htmlType: 'submit' },
    { title: 'Sign in', type: 'secondary', htmlType: 'reset' },
  ];

  constructor() {
    super();
    this.inputs = generateRegisterPageFormInputs(this.clearError.bind(this));
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
    const formState = validateRegisterForm(this.inputs);
    if (formState.isValid) {
      const requestBody = generateFormObject(this.inputs);
      console.log('Register', requestBody);
      // TODO: send request, check login and password
      navigate(ROUTES.chats.path);
    } else {
      this.setState(() => formState);
    }
  }

  resetForm() {
    navigate(ROUTES.login.path);
  }

  render(): TVirtualDomNode {
    return Template.createComponent(Form, {
      key: 'register-page',
      title: 'Sign up',
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
