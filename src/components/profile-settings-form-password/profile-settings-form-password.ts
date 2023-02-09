import {
  PageFormEdit,
  TInputPropsWithRef,
} from '../../utils/base-components/page-form-edit';
import {
  generateChangePasswordProfileInputs,
  generateNewPasswordInputs,
} from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { IFormPageState } from '../../utils/base-components/page-form';

export class ProfileSettingsFormPassword extends PageFormEdit<IFormPageState> {
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

  async submitForm(e: Event) {
    e.preventDefault();
    if (this.state.inputs.length > 1) {
      const response = await this.userController.changePassword(
        this.state.inputs.map(input => input[0])
      );
      if (!response) {
        this.resetForm();
      } else if (this.state.errorText !== response.errorText) {
        this.setState(() => ({
          inputs: this.state.inputs.map(input => {
            input[0].displayError = true;
            return input;
          }),
          isValid: response.isValid,
          errorText: response.errorText,
        }));
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
