var globalURL = 'http://dealer.ivesy.com.au/';

$(document).ready(function(){
    findGames();
    setupInterval();

    $('#create_game_btn').click(function(){
        var btn = $(this);
        btn.addClass('disabled').html('<i class="fa fa-spinner fa-spin"></i> Creating Game');

        $.ajax({
            url: globalURL+'Games/createGame',
            dataType: 'json',
            type: 'POST',
            success: function(response){
                if(response['success']){
                    var game = response['game'];

                    var html =
                        '<div class="row">'+
                        '<div class="col-xs-6">'+
                        '<strong>Game Owner</strong><br>'+
                        game['Owner']['username']+
                        '</div>'+
                        '<div class="col-xs-6 text-right">'+
                        '<button class="btn btn-warning btn-sm start_game" game_id="'+game['Game']['id']+'">Start Game</button>'+
                        '<br>1 Player(s)'+
                        '</div>'+
                        '</div><hr>';

                    $('#gamesDiv').prepend(html);

                    $('.start_game').unbind('click').bind('click',function(){
                        startGame($(this).attr('game_id'));
                    });

                } else if(response['logged_in'] == false){
                    navigator.notification.alert('AH FUCK! You\'ve been logged out.',
                        function(){
                            window.location.href = '../index.html';
                        }, 'Mother Fuck!', 'Ok');
                } else {
                    navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                        function(){}, 'Clammy Vaginal Warts have appeared!', 'Ok');
                }
            },
            error: function(){
                navigator.notification.alert('GET SOME FUCKN INTERNET YOU DIRTY NIGGA',
                    function(){}, 'Error', 'Ok');
            },
            complete: function(){
                btn.removeClass('disabled').html('Create Game');
            }
        });
    });
});

function setupInterval(){
    setInterval(function(){
        findGames();
    }, 5000);
}

function findGames(){
    $.ajax({
        url: globalURL+'Games/getActiveGames',
        dataType: 'json',
        type: 'GET',
        success: function(response){
            if(response['success']){
                var html = '';

                $.each(response['games'], function(index, game){
                    var status = '';

                    if(game['Game']['status'] == 1){
                        if(game['owned'] === true){
                            status = '<button class="btn btn-warning btn-sm start_game" game_id="'+game['Game']['id']+'">Start Game</button>';
                        } else if(game['join'] === true) {
                            status = '<button class="btn btn-info btn-sm join_game" game_id="'+game['Game']['id']+'">Join Game</button>';
                        } else {
                            status = '<span class="label label-primary">Waiting for Players</span>';
                        }
                    } else if(game['Game']['status'] == 2){
                        status = '<span class="label label-info">In Progress</span>';
                    }
                    html +=
                        '<div class="row">'+
                            '<div class="col-xs-6">'+
                                '<strong>Game Owner</strong><br>'+
                                game['Owner']['username']+
                            '</div>'+
                            '<div class="col-xs-6 text-right">'+
                                status+
                                '<br>'+game['number_of_games']+' Player(s)'+
                            '</div>'+
                        '</div><hr>';
                });

                $('#gamesDiv').empty().append(html);

                $('.start_game').unbind('click').bind('click',function(){
                    startGame($(this).attr('game_id'));
                });
                $('.join_game').unbind('click').bind('click',function(){
                    joinGame($(this).attr('game_id'));
                });
            } else {
                navigator.notification.alert('This cunt of an app has fucked you. If you want the vaginal warts, try again..',
                    function(){}, 'Clammy Vaginal Warts have appeared!', 'Ok');
            }
        },
        error: function(){
            navigator.notification.alert('GET SOME FUCKN INTERNET YOU DIRTY NIGGA',
                function(){}, 'Error', 'Ok');
        },
        complete: function(){
            //btn.removeClass('disabled').html('Create Game');
        }
    });
}

function startGame(game_id){
    $.ajax({
        url: globalURL+'Games/startGame',
        dataType: 'json',
        type: 'POST',
        data: {
            game_id: game_id
        },
        success: function(response){
            if(response['success']){
                //Here we progress to the next stage so we can actually start the game
                localStorage.current_game_id = game_id;
                window.location.href = 'game.html';
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

function joinGame(game_id){
    $.ajax({
        url: globalURL+'Games/joinGame',
        dataType: 'json',
        type: 'POST',
        data: {
            game_id: game_id
        },
        success: function(response){
            if(response['success'] === true){
                //Here we progress to the next stage so we can actually start the game
                localStorage.current_game_id = game_id;
                window.location.href = 'game.html';
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