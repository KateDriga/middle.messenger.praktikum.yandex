import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { TIndexed } from '../../utils/util-functions/set';
import { connect, IMapStateFromStore } from '../../utils/store/connect';
import { App, IAppProps } from './app';

class AppClass extends Block<IMapStateFromStore<IAppProps>, null> {
  render(): TVirtualDomNode {
    return Template.createComponent(App, {
      key: 'app',
      isLoading: this.props.stateFromStore.isLoading,
      userDataLoaded: this.props.stateFromStore.userDataLoaded,
    });
  }
}

function mapAppState(state: TIndexed): IAppProps {
  return {
    isLoading: state.loadingState.userIsLoading,
    userDataLoaded: state.user !== null,
  };
}

export const AppWrapper = connect<IAppProps, IMapStateFromStore<IAppProps>>(
  AppClass,
  mapAppState
);
