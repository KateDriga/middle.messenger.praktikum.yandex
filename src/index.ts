import './index.scss';
import { MyCoolTemplate } from './utils/template/my-cool-template';
import { App } from './components/app/app';

const ROOT_ID = 'root';

MyCoolTemplate.renderDom(
  ROOT_ID,
  MyCoolTemplate.createComponent(App, { key: ROOT_ID })
);
