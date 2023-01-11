import './picture.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

export interface IPictureProps {
  picName: string;
  onClick?: (e: Event) => void;
  type: 'icon' | 'image';
  style?: string;
}

const PIC_PATHS = {
  edit: require('../../images/icons/edit.svg'),
  insertFile: require('../../images/icons/insert-file.svg'),
  avatar: require('../../images/fake-test-images/superman.png'),
};

export class Picture extends MyCoolComponent<IPictureProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement('img', {
      key: 'img',
      class: `${this.props.type === 'icon' ? 'img_icon' : 'img_pic'}`,
      src: PIC_PATHS[this.props.picName],
      alt: 'image',
      style: this.props.style ?? '',
      onClick: this.props.onClick,
    });
  }
}
