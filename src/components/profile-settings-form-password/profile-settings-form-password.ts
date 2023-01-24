import {
  PageFormEdit,
  TInputPropsWithRef,
} from '../../utils/base-components/page-form-edit';
import {
  generateChangePasswordProfileInputs,
  generateNewPasswordInputs,
} from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import {
  generateFormObject,
  isNewPasswordInput,
  isOldPasswordInput,
  validateChangePasswordFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../input/input';
import { Template } from '../../utils/template/template';
import { Modal, MODAL_ID } from '../modal/modal';

export class ProfileSettingsFormPassword extends PageFormEdit {
  displayError = false;

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
    if (this.state.inputs.length > 1) {
      const formInputs: Array<IInputProps> = this.state.inputs.map(
        input => input[0]
      );
      const formState = validateChangePasswordFormInputs(formInputs);
      if (formState.isValid) {
        // TODO send request, check response
        const oldPassword = formInputs.find(input => isOldPasswordInput(input));
        const newPassword = formInputs.find(input => isNewPasswordInput(input));
        const requestBody = generateFormObject([oldPassword, newPassword]);
        console.log('Change Password', requestBody);
        this.resetForm();
        Template.renderDom(
          MODAL_ID,
          Template.createComponent(Modal, {
            key: MODAL_ID,
            message: 'Password was changed',
            type: 'success',
          })
        );
      } else {
        if (this.state.errorText !== formState.errorText) {
          this.setState(() => ({
            inputs: this.displayError
              ? this.state.inputs
              : this.state.inputs.map(input => {
                  input[0].displayError = true;
                  return input;
                }),
            isValid: formState.isValid,
            errorText: formState.errorText,
          }));
        }
      }
    }
  }

  resetForm() {
    if (this.state.inputs.length > 1) {
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
}
