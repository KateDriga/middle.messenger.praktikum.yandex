import * as styles from './chat-message.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { IMessage } from '../../utils/fake-test-variables/fake-messages';
import { formatMessageDate } from '../../utils/util-functions/format-chat-info';

interface IProps extends IMessage {
  id: string;
  kind: string;
  shouldScroll: boolean;
}

export class ChatMessage extends Block<IProps, null> {
  ref = Template.createRef();

  componentDidMount() {
    if (this.props.shouldScroll) {
      this.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    super.componentDidMount();
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'li',
      {
        key: this.props.id,
        ref: this.ref,
        class: `${styles.chat_message} ${
          this.props.kind === 'received'
            ? styles.chat_message_received
            : styles.chat_message_sent
        }`,
      },
      // TODO: display different elements depending on message type (file/text)
      Template.createElement(
        'p',
        { key: 'message-text', style: 'white-space: pre-wrap;' },
        Template.createTextElement(this.props.content)
      ),
      Template.createElement(
        'p',
        { key: 'message-date', class: styles.chat_message_date },
        Template.createTextElement(formatMessageDate(this.props.time))
      )
    );
  }
}
