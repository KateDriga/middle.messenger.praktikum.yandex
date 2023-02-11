import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { Messenger } from '../../components/messenger/messenger';
import { ChatsController } from '../../services/controllers/chats-controller';
import { Store } from '../../utils/store/store';

interface IProps {
  params: {
    id: string | null;
  };
}

export class ChatPage extends Block<IProps, null> {
  constructor() {
    super();
    const store = Store.getInstance().getState();
    if (store.chats === null) {
      new ChatsController().getAllChats();
    }
  }

  render(): TVirtualDomNode {
    return Template.createComponent(Messenger, {
      key: 'chat-page',
      id: this.props.params.id || null,
    });
  }
}
