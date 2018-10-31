
$(function(){
    WeChat();
    function WeChat(){
        var appId = 'wxb3a9cd3db630e075';
        var oauth_url = 'http://api.chebazu.com.cn/indexWeChatGetOpenid';
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + location.href.split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        var code = getUrlParam("code");
        if (!code) {
            window.location.href = url;
        } else {
            $.ajax({
                type: 'GET',
                url: oauth_url,
                dataType: 'json',
                data: {
                    code: code
                },
                success: function (data) {
                    console.log(data)
                    if(data.result){

                        $('.shit').val(data.data);
                    }else{
                        mui.toast(data.msg);
                    }
                    
                },
                error: function (error) {
                    throw new Error(error)
        
                }
            })
        }
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    }

})


