import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IButtonProps } from '../../components/button/button';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { Template } from '../../utils/template/template';
import { Form, IFormState } from '../../components/form/form';
import { IInputProps, InputNameTypes } from '../../components/input/input';
import { IDropdownProps } from '../../components/dropdown/dropdown';
import { generateRegisterPageFormInputs } from '../../utils/util-functions/form-inputs/register-page-inputs';

export interface IRegisterPageState extends IFormState {
  errorText: string | null;
}

export class RegisterPage extends Block<null, IRegisterPageState> {
  state: IRegisterPageState = { isValid: true, errorText: null };
  inputs: Array<IInputProps | Array<IInputProps | IDropdownProps>>;
  errorInputs = new Set<string>();
  buttons: Array<IButtonProps> = [
    { title: 'Sign up', type: 'primary', htmlType: 'submit' },
    { title: 'Sign in', type: 'secondary', htmlType: 'reset' },
  ];

  constructor() {
    super();
    this.inputs = generateRegisterPageFormInputs(
      this.errorInputs,
      this.clearError.bind(this)
    );
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
    if (this.errorInputs.size === 0) {
      const passwords = this.inputs.filter(
        input => !Array.isArray(input) && input.name === InputNameTypes.PASSWORD
      ) as Array<IInputProps>;
      if (new Set(passwords.map(pass => pass.value)).size !== 1) {
        this.setState(() => ({
          isValid: false,
          errorText: "Passwords don't match",
        }));
      } else {
        // TODO: send request, check response
        navigate(ROUTES.chats.path);
      }
      // TODO: set invalid state on error
      // this.setState(() => ({ isValid: false }));
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
        ? this.state.errorText || 'Something went wrong...'
        : '',
    });
  }
}
