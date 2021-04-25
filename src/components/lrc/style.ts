import {
  LRC_COMPONENT_COMMON_CLASS_NAME,
  LRC_LINE_COMPONENT_COMMON_CLASS_NAME,
} from './constants';

const style = document.createElement('style');
style.innerHTML = `
  .${LRC_COMPONENT_COMMON_CLASS_NAME} {
    outline: none;
    overflow: auto;
    scroll-behavior: smooth;
  }

  .${LRC_COMPONENT_COMMON_CLASS_NAME} > .blank {
    height: 50%;
  }

  .${LRC_LINE_COMPONENT_COMMON_CLASS_NAME} {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }
`;
document.head.appendChild(style);
