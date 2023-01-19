import * as styles from './picture.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export interface IPictureProps {
  picName: string;
  onClick?: (e: Event) => void;
  type: 'icon' | 'image';
  style?: string;
}

const PIC_PATHS = {
  edit: require('../../images/icons/edit.svg'),
  insertFile: require('../../images/icons/insert-file.svg'),
  sendMessage: require('../../images/icons/send-message.svg'),
  avatar: require('../../images/fake-test-images/superman.webp'),
};

export class Picture extends Block<IPictureProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement('img', {
      key: 'img',
      class: `${this.props.type === 'icon' ? styles.img_icon : styles.img_pic}`,
      src: PIC_PATHS[this.props.picName],
      alt: 'image',
      style: this.props.style ?? '',
      onClick: this.props.onClick,
    });
  }
}
