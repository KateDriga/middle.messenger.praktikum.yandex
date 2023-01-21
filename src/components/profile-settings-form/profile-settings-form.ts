import { PageFormEdit } from '../../utils/base-components/page-form-edit';
import { generateProfileSettingsInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { USER } from '../../utils/fake-test-variables/fake-user';
import {
  generateFormObject,
  validateFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../input/input';

export class ProfileSettingsForm extends PageFormEdit {
  constructor() {
    super();
    this.title = 'Profile Settings';
    this._bindMethods();
    this.state.inputs = generateProfileSettingsInputs(
      this.clearError,
      this.updateInput,
      this.allowInputEdit,
      USER
    );
    this.buttons = [
      { title: 'Save Changes', type: 'primary', htmlType: 'submit' },
      { title: 'Cancel', type: 'secondary', htmlType: 'reset' },
    ];
  }

  private _bindMethods() {
    this.clearError = this.clearError.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.allowInputEdit = this.allowInputEdit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  submitForm(e: Event) {
    e.preventDefault();
    const formInputs: Array<IInputProps> = this.state.inputs.map(
      input => input[0]
    );
    const formState = validateFormInputs(formInputs);
    if (formState.isValid) {
      if (formInputs.some(input => input.value !== USER[input.name])) {
        // TODO send request, check response, update inputs
        const requestBody = generateFormObject(formInputs);
        console.log('Profile Settings', requestBody);
      }
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
      inputs: generateProfileSettingsInputs(
        this.clearError,
        this.updateInput,
        this.allowInputEdit,
        USER
      ),
    }));
  }
}
