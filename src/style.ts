import { LRC_COMMON_CLASS_NAME, LRC_LINE_COMMON_CLASS_NAME } from './constant';

const lrcStyle = document.createElement('style');
lrcStyle.innerHTML = `
  .${LRC_COMMON_CLASS_NAME} {
    overflow: auto;
    position: relative;
  }
`;

const lrcLineStyle = document.createElement('style');
lrcLineStyle.innerHTML = `
  .${LRC_LINE_COMMON_CLASS_NAME}::before, .${LRC_LINE_COMMON_CLASS_NAME}::after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
`;

const fragment = document.createDocumentFragment();
fragment.append(lrcStyle, lrcLineStyle);
document.head.appendChild(fragment);
