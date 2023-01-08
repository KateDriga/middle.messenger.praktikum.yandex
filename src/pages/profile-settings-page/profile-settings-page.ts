import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Form } from '../../components/form/form';
import { IInputProps } from '../../components/input/input';
import { saveAndTestValue } from '../../utils/const-variables/field-validation';
import {
  EMAIL_INPUT,
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  LOGIN_INPUT,
  PASSWORD_INPUT,
  PHONE_CODE_INPUT,
  PHONE_COUNTRY_CODES,
  PHONE_NUMBER_INPUT,
} from '../../utils/const-variables/field-inputs';
import { IIconProps } from '../../components/icon/icon';
import { USER } from '../../utils/fake-test-variables/fake-user';
import { IDropdownProps } from '../../components/dropdown/dropdown';
import {
  instanceOfIFormInputFieldProps,
  instanceOfIIconProps,
} from '../../components/form-input-field/form-input-field';
import { IButtonProps } from '../../components/button/button';

interface IState {
  isValid: boolean;
  inputs: Array<Array<IInputProps | IIconProps | IDropdownProps>>;
  errorInputs: Set<string>;
}

export class ProfileSettingsPage extends MyCoolComponent<null, IState> {
  state: IState = { isValid: true, inputs: [], errorInputs: new Set<string>() };

  constructor() {
    super();
    this.clearError = this.clearError.bind(this);
    this.allowInputEdit = this.allowInputEdit.bind(this);
    this.generateInitInputFields = this.generateInitInputFields.bind(this);
    this.reset = this.reset.bind(this);
  }
  clearError() {
    if (!this.state.isValid) {
      this.setState(() => ({ ...this.state, isValid: true }));
    }
  }
  allowInputEdit(prop: IInputProps | IDropdownProps) {
    const updatedInputs = this.state.inputs.map(inputBlock =>
      inputBlock.map(input => {
        if (!instanceOfIIconProps(input) && input === prop) {
          input.disabled = false;
        }
        return input;
      })
    );
    this.setState(() => ({ ...this.state, inputs: updatedInputs }));
    if (instanceOfIFormInputFieldProps(prop)) {
      const element: HTMLElement = document.querySelector(
        `input[placeholder="${prop.placeholder}"][type="${prop.type}"]`
      );
      element.focus();
    }
  }
  generateInitInputFields(): Array<
    Array<IInputProps | IIconProps | IDropdownProps>
  > {
    // email
    const email: IInputProps = {
      ...EMAIL_INPUT,
      value: USER.email,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, email, this.state.errorInputs),
      clearError: this.clearError,
    };
    const emailEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => this.allowInputEdit(email),
    };
    // login
    const login: IInputProps = {
      ...LOGIN_INPUT,
      value: USER.login,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, login, this.state.errorInputs),
      clearError: this.clearError,
    };
    const loginEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => this.allowInputEdit(login),
    };
    // first name
    const firstName: IInputProps = {
      ...FIRST_NAME_INPUT,
      value: USER.firstName,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, firstName, this.state.errorInputs),
      clearError: this.clearError,
    };
    const firstNameEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => this.allowInputEdit(firstName),
    };
    // last name
    const lastName: IInputProps = {
      ...LAST_NAME_INPUT,
      value: USER.lastName,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, lastName, this.state.errorInputs),
      clearError: this.clearError,
    };
    const lastNameEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => this.allowInputEdit(lastName),
    };
    // chat name
    const chatName: IInputProps = {
      ...FIRST_NAME_INPUT,
      label: 'Chat Name',
      placeholder: 'Ivan Mega',
      value: USER.chatName,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, chatName, this.state.errorInputs),
      clearError: this.clearError,
    };
    const chatNameEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => this.allowInputEdit(chatName),
    };
    // phone number
    const phoneCode: IDropdownProps = {
      ...PHONE_CODE_INPUT,
      value: PHONE_COUNTRY_CODES[0],
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, phoneCode, this.state.errorInputs),
    };
    const phoneNumber: IInputProps = {
      ...PHONE_NUMBER_INPUT,
      value: '(999) 123-4567',
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, phoneNumber, this.state.errorInputs),
      clearError: this.clearError,
    };
    const phoneNumberEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => {
        this.allowInputEdit(phoneCode);
        this.allowInputEdit(phoneNumber);
      },
    };
    // password
    const password: IInputProps = {
      ...PASSWORD_INPUT,
      value: '',
      disabled: true,
      required: false,
      onChange: (e: Event) =>
        saveAndTestValue(e, password, this.state.errorInputs),
      clearError: this.clearError,
    };
    const passwordEdit: IIconProps = {
      imageName: 'edit',
      onClick: (_: Event) => {
        passwordEdit.onClick = null;
        const confirmPassword: IInputProps = {
          ...PASSWORD_INPUT,
          label: 'Confirm Password',
          value: '',
          disabled: true,
          onChange: (e: Event) =>
            saveAndTestValue(e, password, this.state.errorInputs),
          clearError: this.clearError,
        };
        this.setState(() => ({
          ...this.state,
          inputs: [...this.state.inputs, [confirmPassword]],
        }));
        this.allowInputEdit(password);
      },
    };

    return [
      [email, emailEdit],
      [login, loginEdit],
      [firstName, firstNameEdit],
      [lastName, lastNameEdit],
      [chatName, chatNameEdit],
      [phoneCode, phoneNumber, phoneNumberEdit],
      [password, passwordEdit],
    ];
  }

  initProps(props: null): TVirtualDomNode {
    this.state.inputs = this.generateInitInputFields();
    return super.initProps(props);
  }

  reset() {
    this.setState(() => ({
      ...this.state,
      inputs: this.generateInitInputFields(),
    }));
  }

  render(): TVirtualDomNode {
    const buttons: Array<IButtonProps> = [
      { title: 'Save Changes', type: 'primary', htmlType: 'submit' },
      { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
    ];
    return MyCoolTemplate.createComponent(Form, {
      key: 'settings-page',
      title: 'Profile Settings',
      inputs: this.state.inputs,
      buttons,
      // TODO add submit function
      submit: e => {
        e.preventDefault();
        console.log('submit');
      },
      reset: this.reset,
      errorText: !this.state.isValid ? 'Something went wrong...' : '',
    });
  }
}
