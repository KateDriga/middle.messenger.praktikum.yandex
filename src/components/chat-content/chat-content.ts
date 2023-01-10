import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';

export class ChatContent extends MyCoolComponent<{ id: string }, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createTextElement(this.props.id);
  }
}
