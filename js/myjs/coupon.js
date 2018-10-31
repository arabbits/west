$(function(){
    $.ajax({
        url:api+'indexListAllUserActivity' ,
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            // page:1,
            // limit:8,
            user_id :user_id,
        },
        success:function(data){
            $('.loading').hide();
            
            console.log(data)
            if(data.result){
                if(data.data==''){
                    $('.volume').show();
                }else{
                    $('.che_main').show();
                    
                    $('.mui-scroll').html(template('tpl',data))
                }
            }
        }
    })
    // $('.discount_main').on('tap',function(){
    //     mui.toast('优惠券暂不可使用')
    // })
})