import './chat-list-item.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ProfileAvatar } from '../prifile-avatar/profile-avatar';
import { IChat } from '../../utils/ts-types/chat-types';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';
import { navigate } from '../../utils/util-functions/router';
import { getChatIdFromPath, ROUTES } from '../../utils/const-variables/pages';

interface IState {
  isActive: boolean;
}

export class ChatListItem extends MyCoolComponent<IChat, IState> {
  state: IState = { isActive: false };

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  initProps(props: IChat): TVirtualDomNode {
    this.state.isActive = getChatIdFromPath() === props.id.toString();
    return super.initProps(props);
  }

  handlePathChange() {
    this.setState(() => ({
      isActive: getChatIdFromPath() === this.props.id.toString(),
    }));
  }

  componentDidMount() {
    if (this.state.isActive) {
      this.scrollToElement({ behavior: 'smooth' });
    }
    super.componentDidMount();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'li',
      {
        key: 'chat-item',
      },
      MyCoolTemplate.createElement(
        'div',
        {
          key: 'chat-list-item',
          class: this.state.isActive
            ? 'chat_list_item chat_list_item_active'
            : 'chat_list_item',
          onClick: () =>
            navigate(ROUTES.chat.path.replace(':id', this.props.id.toString())),
        },
        //TODO: replace image name with info from props
        MyCoolTemplate.createComponent(ProfileAvatar, {
          key: 'avatar',
          imageName: 'avatar',
          style:
            'width: 50px; height: 50px; align-self: center; margin-left: 5px;',
        }),
        MyCoolTemplate.createElement(
          'div',
          { key: 'content', class: 'chat_list_content' },
          MyCoolTemplate.createElement(
            'h3',
            { key: 'chat-title', class: 'chat_list_title' },
            MyCoolTemplate.createTextElement(this.props.title)
          ),
          MyCoolTemplate.createElement(
            'p',
            { key: 'chat-last-message', class: 'chat_list_last_message' },
            MyCoolTemplate.createTextElement(this.props.last_message.content)
          )
        ),
        MyCoolTemplate.createElement(
          'div',
          { key: 'chat-extra', class: 'chat_list_extra' },
          MyCoolTemplate.createElement(
            'span',
            { key: 'chat-time', class: 'chat_list_time' },
            MyCoolTemplate.createTextElement(
              formatMessageDate(this.props.last_message.time)
            )
          ),
          MyCoolTemplate.createElement(
            'span',
            {
              key: 'chat-unread',
              class: `${
                this.props.unread_count > 0 ? 'chat_list_unread_count' : ''
              }`,
            },
            MyCoolTemplate.createTextElement(
              this.props.unread_count > 0 ? this.props.unread_count : ''
            )
          )
        )
      ),
      MyCoolTemplate.createElement('hr', {
        key: 'line-separator',
        class: 'line',
      })
    );
  }
}
