var globalURL = 'http://dealer.ivesy.com.au/';
var intervalObject = null;
var game_id = null;
var status = null;
var main_div = null;

$(document).ready(function(){
    findGame();
    main_div = $('#main_div');
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
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){
                        window.location.href = '../home.html';
                    }, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){

        }
    });
}

function setupGame(){
    checkTurn();
    startInterval();
    //Here the array will have the number of cards and the counts so you can make it look pretty
}

function stopInterval(){
    if(intervalObject != null){
        clearInterval(intervalObject);
    }
}

function startInterval(){
    intervalObject = setInterval(function(){
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
            } else if(response['success']){
                if(response['your_turn']){
                    if(status == null || status != 'turn'){
                        status = 'turn';
                        setupUserTurn();
                        stopInterval();
                    }
                } else if(response['dealer']){
                    if(status == null || status != 'dealer'){
                        status = 'dealer';
                        setupDealerTurn();
                        stopInterval();
                    }
                } else {
                    //Waiting
                    if(status == null || status != 'nothing'){
                        status = 'nothing';
                    }
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

function setupUserTurn(){

}

function setupDealerTurn(){

}