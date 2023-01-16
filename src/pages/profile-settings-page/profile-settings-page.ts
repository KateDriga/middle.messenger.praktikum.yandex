import * as styles from './profile-settings-page.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ProfileSettingsForm } from '../../components/profile-settings-form/profile-settings-form';
import { ProfileSettingsFormAvatar } from '../../components/profile-settings-form-avatar/profile-settings-form-avatar';

export class ProfileSettingsPage extends MyCoolComponent<null, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'settings',
        class: styles.profile_settings,
      },
      MyCoolTemplate.createComponent(ProfileSettingsForm, {
        key: 'profile-settings-form',
      }),
      MyCoolTemplate.createComponent(ProfileSettingsFormAvatar, {
        key: 'profile-other-settings-form',
      })
    );
  }
}
