
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});








$(function() {
//   var myDate = new Date();
//   var year = myDate.getFullYear();  //年
//   var mon = myDate.getMonth()+1;  //月
//   var day = myDate.getDate();    //日
    var seaverId = sessionStorage.getItem('seaverId') //  获得id  分辨type 1 为维修 2为喷漆 3为洗车
    var money = sessionStorage.getItem('money') //获得总价格
    var allnow = sessionStorage.getItem('allnow') //获得弹出框
    var cardListAll = sessionStorage.getItem('cardListAll') //获得卡券列表
    if(!cardListAll){
      cardListAll = [];
    }
    // var time = '1525411565';
    var comboIds = sessionStorage.getItem('comboIds'); //获取订单id与数量 是个json数据  newTime
    if(comboIds=='undefined'){
      comboIds=null;
    }
    
    var cartObj = sessionStorage.getItem('newTime');
    var coupon_id ;  //优惠卷id
    var coupon_price;  //优惠券金额
    var name = userObj.user_name;

    var cmodel_id,cart_licens,description,partcontent;  //获得车牌与车子id

    var listOrdertime,    //获取时间
        clickTime ,       //获取日期 
        store_id,money,cartName,cartSite,time_id;         // 获取店铺id
    // console.log(time)
    var listObj = sessionStorage.getItem('listObj');
    if(listObj){
      listObj = JSON.parse(listObj);
      listOrdertime = listObj.listOrdertime;  // 暂时不需要
      clickTime = listObj.clickTime;     // 暂时不需要
      store_id = listObj.store_id;
      time_id = listObj.time_id;    //获得时间id
      money = listObj.money;
      cartName = listObj.cartName;
      cartSite = listObj.cartSite;
      $(".cardName").text(cartName);
      console.log(cartName)
      $(".cardSite").text(cartSite);
      $('.mobile').val(loginphone);
      $('.username').val(name);
      console.log(loginphone);
    }
    if(cartObj){
      cartObj = JSON.parse(cartObj);
      cmodel_id = cartObj.cart_id;
      description = cartObj.more;  //  获得故障描述
      partcontent = cartObj.partcontent;  // 获得机修名称
      cart_licens = cartObj.chepai;
      var where = cart_licens.substring(0,1);
      cart_licens = cart_licens.substring(1,7);
      console.log(description)
      console.log(cartObj)
      $('.chepai').val(cart_licens);
      $('.locaWhere').text(where);
      $('.order_secend').text(description);
      $('.order_read').html(template('tpl',cartObj));
      
    }
    // 将 18时05分转换为 18:05:00
    listOrdertime = listOrdertime.split('分');
    var timese = listOrdertime[0].split('时');
    listOrdertime =  timese[0]+':'+timese[1];

    var time = clickTime+' '+listOrdertime;// 暂时不需要
    console.log(time)
    $('.cardTime').text("预约时间: "+time)
    

    $('.order_foter').html(allnow);
    $('.order_foter che_iconClose').hide();
    //渲染页面数据
    $('.cmt-money-number').text(money)
    // $('.chepai').val(cart_licens)
    //判断男女
    
    var pops = document.getElementById("pop_bottom");
    var mask = mui.createMask(function() {
      pops.classList.remove("mui-active");
      $('.upkeep-del').find(".mui-icon-arrowup").toggleClass("hiden").siblings().toggleClass('hiden');
    });



// 地址弹出层
  $(".carName").on("tap", function() {
    // $(this).find(".mui-icon-arrowup").toggleClass("hiden").siblings().toggleClass('hiden');
    mask.show();

    // 显示
    pops.classList.toggle("mui-active");
  });

  // 地址选择
  $('.order_botPover .order_carry').on('tap','span',function(){
      var text = $(this).text();
      console.log(text)
      
    $('.locaWhere').html(text);

    pops.classList.toggle("mui-active");
    mask.close();
  })

  // 点击支付跳转支付页面
  $(".message_div").on('tap',function(){

    var username = $('.username').val();
    var mobile = $('.mobile').val();
    var cheNum = $('.chepai').val();
    var card_clince = $('.locaWhere').text()+cheNum;
    console.log(card_clince)
    if(username.length ==0){
      mui.alert('请输入联系人姓名');
      return false;
    }else if(!card_clince){
      mui.alert('请输入车牌!');
      return false;
    }else if(mobile.length==0){
      mui.alert('请输入联系方式');
      return false;
      
    }else if(!Number(mobile)){
      mui.alert('手机号码格式不正确');
      return false;
    }
    console.log(mobile+username)
    $.ajax({
      url:api+'indexAppointAddOrder',
      type:'post',
      headers:{'userauthkey':token},
      data:{
          user_id :user_id,
          store_id: store_id, //店铺id
          cart_id:  cmodel_id,//车辆id
          connect_people : username,//联系人
          connect_phone :  mobile, //联系电话
          time :   time,     //服务时间
          time_id:time_id,   //时间id
          day : clickTime,
          description:description,
          partcontent:partcontent,
          type:seaverId
      },
      success:function(data){
        console.log(data);
        if(data.result){
          listObj.ordersn = data.data.ordersn;
          sessionStorage.removeItem('newTime');
          sessionStorage.removeItem('allnow');
          sessionStorage.removeItem('comboIds');
          sessionStorage.removeItem('cardListAll');
          sessionStorage.setItem('listObj',JSON.stringify(listObj))
          mui.toast(data.msg);
          setTimeout(function(){
            location.href = "/myself/yuyueList.html"
          },800)
        }else{
          mui.toast(data.msg);
        }
      }
    })
  })


});
