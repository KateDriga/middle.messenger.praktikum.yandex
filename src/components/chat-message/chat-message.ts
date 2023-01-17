import * as styles from './chat-message.module.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import {
  IRef,
  TVirtualDomNode,
} from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { IMessage } from '../../utils/fake-test-variables/fake-messages';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';

interface IProps extends IMessage {
  id: string;
  type: string;
  shouldScroll: boolean;
}

export class ChatMessage extends MyCoolComponent<IProps, null> {
  ref: IRef;
  constructor() {
    super();
    this.ref = MyCoolTemplate.createRef();
  }

  componentDidMount() {
    if (this.props.shouldScroll) {
      this.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    super.componentDidMount();
  }

  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'li',
      {
        key: this.props.id,
        ref: this.ref,
        class: `${styles.chat_message} ${
          this.props.type === 'received'
            ? styles.chat_message_received
            : styles.chat_message_sent
        }`,
      },
      MyCoolTemplate.createElement(
        'p',
        { key: 'message-text' },
        MyCoolTemplate.createTextElement(this.props.text)
      ),
      MyCoolTemplate.createElement(
        'p',
        { key: 'message-date', class: styles.chat_message_date },
        MyCoolTemplate.createTextElement(formatMessageDate(this.props.time))
      )
    );
  }
}
