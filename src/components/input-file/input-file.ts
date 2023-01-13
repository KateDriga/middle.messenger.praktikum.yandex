import './input-file.scss';
import { MyCoolComponent } from '../../utils/template/my-cool-component';
import { TVirtualDomNode } from '../../utils/template/my-cool-template-types';
import { MyCoolTemplate } from '../../utils/template/my-cool-template';

export interface IInputFileProps {
  label: string;
  value: string;
  name: string;
  style?: string;
  //TODO: add onChange event handler
}

export class InputFile extends MyCoolComponent<IInputFileProps, null> {
  render(): TVirtualDomNode {
    return MyCoolTemplate.createElement(
      'label',
      {
        key: 'file-input',
        class: 'form__input_file',
        style: this.props.style,
      },
      MyCoolTemplate.createTextElement(this.props.label),
      MyCoolTemplate.createElement('input', {
        key: 'file-input',
        type: 'file',
        name: this.props.name,
      })
    );
  }
}
