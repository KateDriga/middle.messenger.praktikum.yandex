import { Template } from '../../utils/template/template';
import { Block } from '../../utils/block/block';
import { IInputProps, InputNameTypes } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import {
  instanceOfIDropdownProps,
  instanceOfIPictureProps,
} from '../form-input-field/form-input-field';
import { IPictureProps } from '../picture/picture';
import { USER } from '../../utils/fake-test-variables/fake-user';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { IButtonProps } from '../button/button';
import { Form } from '../form/form';
import {
  generateConfirmPasswordInput,
  generateProfileSettingsInputs,
} from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { IRegisterPageState } from '../../pages/register-page/register-page';

export type TInputPropsWithRef = IInputProps & { ref: IRef };

export interface IProfileSettingsInput {
  key: InputNameTypes;
  value: Array<TInputPropsWithRef | IPictureProps | IDropdownProps>;
}

interface IState extends IRegisterPageState {
  inputs: Array<IProfileSettingsInput>;
}

export class ProfileSettingsForm extends Block<null, IState> {
  state: IState = {
    isValid: true,
    errorText: null,
    inputs: [],
  };
  errorInputs = new Set<string>();
  buttons: Array<IButtonProps> = [
    { title: 'Save Changes', type: 'primary', htmlType: 'submit' },
    { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
  ];

  constructor() {
    super();
    this.clearError = this.clearError.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.allowInputEdit = this.allowInputEdit.bind(this);
    this.addConfirmPasswordInput = this.addConfirmPasswordInput.bind(this);
    this.reset = this.reset.bind(this);
    this.state.inputs = generateProfileSettingsInputs(
      this.errorInputs,
      this.clearError,
      this.allowInputEdit,
      this.focusInput,
      this.addConfirmPasswordInput,
      USER
    );
  }

  clearError() {
    if (!this.state.isValid) {
      this.setState(() => ({ ...this.state, isValid: true, errorText: null }));
    }
  }

  focusInput(prop: TInputPropsWithRef) {
    console.log('focusInput', prop);
    const input = prop.ref.current as HTMLInputElement;
    input.focus();
    // input type 'email' does not support selection
    if (input.type !== 'email') {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }

  allowInputEdit(inputKey: InputNameTypes) {
    const updatedInputs = this.state.inputs.map(inputBlock => {
      if (inputBlock.key === inputKey) {
        inputBlock.value.map(input => {
          if (!instanceOfIPictureProps(input)) {
            input.disabled = false;
            if (!instanceOfIDropdownProps(input)) {
              this.focusInput(input);
            }
          }
          return input;
        });
      }
      return inputBlock;
    });
    this.setState(() => ({ ...this.state, inputs: updatedInputs }));
  }

  addConfirmPasswordInput() {
    const confirmPassword = generateConfirmPasswordInput(
      this.errorInputs,
      this.clearError
    );
    this.setState(() => ({
      ...this.state,
      inputs: [...this.state.inputs, confirmPassword],
    }));
  }

  reset() {
    this.setState(() => ({
      ...this.state,
      inputs: generateProfileSettingsInputs(
        this.errorInputs,
        this.clearError,
        this.allowInputEdit,
        this.focusInput,
        this.addConfirmPasswordInput,
        USER
      ),
    }));
  }

  render(): TVirtualDomNode {
    const inputs = this.state.inputs.map(input => input.value);
    return Template.createComponent(Form, {
      key: 'settings-page-profile',
      title: 'Profile Settings',
      inputs,
      buttons: this.buttons,
      // TODO add submit function
      submit: e => {
        e.preventDefault();
      },
      reset: this.reset,
      errorText: !this.state.isValid ? 'Something went wrong...' : '',
    });
  }
}
