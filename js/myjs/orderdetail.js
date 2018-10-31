
$(function(){
    var orderObj = sessionStorage.getItem('orderObj');
    orderObj = JSON.parse(orderObj);
    console.log(orderObj.orderNum)
    console.log(orderObj)
    // 动态渲染页面
    $('.mui-scroll').html(template('tpl',orderObj));

    // 点击付款
    $('.che_main').on('tap','.payment',function(){
        mui.toast('付款正在维护中')
        // var ordersn = orderObj.orderNum;
        

        //     //调用微信JS api 支付
        // function jsApiCall(jsApiParameters) {
        //     WeixinJSBridge.invoke(
        //             'getBrandWCPayRequest', jsApiParameters,
        //             function (res) {
        //                 WeixinJSBridge.log(res.err_msg);
        //                 // location.href = '/myself/orders.html'
        //             }
        //     );
        // }
        // function callpay(ordersn) {
        //     if (typeof WeixinJSBridge == "undefined") {
        //         if (document.addEventListener) {
        //             document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        //         } else if (document.attachEvent) {
        //             document.attachEvent('WeixinJSBridgeReady', jsApiCall);
        //             document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        //         }
        //     } else {
        //         $.ajax({
        //             type: "POST",
        //             url: "http://api.carlub.com.cn/indexWxpayIndex",
        //             data: {ordersn: ordersn,user_id:user_id},
        //             dataType: "json",
        //             headers: {"userauthkey": token},
        //             success: function (data) {
        //        //   alert(data);
        //                 jsApiCall(data.parm);
        //        //    console.log(data);
        //                 //alert('success');
                        
        //             },
        //             error: function () {
        //                 //alert('error');
        //             }
        //         });
        //     }
        // }
        // console.log(ordersn)
        // if(ordersn){
        //     callpay(ordersn);
        // }
    })

    // 点击完成时
    $('.detail_over').on('tap',function(){
        // console.log('简介')
        location.href='/myself/orders.html'
    })
})