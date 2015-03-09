var globalURL = 'http://dealer.ivesy.com.au/';

$(document).ready(function(){
    findGames();

    $('#create_game_btn').click(function(){
        var btn = $(this);
        btn.addClass('disabled').html('<i class="fa fa-spinner fa-spin"></i> Creating Game');

        $.ajax({
            url: globalURL+'Games/createGame',
            dataType: 'json',
            type: 'POST',
            success: function(response){
                if(response['success']){
                    localStorage.current_game = JSON.stringify(response['game']);
                    window.location.href = 'game.html';
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
                        status = '<span class="label label-warning">Waiting for Players</span>';
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
                                '<br>'+game['number_of_games']+' Players'+
                            '</div>'+
                        '</div><hr>';
                });

                $('#gamesDiv').empty().append(html);
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