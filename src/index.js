import Round from './classes/round';
import { GAME_ROOT_ID, COWS_AMOUNT } from './constants';

const game = {
  start({
    rounds = 10,
  } = {}) {
    const rootExist = document.querySelector(`#${GAME_ROOT_ID}`);
    if (rootExist) {
      rootExist.innerHTML = '';
    } else {
      const gameRoot = document.createElement('div');
      gameRoot.setAttribute('id', GAME_ROOT_ID);
      document.body.appendChild(gameRoot);
    }
    
    const nextRound = (roundCount = 1) => {
      const round = new Round(roundCount, COWS_AMOUNT);
      round.on('roundEnded', () => {
        if (roundCount < rounds - 1) {
          nextRound(roundCount + 1);
        } else {
          console.info('All corovans were robbed, try to play as palace guard next time');
          const winScreen = document.createElement('div');
          winScreen.style.cssText = `
            position: absolute;
            backgound: #fff;
            padding: 20px;
            top: 0;
            left: 50%;
          `;
          const winScreenText = document.createElement('p');
          winScreenText.style.cssText = `
            position: relative;
            left: -50%;
            font-family: "Courier New", serif;
            font-size: 24px;
            color: #000;
          `;
          winScreenText.innerText = `all corovans are robbed! play again?`;
          const buttonStyle = `
            display: block;
            color: black;
          `
          const replayButton = document.createElement('a');
          replayButton.setAttribute('href', '#');
          replayButton.innerText = 'yes';
          replayButton.addEventListener('click', () => this.start(rounds));
          replayButton.style.cssText = buttonStyle;
          winScreenText.appendChild(replayButton);
          const cancelButton = document.createElement('a');
          cancelButton.setAttribute('href', '#');
          cancelButton.innerText = 'no';
          cancelButton.addEventListener('click', this.stop);
          cancelButton.style.cssText = buttonStyle;
          winScreenText.appendChild(cancelButton);
          winScreen.appendChild(winScreenText);
          document.querySelector(`#${GAME_ROOT_ID}`).appendChild(winScreen);
        }
      });
    }
  
    nextRound();
  },

  stop() {
    console.log('Game stopped, have a nice day');
    document.querySelector(`#${GAME_ROOT_ID}`).remove();
  }
}

export default game;