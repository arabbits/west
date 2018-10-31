



$(function(){
    $.ajax({
        url:api+'indexMaintainList',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        type:'post',
        data:{
          user_id: user_id ,
        },
        success:function(data){ 
            $('.loading').hide();
            if(data.result){
                $('#item1mobile').html(template('allOrder',data))
            }else{
                $('.volist_nomode').show();
                mui.toast(data.msg)
            }
            console.log(data);
        }
    })

    //  跳转详情
    $("#item1mobile").on('tap','.order_content',function(){
        var id = $(this).data('id');
        if(id){
            sessionStorage.setItem('yuyueId',id);
            location.href="./yuyuePro.html";

        }
        console.log(id);
    })
})