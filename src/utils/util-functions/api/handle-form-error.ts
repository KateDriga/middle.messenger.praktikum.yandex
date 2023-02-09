import { renderErrorPage } from '../../../index';
import { IResponse } from '../../../services/http-transport';

export function handleFormError(e: IResponse, method: string) {
  console.error(`${method} error:`, e);
  if (e.status >= 500) {
    renderErrorPage();
  } else {
    return { isValid: false, errorText: JSON.parse(e.data).reason };
  }
}
