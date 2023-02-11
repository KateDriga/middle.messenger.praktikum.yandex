import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import {
  IChangeAvatarProps,
  ProfileSettingsFormAvatar,
} from './profile-settings-form-avatar';
import { TIndexed } from '../../utils/util-functions/set';
import { Template } from '../../utils/template/template';

class ProfileSettingsFormAvatarClass extends Block<
  IMapStateFromStore<IChangeAvatarProps>,
  null
> {
  render(): TVirtualDomNode {
    return Template.createComponent(ProfileSettingsFormAvatar, {
      key: 'change-avatar',
      avatar: this.props.stateFromStore.avatar,
    });
  }
}

function mapAvatarState(state: TIndexed): IChangeAvatarProps {
  return {
    avatar: state.user?.avatar,
  };
}

export const ProfileSettingsFormAvatarWrapper = connect(
  ProfileSettingsFormAvatarClass,
  mapAvatarState
);
