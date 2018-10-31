$(function(){
    var select = sessionStorage.getItem('select'); //判断是从哪进的 select还是 carlist
    if(select){
        $('.che_main').on('tap',".cart_select",function(){
            var newTime ,all_licen , move,cart_id,chepai;
            cart_id = $(this).parent().data('cart')
            chepai = $(this).find(".cart_licens").text();
            all_licen = $(this).find(".carStar").text();
            move = $(this).find(".move").text();
            newTime = {all_licen:all_licen,move:move,cart_id:cart_id,chepai:chepai};
            console.log('hehe ');
            sessionStorage.setItem('newTime',JSON.stringify(newTime));
            sessionStorage.removeItem('select');
            
            location.href = "/upkeep/upkeep.html";
        })
    }
    $.ajax({
        url:api+"indexListCart",
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            user_id:user_id
        },
        success:function(data){
            console.log(data)
            $('.loading').hide();
            
            if(data.result){
                $('.mui-scroll').html(template('carlist',data));
            }else {
                mui.toast(data.msg+'爱车');
            }
        }
    })
    //点击设置默认地址
    $('.che_main').on('tap','.moren',function(){
        var that = $(this);
        var id =  $(this).parents('.carSname').data('cart')
        console.log(id)
        if($(this).hasClass("morenColor")){

        }else{
            mui.confirm('将此车辆设为默认车辆么?','提示',['否','是'],function(e){
                if(e.index == 1){
                    $.ajax({
                        url:api+"indexSetDefaultCart",
                        type:'post',
                        headers:{'userauthkey':token},
                        data:{
                            user_id:user_id,
                            cart_id:id
                        },
                        success:function(data){
                            console.log(data)
                            if(data.result){
                                that.addClass('morenColor').parents('.carSname').siblings().find('.moren').removeClass('morenColor')
                                mui.toast(data.msg)
                            }else{
                                mui.toast(data.msg)
                                
                            }
                            
                        }
                    })
    
                }
    
            })

        }
        
    })

    //点击编辑
    $('.che_main').on('tap','.che_amend',function(){
        var cart_id = $(this).parents('.carSname').data('cart')
        console.log(cart_id)
        sessionStorage.setItem('cart_id',cart_id)
        sessionStorage.removeItem('All');
        location.href = 'editmycar.html'

    })
    // 点击新增
    $('.message_div').on('tap',function(){
        sessionStorage.removeItem('All');
        location.href="../message/message.html"
    })

    //点击删除
    $('.che_main').on('tap','.che-deli',function(){
        var that = $(this)
        var cart_id = $(this).parents('.carSname').data('cart')
        console.log(cart_id)
        mui.confirm('删除条车辆信息么?','提示',['否','是'],function(e){
            if(e.index == 1){
                $.ajax({
                    url:api+"indexDelCart",
                    type:'post',
                    headers:{'userauthkey':token},
                    data:{
                        user_id:user_id,
                        cart_id:cart_id
                    },
                    success:function(data){
                        console.log(data)
                        if(data.result){
                            that.parents('.carSname').remove()
                            mui.toast(data.msg);
                        }else{
                            mui.toast(data.msg);

                        }
                    }
                })

            }

        })
    })
})