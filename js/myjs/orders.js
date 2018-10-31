
$(function(){
    // $.ajax({
    //     url:api+'index/user/orderList',
    //     type:'post',
    //     data:{
    //         user_id:1,
    //         operate:'all'
    //     },
    //     success:function(data){
    //         console.log(data)
    //     }
    // })
    $('.loading').show()
    
    ajax('all',$('#item1mobile'),'allOrder')  //所有订单
    
    // ajax('complete',$('#item3mobile')) //已完成
    function ajax(operate,document,id){
        $.ajax({
            url:api+'indexUserOrderList',
            type:'post',
            headers:{
                'userauthkey':token,
            },
            data:{
                user_id:user_id,
                operate:operate
            },
            success:function(data){
                $('.loading').hide()
                $('.mui-slider-group').show()
                console.log(data)
                if(data.result){
                    document.html(template(id,data))
                }else{
                    mui.toast('暂无订单信息')
                }
            }
        })
    }
    //点击是变幻颜色
    $('.orderTab a').on('tap',function(){
        $(this).addClass('mui-active').siblings('a').removeClass("mui-active");
        // console.log($(this).siblings())
    })

    //全部订单
    // 点击跳转订单详情
    $('.che_main').on('tap','.product_order',function(){
        var that = $(this);
        var number =that.parents('.order_content').find('.product_order');
        
        var orderNum = that.siblings('.content_one').find('.this_number').text(); //订单编号
        var storeNames = that.siblings('.content_one').find('.store_name').text(); // 服务商家名称
        var all_money = that.parents('.order_content').find('.moneysThis').text(); // 订单总价
        var orderTime = that.parents('.order_content').find('.orderTime').text();
        var pay_status = that.parents('.order_content').data('id') ;
        console.log(orderNum)
        console.log(all_money);
        var orderObj = {orderNum:orderNum,storeNames:storeNames,all_money:all_money,orderTime:orderTime,pay_status:pay_status};
        var goodList = [];
        
        // if(number.length ==1){
        //     var order_maoney = that.find('.onlyPice').text(); // 价格
        //     var order_name = that.find('.combo').text(); // 服务套餐
        //     goodList[0] = {order_name:order_name,order_maoney:order_maoney};
        //     orderObj.goodList = goodList;
        //     sessionStorage.setItem('orderObj',JSON.stringify(orderObj));
        //     location.href= "./orders/orderdetail.html"
        // }else if(number.length>1){
            console.log(number);
            number.each(function(i,v){
                var order_name = $(this).find('.combo').text();
                var order_maoney = $(this).find('.onlyPice').text();
                goodList[i]={order_name:order_name,order_maoney:order_maoney};
                console.log(goodList);
                orderObj.goodList = goodList;
            })
            sessionStorage.setItem('orderObj',JSON.stringify(orderObj));
            
            location.href= "./orders/orderdetail.html"
        // }
        // location.href= "./orders/orderdetail.html"
    })





    $('#item1mobile').on('tap','.sayorder',function(){
        console.log('hehe')
        location.href= "./orders/orderrate.html"
    })
    //未完成订单
    $('#noSuccess').on('tap',function(){
        var noOrder = 'allOrder'
        ajax('nocomplete',$('#item2mobile'),noOrder) //未完成订单
    })
    //已完成订单逻辑
    $('#success').on('tap',function(){
        var succesOrder = 'allOrder'
        ajax('complete',$('#item3mobile'),succesOrder) //已完成订单
    })
    //取消订单  暂时为订单评价 noorder
    $('.che_main').on('tap','.quxiao',function(){
        mui.toast('暂不支持此功能,请到门店处理')
    });
    $('.che_main').on('tap','.gopayNow',function(){
        var this_number = $(this).parents('.order_content').find('.this_number').text();
        var practical =  $(this).parents('.order_content').find('.practical').text();
        practical = practical.split('￥')[1]
        console.log(this_number)
        console.log(practical)
        var practicalObj = {ordersn:this_number,money:practical};
        sessionStorage.setItem('listObj',JSON.stringify(practicalObj));
        location.href = "/order/pay.html"
        
    });
    $('.che_main').on('tap','.orderPing',function(){
        var that = $(this);
        var sellerFather = that.parents(".order_content").find('.sellerFather').data('sellid');
        var sellerList = [];
        var sellerId = [];
        
        that.parents(".order_content").find('.sellerList').each(function(v,i){
            var names = $(this).text();
            var ids =  $(this).data('id'); // 判断是否显示的 score_id 
            var sellerid = $(this).data('sellerid');
            // 判断是否有重复的 sellerid
            // if(ids ==1){
                if(sellerId.indexOf(sellerid) == -1){
                    sellerId.push(sellerid);
                    var sellerObj = {seller_account:names,sellerid:sellerid};
                    sellerList.push(sellerObj);
                }
            // }
            console.log(sellerId)
        })
        sellerList = {sellerList:sellerList,order_id:sellerFather};
        console.log(sellerList)
        sessionStorage.setItem("sellerList",JSON.stringify(sellerList))
        location.href= "./orders/orderrate.html"
    })
    $('che_main').on('tap',".orderPing",function(){
        location.href= "./orders/orderrate.html"
    })
    pushHistory() 
    window.addEventListener('popstate', function(e) {
        location.href= '/myself.html'
    }, false); 
    function pushHistory() { 
        var state = { 
            title: 'title', 
            url: '#' 
        };
        window.history.pushState(state, 'title', '#'); 
    } 



})