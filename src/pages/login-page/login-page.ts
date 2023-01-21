import { PageForm } from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { navigate } from '../../utils/util-functions/router';
import { generateLoginPageFormInputs } from '../../utils/util-functions/form-inputs/login-page-inputs';
import {
  generateFormObject,
  validateFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../../components/input/input';

export class LoginPage extends PageForm {
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

  submitForm(e: Event) {
    e.preventDefault();
    const formState = validateFormInputs(<Array<IInputProps>>this.state.inputs);
    if (formState.isValid) {
      const requestBody = generateFormObject(
        <Array<IInputProps>>this.state.inputs
      );
      console.log('Login', requestBody);
      // TODO: send request, check login and password
      navigate(ROUTES.chats.path);
    } else {
      this.setState(s => ({
        ...s,
        isValid: formState.isValid,
        errorText: formState.errorText,
      }));
    }
  }

  resetForm() {
    navigate(ROUTES.register.path);
  }
}
