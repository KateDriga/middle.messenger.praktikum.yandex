import styles from './item-with-delete-option.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

interface IProps {
  itemName: string;
  removeItem: (name: string) => void;
}

export class ItemWithDeleteOption extends Block<IProps, null> {
  constructor() {
    super();
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.props.removeItem(this.props.itemName);
    }
  }

  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'file-message', class: styles.file_message },
      Template.createElement(
        'p',
        { key: 'file-name', class: styles.file_name },
        Template.createTextElement(this.props.itemName)
      ),
      Template.createElement('img', {
        key: 'remove',
        class: styles.remove_file_icon,
        src: require('../../images/icons/close.svg'),
        alt: 'close-icon',
        tabIndex: 0,
        onClick: () => this.props.removeItem(this.props.itemName),
        onKeyDown: this.removeItem,
      })
    );
  }
}
