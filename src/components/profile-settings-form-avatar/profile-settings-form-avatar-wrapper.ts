import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ProfileSettingsFormAvatar } from './profile-settings-form-avatar';
import { TIndexed } from '../../utils/util-functions/set';

export interface IUserStateFromStore {
  avatar: string | null;
}

function mapAvatarState(state: TIndexed): IUserStateFromStore {
  return {
    avatar: state.user?.avatar,
  };
}

export const ProfileSettingsFormAvatarWrapper = connect<
  IUserStateFromStore,
  IMapStateFromStore<IUserStateFromStore>
>(ProfileSettingsFormAvatar, mapAvatarState);
