var globalURL = 'http://dealer.ivesy.com.au/';
var intervalObject = null;

$(document).ready(function(){
    var game = JSON.parse(localStorage.current_game || '{}');

    if(!$.isEmptyObject(game)){
        setupGame(game);
    } else {
        //Send the user back to the home page
        window.location.href = 'home/html';
    }
});

function setupGame(game){
    //check if game is in progress or needs to start

    $('#start_game').unbind('touchstart').bind('touchstart', function(){
        startGame(game);
    });

    startInterval();

    //Here the array will have the number of cards and the counts so you can make it look pretty
}

function startGame(game){
    $.ajax({
        url: globalURL+'Games/startGame',
        dataType: 'json',
        type: 'POST',
        data: {
            game_id: game['Game']['id']
        },
        success: function(response){
            if(response['success']){
                //Here we progress to the next stage so we can actually start the game
            } else {
                navigator.notification.alert('Well.. Fuck. Sorry about that. Try again?',
                    function(){}, 'Drink a shot', 'Ok');
            }
        },
        error: function(){
            navigator.notification.alert('This cunt of an app has fucked you. If you want the genital warts, try again..',
                function(){}, 'Clammy Genital Warts have appeared!', 'Ok');
        }
    });
}

function startInterval(){
    intervalObject = setInterval(function(){
        $.ajax({
            url: globalURL+'Games/checkTurn',
            dataType: 'POST',
            type: 'POST',
            data: {
                game_id: game['Game']['id']
            },
            success: function(response){
                if(response['logged_in'] == false){
                    navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                        function(){
                            window.location.href = '../index.html';
                        }, 'Mother Fuck!', 'Ok');
                } else if(response['success']){
                    if(response['your_turn']){
                        //change the screen or whatever here. Probably move back to another screen to pick the cards or whatever

                        //First stop the interval
                        stopInterval();
                    }
                } else {
                    navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                        function(){}, 'Clammy Vaginal Warts have appeared!', 'Ok');
                }
            },
            error: function(){

            }
        });
    }, 5000);
}

function stopInterval(){
    if(intervalObject != null){
        clearInterval(intervalObject);
    }
}