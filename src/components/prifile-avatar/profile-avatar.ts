import './profile-avatar.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

const IMAGE_PATHS = {
  avatar: require('../../images/fake-test-images/superman.png'),
};

interface IProps {
  imageName: string;
  onClick?: () => void;
  style?: string;
}

export class ProfileAvatar extends MyCoolComponent<IProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement('img', {
      key: 'img',
      class: 'avatar',
      src: IMAGE_PATHS[this.props.imageName],
      alt: 'profile',
      style: this.props.style,
      onClick: this.props.onClick,
    });
  }
}
