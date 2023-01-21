import {
  PageFormEdit,
  TInputPropsWithRef,
} from '../../utils/base-components/page-form-edit';
import {
  generateChangePasswordProfileInputs,
  generateNewPasswordInputs,
} from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import {
  checkNewPasswordsState,
  generateFormObject,
  isNewPasswordInput,
  isOldPasswordInput,
  validateFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../input/input';

export class ProfileSettingsFormPassword extends PageFormEdit {
  constructor() {
    super();
    this.title = 'Change Password';
    this._bindMethods();
    this.state.inputs = generateChangePasswordProfileInputs(
      this.clearError,
      this.updateInput,
      this.addNewPasswordInputs
    );
    this.buttons = [
      { title: 'Change Password', type: 'primary', htmlType: 'submit' },
      { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
    ];
  }

  private _bindMethods() {
    this.clearError = this.clearError.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.addNewPasswordInputs = this.addNewPasswordInputs.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  addNewPasswordInputs(input: TInputPropsWithRef) {
    const newPasswordInputs = generateNewPasswordInputs(
      this.updateInput,
      this.clearError
    );
    this.state.inputs.push(...newPasswordInputs);
    this.allowInputEdit(input);
  }

  submitForm(e: Event) {
    e.preventDefault();
    const formInputs: Array<IInputProps> = this.state.inputs.map(
      input => input[0]
    );
    const inputsValidityState = validateFormInputs(formInputs);
    const formState = inputsValidityState.isValid
      ? checkNewPasswordsState(formInputs)
      : inputsValidityState;
    if (formState.isValid) {
      // TODO send request, check response
      const oldPassword = formInputs.find(input => isOldPasswordInput(input));
      const newPassword = formInputs.find(input => isNewPasswordInput(input));
      const requestBody = generateFormObject([oldPassword, newPassword]);
      console.log('Change Password', requestBody);
      this.resetForm();
    } else {
      this.setState(s => ({
        ...s,
        isValid: formState.isValid,
        errorText: formState.errorText,
      }));
    }
  }

  resetForm() {
    this.setState(() => ({
      isValid: true,
      errorText: null,
      inputs: generateChangePasswordProfileInputs(
        this.clearError,
        this.updateInput,
        this.addNewPasswordInputs
      ),
    }));
  }
}
