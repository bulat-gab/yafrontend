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