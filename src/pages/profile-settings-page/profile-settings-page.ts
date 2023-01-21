import * as styles from './profile-settings-page.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ProfileSettingsForm } from '../../components/profile-settings-form/profile-settings-form';
import { ProfileSettingsFormAvatar } from '../../components/profile-settings-form-avatar/profile-settings-form-avatar';
import { ProfileSettingsFormPassword } from '../../components/profile-settings-form-password/profile-settings-form-password';

export class ProfileSettingsPage extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      {
        key: 'settings',
        class: styles.profile_settings,
      },
      Template.createElement(
        'section',
        { key: 'settings-section-1', class: styles.profile_settings_section },
        Template.createComponent(ProfileSettingsFormAvatar, {
          key: 'profile-other-settings-form',
        }),
        Template.createComponent(ProfileSettingsFormPassword, {
          key: 'profile-other-settings-form',
        })
      ),
      Template.createElement(
        'section',
        { key: 'settings-section-2', class: styles.profile_settings_section },
        Template.createComponent(ProfileSettingsForm, {
          key: 'profile-settings-form',
        })
      )
    );
  }
}
