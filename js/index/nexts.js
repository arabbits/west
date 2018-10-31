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
            
            location.href = "./reservation.html";
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

})