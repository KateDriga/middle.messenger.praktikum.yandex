import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { ProfileSettingsForm, TUser } from './profile-settings-form';
import { TIndexed } from '../../utils/util-functions/set';

export interface IUserStateFromStore {
  user: TUser;
}

function mapUserState(state: TIndexed): IUserStateFromStore {
  if (!state.user) {
    return { user: null };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { avatar, ...user } = state.user;
  return {
    user,
  };
}

export const ProfileSettingsFormWrapper = connect<
  IUserStateFromStore,
  IMapStateFromStore<IUserStateFromStore>
>(ProfileSettingsForm, mapUserState);
