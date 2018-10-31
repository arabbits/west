$(function(){
    var clickCoupon = localStorage.getItem('clickCoupon'); //获得点击分享的信息
    
    var allLink = location.href;
    console.log(allLink)
    var locations = allLink.split('#')[0].split('?')[0];
    // locations = locations.split('?')[0];
    var couponId;

    var shit = tools.getSearch('a');
    console.log(!!shit) // false 判断是否有这个参数
    console.log(!shit);
    $.ajax({
        url:api+'indexGetCouponWeChat',
        type:'get',
        headers:{'userauthkey':token},
        data:{
            url:locations
        },
        success:function(data){
            console.log(data)
            var appId=data.data.appId
            var nonceStr=data.data.nonceStr
            var signature=data.data.signature
            var timestamp=data.data.timestamp
            if(data.result){
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareAppMessage',
                    ]
                });
                wx.checkJsApi({
                    jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log(res)
                    }
                });
            }
        }
    })
    if(!!clickCoupon){
        clickCoupon = JSON.parse(clickCoupon);
        couponId = clickCoupon.linkConpou;
    }
    couponList(user_id,couponId);
    function couponList(user_id,couponId){    
        $.ajax({
            url:api+'indexGetAllStoreCoupon',
            type:'post',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                user_id :user_id,
                coupon_id:couponId
            },
            success:function(data){
                $('.loading').hide();
                // alert(JSON.stringify(data));
                console.log(data)
                if(data.result){
                    $('.che_main').show();
                    $('.mui-scroll').html(template('tpl',data))
                    if(data.data.length == 0){
                        $('.che_main').hide();
                        $('.volume').show();
                    }
                }else if(data.data == "" || data.data.length == 0){
                    localStorage.removeItem('clickCoupon');
                    mui.toast(data.msg);
                    $('.volume').show();
                }
                if(data.code=='1001'){
                    $('.loading').show();
                    setTimeout(() => {
                        location.reload();
                    }, 800);
                }
            }
        })
    }

    $('.mui-scroll').on('tap','.lucks',function(){
        var id = $(this).data('id');
        // mask.show();
        // $('.navagio').show();
        $.ajax({
            url:api+'indexGetCoupon',
            type:'post',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                user_id :user_id,
                coupon_id :id,
            },
            success:function(data){
                $('.loading').hide();
                console.log(data)
                if(data.result){
                    mui.toast(data.msg);
                    // setTimeout(function(){
                    //     location.reload() ;
                    // },500)
                }
            }
        })

    })
    var mask = mui.createMask(function() {
        $('.navagio').hide();
    });
    console.log(userPicture)
    $('.mui-scroll').on('tap','.fenxiang',function(){
        var id = $(this).data('id');
        console.log(id);
        mask.show();
        $('.navagio').show();
        wx.onMenuShareAppMessage({
            title: '车吧族',
            desc: '点击领取优惠券哦',
            link: locations+'?linkConpou='+id,
            imgUrl: 'http://mobile.chebazu.com.cn/img/share.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                // alert('用户点击发送给朋友');
            },
            success: function (res) {
                mui.toast('已分享并领取优惠券');
                $.ajax({
                    url:api+'indexGetCoupon',
                    type:'post',
                    headers:{'userauthkey':token},
                    beforeSend:function(){
                        $('.loading').show();
                    },
                    data:{
                        user_id :user_id,
                        coupon_id :id,
                    },
                    success:function(data){
                        $('.loading').hide();
                        console.log(data)
                        if(data.result){
                            // location.href = '/index.html';
                            mui.toast(data.msg);
                            setTimeout(function(){
                                location.reload() ;
                            },500)
                        }
                    }
                })
            },
            cancel: function (res) {
                mui.toast('分享失败,请重试');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
                mui.toast('分享失败,请重试');
            }
        });
        wx.error(function (res) {
            alert(res.errMsg);
        });
    })
    pushHistory();
    window.addEventListener('popstate', function(e) { 
        var thisCou = localStorage.getItem('clickCoupon'); 
        // console.log()
        var state = { 
            title: 'title', 
            url: '#' 
        };
        if(!!thisCou){
            mui.toast('请领取优惠券');
            window.history.pushState(state, 'title', '#'); 
            
        }else{
            window.location = '/index.html' 
        }
    }, false); 
    function pushHistory() { 
        var state = { 
            title: 'title', 
            url: '#' 
        }; 
        window.history.pushState(state, 'title', '#'); 
    } 
    
})