import { PageForm } from '../../utils/base-components/page-form';
import { ROUTES } from '../../utils/const-variables/pages';
import { navigate } from '../../utils/util-functions/router';
import { IInputFileProps } from '../input-file/input-file';
import { generateChangeAvatarProfileInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { Modal, MODAL_ID } from '../modal/modal';
import { Template } from '../../utils/template/template';

export class ProfileSettingsFormAvatar extends PageForm {
  constructor() {
    super();
    this.title = 'Avatar Settings';
    this._bindMethods();
    this.state.inputs = generateChangeAvatarProfileInputs(this.updateInput);
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

  submitForm(e: Event) {
    e.preventDefault();
    if ((<IInputFileProps>this.state.inputs[1]).value !== '') {
      const avatar = (<HTMLInputElement>(
        (<IInputFileProps>this.state.inputs[1]).ref.current
      )).files[0];
      // TODO: send change avatar request, check status, display modal
      console.log('Avatar Settings', avatar);
      (
        (<IInputFileProps>this.state.inputs[1]).ref.current as HTMLInputElement
      ).value = '';
      const updatedInputs = generateChangeAvatarProfileInputs(this.updateInput);
      (<IInputFileProps>updatedInputs[1]).ref = (<IInputFileProps>(
        this.state.inputs[1]
      )).ref;
      this.setState(() => ({
        isValid: true,
        errorText: null,
        inputs: updatedInputs,
      }));
      Template.renderDom(
        MODAL_ID,
        Template.createComponent(Modal, {
          key: MODAL_ID,
          message: "You've set a new avatar profile image",
          type: 'success',
        })
      );
    }
  }

  resetForm() {
    navigate(ROUTES.login.path);
  }
}
