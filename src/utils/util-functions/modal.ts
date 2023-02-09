import { IModalMessage, Modal, MODAL_ID } from '../../components/modal/modal';
import { Template } from '../template/template';

export function displayModal(info: IModalMessage) {
  Template.renderDom(
    MODAL_ID,
    Template.createComponent(Modal, {
      key: MODAL_ID,
      message: info.message,
      type: info.type,
    })
  );
}
