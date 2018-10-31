mui(".mui-scroll-wrapper").scroll({
  indicators: true,
  bounce: false,
});

mui(".mui-slider").slider({
  interval: 2000
});

var tools = {
  getSearchObj:function () {
  //获取地址栏参数,封装成一个对象  {name:"zs", age:18, desc:"呵呵呵"}
  var search = location.search;
  //对search字符串进行解码
  search = decodeURI(search);
  //去除？    name=zs&age=18&desc=呵呵呵
  search = search.slice(1);
  //把search切割成一个数组    ["name=zs", "age=18", "desc=呵呵呵"]
  var arr = search.split("&");
  var obj = {};
  //遍历数组
  arr.forEach(function ( v ) {
      var key = v.split("=")[0];
      var value = v.split("=")[1];
      obj[key] = value;
  });
  return obj;
  },
  getSearch: function(key){
  return this.getSearchObj()[key];
  }
}

var api ='http://api.carlub.com.cn/';
var linkConpou = tools.getSearch('linkConpou');
if(!!linkConpou){
  // console.log(linkConpou)
  var clickId = linkConpou.split('_')[1];
  var thisLinks_coupon = linkConpou.split('_')[0];
  var clickObj = {linkConpou:thisLinks_coupon,clickId:clickId}
  localStorage.setItem('clickCoupon',JSON.stringify(clickObj));
}
var userObj = sessionStorage.getItem('userObj');
var token;
var user_id;
var loginphone;
var userPicture;
// console.log(userObj);
if(userObj){
  userObj = JSON.parse(userObj);
  token = userObj.token;
  user_id = userObj.user_id;
  loginphone = userObj.loginphone;
  userPicture = userObj.userPicture;
}
console.log(user_id)
// 没有token 则登录微信 或者没有手机号或者手机号为null
if(!token){
  WeChat()
}else{
  var shareNewObj = localStorage.getItem('clickCoupon')
  if(!!shareNewObj){
    go()
  }
}
// var loginphone = sessionStorage.getItem('loginphone'); 

function WeChat(){
  var appId = 'wx07a112fcf41bb458';
  var oauth_url = 'http://api.carlub.com.cn/indexWeChatGetUser';
  var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + location.href.split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  var code = getUrlParam("code");
  if (!code) {
      window.location.href = url;
  } else {
      $.ajax({
          type: 'GET',
          headers:{'userauthkey':token},
          url: oauth_url,
          dataType: 'json',
          data: {
              code: code
          },
          success: function (data) {
            console.log(data)
            var openid = data.data.info.openid;
            var user_name = data.data.info.nick_name;
            var userPicture = data.data.info.avatar;
            var sex = data.data.info.sex;
            var loginphone = data.data.info.phone;
            var userObj = {openid:openid,user_name:user_name,userPicture:userPicture,sex:sex}
            sessionStorage.setItem('userObj',JSON.stringify(userObj));
            console.log(userObj);
            console.log(loginphone=='')
            console.log(!loginphone)
            console.log(loginphone)
            console.log(loginphone ==undefined)
            if(loginphone == ''){
              location.href = "/registry.html"
            }else{
              userObj.token = data.data.userauthkey;
              userObj.email = data.data.info.email;
              userObj.user_id = data.data.info.user_id;
              userObj.loginphone = loginphone
              sessionStorage.setItem('userObj',JSON.stringify(userObj));
              if(!!linkConpou){
                go()
              }
              // setTimeout(function(){
              //   location.reload();
              // },1000);
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
 

$(function(){
  $('.mui-bar a').on('tap',function(){
    var herf = $(this).attr('href');
    console.log(herf);
    
    location.href = ""+herf;
    
  })
  var iframes = $('iframe');
  // console.log(iframes)
  if(iframes.length>0){
    iframes.remove();
  }
  version();
  function version(){
    $('script').each(function(v,i){
      $(this).attr('src',$(this).attr('src')+'?v=1.1.4');
    });
    $('link').each(function(val,index){
      $(this).attr('href',$(this).attr('href')+'?v=1.1.4');
    })
  
  }
   
})
