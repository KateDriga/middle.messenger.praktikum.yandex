import './chat-text-area.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import {
  getChatIdFromPath,
  getRegExpForPath,
  ROUTES,
} from '../../utils/const-variables/pages';
import { ChatContent } from '../chat-content/chat-content';

export interface IChatSelectedState {
  chatSelected: boolean;
}

export class ChatsTextArea extends MyCoolComponent<null, IChatSelectedState> {
  state: IChatSelectedState = {
    chatSelected: getRegExpForPath(ROUTES.chat.path).test(
      window.location.pathname
    ),
  };

  constructor() {
    super();
    this.handlePathChange = this.handlePathChange.bind(this);
    window.addEventListener('popstate', this.handlePathChange);
  }

  handlePathChange() {
    this.setState(() => ({
      chatSelected: getRegExpForPath(ROUTES.chat.path).test(
        window.location.pathname
      ),
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePathChange);
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'chat-text-area',
        class: this.state.chatSelected
          ? 'chat_text_area'
          : 'chat_text_area chat_text_area_hidden_mobile',
      },
      this.state.chatSelected
        ? MyCoolTemplate.createComponent(ChatContent, {
            key: getChatIdFromPath(),
            id: getChatIdFromPath(),
          })
        : MyCoolTemplate.createElement(
            'div',
            { key: 'chat-content', class: 'chat_text_area_empty' },
            MyCoolTemplate.createElement('img', {
              key: 'img',
              class: 'chat_text_area_img',
              src: require('../../images/chat.png'),
              alt: 'chat image',
            }),
            MyCoolTemplate.createTextElement('Select a chat to send a message')
          )
    );
  }
}
