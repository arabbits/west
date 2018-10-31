// $(function(){
//     // go()
//     function go(){
//         var clickCoupon = localStorage.getItem('clickCoupon'); //获得点击分享的信息
//         var shareObj = sessionStorage.getItem('userObj'); //获得点击分享的信息
//         var allLink = location.href;
//         if(!!shareObj){
//             shareObj = JSON.parse(shareObj);
//             user_id = shareObj.user_id;
//             console.log(shareObj)
//             console.log(user_id)
            
//             // 判断是否有车子
//             $.ajax({
//                 url:api+'indexQueryUserCart',
//                 type:'post',
//                 headers:{'userauthkey':token},
//                 data:{
//                     user_id : user_id,
//                 },
//                 success:function(data){
//                     // console.log(data);
//                     if(!data.result){
//                         location.href = "/message/message.html";
//                     }
//                 }
//             })
//             var locations = allLink.split('#')[0].split('?')[0];
//             var couponId,clickId;
//             // 获得分享的参数
//             $.ajax({
//                 url:api+'indexGetActivityWeChat',
//                 type:'get',
//                 headers:{'userauthkey':token},
//                 data:{
//                     url:allLink
//                 },
//                 success:function(data){
//                     // console.log(data)
//                     var appId=data.data.appId
//                     var nonceStr=data.data.nonceStr
//                     var signature=data.data.signature
//                     var timestamp=data.data.timestamp
//                     if(data.result){
//                         wx.config({
//                             debug: false,
//                             appId: appId,
//                             timestamp: timestamp,
//                             nonceStr: nonceStr,
//                             signature: signature,
//                             jsApiList: [
//                                 // 所有要调用的 API 都要加到这个列表中
//                             'onMenuShareAppMessage',
//                             'onMenuShareTimeline'
                        
//                             ]
//                         });
//                         wx.checkJsApi({
//                             jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//                             success: function(res) {
//                                 console.log(res)
//                             }
//                         });
//                     }
//                 }
//             });
//             if(!!clickCoupon){
//                 clickCoupon = JSON.parse(clickCoupon);
//                 couponId = clickCoupon.linkConpou;    
//                 clickId = clickCoupon.clickId;   
//                 // 获得活动的id 渲染页面
//                 var xhr =$.ajax({
//                     url:api+'indexShareActivityInfo',
//                     type:'post',
//                     timeout: 5000, //设置超时时间
//                     headers:{'userauthkey':token},
//                     beforeSend:function(){
//                         $('.loading').show();
//                     },
//                     data:{
//                         user_id :user_id,
//                         activity_id:couponId
//                     },
//                     success:function(data){
//                         $('.loading').hide();
//                         // alert(JSON.stringify(data));
//                         console.log(data)
//                         if(data.code=='1001'){
//                             $('.loading').show();
//                             setTimeout(() => {
//                                 location.reload();
//                             },1000);
//                         }else{
//                             if(data.result){
//                                 $('.che_main').show();
//                                 $('.title_one').html(template('tpl',data))
//                                 if(data.data.length == 0){
//                                     $('.che_main').hide();
//                                     $('.volume').show();
//                                 }
//                             }else if(data.data == "" || data.data.length == 0){
//                                 localStorage.removeItem('clickCoupon');
//                                 mui.toast(data.msg);
//                                 $('.volume').show();
//                             }
//                         }
//                     },
//                     error:function(res){
//                         console.log(res);
//                         mui.alert("请求有误，请重试", function () {
//                             location.reload();
//                         })
//                     },
//                     complete: function (XMLHttpRequest,status) {
//                         if(status == 'timeout') {
//                             xhr.abort();    // 超时后中断请求
//                             mui.alert("当前网络不稳定，请重试", function () {
//                                 location.reload();
//                             })
//                         }   
//                     }
//                 });
                
//             }else{
//                 // couponList(user_id);
//                 // location.href="/index.html"
//             }
//             // 当有分享人id时  调用的下单接口
//             function clickThis(user_id,id,clickId){
//                 var clickXhr = $.ajax({
//                     url:api+'indexClickGetActivity',
//                     timeout: 5000, //设置超时时间
//                     type:'post',
//                     headers:{'userauthkey':token},
//                     beforeSend:function(){
//                         $('.loading').show();
//                     },
//                     data:{
//                         user_id :user_id,
//                         activity_id :id,
//                         share_user_id :clickId
//                     },
//                     success:function(data){
//                         $('.loading').hide();
//                         console.log(data)
//                         if(data.result){
//                             var money = data.data.totalprice;
//                             var ordersn = data.data.ordersn;
//                             var obj = {ordersn:ordersn,money:money};
//                             sessionStorage.setItem('listObj',JSON.stringify(obj))
//                             setTimeout(function(){
//                                 location.href = "/order/pay.html"
//                             },500)
//                         }else if(data.data==""){
//                             mui.toast(data.msg);
//                             localStorage.removeItem('clickCoupon');
//                         }else{
//                             localStorage.removeItem('clickCoupon');
//                             mui.alert(data.msg)
//                         }
//                     },
//                     error:function(res){
//                         console.log(res);
//                         mui.alert("请求有误，请重试", function () {
//                             location.reload();
//                         })
//                     },
//                     complete: function (XMLHttpRequest,status) {
//                         if(status == 'timeout') {
//                             clickXhr.abort();    // 超时后中断请求
//                             mui.alert("当前网络不稳定，请重试", function () {
//                                 location.reload();
//                             })
//                         }   
//                     }
//                 })
//             }
//             // 没有分享人时 调用的下单接口
//             function noClick(user_id,id){
//                 var noColor = $.ajax({
//                     url:api+'indexShareActivity',
//                     timeout: 5000, //设置超时时间
//                     type:'post',
//                     headers:{'userauthkey':token},
//                     beforeSend:function(){
//                         $('.loading').show();
//                     },
//                     data:{
//                         user_id :user_id,
//                         activity_id :id,
//                     },
//                     success:function(data){
//                         $('.loading').hide();
//                         console.log(data)
//                         if(data.result){
//                             var money = data.data.totalprice;
//                             var ordersn = data.data.ordersn;
//                             var obj = {ordersn:ordersn,money:money};
//                             sessionStorage.setItem('listObj',JSON.stringify(obj))
//                             setTimeout(function(){
//                                 location.href = "/order/pay.html"
//                             },500)
//                         }else if(data.data==""){
//                             localStorage.removeItem('clickCoupon');
//                             mui.alert(data.msg);
//                         }else{
//                             localStorage.removeItem('clickCoupon');
//                             mui.alert(data.msg)
//                         }
//                     },
//                     error:function(res){
//                         console.log(res);
//                         mui.alert("请求有误，请重试", function () {
//                             location.reload();
//                         })
//                     },
//                     complete: function (XMLHttpRequest,status) {
//                         if(status == 'timeout') {
//                             noColor.abort();    // 超时后中断请求
//                             mui.alert("当前网络不稳定，请重试", function () {
//                                 location.reload();
//                             })
//                         }   
//                     }
//                 })
//             }

//             // $('.mui-scroll').on('tap','.lucks',function(){
//             //     var id = $(this).data('id');
//             //     // mask.show();
//             //     // $('.navagio').show();
//             //     noClick(user_id,id)  点击直接下单的
//             // })
//             var mask = mui.createMask(function() {
//                 $('.navagio').hide();
//             });
//             console.log(userPicture)

//             // 分享接口
//             $('.share_one').on('tap',function(){

//                 var id = $('.motherName').data('id');
//                 var names = $('.motherName').text();
//                 console.log(id);
//                 console.log(names);
//                 mask.show();
//                 $('.navagio').show();
//                 // 分享给朋友
//                 wx.onMenuShareAppMessage({
//                     title: '车吧族',
//                     desc: names,
//                     link: 'http://mobile.carlub.com.cn/mindex/share.html?linkConpou='+id+'_'+user_id,
//                     imgUrl: 'http://mobile.chebazu.com.cn/img/share.jpg',
//                     trigger: function (res) {
//                         // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//                         // alert('用户点击发送给朋友');
//                     },
//                     success: function (res) {

//                         if(!!clickId){
//                             clickThis(user_id,id,clickId);
//                         }else{
//                             noClick(user_id,id);
//                         }

//                     },
//                     cancel: function (res) {
//                         mui.toast('分享失败,请重试');
//                     },
//                     fail: function (res) {
//                         // alert(JSON.stringify(res));
//                         mui.toast('分享失败,请重试');
//                     }
//                 });
//                 //  分享给朋友圈 
//                 wx.onMenuShareTimeline({
//                     title: '车吧族',
//                     link: 'http://mobile.carlub.com.cn/mindex/share.html?linkConpou='+id+'_'+user_id,
//                     imgUrl: 'http://mobile.chebazu.com.cn/img/share.jpg',
//                     trigger: function (res) {
//                     // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//                     //   alert('用户点击分享到朋友圈');
//                     },
//                     success: function (res) {
//                     //   alert('已分享');
//                     if(!!clickId){
//                         clickThis(user_id,id,clickId);
//                     }else{
//                         noClick(user_id,id);
//                     }
//                     },
//                     cancel: function (res) {
//                         mui.toast('分享失败,请重试');
//                     },
//                     fail: function (res) {
//                         mui.toast('分享失败,请重试');
//                         // alert(JSON.stringify(res));
//                     }
//                 });
//                 wx.error(function (res) {
//                     alert(res.errMsg);
//                 });
//             })
//             // 返回键时清除
//             $('.icon_left').on('tap',function(){
//                 var shit = localStorage.getItem('clickCoupon');
//                 if(!!shit){
//                     mui.confirm('是否离开放弃此优惠?','提示',['留下','离开'],function(index){
//                         if(index.index==1){
//                             localStorage.removeItem('clickCoupon')
//                             window.location = '/index.html';
//                         } 
//                     })
//                 }else{
//                     window.location = '/index.html';
//                 }
//             })
//             //  取消手机返回键
//             pushHistory();
//             window.addEventListener('popstate', function(e) {
//                 var shit = localStorage.getItem('clickCoupon');
//                 if(!!shit){
//                     mui.confirm('是否离开放弃此优惠?','提示',['留下','离开'],function(index){
//                         if(index.index==1){
//                             localStorage.removeItem('clickCoupon')
//                             window.location = '/index.html';
//                         } 
//                     })
//                 }else{
//                     window.location = '/index.html';
//                 }
//                 // var state = { 
//                 //     title: 'title', 
//                 //     url: '#' 
//                 // };
//                 // if(!!thisCou){
//                 //     mui.toast('请领取优惠券');
//                 //     window.history.pushState(state, 'title', '#'); 
//                 // }else{
//                 //     window.location = '/index.html' 
//                 // }
//             }, false); 
//             function pushHistory() { 
//                 var state = { 
//                     title: 'title', 
//                     url: '#' 
//                 };
//                 window.history.pushState(state, 'title', '#'); 
//             } 
//         }else{
//             alert('没有获得id')
//             // setTimeout(() => {
//             //     location.reload();
//             // },1200);
//         }
//     }
// })

function go(){
    var clickCoupon = localStorage.getItem('clickCoupon'); //获得点击分享的信息
    var shareObj = sessionStorage.getItem('userObj'); //获得点击分享的信息
    var allLink = location.href;
    if(!!shareObj){
        shareObj = JSON.parse(shareObj);
        token = shareObj.token;
        user_id = shareObj.user_id;
        loginphone = shareObj.loginphone;
        userPicture = shareObj.userPicture;

        console.log(shareObj)
        console.log(user_id)
        
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
            // 获得活动的id 渲染页面
            var xhr =$.ajax({
                url:api+'indexShareActivityInfo',
                type:'post',
                timeout: 5000, //设置超时时间
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
                    console.log(data)
                    if(data.result){
                        $('.che_main').show();
                        $('.all_share_father').html(template('tpl',data))
                        if(data.data.length == 0){
                            $('.che_main').hide();
                            $('.volume').show();
                        }
                    }else if(data.data == "" || data.data.length == 0){
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg,function(){
                            location.href="/index.html"
                        })
                    }
                },
                // error:function(res){
                //     console.log(res);
                //     mui.alert("请求有误，请重试", function () {
                //         location.reload();
                //     })
                // },
                complete: function (XMLHttpRequest,status) {
                    if(status == 'timeout') {
                        xhr.abort();    // 超时后中断请求
                        mui.alert("当前网络不稳定，请重试", function () {
                            location.reload();
                        })
                    }   
                }
            });
            
        }else{
            // couponList(user_id);
            location.href="/index.html"
        }
        // 当有分享人id时  调用的下单接口
        function clickThis(user_id,id,clickId){
            var clickXhr = $.ajax({
                url:api+'indexClickGetActivity',
                timeout: 5000, //设置超时时间
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
                        sessionStorage.setItem('listObj',JSON.stringify(obj));
                        localStorage.removeItem('clickCoupon');
                        setTimeout(function(){
                            location.href = "/order/pay.html"
                        },500)
                    }else if(data.data==""){
                        mui.alert(data.msg,function(){
                            location.href="/index.html"
                        })
                        localStorage.removeItem('clickCoupon');
                    }else{
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg,function(){
                            location.href="/index.html"
                        })

                    }
                },
                error:function(res){
                    console.log(res);
                    // mui.alert("请求有误，请重试", function () {
                    //     location.reload();
                    // })
                },
                complete: function (XMLHttpRequest,status) {
                    if(status == 'timeout') {
                        clickXhr.abort();    // 超时后中断请求
                        mui.alert("当前网络不稳定，请重试", function () {
                            location.reload();
                        })
                    }   
                }
            })
        }
        // 没有分享人时 调用的下单接口
        function noClick(user_id,id){
            var noColor = $.ajax({
                url:api+'indexShareActivity',
                timeout: 5000, //设置超时时间
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
                        localStorage.removeItem('clickCoupon');
                        setTimeout(function(){
                            location.href = "/order/pay.html"
                        },500)
                    }else if(data.data==""){
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg,function(){
                            location.href="/index.html"
                        })
                    }else{
                        localStorage.removeItem('clickCoupon');
                        mui.alert(data.msg,function(){
                            location.href="/index.html"
                        })
                    }
                },
                error:function(res){
                    console.log(res);
                    // mui.alert("请求有误，请重试", function () {
                    //     location.reload();
                    // })
                },
                complete: function (XMLHttpRequest,status) {
                    if(status == 'timeout') {
                        noColor.abort();    // 超时后中断请求
                        mui.alert("当前网络不稳定，请重试", function () {
                            location.reload();
                        })
                    }   
                }
            })
        }
        var mask = mui.createMask(function() {
            $('.navagio').hide();
        });
        console.log(userPicture)

        // 分享接口
        $('.share_one').on('tap',function(){

            var id = $('.motherName').data('id');
            var names = $('.motherName').text();
            // console.log(id);
            // console.log(names);
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
        alert('没有获得id')
        // setTimeout(() => {
        //     location.reload();
        // },1200);
    }
}