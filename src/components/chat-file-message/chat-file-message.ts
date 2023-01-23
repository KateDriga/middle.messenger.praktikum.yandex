import * as styles from './chat-file-message.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

interface IProps {
  fileName: string;
  removeFile: (name: string) => void;
}

export class ChatFileMessage extends Block<IProps, null> {
  constructor() {
    super();
    this.removeFile = this.removeFile.bind(this);
  }

  removeFile(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.props.removeFile(this.props.fileName);
    }
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'file-message', class: styles.file_message },
      Template.createElement(
        'p',
        { key: 'file-name', class: styles.file_name },
        Template.createTextElement(this.props.fileName)
      ),
      Template.createElement('img', {
        key: 'remove',
        class: styles.remove_file_icon,
        src: require('../../images/icons/close.svg'),
        alt: 'close-icon',
        tabIndex: 0,
        onClick: () => this.props.removeFile(this.props.fileName),
        onKeyDown: this.removeFile,
      })
    );
  }
}
