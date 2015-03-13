var globalURL = 'http://dealer.ivesy.com.au/';
var game_id = null;

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
    checkTurn();

    setInterval(function(){
        checkTurn();
    }, 5000);
}

function checkTurn(){
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
            } else if(response['success']) {
                if (response['your_turn']) {
                    window.location.href = 'turn.html';
                } else if (response['dealer']) {
                    window.location.href = 'dealer.html';
                }
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){}, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}