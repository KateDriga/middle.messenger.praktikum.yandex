import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { IInputProps } from '../input/input';
import { IDropdownProps } from '../dropdown/dropdown';
import {
  instanceOfIFormInputFieldProps,
  instanceOfIPictureProps,
} from '../form-input-field/form-input-field';
import { IPictureProps } from '../picture/picture';
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
import { USER } from '../../utils/fake-test-variables/fake-user';
import { saveAndTestValue } from '../../utils/const-variables/field-validation';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { IButtonProps } from '../button/button';
import { Form } from '../form/form';

interface IState {
  isValid: boolean;
  inputs: Array<Array<IInputProps | IPictureProps | IDropdownProps>>;
  errorInputs: Set<string>;
}

const editIconStyle = 'margin-top: 20px';

export class ProfileSettingsForm extends MyCoolComponent<null, IState> {
  state: IState = {
    isValid: true,
    inputs: [],
    errorInputs: new Set<string>(),
  };

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
        if (!instanceOfIPictureProps(input) && input === prop) {
          input.disabled = false;
        }
        return input;
      })
    );
    this.setState(() => ({ ...this.state, inputs: updatedInputs }));
    if (instanceOfIFormInputFieldProps(prop)) {
      const input: HTMLInputElement = document.querySelector(
        `input[placeholder="${prop.placeholder}"][type="${prop.type}"]`
      );
      input.focus();
      // The input element's type ('email') does not support selection
      if (input.type !== 'email') {
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }
    }
  }
  generateInitInputFields(): Array<
    Array<IInputProps | IPictureProps | IDropdownProps>
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
    const emailEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => this.allowInputEdit(email),
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
    const loginEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => this.allowInputEdit(login),
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
    const firstNameEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => this.allowInputEdit(firstName),
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
    const lastNameEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => this.allowInputEdit(lastName),
    };
    // chat name
    const chatName: IInputProps = {
      ...FIRST_NAME_INPUT,
      label: 'Chat Name',
      placeholder: 'Ivan Mega',
      name: 'display_name',
      value: USER.chatName,
      disabled: true,
      onChange: (e: Event) =>
        saveAndTestValue(e, chatName, this.state.errorInputs),
      clearError: this.clearError,
    };
    const chatNameEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => this.allowInputEdit(chatName),
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
    const phoneNumberEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => {
        this.allowInputEdit(phoneCode);
        this.allowInputEdit(phoneNumber);
      },
    };
    // password
    const password: IInputProps = {
      ...PASSWORD_INPUT,
      value: '',
      name: 'oldPassword',
      disabled: true,
      required: false,
      onChange: (e: Event) =>
        saveAndTestValue(e, password, this.state.errorInputs),
      clearError: this.clearError,
    };
    const passwordEdit: IPictureProps = {
      picName: 'edit',
      type: 'icon',
      style: editIconStyle,
      onClick: () => {
        passwordEdit.onClick = null;
        const confirmPassword: IInputProps = {
          ...PASSWORD_INPUT,
          label: 'Confirm Password',
          value: '',
          name: 'newPassword',
          disabled: false,
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
      key: 'settings-page-profile',
      title: 'Profile Settings',
      inputs: this.state.inputs,
      buttons,
      // TODO add submit function
      submit: e => {
        e.preventDefault();
      },
      reset: this.reset,
      errorText: !this.state.isValid ? 'Something went wrong...' : '',
    });
  }
}
