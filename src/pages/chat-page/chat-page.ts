import { Block } from '../../utils/base-components/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';
import { IMapStateFromStore } from '../../utils/store/connect';
import { IChatsStateFromStore } from './chat-page-wrapper';
import { ChatsController } from '../../services/controllers/chats-controller';
import { ChatPageContent } from './chat-page-content';

interface IProps {
  params: { id: string | null };
}

export class ChatPage extends Block<
  IProps,
  IMapStateFromStore<IChatsStateFromStore>
> {
  updateChatsTimer = 0;
  chatsController = new ChatsController();

  constructor() {
    super();
    this.chatsController.getAllChats();
  }

  componentDidMount() {
    this.updateChatsTimer = window.setInterval(
      () => this.chatsController.getAllChats(),
      10_000
    );
    super.componentDidMount();
  }

  componentWillUnmount() {
    clearInterval(this.updateChatsTimer);
    this.updateChatsTimer = 0;
    super.componentWillUnmount();
  }

  render(): TVirtualDomNode {
    const unknownId: boolean =
      this.props.params.id &&
      this.state.stateFromStore.chats &&
      !this.state.stateFromStore.chats.find(
        chat => chat.id.toString() === this.props.params.id
      );
    return Template.createComponent(ChatPageContent, {
      key: 'chat-page',
      id: this.props.params.id,
      chats: this.state.stateFromStore.chats,
      unknownChatId: unknownId,
    });
  }
}
