import { PageForm } from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { generateLoginPageFormInputs } from '../../utils/util-functions/form-inputs/login-page-inputs';
import {
  generateFormObject,
  validateFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../../components/input/input';
import { AuthService } from '../../services/api/auth-service';
import { Router } from '../../utils/router/router';

export class LoginPage extends PageForm {
  auth = new AuthService();

  constructor() {
    super();
    this.title = 'Sign in';
    this.state.inputs = generateLoginPageFormInputs(
      this.clearError.bind(this),
      this.updateInput.bind(this)
    );
    this.buttons = [
      { title: 'Enter', type: 'primary', htmlType: 'submit' },
      { title: 'Create account', type: 'secondary', htmlType: 'reset' },
    ];
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async submitForm(e: Event) {
    e.preventDefault();
    const formState = validateFormInputs(<Array<IInputProps>>this.state.inputs);
    if (formState.isValid) {
      const requestBody = generateFormObject(
        <Array<IInputProps>>this.state.inputs
      );
      console.log('Login', requestBody);
      try {
        const response = await this.auth.signIn(requestBody);
        console.log('Register response', response);
        Router.getInstance().go(ROUTES.chats.path);
      } catch (err) {
        this.setState(s => ({
          ...s,
          isValid: false,
          errorText: JSON.parse(err.data).reason,
        }));
      }
    } else {
      if (this.state.errorText !== formState.errorText) {
        this.setState(s => ({
          ...s,
          isValid: formState.isValid,
          errorText: formState.errorText,
        }));
      }
    }
  }

  resetForm() {
    Router.getInstance().go(ROUTES.register.path);
  }
}
