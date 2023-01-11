import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IButtonProps } from '../button/button';
import { IInputFileProps } from '../input-file/input-file';
import { Form } from '../form/form';
import { IPictureProps } from '../picture/picture';

interface IState {
  isValid: boolean;
  inputs: Array<IInputFileProps | IPictureProps>;
  errorInputs: Set<string>;
}

export class ProfileSettingsFormAvatar extends MyCoolComponent<null, IState> {
  state: IState = {
    isValid: true,
    inputs: [
      { picName: 'avatar', type: 'image' },
      { label: 'Change Avatar', value: '', style: 'text-align: center;' },
    ],
    errorInputs: new Set<string>(),
  };

  constructor() {
    super();
    this.clearError = this.clearError.bind(this);
    this.reset = this.reset.bind(this);
  }
  clearError() {
    if (!this.state.isValid) {
      this.setState(() => ({ ...this.state, isValid: true }));
    }
  }

  reset() {
    // TODO: logout
  }

  render(): TVirtualDomNode {
    const buttons: Array<IButtonProps> = [
      { title: 'Save new Avatar', type: 'primary', htmlType: 'submit' },
      { title: 'Logout', type: 'secondary', htmlType: 'reset' },
    ];
    return MyCoolTemplate.createComponent(Form, {
      key: 'settings-page-avatar',
      title: 'Other Settings',
      inputs: this.state.inputs,
      buttons,
      // TODO add change avatar function
      submit: e => {
        e.preventDefault();
      },
      reset: this.reset,
      errorText: !this.state.isValid ? 'Something went wrong...' : '',
    });
  }
}
