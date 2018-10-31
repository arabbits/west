

$(function(){
    $.ajax({
        url:api+"indexGetAllOrderPrice",
        type:'post',
        headers:{'userauthkey':token},
        data:{
            user_id:user_id
        },
        beforeSend:function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            console.log(data)
            if(data.result){
                $('.mui-scroll').html(template('tpl',data));
                $('.che_main').show();
            }else{
                $('.volist_nomode').show();
            }
        }
    })


    $(".mui-scroll ").on('tap','.open_all',function(){
        // $(this).find(".mui-icon").toggleClass('money_salce').parents('.allMoney_main').find('.mainOnes_frist').toggle();
        $(this).find(".mui-icon").toggleClass('money_salce');
        var height = $(this).parents('.allMoney_main').find('.mainOnes_frist').height(); // 获得 定位元素的高度
        var father = $(this).parents('.allMoney_main').height(); // 获得父盒子的原始高度 
        if($(this).find(".mui-icon").hasClass('money_salce')){
            $(this).parents('.allMoney_main').height(height+father+'px')
        }else{
            $(this).parents('.allMoney_main').height(father-height+'px') //添加后 元素高度改变 所以要减去之前的盒子高度
        }
        console.log(height)
        console.log(father)
    });

})