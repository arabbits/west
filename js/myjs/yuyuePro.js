



$(function(){
    var id = sessionStorage.getItem('yuyueId');
    $.ajax({
        url:api+'indexMaintainDetails',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        type:'post',
        data:{
            id: id ,
        },
        success:function(data){ 
            $('.loading').hide();
            if(data.result){
                $('.mui-scroll').html(template('tpl',data))
            }
            console.log(data);
        }
    })

    //  跳转详情
    $("#item1mobile").on('tap','.order_content',function(){
        var id = $(this).data('id');
        console.log(id);
        location.href="./yuyuePro.html";
    })
})