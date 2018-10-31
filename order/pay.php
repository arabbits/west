<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../lib/css/mui.min.css">
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/pay.css">
    <title>车吧族</title>
</head>

<body>
    <div class="che_container">

        <div class="che_header">
            <a class="icon_left">
                <span class="mui-action-back mui-icon mui-icon-left-nav "></span>
            </a>
            <h4>在线支付</h4>
        </div>

        <div class="che_main">
            <div class="mui-scroll-wrapper">
                <!--子盒子-->
                <div class="mui-scroll">
                    <div class=" mui-clearfix">
                        <div class="parNumb pay_div">
                            <span>车吧族保养订单</span>
                            <span class="pay_money pay_right">
                                <em>￥</em>480
                            </span>
                        </div>
                    </div>
                    <div class=" mui-clearfix">
                        <div class="pay_div balance">
                            <span>账户余额(￥0)</span>
                            <span class="pay_balance pay_right">余额不足</span>
                        </div>
                    </div>
                    <div class="payMent  mui-clearfix">
                        <div class="pay_div payMent_head">
                            <span>车吧族保养订单</span>
                            <span class="pay_money pay_right">
                                <em>￥</em>480.00
                            </span>
                        </div>
                        <div class="pay_div payMent_style">
                            <span class="boxfa"><img src="../img/img/WeChat.png" alt=""></span><span>微信支付</span>
                            <span class="pay_select pay_right">
                                <span class="mui-icon mui-icon-checkmarkempty"></span>
                            </span>
                        </div>
                        <!-- <div class="pay_div payMent_style">
                            <span class="boxfa"><img src="../img/img/mayun.png" alt=""></span><span>支付宝支付</span>
                            <span class="pay_select grayColor pay_right">
                                <span class="mui-icon mui-icon-checkmarkempty"></span>
                            </span>
                        </div>
                        <div class="pay_div payMent_style">
                            <span class="boxfa"><img src="../img/img/yinlian.png" alt=""></span><span>银联支付</span>
                            <span class="pay_select grayColor pay_right">
                                <span class="mui-icon mui-icon-checkmarkempty"></span>
                            </span>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="che_footer">
            <div class="message_pay">
                <a>
                    <span class="footer_fonts">去支付</span>
                </a>
            </div>
        </div>
    </div>
</body>
<script src="../lib/js/mui.min.js"></script>
<script src="../lib/js/mui.picker.min.js"></script>
<script src="../lib/zepto/zepto.min.js"></script>
<script src="../js/rem.js"></script>
<script src="../js/common.js"></script>
<script src="../js/pay.js"></script>
<script type="text/javascript">
    //调用微信JS api 支付
    function jsApiCall(jsApiParameters)
    {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', jsApiParameters,
            function(res){
                WeixinJSBridge.log(res.err_msg);
                alert(res.err_code+res.err_desc+res.err_msg);
            }
        );
    }

    function callpay()
    {
        // if (typeof WeixinJSBridge == "undefined"){

        //     if( document.addEventListener ){

        //         document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);

        //     }else if (document.attachEvent){

        //         document.attachEvent('WeixinJSBridgeReady', jsApiCall);

        //         document.attachEvent('onWeixinJSBridgeReady', jsApiCall);

        //     }

        // }else{

            $.ajax({
                type: "POST",
                url: "http://api.carlub.com.cn/index/wxpay/index",
                data: {ordersn:201805291038},
                dataType: "json",
                headers:{"userauthkey":11111},
                success: function(data){

                    // jsApiCall(data.parm);
                           console.log(data);
                    //alert('success');
                },
                error: function(){
                    //alert('error');
                }
            });

        // }

    }
    $('.message_pay').on('tap',function(){
        // var options = '201805291038';
        console.log('呵呵')
        console.log('呵呵')
        
        console.log(callpay())
    })
</script>

</html>