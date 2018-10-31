
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});








$(function() {
  var myDate = new Date();
  var year = myDate.getFullYear();  //年
  var mon = myDate.getMonth()+1;  //月
  var day = myDate.getDate();    //日
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
    var coupon_price ;  //优惠券金额
    var name = userObj.user_name;

    var cmodel_id,cart_licens;  //获得车牌与车子id

    var listOrdertime,    //获取时间
        clickTime ,       //获取日期 
        store_id,money,cartName,cartSite,rec_id,discount;         // 获取店铺id
    // console.log(time)
    var listObj = sessionStorage.getItem('listObj');
    if(listObj){
      listObj = JSON.parse(listObj);
      // listOrdertime = listObj.listOrdertime;  // 暂时不需要
      // clickTime = listObj.clickTime;     // 暂时不需要
      store_id = listObj.store_id;
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
      cart_licens = cartObj.chepai;
      var where = cart_licens.substring(0,1);
      cart_licens = cart_licens.substring(1,7);
      console.log(where)
      console.log(cart_licens)
      $('.chepai').val(cart_licens);
      $('.locaWhere').text(where);
      
    }
    // 将 18时05分转换为 18:05:00
    // listOrdertime = listOrdertime.split('分');
    // var timese = listOrdertime[0].split('时');
    // listOrdertime =  timese[0]+':'+timese[1]+':'+'00';

    // var time = clickTime+' '+listOrdertime;// 暂时不需要
    var time = year+'-'+mon+'-'+day;
    console.log(time)
    $('.cardTime').text("保养时间: "+time)
    

    $('.order_foter').html(allnow);
    $('.order_foter che_iconClose').hide();
    console.log(money)
    //渲染页面数据
    $('.cmt-money-number').text(money)
    // $('.chepai').val(cart_licens)
    //判断男女
    
    var pop = document.getElementById("pop");
    var pops = document.getElementById("pop_bottom");
    var mask = mui.createMask(function() {
      pop.classList.remove("mui-active");
      pops.classList.remove("mui-active");
      $('.upkeep-del').find(".mui-icon-arrowup").toggleClass("hiden").siblings().toggleClass('hiden');
    });
    // var masks = mui.createMask(function() {
    //     pop.classList.remove("mui-active");
    //   });
    //订单明细弹出框
  $(".upkeep-del").on("tap", function() {
    $(this).find(".mui-icon-arrowup").toggleClass("hiden").siblings().toggleClass('hiden');
    
    // 显示
      pop.classList.toggle("mui-active");
      var gg = $('.mui-backdrop').length;
      // console.log(gg);
      if(gg>0){
          mask.close()
      }else{
          mask.show()
      }
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


  // 选择男女 
  $('.orderMan img').on('tap',function(){
      $('.supers').removeClass('hiden').siblings().addClass('hiden').parent().siblings().find('.hideStyle').addClass('hiden').siblings().removeClass('hiden')
      
      if($('.supers').length>0){
        console.log('男')
      }else(
        console.log('女')
        
      )
    
  })
  // 选择男女 
  $('.showStyle').on('tap',function(){
    var that = $(this);
    that.addClass('hiden').siblings().removeClass('hiden').parent().siblings().find('.supers').addClass('hiden').siblings().removeClass('hiden')
    if($('.showStyle').length>0){
      console.log('女')
      
    }
  })


  //按钮动效
  $('.repress_peo').on('tap',function(){
    $(this).find('.icon-switch').toggleClass('transForm');
  })
  //验证姓名
  // function Names(theObj) {
  //   var reg = /^([\u4e00-\u9fa5]){2,7}$/;
  //   if (reg.test(theObj)) {
  //     return true;
  //   }
  //   return false;
  // }
  //验证手机号
  function Number(theObj) {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }
  // 查看是否有优惠券
  coupons(user_id,money)
  function coupons(user_id,money){
    $.ajax({
        url:api+"indexListAllRecommend",
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
          $('.loading').show();
        },
        data:{
            user_id:user_id,
            order_price:money ,   // 订单总价
        },
        success:function(data){
            console.log(data);
            var isdata = data.data;
            $('.loading').hide();
            $('.che_main').show();
            if(data.result){
              $.each(isdata,function(v,i){
                console.log(i)
                if(i.is_usable==1){
                  $('.nomer').hide();
                  $('.haveColor').show();
                }else{
                  $('.nomer').show();
                  $('.haveColor').hide();
                }
              })
            }else{
                $('.nomer').show();
                $('.haveColor').hide();
                
            }
        }
    })
  } 
  $('.haveColor').on('tap',function(){
    console.log('hah')
    location.href = './youhui.html'
  })
  //车牌
  // function chepai(data){
  //   var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}$/;  
  //   if(reg.test(data)){
  //     return true;
  //   }
  //   return false;
  // }
  if(!!listObj.rec_id){
    rec_id = listObj.rec_id;
    discount = listObj.discount;
    if(discount>money){
      rec_id= '';
      discount= '';
    }else{
      $('.haveColor').text('已抵扣￥'+discount);
      $('.cmt-money-number').text((money*1-discount).toFixed(2));  
    }
    console.log(listObj.rec_id)
    // console.log(Math.(money*1-discount))
     
    // pushHistory();
  }
  // window.addEventListener('popstate', function(e) {

  // }, false); 
  // function pushHistory() { 
  //     var state = { 
  //         title: 'title', 
  //         url: '#' 
  //     };
  //     window.history.pushState(state, 'title', '#'); 
  // } 
 
  // 点击支付跳转支付页面
  $(".upkeep-bottom-btn").on('tap',function(){
    console.log(rec_id,discount)
    
    var username = $('.username').val();
    var mobile = $('.mobile').val();
    var cheNum = $('.chepai').val();
    var card_clince = $('.locaWhere').text()+cheNum;
    var endMoney = $('.cmt-money-number').text();
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
      url:api+'indexOrderAddOrder',
      type:'post',
      headers:{'userauthkey':token},
      data:{
          user_id :user_id,
          store_id: store_id, //店铺id
          cmodel_id:  cmodel_id,//车辆id
          connect_people : username,//联系人
          connect_phone :  mobile, //联系电话
          time :   time,     //服务时间
          cart_licens:card_clince,
          comboIds : comboIds,    //商品列表（json对象）
          cardList:cardListAll,
          rec_id:rec_id,
          discount:discount
      },
      success:function(data){
        console.log(data);
        if(data.result){
          listObj.ordersn = data.data.ordersn;
          listObj.money = endMoney;
          sessionStorage.removeItem('newTime');
          sessionStorage.removeItem('allnow');
          sessionStorage.removeItem('comboIds');
          sessionStorage.removeItem('cardListAll');
          sessionStorage.setItem('listObj',JSON.stringify(listObj))
          location.href = "./pay.html"
        }else{
          mui.toast(data.msg);
        }
      }
    })
  })

  // http://47.94.233.25/index/order/findCoupon
  // $.ajax({
  //   url: api+'indexOrderFindCoupon',
  //   type:'post',
  //   headers:{'userauthkey':token},
  //   data:{
  //     user_id:user_id,
  //     totalprice :money,
  //     store_id :store_id  
  //   },
  //   success:function(data){
  //     console.log(data)
  //     if(data.count == 0){
  //       console.log('没有优惠券哦')
  //       coupon_price = 0;
        
  //       console.log(coupon_price)
  //     }else{
  //       if(youhui !== null){
  //         $('.juan_head').html("-"+youhui).css('color','#ea5504').on('tap',function(){
  //           console.log('哈哈 ')
  //           location.href = "youhui.html"
  //         });
  //         // console.log(youhui)
          
  //       }else{
  //         $('.juan_head').html('点击查看优惠券<span class="mui-icon mui-icon-arrowright"></span>').addClass('haveColor').on('tap',function(){
  //           console.log('哈哈 ')
  //           location.href = "youhui.html"
  //         });
  //       }
  //     }
  //   }
  // })
});
