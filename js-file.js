
document.addEventListener('DOMContentLoaded', function() {
    const characters = document.querySelectorAll('.character');
    const startButton = document.getElementById('start-game');
    const characterSelection = document.querySelector('.character-selection');
    const gameContent = document.querySelector('.game-content');

    let selectedCharacter = null;

    characters.forEach(character => {
        character.addEventListener('click', () => {
            characters.forEach(c => c.classList.remove('selected'));
            character.classList.add('selected');
            selectedCharacter = character.id;
        });
    });

    startButton.addEventListener('click', () => {
        if (selectedCharacter) {
            characterSelection.style.display = 'none';
            gameContent.style.display = 'block';
            const selectedCharacterSmallGif = document.getElementById(selectedCharacter).getAttribute('data-gif-small');
            const selectedCharacterLargeGif = document.getElementById(selectedCharacter).getAttribute('data-gif-large');
        
            const characterLargeImage = document.querySelector('.character-image-large img');
            characterLargeImage.src = selectedCharacterLargeGif;
        } else {
            alert('Por favor, selecciona un personaje antes de empezar el juego.');
        }
    });

    let playerWins = 0
    let computerWins = 0
    let totalRounds = 0

    function winner(playerSelection, computerSelection) {
        const tieMessage = 'Empatao desgraciao'
        const loserMessage = 'Perdiste pringao'
        const winnerMessage = 'Ganaste tryharder'
        console.log('Computer chose:', computerSelection);
        if (playerSelection === computerSelection) {
            alert(tieMessage)
        }
        if (playerSelection === 'paper') {
            if (computerSelection === 'scissors') {
                alert(loserMessage)
                computerWins = +1
            }
            if (computerSelection === 'rock') {
                alert(winnerMessage)
                playerWins = +1
            }
        }
        if (playerSelection === 'scissors') {
            if (computerSelection === 'rock') {
                alert(loserMessage)
                computerWins = +1
            }
            if (computerSelection === 'paper') {
                alert(winnerMessage)
                playerWins = +1
            }
        }
        if (playerSelection === 'rock') {
            if (computerSelection === 'paper') {
                alert(loserMessage)
                computerWins = +1
            }
            if (computerSelection === 'scissors') {
                alert(winnerMessage)
                playerWins = +1
            }       
        }
    }


    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors']
        const randomIndex = Math.floor (Math.random() * choices.length);
        return choices[randomIndex]
    }

    function playRound(playerSelection) {
        const computerSelection = getComputerChoice();
        winner(playerSelection, computerSelection);
        totalRounds++;

        if (totalRounds === 5) {
            showWinner(); // After 5 rounds, announce the winner
            resetGame();
        }
    }


    function showWinner() {
        if (playerWins > computerWins) {
            console.log('Player wins', 'player:', playerWins);
        } else if (computerWins > playerWins) {
            console.log('Computer wins', 'computer:', computerWins);
        } else {
            console.log('It\'s a tie');
        }
    }

    function resetGame() {
        playerWins = 0;
        computerWins = 0;
        totalRounds = 0;
    }

    document.getElementById('rock').addEventListener('click', function() {
        playRound('rock');
    });

    document.getElementById('paper').addEventListener('click', function() {
        playRound('paper');
    });

    document.getElementById('scissors').addEventListener('click', function() {
        playRound('scissors');
    });

    document.getElementById('playMusic').addEventListener('click', function() {
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();
    });

});

        
    