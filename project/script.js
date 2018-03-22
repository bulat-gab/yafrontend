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

document.querySelector('button').addEventListener('click', () => {
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

function debug(){
    let cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(card => {
        let back = card.querySelector('.back');
        let front = card.querySelector('.front');

        front.innerHTML = back.innerHTML;
    });
};
document.addEventListener('click', debug());

const emoji = [['dog', '🐶'], ['panda', '🐼'], ['cow', '🐮']
, ['octopus', '🐙'], ['monkey', '🐵'], ['peacock', '🦃']]
var emojiMap = new Map(emoji);

let cardsWrapper = document.querySelector('.cards-wrapper');
let cards = Array.from(document.querySelectorAll('.card'));
let openedCards = [];

document.body.onload = startGame();

function startGame(){
    shuffle(cards);
    updatePicture(cards);
    cardsWrapper.innerHTML = '';
    cards.forEach(card => {
        cardsWrapper.appendChild(card);
    })
};

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

    // Flip card on click
    card.addEventListener('click', () => {
        if(!card.classList.contains('matched') 
        && !card.classList.contains('disabled')){

            if(card.classList.contains('closed')){
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
        console.log('openedCards 1: ', openedCards);
        if(card.classList.contains('matched')|| openedCards[0] === card)
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
    openedCards.forEach(c => {
        c.classList.add('matched');
        c.classList.add('disabled');
        c.querySelector('.back').style.background = 'green';
    });
    openedCards = [];
};

function unmatched(){
    openedCards.forEach(c => {
        c.classList.add('unmatched');
        c.classList.add('disabled');
        c.querySelector('.back').style.background = 'red';
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