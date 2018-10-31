

$(function(){
    
    var userObj = sessionStorage.getItem('userObj');
    console.log(userObj);
    // mui.toast('我的信息')

    if(!userObj){
        mui.alert('您未登陆,请稍候',function(){
            location.href = '/index.html'
        }) 
    }else{
        userObj = JSON.parse(userObj);
        var userPicture = userObj.userPicture;
        var user_name = userObj.user_name;


        $.ajax({
            url:api+"indexGetUserNum",
            headers:{'userauthkey':token},
            type:'post',
            data:{user_id:user_id},
            success:function(data){
                console.log(data)
                if(data.result){
                    $('.vipNum').text(data.clubNum +' 张')
                    $('.kaNum').text(data.cardNum +' 张')
                }
                $('.portraitOne img').attr("src",userPicture);
                $('.portraitName').text(user_name);
                $('.loading').hide();
                $('.che_main').show();
            }
        })  
    }
    
    
    $(".allSuper .cheSuper").on('tap',function(){
        var id = $(this).attr('id');
        sessionStorage.removeItem('yuyueId');
        // console.log(id)
        if(id ==='1'){
            //优惠卷页面
            // mui.toast('优惠券暂不可使用')
            // location.href = './myself/discounts.html' 优惠改成检车单记录
            location.href='./myself/reception.html'

        }else if(id ==='2'){
            //地址管理            
            console.log(id)
            location.href = './myself/address.html'
        }else if(id ==='3'){
            //常见问题
            console.log(id)
            location.href = './myself/problem.html'
        }else if(id ==='4'){
            // 通知列表
            console.log(id)
            location.href = './myself/ation.html'
        }else if(id ==='6'){
            console.log(id)
            location.href = './myself/volume.html'
            
        }else if(id ==='5'){
            console.log("卡卷列表")
            location.href = './myself/volumeList.html'
            
        }else if(id ==='7'){
            console.log("卡卷列表")
            location.href = './myself/myselfVip.html'
            
        }else if(id =='9'){
            mui.confirm('是否取消微信绑定?',function(index){
                if(index.index == 1){
                    $.ajax({
                        url:api+'indexCancelBind',
                        type:'post',
                        headers:{'userauthkey':token},
                        data:{user_id:user_id},
                        success:function(data){
                            console.log(data);
                            if(data.result){
                                mui.alert(data.msg,function(){
                                    sessionStorage.removeItem('userObj');
                                    location.href = "/index.html";
                                })
                            }else{
                                mui.toast(data.msg)
                            }
                        }
                    })
                }
            })
        }else if(id ==='10'){
            console.log("预约列表")
            location.href = './myself/yuyueList.html'
            
        }else if(id ==='11'){
            // console.log("预约列表")
            location.href = './myself/allMoney.html'
            
        }else if(id ==='12'){
            // console.log("预约列表")
            location.href = './myself/arrears.html'
            
        }else if(id ==='13'){
            location.href = './myself/discounts.html'  // 优惠改成检车单记录
            
        }
    })
    $(".proSelf").on('tap',function(){
    //跳转个人页面        
        location.href = './myself/personage.html'
    })
    $(".proAll").on('tap',function(){
    //跳转全部订单        
        
        location.href = './myself/orders.html'
    })
    $(".proCar").on('tap',function(){
    //跳转车辆管理      
        sessionStorage.removeItem('select');
        location.href = './myself/carlist.html'
    })
    $('.icon_right').on('tap',function(){
        $('.redDian').addClass('blackDian')
        location.href="./myself/inform.html"
    })

})