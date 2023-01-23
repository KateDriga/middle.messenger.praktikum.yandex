import * as styles from './chat-content-footer.module.scss';
import { Block } from '../../utils/base-components/block';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { InputChatMessage } from '../input-chat-message/input-chat-message';
import { Picture } from '../picture/picture';
import { InputNameTypes } from '../input/input';
import { InputFile } from '../input-file/input-file';
import { ChatFileMessage } from '../chat-file-message/chat-file-message';

interface IProps {
  onSendMessage: (e: KeyboardEvent | MouseEvent) => void;
  newMessageRef: IRef;
  newFileRef: IRef;
  fileNames: Array<string>;
  selectFile: () => void;
  addFile: (file: File) => void;
  removeFile: (name: string) => void;
}

export class ChatContentFooter extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'chat-content-footer' },
      Template.createElement(
        'div',
        { key: 'chat-content-files', class: styles.chat_content_files },
        ...this.props.fileNames.map(name =>
          Template.createComponent(ChatFileMessage, {
            key: name,
            fileName: name,
            removeFile: this.props.removeFile,
          })
        )
      ),
      Template.createElement(
        'div',
        { key: 'chat-content-message', class: styles.chat_content_message },
        Template.createComponent(Picture, {
          key: 'chat-message-media',
          picName: 'insertFile',
          type: 'icon',
          onClick: this.props.selectFile,
        }),
        Template.createComponent(InputFile, {
          key: 'chat-message-file',
          label: 'Insert File',
          value: '',
          name: 'file',
          ref: this.props.newFileRef,
          onChange: this.props.addFile,
          style: 'display: none;',
        }),
        Template.createComponent(InputChatMessage, {
          key: 'chat-message-send',
          name: InputNameTypes.MESSAGE,
          onKeyDown: this.props.onSendMessage,
          newMessageRef: this.props.newMessageRef,
        }),
        Template.createComponent(Picture, {
          key: 'chat-message-send-button',
          picName: 'sendMessage',
          type: 'icon',
          onClick: this.props.onSendMessage,
        })
      )
    );
  }
}
