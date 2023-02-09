import {
  IFormPageState,
  PageForm,
} from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { generateLoginPageFormInputs } from '../../utils/util-functions/form-inputs/login-page-inputs';
import { IInputProps } from '../../components/input/input';
import { Router } from '../../utils/router/router';

export class LoginPage extends PageForm<IFormPageState> {
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
    const response = await this.authController.signIn(
      <Array<IInputProps>>this.state.inputs
    );
    if (response && this.state.errorText !== response.errorText) {
      this.setState(s => ({
        ...s,
        isValid: response.isValid,
        errorText: response.errorText,
      }));
    }
  }

  resetForm() {
    Router.getInstance().go(ROUTES.register.path);
  }
}
