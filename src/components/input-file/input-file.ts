import * as styles from './input-file.module.scss';
import { Block } from '../../utils/base-components/block';
import { IRef, TVirtualDomNode } from '../../utils/template/template-types';
import { Template } from '../../utils/template/template';

export interface IInputFileProps {
  label: string;
  value: string;
  name: string;
  ref: IRef;
  onChange: (value: string) => void;
  style?: string;
  accept?: string;
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
        ref: this.props.ref,
        value: this.props.value,
        accept: this.props.accept,
        onChange: (e: Event) =>
          this.props.onChange((<HTMLInputElement>e.target).value),
      })
    );
  }
}
