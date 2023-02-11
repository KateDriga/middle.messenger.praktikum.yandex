import * as styles from './profile-settings-page.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ProfileSettingsFormPassword } from '../../components/profile-settings-form-password/profile-settings-form-password';
import { Router } from '../../utils/router/router';
import { ROUTES } from '../../utils/const-variables/pages';
import { ProfileSettingsFormAvatarWrapper } from '../../components/profile-settings-form-avatar/profile-settings-form-avatar-wrapper';
import { ProfileSettingsFormWrapper } from '../../components/profile-settings-form/profile-settings-form-wrapper';

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
        Template.createComponent(ProfileSettingsFormAvatarWrapper, {
          key: 'profile-other-settings-form',
        }),
        Template.createComponent(ProfileSettingsFormPassword, {
          key: 'profile-other-settings-form',
        })
      ),
      Template.createElement(
        'section',
        { key: 'settings-section-2', class: styles.profile_settings_section },
        Template.createComponent(ProfileSettingsFormWrapper, {
          key: 'profile-settings-form',
        }),
        Template.createElement(
          'h3',
          {
            key: 'redirect',
            class: styles.redirect,
            onClick: () => Router.getInstance().go(ROUTES.chats.path),
          },
          Template.createTextElement('Back to Chats')
        )
      )
    );
  }
}
