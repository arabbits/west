

$(function(){
    //是否阅读协议
    $('.icon-xuanze').on('tap',function(){
        $(this).toggleClass('style')
    })
    // 点击获取验证码
    var api = 'http://api.carlub.com.cn/';
    $('.btnverify').on('tap',function(){
        var that = $(this)
        var phone = $('.iphone').val();
        if(!phone){
            mui.toast('手机号不能为空');
            return false
        }else if(!Number(phone)){
            mui.toast('手机号码不合法!')
            return false
        }else{
            $.ajax({
                url:api+'indexPhoneSms',
                type:'post',
                data:{
                    phone:phone
                },
                success:function(data){
                    console.log(data)
                }
            })
        }
        that.removeClass('btnverify').addClass('spacol');

        var wait=60;
        time(that)  
        function time(that) {
            if (wait == 0) {
                that.removeClass("spacol").addClass('btnverify');   
                that.text("获取验证码");
                wait = 60;
            } else { 
            
                that.text("重新发送(" + wait + "s)") ;
                wait--;
                setTimeout(function() {
                    time(that)
                },1000)
            }
        }      
    })
    // 点击时input框变成text框
    $('.verifys').on('tap','.iconfont',function(){
        $(this).toggleClass('icon-yanjing1')
        if($(this).hasClass('icon-yanjing1')){
            console.log('呵呵')
            $(this).parents('.phone').find('input').attr('type','text');
        }else{
            $(this).parents('.phone').find('input').attr('type','password')
        }
    })
    var clickCoupon = localStorage.getItem('clickCoupon');

    // 验证手机号
    function Number(theObj) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      }
    var userObj = sessionStorage.getItem('userObj');
        userObj = JSON.parse(userObj);
    var openid = userObj.openid;
    var user_name = userObj.user_name;
    var sex = userObj.sex;
    var avatar = userObj.userPicture;
    $('.registryBtn').on('tap',function(){
        var phone = $('.iphone').val();
        var password = $('.pass').val();
        var verify = $('.regisry_verify').val(); //验证码
        console.log(verify)
        if(!phone || !password ||!verify){
            mui.alert('请将信息填写完整')
            return false
        }else if(!Number(phone)){
            mui.alert('手机号码不正确')
            
        }else if(!$('.icon-xuanze').hasClass('style')){
            mui.alert('是否同意车吧族协议')
            
        }else{
            $.ajax({
                url:api+'indexBindingPhone', //绑定手机号的
                type:'post',
                data:{
                    phone : phone,
                    password :password,
                    sex : sex,
                    user_name:user_name,
                    code:verify,
                    openid:openid,
                    avatar:avatar
                },
                success:function(data){
                    console.log(data)
                    console.log(data.msg);
                    if(!data.result){
                        mui.toast(data.msg)
                    }else{
                        
                        mui.toast(data.msg)
                        userObj.token = data.data.userauthkey;
                        userObj.email = data.data.info.email;
                        userObj.user_id = data.data.info.user_id;
                        userObj.loginphone = data.data.info.phone;
                        sessionStorage.setItem('userObj',JSON.stringify(userObj));

                        if(!!clickCoupon){
                            $.ajax({
                                url:api+'indexQueryUserCart',
                                type:'post',
                                headers:{'userauthkey':data.data.userauthkey},
                                data:{
                                    user_id :data.data.info.user_id,
                                },
                                success:function(data){
                                    console.log(data)
                                    if(data.result){
                                        location.href = '/mindex/share.html' ;
                                    }else if(!data.result){
                                        location.href = "/message/message.html";
                                    }
                                }
                            })
                        }else{
                            location.href = '/index.html' ;
                        }
                        
                    }
                }
            })
        }
    })  
})