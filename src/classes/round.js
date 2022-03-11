import Cow from './cow';
import { WINDOW_BREAKPOINT, GAME_ROOT_ID, ROTATE_ANIMATION_TIME } from '../constants';

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

class Round {
  constructor(roundNumber = 1, cows = 5, zIndex = 10000) {
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.$events = [];
    this.containerId = 'corovan';
    // 0 - horizontal, 1 - vertical
    this.direction = randomFromTo(0, 1);

    console.log(`Starting round${roundNumber ? ` #${roundNumber}` : ''}!`);
    const windowWidth = Math.round(window.innerWidth / window.devicePixelRatio);
    const windowHeight = Math.round(window.innerHeight / window.devicePixelRatio);
    const elSize = Math.round(
      windowWidth <= WINDOW_BREAKPOINT && windowWidth < windowHeight
        ? windowWidth * 0.1
        : windowWidth * 0.05,
    );
    const containerLength = cows * elSize;
    this.container = document.createElement('div');
    this.container.setAttribute('id', this.containerId);
    this.container.style.cssText = `
      width: ${this.direction ? elSize : containerLength }px;
      height: ${this.direction ? containerLength: elSize}px;
      cursor: grab;
      cursor: pointer;
      position: absolute;
      z-index: ${zIndex};
      left: ${
        this.direction
          ? randomFromTo(elSize, window.innerWidth - 2 * elSize) // vertical
          : randomFromTo(elSize, window.innerWidth - (containerLength + elSize)) // horizontal
      }px;
      top: ${
        this.direction
          ? randomFromTo(elSize, window.innerHeight - (containerLength + elSize)) // vertical
          : randomFromTo(elSize, window.innerHeight - 2 * elSize) // horizontal
      }px;
    `;
    this.container.addEventListener('click', this.onClick);
    document.querySelector(`#${GAME_ROOT_ID}`).appendChild(this.container);
    this.cows = new Array(cows).fill(null).map((item, i) => {
      const cow = new Cow({
        index: i + 1,
        elSize,
        parentNodeId: this.containerId,
        direction: this.direction,
      });
      return cow;
    });

    this.$interval = setInterval(this.tick, 1000);
  }

  on(eventName, callback) {
    this.$events.push({ eventName, callback });
  }

  emit(eventName, ...args) {
    const event = this.$events.find((e) => e.eventName === eventName);
    if (event) {
      event.callback(...args);
    }
  }

  tick() {
    this.cows.forEach((cow) => {
      cow.onTick();
    });
  }

  onClick(e) {
    e.preventDefault();
    clearInterval(this.$interval);
    document.querySelectorAll(`#${this.containerId} .rac-el`).forEach((item) => {
      item.style.transform = 'rotateY(180deg)';
    });
    // console.log('Robbed!');
    this.container.removeEventListener('click', this.onClick);
    setTimeout(() => {
      this.container.remove();
      this.emit('roundEnded');
    }, ROTATE_ANIMATION_TIME * 2);
  }
}

export default Round;
