import Cow, { EL_SIZE } from './cow';
let $interval;
class Round {
  constructor(roundNumber = 1, cows = 5) {
    this.onClick = this.onClick.bind(this);
    this.$events = [];
    console.log(`Starting round${ roundNumber ? ` #${roundNumber}` : ''}!`);

    const container = document.createElement('div');
    container.setAttribute('id', 'corovan');
    container.style.width = `${cows * EL_SIZE}vw`;
    container.addEventListener('click', this.onClick);
    document.querySelector('body').appendChild(container);
    this.cows = new Array(cows).fill(null).map((item, i) => {
      const cow = new Cow(i + 1);
      container.appendChild(cow.getElement());
      return cow;
    });

    this.$interval = setInterval(this.tick, 1000);
  }

  on(eventName, callback) {
    this.$events.push({ eventName, callback });
  }

  emit(eventName, ...args) {
    const event = this.$events.find(e => e.eventName === eventName);
    if (event) {
      event.callback(...args);
    }
  }

  tick() {
    console.log('tick');
    document.querySelectorAll('#corovan .rac-el').forEach((item, i) => {
      if (item.style.top.startsWith('-')) {
        item.style.top = item.style.top.substring(1);
      } else {
        item.style.top = `-${item.style.top}`;
      }
    });
  }

  onClick(e) {
    e.preventDefault();
    clearInterval(this.$interval);
    document.querySelectorAll('#corovan .rac-el').forEach((item, i) => {
      item.style.transform = 'rotateY(180deg)';
    });
    console.log('Robbed!')
  }
}

export default Round;