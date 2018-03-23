/* $(document).ready(function(){
    console.log('ready!');

    $('.card').click(function(){

        var $card = $(this);

        if($card.hasClass('closed')){
            $card.removeClass('closed');
            $card.css({'transform':'rotateY(180deg)'});
        }
        else{
            $card.css({'transform':'rotateY(0deg)'});
             $card.addClass('closed')
        }
    })
}); */

document.querySelector('.flip-all').addEventListener('click', () => {
    let cardsToggle = Array.from(document.querySelectorAll('.card'));
    cardsToggle.forEach(card => {

        if(card.classList.contains('closed')){
            card.classList.remove('closed');
            card.style.transform = 'rotateY(180deg)';
        }
        else{
            card.style.transform = 'rotateY(0deg)';
            card.classList.add('closed');
        }
    })
});

document.querySelector('.instant-win').addEventListener('click', () => {
    win();
});

function debug(){
    let cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(card => {
        let back = card.querySelector('.back');
        let front = card.querySelector('.front');

        front.innerHTML = back.innerHTML;
    });
};
document.addEventListener('click', debug());

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
let winPopup = document.querySelector('.win-popup');
let losePopup = document.querySelector('.lose-popup');

document.body.onload = startGame();

document.querySelector('.play-again-button').addEventListener('click', () => {
    startGame();
});

document.querySelector('.try-again-button').addEventListener('click', () => {
    startGame();
});

function startGame(){
    clearCards();

    overlay.style.visibility = 'hidden';
    winPopup.style.display = 'none'; 
    losePopup.style.display = 'none';
    timer.style.visibility ='visible';

    shuffle(cards);
    updatePicture(cards);
    cardsWrapper.innerHTML = '';
    clearInterval(interval);
    cards.forEach(card => {
        cardsWrapper.appendChild(card);
    });

    moves = 0;
    matched_cards = 0;
    seconds = 3;
};

function clearCards() {
    cards.forEach(card => {
        card.classList.remove('disabled', 'matched', 'unmatched');
        if(!card.classList.contains('closed')){
            card.classList.add('closed');
            card.style.transform = 'rotateY(0deg)';
        }
    })
}

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
    if(firstCard === secondCard)
        return true;
    return false;
};

cards.forEach(card => {
    // Open card on click
    card.addEventListener('click', () => {
        if(!card.classList.contains('matched') 
        && !card.classList.contains('disabled')){

            if(card.classList.contains('closed')){
                console.log(card.classList[1],'opened');
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
                console.log(card.classList[1], 'close');
                card.style.transform = 'rotateY(0deg)';
                card.classList.add('closed');
            }
        };
    });

    // Determine card matches
    card.addEventListener('click', () => {
        console.log('openedCards 1: ', openedCards);
        if(card.classList.contains('matched')|| card.classList.contains('unmatched') 
        || openedCards[0] === card)
            return;

        if(openedCards.length === 2){
            refreshUnmatchedCards();
        }

        openedCards.push(card);
        console.log('openedCards 2: ', openedCards);
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

function matched(){
    console.log('function matched');
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
    console.log('function unmatched');
    openedCards.forEach(c => {
        c.classList.add('unmatched');
        c.classList.add('disabled');
        c.querySelector('.back').style.background = '#F44336';
    });
};

function refreshUnmatchedCards(){
    console.log('function refresh');
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
    timer.innerHTML = '';
    timer.style.visibility = 'hidden';
    clearInterval(interval);
    overlay.style.visibility = 'visible';
    winPopup.style.display = 'block';
}

function lose(){
    timer.innerHTML = '';
    timer.style.visibility = 'hidden';
    clearInterval(interval);
    overlay.style.visibility = 'visible';
    losePopup.style.display = 'block';
}
