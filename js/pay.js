


$(function(){
    var list = sessionStorage.getItem("listObj")
    var ordersn,money;
    if(list){
        $('.loading').hide();
        $('.che_main').show();
        list = JSON.parse(list);
        money = list.money;
        ordersn = list.ordersn;
        $(".shit_money").each(function(v,i){
            $(this).text(money)
        })
    }else{
        mui.toast('订单有误,返回首页');
        setTimeout(function(){
            location.href = "/index.html";
        },500)
    }
    $('.pay_select').on('tap',function(){ 
        // $(this).removeClass('grayColor').parent().siblings().find('.pay_select').addClass('grayColor');
        $(this).toggleClass("pay_color")
    })
    $('.icon_left').on('tap',function(){
        console.log(ordersn);
        location.href = "/myself/orders.html";
    })
    $('.message_pay').on('tap',function(){
        var num = $(".pay_color").length;
        if(num>0){
            console.log(ordersn);
            callpay(ordersn);
            function jsApiCall(jsApiParameters) {
                WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', jsApiParameters,
                        function (res) {
                            // 
                            WeixinJSBridge.log(res.err_msg);
                            console.log(res.err_msg);
                            console.log(res);
                            sessionStorage.removeItem('listObj');
                            // alert(JSON.stringify(res))
                            // alert(JSON.stringify(res))
                            if(res.err_msg=="get_brand_wcpay_request:ok"){
                                mui.toast('支付成功');
                                setTimeout(() => {
                                    location.href = "/myself/orders.html"
                                }, 500);
                            }else if(res.err_msg=="get_brand_wcpay_request:cancel"){
                                mui.toast('取消支付')
                                setTimeout(() => {
                                    location.href = "/myself/orders.html"
                                }, 500);
                            }
                            // location.href = '/myself/orders.html'
                        }
                );
            }
            function callpay(ordersn) {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    var xhr = $.ajax({
                        type: "POST",
                        url: "http://api.carlub.com.cn/indexWxpayIndex",
                        timeout: 5000, //设置超时时间
                        data: {ordersn: ordersn,user_id:user_id},
                        dataType: "json",
                        headers: {"userauthkey": token},
                        success: function (data) {
                            // alert(JSON.stringify(data));
                            jsApiCall(data.parm);
                            
                        },
                        error:function(res){
                            // console.log(res);
                            // mui.alert("请求有误，请重试", function () {
                            //     location.reload();
                            // })
                        },
                        complete: function (XMLHttpRequest,status) {
                            if(status == 'timeout') {
                                xhr.abort();    // 超时后中断请求
                                mui.alert("当前网络不稳定，请重试", function () {
                                    location.reload();
                                })
                            }   
                        }
                    });
                }
            }
            


        }else{
            mui.toast('请选择支付方式')
        }
    })
    pushHistory() 
    window.addEventListener('popstate', function(e) {
        location.href= '/myself/orders.html'
    }, false); 
    function pushHistory() { 
        var state = { 
            title: 'title', 
            url: '#' 
        };
        window.history.pushState(state, 'title', '#'); 
    } 

})

