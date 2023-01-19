import * as styles from './input-file.module.scss';
import { Block } from '../../utils/block/block';
import { TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export interface IInputFileProps {
  label: string;
  value: string;
  name: string;
  style?: string;
  //TODO: add onChange event handler
}

export class InputFile extends Block<IInputFileProps, null> {
  render(): TVirtualDomNode {
    return Template.createElement(
      'label',
      {
        key: 'file-input',
        class: styles.form_input_file,
        style: this.props.style,
      },
      Template.createTextElement(this.props.label),
      Template.createElement('input', {
        key: 'file-input',
        type: 'file',
        name: this.props.name,
      })
    );
  }
}
