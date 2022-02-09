import Round from './classes/round';

const game = {
  start({
    cows = 5,
    rounds = 10,
  } = {}) {
    console.log('Game started');
    
    function nextRound(roundCount = 1) {
      const round = new Round(roundCount, cows);
      round.on('roundEnded', () => {
        if (roundCount < rounds - 1) {
          nextRound(roundCount + 1);
        } else {
          console.info('All corovans were robbed, try to play as palace guard next time');
        }
      });
    }

    nextRound();
  },

  stop() {
    console.log('Game stopped, have a nice day');
  }
}

export default game;