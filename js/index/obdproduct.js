


$(function(){
    var obdMoney = sessionStorage.getItem('obdMoney');
    var obdName = sessionStorage.getItem('obdName');
    var id = sessionStorage.getItem('goods_id');
    var store_id;
    $('.obdproductName').text(obdName)
    $('.proMoney').text(obdMoney)
    $('.Allmoney').text(obdMoney)
    // if()
    //判断是不是数字
    function Number(theObj) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      }
    $('.obd_search').on('tap',function(){
        var phone = $('.iphone').val();
        if(!phone){
            mui.toast('手机号不能为空')
            $('.iphone').val('');
        }else if(!Number(phone)){
            mui.toast('手机号不合法')
            $('.iphone').val('');
        }else{
            console.log(phone)
            $.ajax({
                url:api+'indexOrdersSearchStore',
                type:'post',
                headers:{
                    'userauthkey':token,
                },
                data:{phone:phone},
                success:function(data){
                    console.log(data)
                    if(!data.result){
                        mui.toast(data.msg)
                    }else{
                        $('#hiden').show();
                        $('.storeId').text(data.data.store_name)
                        store_id=data.data.store_id
                    }
                }
            })
        }
    })
    //调用微信JS api 支付
    function jsApiCall(jsApiParameters) {
        WeixinJSBridge.invoke(
                'getBrandWCPayRequest', jsApiParameters,
                function (res) {
                    WeixinJSBridge.log(res.err_msg);
                    location.href = '/myself/orders.html'
                    
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
            $.ajax({
                type: "POST",
                url: "http://api.carlub.com.cn/indexWxpayIndex",
                data: {ordersn: ordersn,user_id:user_id},
                dataType: "json",
                headers: {"userauthkey": token},
                success: function (data) {
            //            alert(data);
                    jsApiCall(data.parm);
            //            console.log(data);
                    //alert('success');
                    
                },
                error: function () {
                    //alert('error');
                }
            });
        }
    }

    $('.goPropay').on('tap',function(){
        if(!store_id){
            mui.toast('请绑定商家店铺')
        }else{
            $.ajax({
                url:api+'indexOrdersAddOrder',
                type:'post',
                headers:{
                    'userauthkey':token,
                },
                data:{
                    user_id :user_id ,
                    store_id: store_id,
                    goods_id :id
                },
                success:function(data){
                    console.log(data);
                    if(data.result){
                        var ordersn = data.data.ordersn
                        console.log(ordersn)
                        callpay(ordersn)
                    }else{
                        mui.alert(data.msg,function(){
                            location.href = '/myself/carlist.html';

                        });
                    }
                }
            })
        }
    })
})


        