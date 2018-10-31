$(function(){
    $.ajax({
        url:api+'indexGetAllUserCoupon' ,
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            page:1,
            limit:8,
            user_id :user_id,
        },
        success:function(data){
            $('.loading').hide();
            $('.che_main').show();
            
            console.log(data)
            if(data.result){
                $('.mui-scroll').html(template('tpl',data))
            }
        }
    })
    $('.discount_main').on('tap',function(){
        mui.toast('优惠券暂不可使用')
    })
})