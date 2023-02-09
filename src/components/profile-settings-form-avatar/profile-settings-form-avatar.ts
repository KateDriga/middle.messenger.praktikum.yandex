import {
  IFormPageState,
  PageForm,
} from '../../utils/base-components/page-form';
import { IInputFileProps } from '../input-file/input-file';
import { generateChangeAvatarProfileInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { TIndexed } from '../../utils/util-functions/set';
import { connect } from '../../utils/store/connect';

interface IMapState {
  avatar: string;
}

interface IState extends IFormPageState {
  stateFromStore: IMapState;
}

class ProfileSettingsFormAvatarClass extends PageForm<IState> {
  constructor() {
    super();
    this.title = 'Avatar Settings';
    this._bindMethods();
    this.buttons = [
      { title: 'Save new Avatar', type: 'primary', htmlType: 'submit' },
      { title: 'Logout', type: 'secondary', htmlType: 'reset' },
    ];
  }

  private _bindMethods() {
    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  initProps(props: null): null {
    this.state.inputs = generateChangeAvatarProfileInputs(
      this.state.stateFromStore.avatar,
      this.updateInput
    );
    return super.initProps(props);
  }

  async submitForm(e: Event) {
    e.preventDefault();
    if ((<IInputFileProps>this.state.inputs[1]).value !== '') {
      const avatar = (<IInputFileProps>this.state.inputs[1]).ref.current;
      const response = await this.userController.changeAvatar(
        (<HTMLInputElement>avatar).files[0]
      );
      if (!response) {
        (<HTMLInputElement>avatar).value = '';
        const updatedInputs = generateChangeAvatarProfileInputs(
          this.state.stateFromStore.avatar,
          this.updateInput
        );
        (<IInputFileProps>updatedInputs[1]).ref = (<IInputFileProps>(
          this.state.inputs[1]
        )).ref;
        this.setState(s => ({
          ...s,
          isValid: true,
          errorText: null,
          inputs: updatedInputs,
        }));
      } else if (this.state.errorText !== response.errorText) {
        this.setState(s => ({
          ...s,
          isValid: response.isValid,
          errorText: response.errorText,
        }));
      }
    }
  }

  async resetForm() {
    await this.authController.logOut();
  }
}

function mapAvatarState(state: TIndexed): IMapState {
  return {
    avatar: state.user?.avatar,
  };
}

export const ProfileSettingsFormAvatar = connect<IMapState, null, IState>(
  ProfileSettingsFormAvatarClass,
  mapAvatarState
);
