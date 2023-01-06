import './link.scss';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Button } from '../button/button';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { navigate } from '../../utils/util-functions/router';

interface IProps {
  title: string;
  href: string;
  isButton: boolean;
}

interface IState {
  isActive: boolean;
}

export class Link extends MyCoolComponent<IProps, IState> {
  state: IState = { isActive: false };

  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('load', this.handlePathChange);
    window.addEventListener('popstate', this.handlePathChange);
  }

  public componentWillReceiveProps(props: IProps, state: IState): IState {
    this.state.isActive = this.props.href === window.location.pathname;
    return state;
  }

  handlePathChange() {
    this.setState(() => ({
      isActive: this.props.href === window.location.pathname,
    }));
  }

  navigate = (e: Event) => {
    e.preventDefault();
    if (this.props.href !== window.location.pathname) {
      navigate(this.props.href);
    }
  };

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'a',
      {
        class: `link${this.state.isActive ? ' link_active' : ''}`,
        href: this.props.href,
        onClick: this.navigate,
        key: 'link',
      },
      this.props.isButton
        ? MyCoolTemplate.createComponent(Button, {
            title: this.props.title,
            type: 'secondary',
            htmlType: 'button',
            key: this.props.title,
          })
        : MyCoolTemplate.createTextElement(this.props.title)
    );
  }
}
