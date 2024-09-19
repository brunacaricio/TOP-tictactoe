const startButton = document.querySelector("#start-button");

startButton.addEventListener('click', => {
  console.log('Hello, world!')
})

function createPlayer(name, marker) {
  return {
    getName() {
      return name;
    },
    getMarker() {
      return marker;
    },
  };
}

const player1 = createPlayer('Bruna', 'X');
const player2 = createPlayer('Computer', 'O');

player1.name = 'Glenn';
console.log(player1.getName(), player1.getMarker());
