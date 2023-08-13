document.addEventListener('DOMContentLoaded', function () {
    const characters = document.querySelectorAll('.character');
    const startButton = document.getElementById('start-game');
    const characterSelection = document.querySelector('.character-selection');
    const gameContent = document.querySelector('.game-content');
    const optionsImages = document.querySelectorAll('.options img');
    const roundNumber = document.getElementById('round-number');
    const gameResult = document.getElementById('game-result');
    const playerCharacter = document.getElementById('player-character');
    const computerCharacter = document.getElementById('computer-character');
    const resetButton = document.getElementById('reset-button');
    const playAgainButton = document.getElementById('play-again-button');
    const playMusicButton = document.getElementById('playMusic');
    

    let canPlay = true;
    let totalRounds = 0;
    let playerScore = 0;
    let computerScore = 0;

    optionsImages.forEach(image => {
        image.addEventListener('click', () => {
            if (canPlay && totalRounds < 5) {
                canPlay = false;

                const machineChoice = getComputerChoice();

                const computerChoiceImage = document.createElement('img');
                computerChoiceImage.src = `bison_${machineChoice}.png`;
                computerChoiceImage.classList.add('selected-image');
                computerCharacter.appendChild(computerChoiceImage);

                const playerChoiceImage = document.createElement('img');
                playerChoiceImage.src = image.src;
                playerChoiceImage.classList.add('selected-image');
                playerCharacter.appendChild(playerChoiceImage);

                playRound(image.id, machineChoice);
            }
        });
    });

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
            alert('Please choose a character before starting the game.');
        }
    });

    function winner(playerSelection, computerSelection) {
        const tieMessage = 'Tie';
        const loserMessage = 'You lose';
        const winnerMessage = 'You win';
        console.log('Computer chose:', computerSelection);

        if (playerSelection === computerSelection) {
            alert(tieMessage);
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            alert(winnerMessage);
            playerScore++;
        } else {
            alert(loserMessage);
            computerScore++;
        }
    }

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playRound(playerSelection, machineSelection) {
        winner(playerSelection, machineSelection);
        totalRounds++;

        roundNumber.textContent = `${playerScore}-${computerScore}`;

        if (totalRounds === 5) {
            showWinner();
            canPlay = false;
        } else {
            canPlay = true;
        }
    }

    function showWinner() {
        let resultMessage = '';
        if (playerScore > computerScore) {
            resultMessage = 'You Win';
        } else if (computerScore > playerScore) {
            resultMessage = 'You Lose';
        } else {
            resultMessage = 'It\'s a Tie';
        }
        gameResult.textContent = resultMessage;
        gameResult.style.display = 'block';
        resetButton.style.display = 'block';
        playAgainButton.style.display = 'block';
    }

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    playAgainButton.addEventListener('click', () => {
        playAgain();
    });


    playMusicButton.addEventListener('click', function () {
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();
    });


    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        totalRounds = 0;
        canPlay = true;
        roundNumber.textContent = '0-0';
        gameResult.style.display = 'none';
        resetButton.style.display = 'block';
        playAgainButton.style.display = 'block';

        playerCharacter.innerHTML = '';
        computerCharacter.innerHTML = '';
    }

    function playAgain() {
        resetGame();

        characterSelection.style.display = 'block';
        gameContent.style.display = 'none';
    }
});










        
    