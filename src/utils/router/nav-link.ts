import { Template } from '../template/template';
import { Block } from '../base-components/block';
import { IVirtualDomProps, TVirtualDomNode } from '../template/template-types';
import { getPathWithoutTrailingSlash } from '../const-variables/pages';
import { PATH_CHANGE, Router } from './router';

interface IProps {
  href: string;
  component: { new (): Block<unknown, unknown> };
  componentProps: IVirtualDomProps;
}

interface IState {
  isActive: boolean;
}

export class NavLink extends Block<IProps, IState> {
  router = Router.getInstance();
  state: IState = { isActive: false };
  private _isMounted = true;

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handlePathChange() {
    const isActive =
      getPathWithoutTrailingSlash(this.props.href) ===
      getPathWithoutTrailingSlash(window.location.pathname);
    if (this.state.isActive !== isActive && this._isMounted) {
      this.setState(() => ({ isActive }));
    }
  }

  navigate = (e: Event) => {
    e.preventDefault();
    Router.getInstance().go(this.props.href);
  };

  componentDidMount() {
    this._isMounted = true;
    this.router.on(PATH_CHANGE, this.handlePathChange);
    this.handlePathChange();
    super.componentDidMount();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.router.off(PATH_CHANGE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'a',
      {
        href: this.props.href,
        onClick: this.navigate,
        key: 'nav-link',
      },
      Template.createComponent(this.props.component, {
        ...this.props.componentProps,
        isActive: this.state.isActive,
      })
    );
  }
}
