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
    const elSizeValue = `${this.elSize}vw`;
    const baseEmojiStyles = `
      backface-visibility: hidden;
      position: absolute;
      width: ${elSizeValue};
      height: ${elSizeValue};
    `


    const el = document.createElement('div');
    el.style.transition = `${ ANIMATION_TIME }ms`;
    el.style.transformStyle = 'preserve-3d';
    el.style.position = 'relative';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.top = `${ isEven ? EL_SIZE / -4 : EL_SIZE / 4}vw`;
    el.style.fontSize = elSizeValue;
    el.style.lineHeight = elSizeValue;
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
      width: ${elSizeValue};
      height: ${elSizeValue};
      perspective: 500px;
      display: inline-block;
    `;
    wrapper.appendChild(el);
    return wrapper;
  }
}

export default Cow;