import Cow, { EL_SIZE, ANIMATION_TIME } from "./cow";

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
class Round {
  constructor(roundNumber = 1, cows = 5, zIndex = 10000) {
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.$events = [];
    this.$rootID = "corovan";

    console.log(`Starting round${roundNumber ? ` #${roundNumber}` : ""}!`);

    // const elSize = Math.round(window.devicePixelRatio);
    const elSize =
      window.innerWidth <= 720 && window.innerWidth < window.innerHeight
        ? window.innerWidth * 0.1
        : window.innerWidth * 0.05;

    this.$container = document.createElement("div");
    this.$container.setAttribute("id", this.$rootID);
    this.$container.style.cssText = `
      width: ${cows * elSize}px;
      cursor: pointer;
      position: absolute;
      z-index: ${zIndex};
      left: ${randomFromTo(1, 99 - cows)}vw;
      top: ${randomFromTo(1, 99)}vh;
    `;
    this.$container.addEventListener("click", this.onClick);
    document.querySelector("body").appendChild(this.$container);
    this.cows = new Array(cows).fill(null).map((item, i) => {
      const cow = new Cow(i + 1, elSize);
      this.$container.appendChild(cow.getElement());
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
    document.querySelectorAll(`#${this.$rootID} .rac-el`).forEach((item, i) => {
      if (item.style.top.startsWith("-")) {
        item.style.top = item.style.top.substring(1);
      } else {
        item.style.top = `-${item.style.top}`;
      }
    });
  }

  onClick(e) {
    e.preventDefault();
    clearInterval(this.$interval);
    document.querySelectorAll(`#${this.$rootID} .rac-el`).forEach((item) => {
      item.style.transform = "rotateY(180deg)";
    });
    // console.log('Robbed!');
    this.$container.removeEventListener("click", this.onClick);
    setTimeout(() => {
      this.$container.remove();
      this.emit("roundEnded");
    }, ANIMATION_TIME * 2);
  }
}

export default Round;
