import styles from './loader.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export class Loader extends Block<null, null> {
  render(): TVirtualDomNode {
    return Template.createElement('div', {
      key: 'loader',
      class: styles.loader,
    });
  }
}
