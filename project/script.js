const CARDS_NUMBER = 6;
const emoji = [['dog', '🐶'], ['panda', '🐼'], ['cow', '🐮']
, ['octopus', '🐙'], ['monkey', '🐵'], ['peacock', '🦃']]
var emojiMap = new Map(emoji);

let cardsWrapper = document.querySelector('.cards-wrapper');
let cards = Array.from(document.querySelectorAll('.card'));
let openedCards = [];
let moves = 0;
let matched_cards;
let seconds;
let interval;
let timer = document.querySelector('.timer');
let overlay = document.querySelector('.overlay');
let winPopup = document.querySelector('.overlay__win-popup');
let losePopup = document.querySelector('.overlay__lose-popup');

document.body.onload = startGame();

document.querySelectorAll('.overlay__game-end-button').forEach(btn => {
    btn.addEventListener('click', startGame)
});

cards.forEach(card => {
    // Open card on click
    card.addEventListener('click', () => {
        if(!card.classList.contains('matched') 
        && !card.classList.contains('disabled')){

            if(card.classList.contains('closed')){
                moves++;
                if(moves === 1){
                    updateTimer();
                    startTimer();
                }

                card.classList.add('disabled');
                card.classList.remove('closed');
                card.style.transform = 'rotateY(180deg)';
            }
            else{
                
                card.style.transform = 'rotateY(0deg)';
                card.classList.add('closed');
            }
        };
    });

    // Determine card matches
    card.addEventListener('click', () => {
        if(card.classList.contains('matched')|| card.classList.contains('unmatched') 
        || openedCards[0] === card)
            return;

        if(openedCards.length === 2){
            refreshUnmatchedCards();
        }

        openedCards.push(card);
        if(openedCards.length === 2){
            if(isCardsMatched()){
                matched();
            }
            else{
                unmatched();
            }   
        }
    });
});

function startGame(){
    clearCards();
    clearOverlay();
    
    shuffle(cards);
    updatePicture(cards);
    cardsWrapper.innerHTML = '';
    clearInterval(interval);
    cards.forEach(card => {
        cardsWrapper.appendChild(card);
    });

    moves = 0;
    matched_cards = 0;
    seconds = 59;
};

function clearOverlay() {
    overlay.style.visibility = 'hidden';
    winPopup.style.display = 'none'; 
    losePopup.style.display = 'none';
    timer.innerHTML = '';
    timer.style.visibility ='visible';
};

function clearCards() {
    cards.forEach(card => {
        card.classList.remove('disabled', 'matched', 'unmatched');
        if(!card.classList.contains('closed')){
            card.classList.add('closed');
            card.style.transform = 'rotateY(0deg)';
        }
    });
};

function startTimer(){
    interval = setInterval(updateTimer, 1000);
}

function updateTimer(){
     if(seconds === 0) {
        lose();
    }
    timer.innerHTML = seconds;
    seconds--;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function updatePicture(cards){
    cards.forEach(card => {
        let cardClass = card.classList[1];
        card.querySelector('.back').innerHTML = emojiMap.get(cardClass);
    });
};

function isCardsMatched(){
    let firstCard = openedCards[0].classList[1];
    let secondCard = openedCards[1].classList[1];

    return firstCard === secondCard ? true : false;
};

function matched(){
    matched_cards++;
    openedCards.forEach(c => {
        c.classList.add('matched');
        c.classList.add('disabled');
        c.querySelector('.back').style.background = '#5AD66F';
    });
    openedCards = [];

    if(isWin()){
        win();
    }
};

function unmatched(){
    openedCards.forEach(c => {
        c.classList.add('unmatched');
        c.classList.add('disabled');
        c.querySelector('.back').style.background = '#F44336';
    });
};

function refreshUnmatchedCards(){
    openedCards.forEach(card => {
                card.style.transform = 'rotateY(0deg)';
                card.querySelector('.back').style.background = 'white';
                card.classList.add('closed');
                card.classList.remove('disabled');
                card.classList.remove('unmatched');
    });
    openedCards = [];
};

function isWin(){
    return matched_cards === CARDS_NUMBER;
}
function win(){
    clearInterval(interval);
    timer.innerHTML = '';
    timer.style.visibility = 'hidden';
    
    overlay.style.visibility = 'visible';
    winPopup.style.display = 'block';
}

function lose(){
    clearInterval(interval);
    timer.innerHTML = '';
    timer.style.visibility = 'hidden';
    
    overlay.style.visibility = 'visible';
    losePopup.style.display = 'block';
}