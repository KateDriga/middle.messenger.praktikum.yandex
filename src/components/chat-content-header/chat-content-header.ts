import * as styles from './chat-content-header.module.scss';
import { Block } from '../../utils/base-components/block';
import { Template } from '../../utils/template/template';
import { FAKE_CHATS } from '../../utils/fake-test-variables/fake-chats';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Picture } from '../picture/picture';

export class ChatContentHeader extends Block<{ id: string }, null> {
  render(): TVirtualDomNode {
    // TODO: replace with info from server
    return Template.createElement(
      'div',
      { key: 'header-title', class: styles.chat_text_area_title },
      Template.createComponent(Picture, {
        key: 'avatar',
        picName: 'avatar',
        type: 'image',
        style: 'width: 70px; height: 70px;',
      }),
      Template.createElement(
        'h2',
        { key: 'chat-name' },
        Template.createTextElement(
          FAKE_CHATS.find(chat => chat.id.toString() === this.props.id).title
        )
      )
    );
  }
}
