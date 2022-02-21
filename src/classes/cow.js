export const EL_SIZE = 2;
export const MOVE_ANIMATION_TIME = 50;
export const ROTATE_ANIMATION_TIME = 500;
export const SCALE = 8;

class Cow {
  constructor({ index, elSize, parentNodeId, direction }) {
    this.index = index;
    this.elementId = `rac-el-${this.index}`;
    this.elSize = elSize;
    this.parentNodeId = parentNodeId;
    this.direction = direction;
    this.movementCssProp = this.direction ? 'top' : 'left';
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
    const elSizeValue = `${this.elSize}vw`;
    const baseEmojiStyles = `
      backface-visibility: hidden;
      position: absolute;
      width: ${elSizeValue};
      height: ${elSizeValue};
    `;

    const el = document.createElement("div");
    el.style.cssText = `
      transition: transform ${ROTATE_ANIMATION_TIME}ms ease-out  ${ROTATE_ANIMATION_TIME}ms;
      transform-style: preserve-3d;
      position: relative;
      width: 100%;
      height: 100%;
      font-size: ${elSizeValue};
      line-height: ${elSizeValue};
    `;
    el.setAttribute("class", `rac-el`);

    const cowEl = document.createElement("span");
    cowEl.setAttribute("class", `rac-el-cow`);
    cowEl.style.cssText = `
      ${baseEmojiStyles}
      z-index: 2;
    `;
    cowEl.innerHTML = "🐮";
    el.appendChild(cowEl);

    const coinEl = document.createElement("span");
    coinEl.setAttribute("class", `rac-el-cow`);
    coinEl.style.cssText = `
      ${baseEmojiStyles}
      transform: rotateY(180deg);
    `;
    coinEl.innerHTML = "🪙";
    el.appendChild(coinEl);

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", `rac-el-${isEven ? "even" : "odd"}`);
    wrapper.setAttribute("id", this.elementId);
    wrapper.style.cssText = `
      width: ${elSizeValue};
      height: ${elSizeValue};
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
    if (cssPropVal.startsWith("-")) {
      cssPropVal = cssPropVal.substring(1);
    } else {
      cssPropVal = `-${cssPropVal}`;
    }
    this.rootEl.style[this.movementCssProp] = cssPropVal;
  }
}

export default Cow;
