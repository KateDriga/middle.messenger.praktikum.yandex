import { PageFormEdit } from '../../utils/base-components/page-form-edit';
import { generateProfileSettingsInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { InputNameTypes } from '../input/input';
import { IFormPageState } from '../../utils/base-components/page-form';
import { IMapStateFromStore } from '../../utils/store/connect';
import { IUserStateFromStore } from './profile-settings-form-wrapper';

export type TUser = {
  [key in InputNameTypes as string]: string;
};

interface IState
  extends IMapStateFromStore<IUserStateFromStore>,
    IFormPageState {}

export class ProfileSettingsForm extends PageFormEdit<null, IState> {
  constructor() {
    super();
    this.title = 'Profile Settings';
    this._bindMethods();
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

  initProps(props: null): null {
    this.state.inputs = generateProfileSettingsInputs(
      this.clearError,
      this.updateInput,
      this.allowInputEdit,
      this.state.stateFromStore.user
    );
    return super.initProps(props);
  }

  async submitForm(e: Event) {
    e.preventDefault();
    const response = await this.userController.changeProfileSettings(
      this.state.inputs.map(input => input[0])
    );
    if (response && this.state.errorText !== response.errorText) {
      this.setState(s => ({
        ...s,
        isValid: response.isValid,
        errorText: response.errorText,
      }));
    }
  }

  resetForm() {
    this.setState(s => ({
      ...s,
      isValid: true,
      errorText: null,
      inputs: generateProfileSettingsInputs(
        this.clearError,
        this.updateInput,
        this.allowInputEdit,
        this.state.stateFromStore.user
      ),
    }));
  }
}
