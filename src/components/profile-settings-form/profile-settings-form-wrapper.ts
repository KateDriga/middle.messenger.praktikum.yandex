import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ISettingsProps, ProfileSettingsForm } from './profile-settings-form';
import { TIndexed } from '../../utils/util-functions/set';
import { Template } from '../../utils/template/template';

export class ProfileSettingsFormClass extends Block<
  IMapStateFromStore<ISettingsProps>,
  null
> {
  render(): TVirtualDomNode {
    return Template.createComponent(ProfileSettingsForm, {
      key: 'change-profile',
      user: this.props.stateFromStore?.user,
    });
  }
}

function mapUserState(state: TIndexed): ISettingsProps {
  if (!state.user) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { avatar, ...user } = state.user;
  return {
    user,
  };
}

export const ProfileSettingsFormWrapper = connect(
  ProfileSettingsFormClass,
  mapUserState
);
