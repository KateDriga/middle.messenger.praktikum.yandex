import './chats-list-header.scss';
import '../input/input.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { navigate } from '../../utils/util-functions/router';
import { ROUTES } from '../../utils/const-variables/pages';

interface IProps {
  onInput: () => void;
}

export class ChatsListHeader extends MyCoolComponent<IProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'div',
      { key: 'chats-list-header', class: 'chats_list_header' },
      MyCoolTemplate.createElement(
        'span',
        {
          key: 'profile',
          class: 'chats_list_header_profile',
          onClick: () => navigate(ROUTES.settings.path),
        },
        MyCoolTemplate.createTextElement('Profile >')
      ),
      MyCoolTemplate.createElement(
        'label',
        {
          key: 'search',
          class: 'search_label',
        },
        MyCoolTemplate.createElement('input', {
          key: 'input',
          class: 'form__input_input_field form__input_input_field_search',
          type: 'text',
          placeholder: 'Search',
          onInput: this.props.onInput,
        })
      )
    );
  }
}
