$(function() {
    console.log(token);
    
      //获取时间信息
      var year = new Date().getFullYear();
      var oldyear = year - 7;
      var month = new Date().getMonth() + 1;
      var cart_id = sessionStorage.getItem('cart_id') //获取车辆id
      
      $.ajax({
        url:api+'indexUpdateList',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
          $('.loading').show()
        },
        data:{
          user_id:user_id,
          cart_id:cart_id
        },
        success:function(data){
          $('.loading').hide()
          $('.che_main').show()
          if(data.result){
            $('.editFather').html(template('editcar',data))

          }else{
            mui.toast('正在刷新 请稍等')
          }
          console.log(data)
          if(cheText){
            $('.edit_name').text(cheText);
          }
          if(data.data.is_start==2){
            $('.mui-switch').removeClass('mui-active');
            $('.editMoren').show();
            
          }
        }
      })
      var cheText = sessionStorage.getItem('All')//获取车辆信息
      console.log(cheText)
      
      //点击选择车辆信息
      $('.editFather').on('tap','.editmycar_head',function(){
        console.log('哈哈')
        sessionStorage.setItem('where','editCar')
        location.href= "/message/brand.html"
        
      })
      //购买车 时间 弹层
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
                { value: "年", text: "2012 年" },
                { value: "年", text: "2011 年" },
                { value: "年", text: "2010 年" },
                { value: "年", text: "2009 年" },
                { value: "年", text: "2008 年" },
                { value: "年", text: "2007 年" },
                { value: "年", text: "2006 年" },
                { value: "年", text: "2005 年" },
              ],
              m: [
                { value: "月", text: "1 月" },
                { value: "月", text: "2 月" },
                { value: "月", text: "3 月" },
                { value: "月", text: "4 月" },
                { value: "月", text: "5 月" },
                { value: "月", text: "6 月" },
                { value: "月", text: "7 月" },
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
      //去掉沪 牌选择 手动添加 
      // var pops = document.getElementById("pop_bottom");
      // var mask = mui.createMask(function() {
      //   pops.classList.remove("mui-active");
      // });
      // $(".editFather").on("tap", ".carName",function() {
      //   mask.show();
      //   // 显示
      //   pops.classList.toggle("mui-active");
      // });
      //   //车牌地址放到页面 ??????
      // $('.editFather .order_botPover .order_carry').on('tap','span',function(){
      //   var text = $(this).text();
      //   console.log(text)
      //   $('.carName').html(text+'<span class="mui-icon mui-icon-arrowdown"></span>');
  
      //   pops.classList.toggle("mui-active");
      //   mask.close();
      // })
      // 地址弹出层结束

      // function Number(theObj) {
      //   var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
      //   if (reg.test(theObj)) {
      //     return true;
      //   }
      //   return false;
      // }
      // 公里数
      function checkNumber(theObj) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      }
      //车牌
      function chepai(data){
        var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}$/;  
        if(reg.test(data)){
          return true;
        }
        return false;
      }
      // 保存修改
      $('.che_footer').on('tap',function(){
        sessionStorage.removeItem('where')
        
        var val = $('#che-input').val();
        var data =$('.oeder_detail').val();
        // var country = $('.whereCity').text();
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
        }else if(!chepai(data)){
          mui.alert("车牌内字母要大写");
        }else if(!checkNumber(val)){
          mui.alert("请输入数字");
        }else{
          var timer = $(".shoping_time").text();
          var type_id = sessionStorage.getItem('type_id'); //车子牌子获取type_id传过去就行了
          
          console.log(timer);
          $.ajax({
            url:api+'indexEditCart',
            type:'post',
            headers:{'userauthkey':token},
            data:{
              user_id:user_id, 
              type_id:type_id, //品牌
              cart_id:cart_id,
              // country:country , //城市
              cart_licens:data, //车牌号
              cart_mile :val,  //行驶公里
              shop_time:timer, //购车时间
              is_start:is_start //是否默认
            },
            success:function(data){
              console.log(data.result);
              console.log('heh');
              sessionStorage.removeItem('All');
              
              if(data.result){
                mui.toast(data.msg)
                location.href = "carlist.html" 
              }else{
                mui.toast(data.msg)
                
              }
            }
          })

        }
      })
    });