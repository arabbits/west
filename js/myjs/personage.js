
$(function(){
    var userObj = sessionStorage.getItem('userObj');
    userObj = JSON.parse(userObj);
    var userPicture = userObj.userPicture;
    var user_name = userObj.user_name;
    var loginphone = userObj.loginphone;
    var email = userObj.email;
    if(email!=='null'){
        $('.email').val(email);
    }
    $('.photo img').attr('src',userPicture)
    $('#perName').val(user_name)
    $('.iPone').text(loginphone)
    $('.perList .email').on('focus',function(){
        console.log('hh')
        $(this).css('text-align','start')
    })
    $('.perList .email').on('blur',function(){
        $(this).css('text-align','end')
    })

    function CheckMail(theObj) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    }

    //点击保存
    $('.faNew').on('tap',function(){
        var emails = $('.email').val()
        if(emails ==email || !emails){
            console.log('哈哈')
            location.href='/myself.html'
        }
        if(!CheckMail(emails)){
            mui.toast('邮箱格式不合法')
        }else{
            $.ajax({
                url:api+'indexUserEditEmail',
                headers:{'userauthkey':token},
                type:'post',
                data:{
                    user_id:user_id,
                    email:emails
                },
                success:function(data){
                    console.log(data);
                    if(data.result){
                        userObj.email =emails 
                        sessionStorage.setItem('userObj',JSON.stringify(userObj));
                        location.href = '/myself.html'
                    }else{
                        mui.toast(data.msg)
                    }
                }
            })
        }
    })

})