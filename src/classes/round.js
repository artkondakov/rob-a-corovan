import Cow, { EL_SIZE, ROTATE_ANIMATION_TIME } from "./cow";

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
class Round {
  constructor(roundNumber = 1, cows = 5, zIndex = 10000) {
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.$events = [];
    this.$rootID = "corovan";
    // 0 - horizontal, 1 - vertical
    this.direction = randomFromTo(0, 1);

    console.log(`Starting round${roundNumber ? ` #${roundNumber}` : ""}!`);

    const elSize = Math.round(window.devicePixelRatio);
    this.$container = document.createElement("div");
    this.$container.setAttribute("id", this.$rootID);
    this.$container.style.cssText = `
      width: ${this.direction ? cows * elSize : elSize}vw;
      height: ${this.direction ? elSize: cows * elSize}vw;
      cursor: grab;
      position: absolute;
      z-index: ${zIndex};
      left: ${randomFromTo(1, 99 - cows)}vw;
      top: ${randomFromTo(1, 99)}vh;
    `;
    this.$container.addEventListener("click", this.onClick);
    document.querySelector("body").appendChild(this.$container);
    this.cows = new Array(cows).fill(null).map((item, i) => {
      const cow = new Cow({
        index: i + 1,
        elSize,
        parentNodeId: this.$rootID,
        direction: this.direction,
      });
      // this.$container.appendChild(cow.getElement());
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
    document.querySelectorAll(`#${this.$rootID} .rac-el`).forEach((item) => {
      item.style.transform = "rotateY(180deg)";
    });
    // console.log('Robbed!');
    this.$container.removeEventListener("click", this.onClick);
    setTimeout(() => {
      this.$container.remove();
      this.emit("roundEnded");
    }, ROTATE_ANIMATION_TIME * 2);
  }
}

export default Round;
