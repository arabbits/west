$(function() {
    console.log(token);
    
      //获取时间信息
      var year = new Date().getFullYear();
      var oldyear = year - 7;
      var month = new Date().getMonth() + 1;
      var cart_id = sessionStorage.getItem('cart_id') //获取车辆id
      var user_id = sessionStorage.getItem('user_id');
      
      $.ajax({
        url:api+'indexUpdateList',
        type:'post',
        headers:{'userauthkey':token},
        data:{
          user_id:user_id,
          cart_id:cart_id
        },
        success:function(data){
          console.log(data)
          $('.editFather').html(template('editcar',data))
          if(data.data.is_start==1){
            $('.mui-switch').addClass('mui-active')
          }
        }
      })

      $(".editFather").on("tap",".shoping_che", function() {
          $(".che_container").toggleClass("mui-backdrop");
          var dtpicker = new mui.DtPicker({
            type: "mui-dtpicker-body", //设置日历初始视图模式
            beginDate: new Date(oldyear, 04), //设置开始日期
            endDate: new Date(year, month), //设置结束日期
            customData: {
              y: [
                { value: "年", text: "2018 年" },
                { value: "年", text: "2017 年" },
                { value: "年", text: "2016 年" },
                { value: "年", text: "2015 年" },
                { value: "年", text: "2014 年" },
                { value: "年", text: "2013 年" },
                { value: "年", text: "2012 年" }
              ],
              m: [
                { value: "月", text: "1 月" },
                { value: "月", text: "2 月" },
                { value: "月", text: "3 月" },
                { value: "月", text: "4 月" },
                { value: "月", text: "5 月" },
                { value: "月", text: "6 月" },
                { value: "月", text: "8 月" },
                { value: "月", text: "9 月" },
                { value: "月", text: "10 月" },
                { value: "月", text: "11 月" },
                { value: "月", text: "12 月" }
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
        //   $(".mui-dtpicker .mui-picker").css("width", "50%");    
      });
      var pops = document.getElementById("pop_bottom");
      var mask = mui.createMask(function() {
        pops.classList.remove("mui-active");
      });
      $(".editFather").on("tap", ".carName",function() {
        mask.show();
        // 显示
        pops.classList.toggle("mui-active");
      });
        //车牌地址放到页面 ??????
      $('.editFather .order_botPover .order_carry').on('tap','span',function(){
        var text = $(this).text();
        console.log(text)
        $('.carName').html(text+'<span class="mui-icon mui-icon-arrowdown"></span>');
  
        pops.classList.toggle("mui-active");
        mask.close();
      })
      // 地址弹出层结束
      
      // else if (!chepai(data)) {
      //   mui.alert("请输入正确车牌号"); //先不做车牌号码验证
        
      // }
      $('.che_footer').on('tap',function(){
        var val = $('#che-input').val();
        var data =$('.carName').text()+$('.oeder_detail').val();
        var country = $('.whereCity').text();
        var fadong = $('#eaidmyCar_input').val();//发动机号暂时先不传
        console.log(data);
        var is_start = 2;
        // 判断内容是否填写 与正确
        if($('.mui-switch-mini').hasClass('mui-active')){
          is_start=1
          
        }else{
          is_start=2
        }
        console.log(is_start);
        
        if($(".shoping_time").hasClass("che_text_spac") || !$('#che-input').val()){
          mui.alert("请将信息填写完整");
        }else if(!checkNumber(val)){
          mui.alert("请输入数字");
        }else{
          // var values = $(".show_dots").text();
          var timer = $(".shoping_time").text();
          // console.log(values);
          var type_id = sessionStorage.getItem('type_id');
          
          console.log(timer);
          // sessionStorage.setItem("newTest",values)
          sessionStorage.setItem("cart_licens",data) //保存车牌号
          sessionStorage.setItem("shop_time",timer) //购车时间
          sessionStorage.setItem("cart_mile",val)  //行驶里程
          $.ajax({
            url:api+'indexEditCart',
            type:'post',
            headers:{'userauthkey':token},
            data:{
              user_id:user_id, 
              type_id:type_id,
              cart_id:cart_id,
              country:country ,
              cart_licens:data,
              cart_mile :val,
              shop_time:timer,
              is_start:is_start
              // type_id 品牌
              // country 城市
              // cart_licens 车牌号
              // cart_vin 车辆唯一vin
              // cart_mile 行驶公里
              // shop_time 购车时间
              // is_start 是否默认，1，默认，2，非默认
              // cart_price 车辆价格
            },
            success:function(data){
              console.log(data.result);
              console.log('heh');
            //   
              if(data.result){
                mui.toast(data.msg)
                location.href = "carlist.html" 
              }
            }
          })

        }
      })
    });