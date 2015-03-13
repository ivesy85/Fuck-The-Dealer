var globalURL = 'http://dealer.ivesy.com.au/';

$(document).ready(function(){
    loadLogin();
});

function loadLogin(){
    var login_button = $('#login_btn');

    $('input').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            login_button.trigger('click');
        }
    });

    login_button.click(function(){
        var usernameInput = $('input[name="data[User][username]"]');
        var passwordInput = $('input[name="data[User][password]"]');

        //Clear any tokens already in local storage
        //chrome.storage.local.set({'token': null},function(){});

        var continueLogin = true;

        if(usernameInput.val() == ''){
            usernameInput.closest('.form-group').addClass('has-error');
            continueLogin = false;
        }
        if(passwordInput.val() == ''){
            passwordInput.closest('.form-group').addClass('has-error');
            continueLogin = false;
        }

        if(continueLogin){
            //Disable button and show spinner
            login_button.addClass('disabled').html('<i class="fa fa-fw fa-circle-o-notch fa-spin"></i> Signing in...');

            /*var newheaders = [];
             newheaders['Access-Control-Allow-Origin'] = '*';*/

            // Declare the form
            var form = $('#UserLoginForm');
            // Get the data from the form
            var data = form.serialize();

            $.ajax({
                type: form.attr('method'),
                url: globalURL+'Users/login',
                data: data,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if(response['success']){
                        window.location.href = 'html/home.html';
                    } else if (response['success'] == false && response['new_user']){
                        navigator.notification.confirm(
                            'This user doesn\'t exist, Would you like to create it?',
                            confirmSubmission,
                            'Warning',
                            ['Submit','Cancel']
                        );
                    } else {
                        //Activate modal and display message
                        login_button.removeClass('disabled').html('Login');
                        navigator.notification.alert(response['message'],
                            function(){}, 'Error', 'Dismiss');
                    }
                },
                error: function (e) {
                    console.log(e);
                    //Activate modal and display message
                    navigator.notification.alert('GET SOME FUCKN INTERNET YOU DIRTY NIGGA',
                        function(){}, 'Error', 'Ok');
                },
                complete: function(){
                    login_button.removeClass('disabled').html('Login');
                }
            });
        }
    });
}

function confirmSubmission(btnIndex){
    var login_button = $('#login_btn');

    if(btnIndex == 1){
        var form = $('#UserLoginForm');
        // Get the data from the form
        var data = form.serialize();

        $.ajax({
            type: form.attr('method'),
            url: globalURL+'Users/createNewUser',
            data: data,
            dataType: 'json',
            success: function (response) {
                if(response['success']){
                    window.location.href = 'html/home.html';
                } else {
                    //Activate modal and display message
                    navigator.notification.alert('Oh cunt thats wrong! Nicks not gonna get drunk with that bullshit!',
                        function(){}, 'Error', 'Dismiss');
                }
            },
            error: function (e) {
                console.log(e);
                //Activate modal and display message
                navigator.notification.alert('An error has occurred. Please check your internet connection and try again.',
                    function(){}, 'Error', 'Ok');
            },
            complete: function(){
                login_button.removeClass('disabled').html('Login');
            }
        });
    } else {
        login_button.removeClass('disabled').html('Login');
    }
}

