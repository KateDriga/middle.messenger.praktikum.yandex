import { PageFormEdit } from '../../utils/base-components/page-form-edit';
import { generateProfileSettingsInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { InputNameTypes } from '../input/input';
import { IFormPageState } from '../../utils/base-components/page-form';

export type TUser = {
  [key in InputNameTypes as string]: string;
};

export interface ISettingsProps {
  user: TUser;
}

export class ProfileSettingsForm extends PageFormEdit<
  ISettingsProps,
  IFormPageState
> {
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

  initProps(props: ISettingsProps): ISettingsProps {
    this.state.inputs = generateProfileSettingsInputs(
      this.clearError,
      this.updateInput,
      this.allowInputEdit,
      props.user
    );
    return super.initProps(props);
  }

  componentWillReceiveProps(
    props: ISettingsProps,
    state: IFormPageState
  ): IFormPageState {
    this.state.inputs = generateProfileSettingsInputs(
      this.clearError,
      this.updateInput,
      this.allowInputEdit,
      props.user
    );
    return super.componentWillReceiveProps(props, state);
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
        this.props.user
      ),
    }));
  }
}
