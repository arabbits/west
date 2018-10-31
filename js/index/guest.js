$(function(){
    if(!token){
      WeChat()
    };
    var clickCoupon = localStorage.getItem('clickCoupon'); //获得点击分享的信息
    
    var allLink = location.href;
    console.log(allLink)
    if(!!user_id){
        // 判断是否有车子
        $.ajax({
            url:api+'indexQueryUserCart',
            type:'post',
            headers:{'userauthkey':token},
            data:{
                user_id : user_id,
            },
            success:function(data){
                // console.log(data);
                if(!data.result){
                    location.href = "/message/message.html";
                }
            }
        })
        var locations = allLink.split('#')[0].split('?')[0];
        var couponId,clickId;
        // 获得分享的参数
        $.ajax({
            url:api+'indexGetActivityWeChat',
            type:'get',
            headers:{'userauthkey':token},
            data:{
                url:allLink
            },
            success:function(data){
                // console.log(data)
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
                        'onMenuShareTimeline'
                    
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
        });
        if(!!clickCoupon){
            clickCoupon = JSON.parse(clickCoupon);
            couponId = clickCoupon.linkConpou;    
            clickId = clickCoupon.clickId;   
            
            $.ajax({
                url:api+'indexShareActivityInfo',
                type:'post',
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    user_id :user_id,
                    activity_id:couponId
                },
                success:function(data){
                    $('.loading').hide();
                    // alert(JSON.stringify(data));
                    console.log(data)
                    if(data.code=='1001'){
                        $('.loading').show();
                        setTimeout(() => {
                            location.reload();
                        },1000);
                    }else{
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
                    }
                }
            });
            
        }else{
            couponList(user_id);
        }
        function couponList(user_id,couponId){    
            $.ajax({
                url:api+'indexGetAllStoreActivity',
                type:'post',
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    user_id :user_id,
                },
                success:function(data){
                    $('.loading').hide();
                    // alert(JSON.stringify(data));
                    console.log(data)
                    if(data.code=='1001'){
                        $('.loading').show();
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }else{
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
                    }
                }
            })
        }
        function clickThis(user_id,id,clickId){
            $.ajax({
                url:api+'indexClickGetActivity',
                type:'post',
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    user_id :user_id,
                    activity_id :id,
                    share_user_id :clickId
                },
                success:function(data){
                    $('.loading').hide();
                    console.log(data)
                    if(data.result){
                        var money = data.data.totalprice;
                        var ordersn = data.data.ordersn;
                        var obj = {ordersn:ordersn,money:money};
                        sessionStorage.setItem('listObj',JSON.stringify(obj))
                        setTimeout(function(){
                            location.href = "/order/pay.html"
                        },500)
                    }else if(data.data==""){
                        mui.toast(data.msg);
                        localStorage.removeItem('clickCoupon');
                    }else{
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg)
                    }
                }
            })
        }
        function noClick(user_id,id){
            $.ajax({
                url:api+'indexShareActivity',
                type:'post',
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                },
                data:{
                    user_id :user_id,
                    activity_id :id,
                },
                success:function(data){
                    $('.loading').hide();
                    console.log(data)
                    if(data.result){
                        var money = data.data.totalprice;
                        var ordersn = data.data.ordersn;
                        var obj = {ordersn:ordersn,money:money};
                        sessionStorage.setItem('listObj',JSON.stringify(obj))
                        setTimeout(function(){
                            location.href = "/order/pay.html"
                        },500)
                    }else if(data.data==""){
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg);
                    }else{
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg)
                    }
                }
            })
        }

        $('.mui-scroll').on('tap','.lucks',function(){
            var id = $(this).data('id');
            // mask.show();
            // $('.navagio').show();
            noClick(user_id,id)
        })
        var mask = mui.createMask(function() {
            $('.navagio').hide();
        });
        console.log(userPicture)

        // 分享接口
        $('.mui-scroll').on('tap','.fenxiang',function(){
            var id = $(this).data('id');
            var names = $(this).parents('.discount_main').find('.activity_name').text();
            console.log(id);
            console.log(names);
            mask.show();
            $('.navagio').show();
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: '车吧族',
                desc: names,
                link: 'http://mobile.carlub.com.cn/mindex/share.html?linkConpou='+id+'_'+user_id,
                imgUrl: 'http://mobile.chebazu.com.cn/img/share.jpg',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    // alert('用户点击发送给朋友');
                },
                success: function (res) {

                    if(!!clickId){
                        clickThis(user_id,id,clickId);
                    }else{
                        noClick(user_id,id);
                    }

                },
                cancel: function (res) {
                    mui.toast('分享失败,请重试');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                    mui.toast('分享失败,请重试');
                }
            });
            //  分享给朋友圈 
            wx.onMenuShareTimeline({
                title: '车吧族',
                link: 'http://mobile.carlub.com.cn/mindex/share.html?linkConpou='+id+'_'+user_id,
                imgUrl: 'http://mobile.chebazu.com.cn/img/share.jpg',
                trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //   alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                //   alert('已分享');
                if(!!clickId){
                    clickThis(user_id,id,clickId);
                }else{
                    noClick(user_id,id);
                }
                },
                cancel: function (res) {
                    mui.toast('分享失败,请重试');
                },
                fail: function (res) {
                    mui.toast('分享失败,请重试');
                    // alert(JSON.stringify(res));
                }
            });
            wx.error(function (res) {
                alert(res.errMsg);
            });
        })
        // 盒子的伸缩
        $('.mui-scroll').on('tap','.disHead',function(){
            $(this).find(".mui-icon-arrowright").toggleClass('xuanzhuan'); // 变幻图标
            // $(this).parent().find('.mainFather').toggle().parent().siblings().find('.mainFather').hide();
            var height = $(this).parent().find('.disMain').height(); // 获得内容的高度
            console.log(height);
            if($(this).find(".mui-icon-arrowright").hasClass('xuanzhuan')){  //给父盒子加高度 并将其他的父盒子关闭
                $(this).parent().find('.mainFather').height(height+"px").parent().siblings().find('.mainFather').height("0px").prev().find(".mui-icon-arrowright").removeClass('xuanzhuan'); 
            }else{
                $(this).parent().find('.mainFather').height("0px")   //给父盒子的高度变为0px
            }
        })
        // 返回键时清除
        $('.icon_left').on('tap',function(){
            var shit = localStorage.getItem('clickCoupon');
            if(!!shit){
                mui.confirm('是否离开放弃此优惠?','提示',['留下','离开'],function(index){
                    if(index.index==1){
                        localStorage.removeItem('clickCoupon')
                        window.location = '/index.html';
                    } 
                })
            }else{
                window.location = '/index.html';
            }
        })
        //  取消手机返回键
        pushHistory();
        window.addEventListener('popstate', function(e) {
            var shit = localStorage.getItem('clickCoupon');
            if(!!shit){
                mui.confirm('是否离开放弃此优惠?','提示',['留下','离开'],function(index){
                    if(index.index==1){
                        localStorage.removeItem('clickCoupon')
                        window.location = '/index.html';
                    } 
                })
            }else{
                window.location = '/index.html';
            }
            // var state = { 
            //     title: 'title', 
            //     url: '#' 
            // };
            // if(!!thisCou){
            //     mui.toast('请领取优惠券');
            //     window.history.pushState(state, 'title', '#'); 
            // }else{
            //     window.location = '/index.html' 
            // }
        }, false); 
        function pushHistory() { 
            var state = { 
                title: 'title', 
                url: '#' 
            };
            window.history.pushState(state, 'title', '#'); 
        } 
    }else{
        setTimeout(() => {
            location.reload();
        },1200);
    }
    
})