import styles from './file-message.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { IFile } from '../chat-content/chat-content';
import { Template } from '../../utils/template/template';
import { Picture } from '../picture/picture';
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api';

export class FileMessage extends Block<IFile, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'a',
      {
        key: this.props.id,
        href: `${BASE_URL}${RESOURCES_API_URL}${this.props.path}`,
        download: this.props.filename,
        target: '_blank',
      },
      this.props.content_type.startsWith('image')
        ? Template.createComponent(Picture, {
            key: this.props.id,
            picPath: `${BASE_URL}${RESOURCES_API_URL}${this.props.path}`,
            picName: 'image',
            type: 'image',
            style: 'border-radius: 0; object-fit: cover; width: 100%',
          })
        : Template.createElement(
            'div',
            { key: this.props.id, class: styles.file_image },
            Template.createComponent(Picture, {
              key: 'file-image',
              picName: 'insertFile',
              type: 'image',
              style: 'width: 30px; height: 30px;',
            }),
            Template.createTextElement(this.props.filename)
          )
    );
  }
}
