



$(function(){
    
    $.ajax({
        url:api+"indexListClubCard",
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        type:'post',
        data:{user_id:user_id},
        success:function(data){
            console.log(data.data.length)
            console.log(data)
            $('.loading').hide();
            $('.che_main').show();
            // console.log(data.data[0])
            $('.myselfVip').html(template('tpl',data))
            if(data.result){
            }else{
                mui.toast(data.msg)
            }
            if(!data.data[0]){

                mui.toast(data.msg)
            }
        }
    })
})