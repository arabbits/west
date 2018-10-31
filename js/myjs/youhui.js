$(function(){
    
    // $.ajax({
    //     url:api+'indexListAllUserActivity' ,
    //     type:'post',
    //     headers:{'userauthkey':token},
    //     beforeSend:function(){
    //         $('.loading').show();
    //     },
    //     data:{
    //         // page:1,
    //         // limit:8,
    //         user_id :user_id,
    //     },
    //     success:function(data){
    //         $('.loading').hide();
            
    //         console.log(data)
    //         if(data.result){
    //             if(data.data==''){
    //                 $('.volume').show();
    //             }else{
    //                 $('.che_main').show();
                    
    //                 $('.mui-scroll').html(template('tpl',data))
    //             }
    //         }
    //     }
    // })
    var list = sessionStorage.getItem('listObj');
    if(list){
        list = JSON.parse(list);
        var money = list.money;

        $.ajax({
            url:api+"indexListAllRecommend",
            type:'post',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                user_id:user_id,
                order_price:money ,   // 订单总价
            },
            success:function(data){
                $('.loading').hide();
                console.log(data);
                if(data.result){
                    $('.che_main').show();
                    $('.father').html(template('tpl',data));
                    
                    if(!!list.rec_id){
                        var rec_id = list.rec_id
                        $('.prive_contant').each(function(v,i){
                            var that = $(this);
                            var id = that.data('id');
                            if(rec_id==id){
                                that.find('.icon-xuanze').addClass('thisColor');
                            }
                        })
                    } 
                }else{
                    $('.volume').show();
                }
            }
        })
        $('.father').on('tap','.prive_contant',function(){
            // console.log('..');
            var that = $(this);
            var rec_id = that.data('id');
            var discount = that.data('price');
            list.discount = discount
            list.rec_id = rec_id

            console.log(list)
            sessionStorage.setItem('listObj',JSON.stringify(list));
            location.href = './order.html'
        })



    }else{
        mui.toast('信息有误')
        setTimeout(() => {
            // location.href = "/idnex.html"
        }, 500);
    }
})