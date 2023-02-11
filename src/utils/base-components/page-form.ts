import { Block } from './block';
import { Form, IFormState } from '../../components/form/form';
import { IInputProps } from '../../components/input/input';
import { IButtonProps } from '../../components/button/button';
import { TVirtualDomNode } from '../template/template-types';
import { Template } from '../template/template';
import { DEFAULT_FORM_ERROR_MESSAGE } from '../const-variables/field-validation';
import { TProfileSettingsInput } from './page-form-edit';
import { IInputFileProps } from '../../components/input-file/input-file';
import { IPictureProps } from '../../components/picture/picture';
import { instanceOfIPictureProps } from '../../components/form-input-field/form-input-field';
import { AuthController } from '../../services/controllers/auth-controller';
import { UserController } from '../../services/controllers/user-controller';

export interface IPageState extends IFormState {
  errorText: string | null;
}

export interface IFormPageState extends IPageState {
  inputs: Array<
    IInputProps | TProfileSettingsInput | IInputFileProps | IPictureProps
  >;
}

export abstract class PageForm<P, S extends IFormPageState> extends Block<
  P,
  S
> {
  title: string;
  state: S;
  buttons: Array<IButtonProps>;
  authController: AuthController = new AuthController();
  userController: UserController = new UserController();

  protected constructor() {
    super();
    this.state = { ...this.state, isValid: true, errorText: null, inputs: [] };
  }

  public clearError() {
    if (!this.state.isValid) {
      this.setState(s => ({ ...s, isValid: true, errorText: null }));
    }
  }

  public updateInput(inputProp: IInputProps | IInputFileProps, value: string) {
    const input = this.state.inputs.find(input =>
      Array.isArray(input) ? input[0] === inputProp : input === inputProp
    );
    if (Array.isArray(input)) {
      input[0].value = value;
    } else if (!instanceOfIPictureProps(input)) {
      input.value = value;
    }
  }

  public abstract submitForm(e: Event);
  public abstract resetForm();

  public render(): TVirtualDomNode {
    return Template.createComponent(Form, {
      key: this.title,
      title: this.title,
      inputs: this.state.inputs,
      buttons: this.buttons,
      submit: this.submitForm,
      reset: this.resetForm,
      errorText: !this.state.isValid
        ? this.state.errorText || DEFAULT_FORM_ERROR_MESSAGE
        : '',
    });
  }
}
