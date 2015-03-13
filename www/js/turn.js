var globalURL = 'http://dealer.ivesy.com.au/';
var game_id = null;
var first_go = null;
var current_card = null;

$(document).ready(function(){
    findGame();
});

function findGame(){
    $.ajax({
        url: globalURL+'Games/getCurrentGame',
        dataType: 'json',
        type: 'POST',
        success: function(response){
            if(response['logged_in'] == false){
                navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                    function(){
                        window.location.href = '../index.html';
                    }, 'Mother Fuck!', 'Ok');
            } else if(response['success']){
                game_id = response['game_id'];
                setupGame();
            } else if(response['over']) {
                navigator.notification.alert('Game Over MAN',
                    function(){
                        window.location.href = 'home.html';
                    }, 'Do a shot', 'Ok');
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){
                        window.location.href = 'home.html';
                    }, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}

function setupGame(){
    check();
}

function check(){
    $.ajax({
        url: globalURL+'Games/checkTurn',
        dataType: 'json',
        type: 'POST',
        data: {
            game_id: game_id
        },
        success: function(response){
            if(response['logged_in'] == false){
                navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                    function(){
                        window.location.href = '../index.html';
                    }, 'Mother Fuck!', 'Ok');
            } else if(response['success'] && response['your_turn']) {
                current_card = response['current_card'];
                console.log(response);
                console.log(current_card);
                //Update number
                var cardsAvailable = response['remaining_cards'];

                $.each(cardsAvailable, function(i, card){
                    $('button[card_value="'+card['Card']['value']+'"]').removeClass('disabled');
                });

                $('.card_btn').unbind('click').bind('click',function(){
                    var btn = $(this);

                    if(first_go == null){
                        first_go = btn.attr('card_value');

                        if(btn.attr('card_value') < current_card['Card']['value']){
                            navigator.notification.alert('HIGHER!',
                                function(){
                                    btn.addClass('disabled');
                                }, 'HO', 'K');
                        } else if(btn.attr('card_value') > current_card['Card']['value']){
                            navigator.notification.alert('LOWER!',
                                function(){
                                    btn.addClass('disabled');
                                }, 'O', 'K');
                        } else {
                            navigator.notification.alert('CORRECT!!!! DEaLER DrisnKs '+btn.attr('card_value')+' Drisnaks!! Woohosaoo',
                                function(){
                                    var drinks = btn.attr('card_value');
                                    correctGuess(drinks);
                                }, 'YA', 'AY');
                        }
                    } else {
                        if(btn.attr('card_value') == current_card['Card']['value']){
                            var drinks = Math.abs(current_card['Card']['value'] - first_go);

                            navigator.notification.alert('CORRECT!!!! DEaLER DrisnKs '+drinks+' Drisnaks!! Woohosaoo',
                                function(){
                                    correctGuess(drinks);
                                }, 'Well Done', 'Sirrrr');
                        } else {
                            var drinks = Math.abs(current_card['Card']['value'] - btn.attr('card_value'));

                            navigator.notification.alert('Fucka youuZuuuUu! DRINnNK '+drinks+' DRaaNKS NeN SHITe',
                                function(){
                                    incorrectGuess(drinks);
                                }, 'Suk', 'SHIT');
                        }
                    }
                });
            } else if(response['over']) {
                navigator.notification.alert('Game Over MAN',
                    function(){
                        window.location.href = 'home.html';
                    }, 'Do a shot', 'Ok');
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){
                        window.location.href = 'game.html';
                    }, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}

function correctGuess(drinks){
    $.ajax({
        url: globalURL+'Games/correctChoice',
        dataType: 'json',
        type: 'POST',
        data: {
            drinks: drinks,
            game_id: game_id
        },
        success: function(response){
            if(response['logged_in'] == false){
                navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                    function(){
                        window.location.href = '../index.html';
                    }, 'Mother Fuck!', 'Ok');
            } else if(response['success']){
                window.location.href = 'game.html';
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){
                        window.location.href = 'home.html';
                    }, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}

function incorrectGuess(drinks){
    $.ajax({
        url: globalURL+'Games/incorrectChoice',
        dataType: 'json',
        type: 'POST',
        data: {
            drinks: drinks,
            game_id: game_id
        },
        success: function(response){
            if(response['logged_in'] == false){
                navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                    function(){
                        window.location.href = '../index.html';
                    }, 'Mother Fuck!', 'Ok');
            } else if(response['success']){
                window.location.href = 'game.html';
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){
                        window.location.href = 'home.html';
                    }, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}