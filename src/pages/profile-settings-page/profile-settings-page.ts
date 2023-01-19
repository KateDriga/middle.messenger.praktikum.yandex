import * as styles from './profile-settings-page.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ProfileSettingsForm } from '../../components/profile-settings-form/profile-settings-form';
import { ProfileSettingsFormAvatar } from '../../components/profile-settings-form-avatar/profile-settings-form-avatar';

export class ProfileSettingsPage extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'settings',
        class: styles.profile_settings,
      },
      Template.createComponent(ProfileSettingsForm, {
        key: 'profile-settings-form',
      }),
      Template.createComponent(ProfileSettingsFormAvatar, {
        key: 'profile-other-settings-form',
      })
    );
  }
}
