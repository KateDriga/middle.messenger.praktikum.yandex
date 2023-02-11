import {
  IFormPageState,
  PageForm,
} from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { generateRegisterPageFormInputs } from '../../utils/util-functions/form-inputs/register-page-inputs';
import { IInputProps } from '../../components/input/input';
import { Router } from '../../utils/router/router';

export class RegisterPage extends PageForm<null, IFormPageState> {
  constructor() {
    super();
    this.title = 'Sign up';
    this.state.inputs = generateRegisterPageFormInputs(
      this.clearError.bind(this),
      this.updateInput.bind(this)
    );
    this.buttons = [
      { title: 'Sign up', type: 'primary', htmlType: 'submit' },
      { title: 'Sign in', type: 'secondary', htmlType: 'reset' },
    ];
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async submitForm(e: Event) {
    e.preventDefault();
    const response = await this.authController.signUp(
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
    Router.getInstance().go(ROUTES.login.path);
  }
}
