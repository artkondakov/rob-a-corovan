import { EL_SIZE, ROTATE_ANIMATION_TIME, SCALE } from '../constants';

class Cow {
  constructor({ index, elSize, parentNodeId, direction }) {
    this.index = index;
    this.elementId = `rac-el-${this.index}`;
    this.elSize = elSize;
    this.parentNodeId = parentNodeId;
    this.direction = direction;
    this.movementCssProp = this.direction
      ? 'left' // vertical
      : 'top'; // horizontal
    this.getElement = this.getElement.bind(this);
    this.render = this.render.bind(this);
    this.onTick = this.onTick.bind(this);

    this.render();
  }

  render() {
    this.rootEl = this.getElement();
    document.querySelector(`#${this.parentNodeId}`).appendChild(this.rootEl);
  }

  getElement() {
    const isEven = this.index % 2 === 0;
    const baseEmojiStyles = `
      backface-visibility: hidden;
      position: absolute;
      width: ${this.elSize}px;
      height: ${this.elSize}px;
    `;

    const el = document.createElement('div');
    el.style.cssText = `
      transition: transform ${ROTATE_ANIMATION_TIME}ms ease-out  ${ROTATE_ANIMATION_TIME}ms;
      transform-style: preserve-3d;
      position: relative;
      width: 100%;
      height: 100%;
      font-size: ${this.elSize}px;
      line-height: ${this.elSize}px;
    `;

    el.setAttribute('class', `rac-el`);

    const cowEl = document.createElement('span');
    cowEl.setAttribute('class', `rac-el-cow`);
    cowEl.style.cssText = `
      ${baseEmojiStyles}
      z-index: 2;
    `;
    cowEl.innerHTML = '🐮';
    el.appendChild(cowEl);

    const coinEl = document.createElement('span');
    coinEl.setAttribute('class', `rac-el-cow`);
    coinEl.style.cssText = `
      ${baseEmojiStyles}
      transform: rotateY(180deg);
    `;
    coinEl.innerHTML = '🪙';
    el.appendChild(coinEl);

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', `rac-el-${isEven ? 'even' : 'odd'}`);
    wrapper.setAttribute('id', this.elementId);
    wrapper.style.cssText = `
      width: ${this.elSize}px;
      height: ${this.elSize}px;
      perspective: 500px;
      display: inline-block;
      ${this.movementCssProp}: ${(EL_SIZE / SCALE) * isEven ? -1 : 1}vw;
      position: relative;
    `;
    wrapper.appendChild(el);
    return wrapper;
  }

  onTick() {
    let cssPropVal = this.rootEl.style[this.movementCssProp];
    if (cssPropVal.startsWith('-')) {
      cssPropVal = cssPropVal.substring(1);
    } else {
      cssPropVal = `-${cssPropVal}`;
    }
    this.rootEl.style[this.movementCssProp] = cssPropVal;
  }
}

export default Cow;
