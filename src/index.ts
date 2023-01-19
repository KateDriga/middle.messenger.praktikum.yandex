import './index.scss';
import { Template } from './utils/template/template';
import { App } from './components/app/app';

export const ROOT_ID = 'root';

Template.renderDom(ROOT_ID, Template.createComponent(App, { key: ROOT_ID }));
