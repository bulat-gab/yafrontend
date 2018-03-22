$(document).ready(function(){
    console.log('ready!');

    $('.card').click(function(){
        /* $(".card").flip(); */

        var $card = $(this);

        if($card.hasClass('flipped')){
            $card.removeClass('flipped');
            $card.css({'transform':'rotateY(0deg)'});
        }
        else{
            $card.css({'transform':'rotateY(180deg)'});
             $card.addClass('flipped')
        }
    })
});

document.querySelector('button').addEventListener('click', () => {
    let cardsToggle = Array.from(document.querySelectorAll('.card'));
    cardsToggle.forEach(card => {

        if(card.classList.contains('flipped')){
            card.classList.remove('flipped');
            card.style.transform = 'rotateY(0deg)';
        }
        else{
            card.style.transform = 'rotateY(180deg)';
             card.classList.add('flipped');
        }
    })
})


const emoji = [['dog', '🐶'], ['panda', '🐼'], ['cow', '🐮']
, ['octopus', '🐙'], ['monkey', '🐵'], ['peacock', '🦃']]
var emojiMap = new Map(emoji);

let cardsWrapper = document.querySelector('.cards-wrapper');
let cards = Array.from(document.querySelectorAll('.card'));
console.log(cards)





document.body.onload = startGame();

function startGame(){
    shuffle(cards);
    //cardsWrapper.innerHTML = cards;
    updatePicture(cards);
    cardsWrapper.innerHTML = '';
    cards.forEach(card => {
        cardsWrapper.appendChild(card);
    })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function updatePicture(cards){
    cards.forEach(card => {
        let cardClass = card.classList[1];
        card.querySelector('.back').innerHTML = emojiMap.get(cardClass);
    });
}