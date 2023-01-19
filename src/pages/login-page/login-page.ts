import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Form, IFormState } from '../../components/form/form';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { IInputProps } from '../../components/input/input';
import { generateLoginPageFormInputs } from '../../utils/util-functions/form-inputs/login-page-inputs';

export class LoginPage extends Block<null, IFormState> {
  state: IFormState = { isValid: true };
  inputs: Array<IInputProps>;
  errorInputs = new Set<string>();
  buttons: Array<IButtonProps> = [
    { title: 'Enter', type: 'primary', htmlType: 'submit' },
    { title: 'Create account', type: 'secondary', htmlType: 'reset' },
  ];

  constructor() {
    super();
    this.inputs = generateLoginPageFormInputs(
      this.errorInputs,
      this.clearError.bind(this)
    );
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  clearError() {
    if (!this.state.isValid) {
      this.setState(() => ({ isValid: true }));
    }
  }

  submitForm(e: Event) {
    e.preventDefault();
    if (this.errorInputs.size === 0) {
      // TODO: send request, check login and password
      navigate(ROUTES.chats.path);
      // TODO: set invalid state if login/password pair is not correct
      // this.setState(() => ({ isValid: false }));
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
      errorText: !this.state.isValid ? 'Invalid Login or Password' : '',
    });
  }
}
