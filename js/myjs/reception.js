$(function(){
    $.ajax({
        url:api+"indexListUserVerify",
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        type:'post',
        data:{user_id:user_id},
        success:function(data){
            console.log(data)
            $('.loading').hide();
            if(data.result){
                $('.che_main').show();
                $('.validate_All').html(template('tpl',data))
            }else{
                mui.toast(data.msg);
                $('.volist_nomode').show();
            }
            if(!data.data[0]){
                mui.toast(data.msg)
            }
        }
    })
})
