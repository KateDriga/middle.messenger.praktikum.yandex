import * as styles from './chats-list-header.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';

interface IProps {
  onInput: () => void;
}

export class ChatsListHeader extends Block<IProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'div',
      { key: 'chats-list-header', class: styles.chats_list_header },
      Template.createElement(
        'span',
        {
          key: 'profile',
          class: styles.chats_list_header_profile,
          onClick: () => navigate(ROUTES.settings.path),
        },
        Template.createTextElement('Profile >')
      ),
      Template.createElement(
        'label',
        {
          key: 'search',
          class: styles.search_label,
        },
        Template.createElement('input', {
          key: 'input',
          class: styles.input_field_search,
          type: 'text',
          placeholder: 'Search',
          onInput: this.props.onInput,
        })
      )
    );
  }
}
