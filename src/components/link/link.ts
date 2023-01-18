import * as styles from './link.module.scss';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { Button } from '../button/button';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { navigate } from '../../utils/util-functions/router';
import {
  getPathWithoutTrailingSlash,
  ROUTES,
} from '../../utils/const-variables/pages';
import {
  HistoryEventTypes,
  RouterService,
} from '../../services/router-service';

interface IProps {
  title: string;
  href: string;
  isButton: boolean;
}

interface IState {
  isActive: boolean;
}

export class Link extends MyCoolComponent<IProps, IState> {
  state: IState;
  routerService: RouterService;

  constructor() {
    super();
    this.state = { isActive: false };
    this.routerService = RouterService.getInstance();
    this.handlePathChange = this.handlePathChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handlePathChange() {
    this.setState(() => ({
      isActive: Object.values(ROUTES).some(
        route =>
          route.pathRegExp.test(getPathWithoutTrailingSlash(this.props.href)) &&
          route.pathRegExp.test(
            getPathWithoutTrailingSlash(window.location.pathname)
          )
      ),
    }));
  }

  navigate = (e: Event) => {
    e.preventDefault();
    navigate(this.props.href);
  };

  componentDidMount() {
    this.routerService.on(HistoryEventTypes.LOAD, this.handlePathChange);
    this.routerService.on(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentDidMount();
  }

  componentWillUnmount() {
    this.routerService.off(HistoryEventTypes.LOAD, this.handlePathChange);
    this.routerService.off(HistoryEventTypes.POPSTATE, this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'a',
      {
        class: `${styles.link} ${
          this.state.isActive ? styles.link_active : ''
        }`,
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
            isActive: this.state.isActive,
          })
        : MyCoolTemplate.createTextElement(this.props.title)
    );
  }
}
