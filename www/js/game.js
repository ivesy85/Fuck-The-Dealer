var globalURL = 'http://dealer.ivesy.com.au/';

$(document).ready(function(){
    $('#create_game_btn').click(function(){
        var btn = $(this);
        btn.addClass('disabled').html('<i class="fa fa-spinner fa-spin"></i> Creating Game');

        $.ajax({
            url: globalURL+'Games/createGame',
            dataType: 'json',
            type: 'POST',
            success: function(response){
                if(response['success']){
                    window.location.href = '../game.html?game_id='+response['game']['Game']['id'];
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