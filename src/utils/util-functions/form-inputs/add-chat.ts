import { CHAT_NAME_VALIDATION } from '../../const-variables/field-validation';
import { TInputPropsWithRef } from '../../base-components/page-form-edit';
import { Template } from '../../template/template';

export function generateAddChatInput(
  onChangeCallback: (value: string) => void,
  clearError: () => void
): TInputPropsWithRef {
  return {
    htmlType: 'input',
    label: '',
    name: undefined,
    placeholder: 'Add Chat',
    type: 'text',
    validation: CHAT_NAME_VALIDATION,
    value: '',
    required: true,
    ref: Template.createRef(),
    clearError,
    onChange: value => onChangeCallback(value),
  };
}
