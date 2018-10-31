




$(function(){
    // obd商品展示页面
    var value = sessionStorage.getItem('values');
    if(value == 2){
        $('h4').text('特惠套餐')
    }else{
        $('h4').text('服务套餐')
    }
    ajax(value)
    function ajax(value){

        $.ajax({
            url:api+'indexOrdersGoodsList',
            type:'post',
            headers:{
                'userauthkey':token,
                
            },
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                key:value
            },
            success:function(data){
                $('.loading').hide();
                console.log(data);
                if(data.result){
                    $('.che_main').show();
                    $('.mui-scroll').html(template('tpl',data));
                }else{
                    mui.toast(data.msg);
                }
            }
        })
    }
    
    $('.mui-scroll').on('tap','.obd_pay',function(){
        console.log('哈')
        var id = $(this).parents('.obd_main').data('id');
        var  obdName= $(this).parents('.obd_main').find('.obdName').text();
        var  obdMoney= $(this).parents('.obd_main').find('.obd_money').text();
        console.log(id)
        console.log(obdName)
        console.log(obdMoney)
        sessionStorage.setItem('goods_id',id)
        sessionStorage.setItem('obdName',obdName)
        sessionStorage.setItem('obdMoney',obdMoney)
        location.href="obdproduct.html"
    })
})