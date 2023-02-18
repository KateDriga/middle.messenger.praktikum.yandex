import { App } from './app';
import { TIndexed } from '../../utils/util-functions/set';
import { connect, IMapStateFromStore } from '../../utils/store/connect';

export interface IAppStateFromStore {
  isLoading: boolean;
  userDataLoaded: boolean;
}

function mapAppState(state: TIndexed): IAppStateFromStore {
  return {
    isLoading:
      state.loadingState.userIsLoading || state.loadingState.chatsAreLoading,
    userDataLoaded: state.user !== null,
  };
}

export const AppWrapper = connect<
  IAppStateFromStore,
  IMapStateFromStore<IAppStateFromStore>
>(App, mapAppState);
