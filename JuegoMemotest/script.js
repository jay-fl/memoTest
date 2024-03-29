  // JavaScript para el juego de memoria
  // Define tus cartas aquí, asegúrate de que haya 10 pares
  // JavaScript para el juego de memoria
  // Define tus cartas aquí, asegúrate de que haya 10 pares
  //const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cards = [
      { nombre: 'horse', img: 'horse.png' },
      { nombre: 'dog', img: 'dog.png' },
      { nombre: 'panda', img: 'panda.png' },
      { nombre: 'cat', img: 'cat.png' },
      { nombre: 'rabbit', img: 'rabbit.png' },
      { nombre: 'tiger', img: 'tiger.png' },
      { nombre: 'turtle', img: 'turtle.png' },
      { nombre: 'wolf', img: 'wolf.png' },
      { nombre: 'elephant', img: 'elephant.png' },
      { nombre: 'fish', img: 'fish.png' },
      { nombre: 'horse', img: 'horse.png' },
      { nombre: 'dog', img: 'dog.png' },
      { nombre: 'panda', img: 'panda.png' },
      { nombre: 'cat', img: 'cat.png' },
      { nombre: 'rabbit', img: 'rabbit.png' },
      { nombre: 'tiger', img: 'tiger.png' },
      { nombre: 'turtle', img: 'turtle.png' },
      { nombre: 'wolf', img: 'wolf.png' },
      { nombre: 'elephant', img: 'elephant.png' },
      { nombre: 'fish', img: 'fish.png' }

  ];
  let lives = 10;
  let flippedCards = [];
  let matchedPairs = 0;

  const gameContainer = document.getElementById('game-container');
  const livesDisplay = document.getElementById('lives');
  const resetButton = document.getElementById('reset-button');
  const resultMessage = document.getElementById('result-message');

  // Resto del código JavaScript aquí (el mismo que en el ejemplo anterior)
  // ...


  // Función para barajar las cartas
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // Función para crear el tablero de juego
  function createGameBoard() {
      shuffle(cards);
      for (let i = 0; i < cards.length; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          card.dataset.value = cards[i].img;
          card.innerText = '?'; // Ocultar el contenido inicialmente
          gameContainer.appendChild(card);

          card.addEventListener('click', () => {
              if (flippedCards.length < 2 && !flippedCards.includes(card)) {
                  flipCard(card);
                  flippedCards.push(card);

                  if (flippedCards.length === 2) {
                      setTimeout(checkMatch, 1000);
                  }
              }
          });
      }
  }

  let gameEnded = false; // Variable para controlar si el juego ha terminado

  // ...

  // Función para voltear una carta
  function flipCard(card) {
      if (!gameEnded) {
          card.innerText = card.dataset.value;
          card.classList.add('flipped');
      }
  }

  // Función para verificar si las cartas coinciden
  function checkMatch() {
      if (!gameEnded) {
          const [card1, card2] = flippedCards;

          if (card1.dataset.value === card2.dataset.value) {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              card1.classList.add('matched');
              card2.classList.add('matched');
              matchedPairs++;
              lives++;

              if (matchedPairs === cards.length / 2) {
                  endGame(true);
              }
          } else {
              setTimeout(() => {
                  card1.innerText = '?';
                  card2.innerText = '?';
                  card1.classList.remove('flipped');
                  card2.classList.remove('flipped');
              }, 1000);

              lives--;

              if (lives === 0) {
                  endGame(false);
              }
          }

          livesDisplay.textContent = lives;
          flippedCards = [];
      }
  }

  // Función para terminar el juego
  function endGame(win) {
      if (win) {
          resultMessage.textContent = '¡Has ganado!';
          resultMessage.style.color = 'green';
      } else {
          resultMessage.textContent = '¡Has perdido!';
          resultMessage.style.color = 'red';
      }

      resetButton.disabled = false;
      gameEnded = false; // Marcar el juego como terminado
  }

  // Evento para reiniciar el juego
  resetButton.addEventListener('click', () => {
      gameContainer.innerHTML = '';
      resultMessage.textContent = '';
      lives = 10;
      livesDisplay.textContent = lives;
      matchedPairs = 0;
      resetButton.disabled = true;
      createGameBoard();
  });

  // Inicializar el juego
  createGameBoard();