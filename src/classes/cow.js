export const EL_SIZE = 2;
export const ANIMATION_TIME = 600;

class Cow {
  constructor(index, elSize) {
    this.index = index;
    this.elSize = elSize;
    this.getElement = this.getElement.bind(this);
  }

  getElement() {
    const isEven = this.index % 2 === 0;
    const baseEmojiStyles = `
      backface-visibility: hidden;
      position: absolute;
      width: ${this.elSize}px;
      height: ${this.elSize}px;
    `

    const el = document.createElement('div');
    el.style.cssText = `
      transition: ${ ANIMATION_TIME }ms;
      transform-style: preserve-3d;
      position: relative;
      width: 100%;
      height: 100%;
      top: ${ isEven ? this.elSize / -4 : this.elSize / 4}px;
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
    wrapper.style.cssText = `
      width: ${this.elSize}px;
      height: ${this.elSize}px;
      perspective: 500px;
      display: inline-block;
    `;
    wrapper.appendChild(el);
    return wrapper;
  }
}

export default Cow;