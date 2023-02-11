import {
  IFormPageState,
  PageForm,
} from '../../utils/base-components/page-form';
import { IInputFileProps } from '../input-file/input-file';
import { generateChangeAvatarProfileInputs } from '../../utils/util-functions/form-inputs/profile-settings-inputs';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export interface IChangeAvatarProps {
  avatar: string;
}

export class ProfileSettingsFormAvatar extends PageForm<
  IChangeAvatarProps,
  IFormPageState
> {
  ref: IRef = Template.createRef();

  constructor() {
    super();
    this._bindMethods();
    this.title = 'Avatar Settings';
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

  async submitForm(e: Event) {
    e.preventDefault();
    if ((<IInputFileProps>this.state.inputs[1]).value !== '') {
      const avatar = (<IInputFileProps>this.state.inputs[1]).ref.current;
      const response = await this.userController.changeAvatar(
        (<HTMLInputElement>avatar).files[0]
      );
      if (!response) {
        (<HTMLInputElement>avatar).value = '';
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

  render(): TVirtualDomNode {
    this.state.inputs = generateChangeAvatarProfileInputs(
      this.props.avatar,
      this.updateInput,
      this.ref
    );
    return super.render();
  }
}
