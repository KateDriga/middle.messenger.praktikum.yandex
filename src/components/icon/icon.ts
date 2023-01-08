import './icon.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

export interface IIconProps {
  imageName: string;
  onClick: (e: Event) => void;
  style?: string;
}

const ICON_PATHS = {
  edit: require('../../images/icons/edit.svg'),
};

export class Icon extends MyCoolComponent<IIconProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement('img', {
      key: 'img',
      class: 'img_icon',
      src: ICON_PATHS[this.props.imageName],
      style: this.props.style ?? '',
      alt: 'edit-icon',
      onClick: this.props.onClick,
    });
  }
}
