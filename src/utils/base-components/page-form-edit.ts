import { IInputProps } from '../../components/input/input';
import { IRef } from '../template/template-types';
import { IPictureProps } from '../../components/picture/picture';
import { IFormPageState, PageForm } from './page-form';

export type TInputPropsWithRef = IInputProps & { ref: IRef };

export type TProfileSettingsInput =
  | [TInputPropsWithRef, IPictureProps]
  | [TInputPropsWithRef];

export abstract class PageFormEdit<
  S extends IFormPageState
> extends PageForm<S> {
  allowInputEdit(prop: TInputPropsWithRef) {
    const updatedInputs = this.state.inputs.map(inputBlock => {
      if (inputBlock[0] === prop) {
        inputBlock[0].disabled = false;
        inputBlock[0].required = true;
        inputBlock[0].displayError = true;
        inputBlock[1].onClick = () => this.focusInput(inputBlock[0]);
      }
      return inputBlock;
    }) as Array<TProfileSettingsInput>;
    this.setState(s => ({ ...s, inputs: updatedInputs }));
    this.focusInput(prop);
  }

  focusInput(prop: TInputPropsWithRef) {
    const input = prop.ref.current as HTMLInputElement;
    input.focus();
    // input type 'email' does not support selection
    if (input.type !== 'email') {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }
}
