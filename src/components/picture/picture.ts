import styles from './picture.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export interface IPictureProps {
  picPath?: string;
  picName?: string;
  onClick?: (e: Event) => void;
  type: 'icon' | 'image';
  style?: string;
}

const PIC_PATHS = {
  edit: require('../../images/icons/edit.svg'),
  insertFile: require('../../images/icons/insert-file.svg'),
  sendMessage: require('../../images/icons/send-message.svg'),
  add: require('../../images/icons/add.svg'),
  close: require('../../images/icons/close.svg'),
  avatar: require('../../images/empty-avatar.webp'),
};

export class Picture extends Block<IPictureProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement('img', {
      key: 'img',
      class: `${this.props.type === 'icon' ? styles.img_icon : styles.img_pic}`,
      src: this.props.picPath || PIC_PATHS[this.props.picName],
      alt: this.props.picName,
      style: this.props.style ?? '',
      onClick: this.props.onClick,
    });
  }
}
