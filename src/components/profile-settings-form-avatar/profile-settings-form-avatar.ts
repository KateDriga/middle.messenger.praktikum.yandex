import { PageForm } from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { navigate } from '../../utils/util-functions/router';
import { IInputFileProps } from '../input-file/input-file';
import { IInputProps } from '../input/input';
import { generateChangeAvatarProfileInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';

export class ProfileSettingsFormAvatar extends PageForm {
  constructor() {
    super();
    this.title = 'Avatar Settings';
    this.state.inputs = generateChangeAvatarProfileInputs(
      this.updateInput.bind(this)
    );
    this.buttons = [
      { title: 'Save new Avatar', type: 'primary', htmlType: 'submit' },
      { title: 'Logout', type: 'secondary', htmlType: 'reset' },
    ];
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  updateInput(inputProp: IInputProps, value: string) {
    super.updateInput(inputProp, value);
  }

  submitForm(e: Event) {
    e.preventDefault();
    if ((<IInputFileProps>this.state.inputs[1]).value !== '') {
      const avatar = (<HTMLInputElement>(
        (<IInputFileProps>this.state.inputs[1]).ref.current
      )).files[0];
      // TODO: send change avatar request
      console.log('Avatar Settings', avatar);
    }
  }

  resetForm() {
    navigate(ROUTES.login.path);
  }
}
