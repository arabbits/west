




$(function(){
    $('.che_main').on('tap','.eachleft_top',function(){
        console.log('hehe ')
        var id = $(this).data('id')
        if(id === 0){
            window.location.href = "./drive/starting.html"
        }else if(id ===1){
            window.location.href = "./drive/thonous.html"
        }else if(id ===2){
            window.location.href = "./drive/pedal.html"
        }else if(id ===3){
            window.location.href = "./drive/break.html"
        }
    })
    $.ajax({
        url:api+'indexDrivingData',
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
                $('.che_main').html(template('tpl',data))

            }else{
                mui.toast(data.msg)
            }
        
        }
    })
})