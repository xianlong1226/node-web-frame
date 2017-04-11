$(function() {
    $('#btn_login').click(function() {
        AjaxPost('/login/login1', {
            username: $('#txt_name').val(),
            password: "123"
        });
    })
})