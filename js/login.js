

mui(".mui-slider").slider({
    interval: 0
  });


$(function(){
    var search = sessionStorage.getItem('search');
    console.log(search)    
    //变幻样式
    $('.loginHead a').on('tap',function(){
        $(this).addClass('border_login').siblings('a').removeClass("border_login");
        console.log($(this).siblings())
        
    })
    //判断文字知否合法
    function Number(theObj) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
        if (reg.test(theObj)) {
          return true;
        }
        return false;
    }
    $('.message_pay').on('tap',function(){
        // console.log('呵呵')
        var username = $('.username').val();
        var password = $('.password').val();
        // console.log(username)
        // console.log(password)
        if(!username){
            mui.alert('请输入用户名')
        }else if(!password){
            mui.alert('请输入密码')
        }else if(!Number(username)){
            mui.alert('您输入的手机号不合法')
        }
        else{
            $.ajax({
                url:'http://api.carlub.com.cn/userLogin',
                type:'post',
                data:{
                    user_name : username,
                    password : password
                },
                // headers:{"userauthkey":token},
                success:function(data){
                    console.log(data);
                    // console.log(data.msg);
                    var token = data.data.userauthkey;
                    var user_id = data.data.info.user_id;
                    console.log(user_id);
                    
                    if(!data.result){
                        mui.toast(data.msg)
                    }else{
                        // if(!search){
                            sessionStorage.setItem('userauthkey',token)
                            sessionStorage.setItem('user_id',user_id)
                            
                            location.href = 'index.html' ;
                        // } else{
                        //     sessionStorage.removeItem('search');
                        //     location.href = ''+search ;
    
                        // }
                    }
                    // if toast
                    // var token = data.data.userauthkey;
                    // sessionStorage.setItem('userauthkey',token)
                    
                    // if(!search){
                    //     location.href = 'index.html' ;
                    // } else{
                    //     sessionStorage.removeItem('search');
                    //     location.href = ''+search ;

                    // }
                },
                // error:function(msg){
                //     mui.alert(msg.msg) //没用
                // }
            })
        }
        
    })

    //跳转注册页面
    $('.registry').on('tap',function(){
        location.href = './registry.html'
    })
})