import { renderErrorPage } from '../../../index';
import { IResponse } from '../../../services/http-transport';
import { displayModal } from '../modal';

export function handleFormErrors(e: IResponse, method: string) {
  console.error(`${method} error:`, e);
  if (e.status >= 500) {
    renderErrorPage();
  } else {
    return { isValid: false, errorText: JSON.parse(e.data).reason };
  }
}

export function handleChatErrors(e: IResponse, method: string) {
  console.error(`${method} error:`, e);
  e.status >= 500
    ? renderErrorPage()
    : displayModal({ type: 'error', message: JSON.parse(e.data).reason });
}
