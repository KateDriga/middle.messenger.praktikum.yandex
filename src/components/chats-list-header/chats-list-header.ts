import * as styles from './chats-list-header.module.scss';
import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { ROUTES } from '../../utils/const-variables/pages';
import { Router } from '../../utils/router/router';

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
          onClick: () => Router.getInstance().go(ROUTES.settings.path),
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
