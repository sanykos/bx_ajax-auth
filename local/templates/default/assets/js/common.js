$(function() {
    // $('.loginModal .modal-registration-btn').attr('href', '#').attr('data-target', '#registerModal').attr('data-toggle', 'modal');
    // $('.loginModal .modal-registration-btn').on('click', () => $('#loginModal').modal('hide'));

    // $('.registerModal .modal-login-btn').attr('href', '#').attr('data-target', '#loginModal').attr('data-toggle', 'modal');
    // $('.registerModal .modal-login-btn').on('click', () => $('#registerModal').modal('hide'));

    // Форма авторизации
    $('body').on('submit', '.bx-system-auth-form form', function() {
        $form  = $(this);
        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json',
            success: function(data) {
               // console.log(data);
                if(data.type == 'error') {
                    console.log(data.message);
                }else {
                    window.location = window.location;
                   // console.log(data);
                }
            }
        });
        return false;
    })

    // Форма регистрации
    $('body').on('submit', 'form.registration-form', function() {
        $.ajax({
            type:'POST',
            url: '/local/templates/agrolavka/ajax/registration.php',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err)
            }
        });
        return false;
    });


    // Для капчи
    $(".capcha-button").click(function(){
		$.getJSON('/local/templates/agrolavka/ajax/captcha_update.php', function(data) {
                $('.capcha_img img').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data);
                $('.captcha_sid').val(data);
         });
         return false;
	})
});