const BLACKJACK_VALUE = 21;

class Blackjack {
    constructor() {
        this.cards = [];
        this.sum = 0;
        this.hasBlackJack = false;
        this.isAlive = false;
        this.message = '';
        this.player = {
            name: 'Patrick',
            chips: 145,
        }

        this.$message = document.querySelector('#message');
        this.$cards = document.querySelector('#cards');
        this.$sum = document.querySelector('#sum');
        this.$startBtn = document.querySelector('#start-btn');
        this.$newCardBtn = document.querySelector('#new-card-btn');
        this.$player = document.querySelector('#player');

        this.addEventListeners();
        this.updatePlayerUI();
    }

    addEventListeners() {
        this.$startBtn?.addEventListener('click', () => this.startGame());
        this.$newCardBtn?.addEventListener('click', () => this.getNewCard());
    }

    startGame() {
        this.cards = [this.getRandomCard(), this.getRandomCard()];
        this.isAlive = true;
        this.hasBlackJack = false;

        this.updateGameUI();
    }

    getNewCard() {
        if (this.isAlive && !this.hasBlackJack) {
            this.cards.push(this.getRandomCard());
    
            this.updateGameUI();
        }
    }

    updateGameUI() {
        this.calculateSum();
        this.updateGameState();
        
        this.$cards.textContent = `Cards: ${this.cards.join(' ')}`;
        this.$sum.textContent = `Sum: ${this.sum}`
        this.$message.textContent = this.message;
    }

    updateGameState() {
        if (this.sum < BLACKJACK_VALUE) {
            this.message = 'Do you want to draw a new card?';
        } else if (this.sum === BLACKJACK_VALUE) {
            this.message = `You've got Blackjack!`;
            this.hasBlackJack = true;
        } else {
            this.message = `You're out of the game!`;
            this.isAlive = false;
        }
    }

    calculateSum() {
        this.sum = this.cards.reduce((acc, card) => acc + card, 0);
    }

    updatePlayerUI() {
        this.$player.textContent = `${this.player.name}: $${this.player.chips}`;
    }

    getRandomCard() {
        const randomNumber = Math.floor(Math.random() * 13) + 1;

        if (randomNumber === 1) {
            return 11;
        } else if (randomNumber > 10) {
            return 10;
        } else {
            return randomNumber;
        }
    }
}

new Blackjack();