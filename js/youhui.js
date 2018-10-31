
mui(".mui-scroll-wrapper").scroll({
    indicators: false
});
mui('.mui-slider').slider().setStopped(true);
mui(".mui-slider").slider({
    interval: 0   //禁止轮播
});
mui('.mui-slider').slider().setStopped(true);
$(function(){
    var money = sessionStorage.getItem('money') //获得总价格
    var store_id = sessionStorage.getItem('store_id') //获取店铺id
    $.ajax({
        url:api+'indexOrderSeeCoupon',
        type:'post',
        headers:{'userauthkey':token},
        data:{
            user_id: 1,
            totalprice :money,
            operate :'canuse',
            store_id :store_id
        },
        success:function(data){
            console.log(data)
            var num = data.data.length;
            $('.usable').text(num)
            $('#item1mobile').html(template('tpl',data))
            
            $('#item1mobile').on('tap','.faclick',function(){
                $(this).find('.icon-xuanze').addClass('color')
                var moneys = $(this).find('.bigNum').text();
                sessionStorage.setItem('youhui',moneys)
                location.href = "./order.html";
            })
        }
    })


    //不可用劵
    $.ajax({
        url:api+'indexOrderSeeCoupon',
        type:'post',
        headers:{'userauthkey':token},
        data:{
            user_id: 1,
            totalprice :money,
            operate :'nouse',
            store_id :store_id
        },
        success:function(data){
            console.log(data.data.length)
            var numtwo = data.data.length;
            if(numtwo ==0){
                $('#item2mobile').html('<div class="noPrice">没有可用优惠券哦</div>')
            }else{
                $('#item2mobile').html(template('tpltwo',data))
            }
        }
    })
})