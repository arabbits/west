$(function() {
  var select = sessionStorage.getItem('select');
  var clickCoupon = localStorage.getItem('clickCoupon');
  
    $('.icon_left').on('tap',function(){
      if(!!clickCoupon){
        mui.toast('请添加新车领取优惠券')
      }else{
        if(select){
          location.href = "/mindex/select.html";
        }else{
          location.href = "/myself/carlist.html";
        }
      }
      
    })
  // 公里数
  function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }
  //车牌
  // function chepai(data){
  //   var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}$/;  
  //   if(reg.test(data)){
  //     return true;
  //   }
  //   return false;
  // }
  //获取位置信息
  $.ajax({
    url:api+'indexOrderIpLocation',
    type:'post',
    headers:{'userauthkey':token},
    success:function(data){
      console.log(data);
      $('.whereCity').text(data.data);
    }
  })
  console.log(token);
   
  //跳转到 选择车辆品牌页面
    $(".show_dots").on("tap", function() {
        console.log('heh');
        sessionStorage.removeItem('where');
        location.href= "brand.html";
     
    });
    var cheText = sessionStorage.getItem('All')//获取车辆信息
    console.log(cheText);
    // 加入车辆信息
    if (cheText) {
      $(".show_dots").text(cheText).removeClass("che_text_spac");
    };
    //获取时间信息
    var year = new Date().getFullYear();
    var oldyear = year - 7;
    var month = new Date().getMonth() + 1;
    
    //如果车辆信息为空则让其先添加车辆信息
    $('input').on('tap',function(){
      // console.log('哈哈')
      if($(".show_dots").hasClass("che_text_spac")){
        mui.alert('请先添加爱车信息')
      }
    })
    //显示时间弹出层
    $(".shoping_che").on("tap", function() {
      if ($(".show_dots").hasClass("che_text_spac")) {
        mui.alert("请先选择您的爱车");
      }else if(!$('.oeder_detail').val()){
       mui.alert('请先写车牌号')
      } else {
        $(".che_container").toggleClass("mui-backdrop");
        var dtpicker = new mui.DtPicker({
          type: "mui-dtpicker-body", //设置日历初始视图模式
          beginDate: new Date(oldyear, 04), //设置开始日期
          endDate: new Date(year, month), //设置结束日期
          customData: {
            y: [
              { value: "年", text: "2018年" },
              { value: "年", text: "2017年" },
              { value: "年", text: "2016年" },
              { value: "年", text: "2015年" },
              { value: "年", text: "2014年" },
              { value: "年", text: "2013年" },
              { value: "年", text: "2012年" },
              { value: "年", text: "2011年" },
              { value: "年", text: "2010年" },
              { value: "年", text: "2009年" },
              { value: "年", text: "2008年" },
              { value: "年", text: "2007年" },
              { value: "年", text: "2006年" },
              { value: "年", text: "2005年" }
            ],
            m: [
              { value: "月", text: "1月" },
              { value: "月", text: "2月" },
              { value: "月", text: "3月" },
              { value: "月", text: "4月" },
              { value: "月", text: "5月" },
              { value: "月", text: "6月" },
              { value: "月", text: "7月" },
              { value: "月", text: "8月" },
              { value: "月", text: "9月" },
              { value: "月", text: "10月" },
              { value: "月", text: "11月" },
              { value: "月", text: "12月" }
            ]
          }
        });
        dtpicker.show(function(e) {
          console.log(e);
          $(".shoping_time")
            .text(e.y.text + e.m.text)
            .removeClass("che_text_spac");
          dtpicker.dispose();
        });
        $(".mui-dtpicker .mui-picker").css("width", "50%");
      }
    });

    //地址弹出层
    var pops = document.getElementById("pop_bottom");
    var mask = mui.createMask(function() {
      pops.classList.remove("mui-active");
    });
    $(".carName").on("tap", function() {
      mask.show();
      // 显示
      pops.classList.toggle("mui-active");
    });
    $('.order_botPover .order_carry').on('tap','span',function(){
      var text = $(this).text();
      console.log(text)
      
      $('.carName').html(text+'<span class="mui-icon mui-icon-arrowdown"></span>');

      pops.classList.toggle("mui-active");
      mask.close();
    })
    // 地址弹出层结束
    // //点击车辆管理
    // $('.che_footer').on('tap',function(){
    //   var timer = $(".shoping_time").text();
    //   timer = timer.split('年')
    //   var mous = timer[1].split('月')[0];
    //   timer = timer[0]+'-'+(mous>10?mous :'0'+mous)
    //   console.log(timer[1].split('月')[0])
    //   console.log(timer)
    // })
    
    $('.che_footer').on('tap',function(){
      var val = $('#che-input').val(); //公里数
      var datas =$('.carName').text()+$('.oeder_detail').val(); //车牌
      var country = $('.whereCity').text(); //当前 定位
      var cart_price = $('#cart_price').val(); //车辆价格
      // var km = $('.che_line_input').val();
      console.log(datas);
      console.log(val);
      console.log(cart_price);
      // 判断内容是否填写 与正确
      
      if($(".show_dots").hasClass("che_text_spac") || $(".shoping_time").hasClass("che_text_spac") ||!val||!cart_price){
        mui.alert("请将信息填写完整");
      }else if(!checkNumber(val)){
        mui.alert("请输入数字");
      }
      // else if (!chepai(datas)) {
      //   mui.alert("车牌内字母要大写");
        
      // }
      else{
        // var values = $(".show_dots").text();
        var timer = $(".shoping_time").text();
        timer = timer.split('年')
        var mous = timer[1].split('月')[0];
        timer = timer[0]+'-'+(mous>10?mous :'0'+mous)
        //切割timer为 2018-06 格式
        console.log(timer)
        
        var type_id = sessionStorage.getItem('type_id');
        console.log(timer);
        var obj = {"km":val,"cart_licens":datas,"shop_time":timer,"country":country};
        console.log(obj);
        // console.log(JSON.stringify(obj));
        sessionStorage.setItem("cart_message",JSON.stringify(obj))
        

        $.ajax({
          url:api+'indexAddCar',
          type:'post',
          headers:{'userauthkey':token},
          data:{
            user_id:user_id, //此id是我随意设置的 没有存储到缓存中
            type_id:type_id,
            country:country ,
            cart_licens:datas, //车牌
            cart_mile :val,
            shop_time:timer,
            cart_price:cart_price,
            is_start:1
          },
          success:function(data){
            console.log(data);
            if(data.result){

              // obj.cmodel_id=data.data;
              // console.log(JSON.stringify(obj));
              // sessionStorage.setItem("cart_message",JSON.stringify(obj)) //没卵用
              sessionStorage.removeItem('All');

              if(!!clickCoupon){
                location.href = '/mindex/share.html'; 
              }else{
                if(select){
                  location.href = "/mindex/select.html";
                }else{
                  location.href = "/myself/carlist.html";
                }
              }
            } else{
              mui.toast(data.msg+'车牌号码重复')
            }
          }
        })
        // location.href = "../upkeep/upkeep.html"  
      }
    })

    if(!!clickCoupon){
      pushHistory();
    }
    window.addEventListener('popstate', function(e) { 
      mui.toast('请添加新车领取优惠券');
      var state = { 
          title: 'title', 
          url: '#' 
      }; 
      window.history.pushState(state, 'title', '#'); 
      
    }, false); 
    function pushHistory() { 
        var state = { 
            title: 'title', 
            url: '#' 
        }; 
        window.history.pushState(state, 'title', '#'); 
    } 
  });