import Round from './classes/round';

const game = {
  start({
    cows = 5,
    rounds = 10,
  } = {}) {
    console.log('Game started');
    
    function nextRound(roundCount = 0) {
      const round = new Round(roundCount, cows);
      round.on('roundEnded', () => {
        roundCount < rounds - 1 && nextRound(roundCount + 1);
      });
    }

    nextRound();
  },

  stop() {
    console.log('Game stopped, have a nice day');
  }
}

export default game;