import './chat-text-area.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { ChatContent } from '../chat-content/chat-content';

export class ChatsTextArea extends MyCoolComponent<
  { id: string | null },
  null
> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      {
        key: 'chat-text-area',
        class: this.props.id
          ? 'chat_text_area'
          : 'chat_text_area chat_text_area_hidden_mobile',
      },
      this.props.id
        ? MyCoolTemplate.createComponent(ChatContent, {
            key: this.props.id,
            id: this.props.id,
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
