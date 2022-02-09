export const EL_SIZE = 2;

class Cow {
  constructor(index) {
    console.log('Moo!');
    this.index = index;
  }

  getElement() {
    const isEven = this.index % 2 === 0;
    const el = document.createElement('div');
    el.style.transition = '0.6s';
    el.style.transformStyle = 'preserve-3d';
    el.style.position = 'relative';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.top = `${ isEven ? EL_SIZE / -4 : EL_SIZE / 4}vw`;
    el.style.fontSize = `${EL_SIZE}vw`;
    el.style.lineHeight = `${EL_SIZE}vw`;
    el.setAttribute('class', `rac-el`);

    const cowEl = document.createElement('span');
    cowEl.setAttribute('class', `rac-el-cow`);
    cowEl.style.backfaceVisibility = 'hidden';
    cowEl.style.position = 'absolute';
    cowEl.style.width = `${EL_SIZE}vw`;
    cowEl.style.height = `${EL_SIZE}vw`;
    cowEl.style.zIndex = 2;
    cowEl.style.verticalAlign = `middle`;
    cowEl.innerHTML = '🐮';
    el.appendChild(cowEl);
    const coinEl = document.createElement('span');
    coinEl.setAttribute('class', `rac-el-cow`);
    coinEl.style.backfaceVisibility = 'hidden';
    coinEl.style.position = 'absolute';
    coinEl.style.width = `${EL_SIZE}vw`;
    coinEl.style.height = `${EL_SIZE}vw`;
    coinEl.style.transform = 'rotateY(180deg)';
    coinEl.innerHTML = '🪙';
    el.appendChild(coinEl);
  
    const wrapper = document.createElement('div'); 
    wrapper.setAttribute('class', `rac-el-${isEven ? 'even' : 'odd'}`);
    wrapper.style.width = `${EL_SIZE}vw`;
    wrapper.style.height = `${EL_SIZE}vw`;
    wrapper.style.perspective = `500px`;
    wrapper.style.display = `inline-block`;
    wrapper.appendChild(el);
    return wrapper;
  }
}

export default Cow;