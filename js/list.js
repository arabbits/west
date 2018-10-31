
$(function() {

  
  $.ajax({
    url:api+'indexIsCart',
    headers:{'userauthkey':token},
    beforeSend:function(){
        $('.loading').show();
        $('.mui-scroll-wrapper').hide();
    },
    type:'post',
    success:function(data){
      console.log(data);
      if(data.result){
        $('.loading').hide();
        $('.mui-scroll-wrapper').show(); 
        var newTime = {all_licen:data.data.type_name,cart_id:data.data.cart_id ,move:data.data.cart_mile,chepai:data.data.cart_licens}
        sessionStorage.setItem('newTime',JSON.stringify(newTime))
      }else{
        mui.alert(data.msg,function(){
          location.href = "/myself/carlist.html";
        })
      }
    }
  })
  // 显示 模态框
  var pop = document.getElementById("pop");
  var mask = mui.createMask(function () {
      pop.classList.remove('mui-active');
  });
  //获取user_id
  // var user_id = sessionStorage.getItem('user_id');
  var clickTime ;
  var myDate = new Date();
  var year = myDate.getFullYear();  //年
  var mon = myDate.getMonth()+1;  //月
  var day = myDate.getDate();    //日
  var week = myDate.getDay();    //周 0~6 日~一
  var nowTime = new Date().getTime(); //当前时间戳
  //渲染头部实行
  head(mon,day,week)
  
  //渲染ajax实行
  reloads(nowTime)
      // 头部日期显示
  $('.timer_top_page').on('tap',function(){
    var  that = $(this);
    var timeid = that.data('timeid');
    that.addClass('timer_active').siblings().removeClass("timer_active")
    clickTime = year+'-'+that.find('.list_data').text();
  
    // sessionStorage.setItem('clickTime',clickTime);
    // 获得当前年月日 格式2018-07-05;
    var nowYear = year+'-'+(mon>=10? mon :'0'+mon)+'-'+(day>=10? day :'0'+day)
    // console.log(nowYear)
    reloads(clickTime)
    if(timeid==5){
      // console.log(clickTime)
      // 将背景色给上一个兄弟节点
      that.removeClass("timer_active").prev().addClass('timer_active');
      
      $('.list_data').each(function(v,i){
        var time = year+'-'+$(this).text();
        time = getNextDay(time)
        // console.log(time)
        $(this).text(time);
        
      }); //页面的日期
  
      $('.font_xs').each(function(v,i){
        var times = year+'-'+$(this).prev().text();
        var week = new Date(Date.parse(times.replace(/-/g, "/")));  
        var weeks = week.getDay();
        // var week = new Date(Date.parse(value.replace(/-/g, "/")));  
        // console.log(weekWhere(weeks))
        $(this).text(weekWhere(weeks));
      }); 
      
  
    }if(timeid==1){
      if(clickTime==nowYear){
        console.log('哈哈')
        that.find('.font_xs').text('今天');
      }else{
        // 将背景色给下一个兄弟节点
        clickTime = year+'-'+getPrevDay(clickTime);
        that.removeClass("timer_active").next().addClass('timer_active');
        $('.list_data').each(function(v,i){
          var time = year+'-'+$(this).text();
          time = getPrevDay(time)
          // console.log(time)
          $(this).text(time);
          
        }); //页面的日期
        $('.font_xs').each(function(v,i){
          var thats = $(this);
          var times = year+'-'+$(this).prev().text();
          var week = new Date(Date.parse(times.replace(/-/g, "/")));  
          var weeks = week.getDay();
          // var week = new Date(Date.parse(value.replace(/-/g, "/")));  
          // console.log(weekWhere(weeks));
          //做判断 
          thats.text(weekWhere(weeks));
          
          if(clickTime==nowYear){
            thats.text(weekWhere(weeks));
            $('.font_xs').eq(0).text('今天');
          }
        });   //页面的周几
      }
  
    }
    // reloads(clickTime)
  })
    
  //弹出日期控件代码
  laydate.render({
    elem: '.laydata'
    ,position: 'static'
    ,min:0
    ,max:60
    ,theme: '#ea5504'
    ,btns: ['clear', 'confirm']
    ,done: function(value, date, endDate){
      mask.close()
      
      if(value){
        console.log(value); //得到日期生成的值，如：2017-08-18
        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        // var week=myDate.getDay();
        clickTime = value;
        console.log(clickTime)
        var layyear =  date.year;
        var laymon =  date.month;
        var laydate =  date.date;
        var week = new Date(Date.parse(value.replace(/-/g, "/")));  
        var weeks = week.getDay();
        // var week = new Date(Date.parse(value.replace(/-/g, "/")));  
        console.log(week)
    
        reloads(value)
        head(laymon ,laydate-1 ,weeks-1,layyear,clickTime )
        var active =laymon >= 10? laymon : '0'+String(laymon) +"-"+ (laydate>=10?laydate : '0'+String(laydate))
        $('.list_data').each(function(){
    
        })
  
      }
      // console.log(active=='06-08');
    }
  })
  
  
    // 渲染头部函数
  function head(mon,day,week,year,value){
    // 渲染头部
    console.log(week)
    var maxDay = 1;
    $('.list_data').each(function(index,val){
      var weekDay = ["日", "一", "二", "三", "四", "五", "六"];  
      $(this).text(mon >= 10? mon : '0'+String(mon) +"-"+ (day>=10?day : '0'+String(day)))
      if(index==1){
        $(this).parents('.timer_top_page').addClass('timer_active');
      }else{
        $(this).parents('.timer_top_page').removeClass('timer_active');
      }
      // $(this).next().text(weekDay[getDay()])
      var now = $(this).next().text(mon == myDate.getMonth()+1 ? (day == myDate.getDate()? '今天':'周'+ weekDay[week]):'周'+weekDay[week]);
      //判断当前月份共有多少天?
      if (mon==1||mon==3||mon==5||mon==7||mon==8||mon==10||mon==12) {
        //大月
        maxDay=31;
        // space(weekNow);
        // loop(maxDayNum,day);
      }else if (mon==4||mon==6||mon==9||mon==11) {
        //小月
        maxDay=30;
        // space(weekNow);
        // loop(maxDayNum,day);
      }else{
        //2月
        if (year%4==0) {
          // 闰年
          maxDay=29;
          // space(weekNow);
          // loop(maxDayNum,day);
        }else{
          //平年
          maxDay=28;
          // space(weekNow);
          // loop(maxDayNum,day);
        }
      }
      console.log(maxDay)
      day++;
      //若天数大于本月最大天数 则月份加1 天数变为1
      if(day>maxDay){
        day = 1;
        mon++;
      }
      week++;
      if(week>6){
        week = 0
      }
  
      
    })
  }
  //ajax 请求函数
  function reloads(result){
    // var date = result;
    // console.log(date)
    $.ajax({
      url:api+'indexOrderSelectStore',
      headers:{'userauthkey':token},
      beforeSend:function(){
          $('.loading').show();
          $('.mui-scroll-wrapper').hide();
      },
      type:'post',
      data:{
        user_id: user_id ,
        day : result
      },
      success:function(data){
        if(!data){
          console.log('data');
          mui.toast('暂无关联店铺!');
          clearTimeout(timer);
          var timer = setTimeout(function(){
            // location.href = "/index.html";
            history.go(-1);
          },800)
        }else{
          console.log(data);
          $('.loading').hide();
          if(data.result){
            $('.mui-scroll-wrapper').show();
            $('.timer_content').html(template('tpl',data))
    
          }else{
            mui.toast(data.msg)
          }
        }
      }
    }) 
  }
  // 获得日期后加上一天
  function getNextDay(d){
    d = new Date(d);
    d = +d + 1000*60*60*24;
    d = new Date(d);
    //return d;
    //格式化
    // return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    return ((d.getMonth()+1)>=10?(d.getMonth()+1):'0'+(d.getMonth()+1))+"-"+(d.getDate()>=10?d.getDate():'0'+d.getDate());
  
  }
  // 获得日期后减去上一天
  function getPrevDay(d){
    d = new Date(d);
    d = +d - 1000*60*60*24;
    d = new Date(d);
    //return d;
    //格式化
    // return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    return ((d.getMonth()+1)>=10?(d.getMonth()+1):'0'+(d.getMonth()+1))+"-"+(d.getDate()>=10?d.getDate():'0'+d.getDate());
  
  }
  // 获得当前周几
  function weekWhere(days){
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDay[days];
  }





  $(".timer_content").on("tap",'.vertical-center', function() {
    var temer = $(this).parent().find(".selectime").text();
    var store_id =$(this).parents('.fathers').find(".store").data('storeid');
    var cartName = $(this).parents('.fathers').find(".storeName").text();  //  获得门店名称
    var cartSite = $(this).parents('.fathers').find(".storeKm").text();    // 获得门店地址
    console.log(cartName)
    console.log(cartSite)
    temer = temer.split("-");
    console.log(temer);
    var obj = [];
    temer.forEach(function(v) {
      var key = v.split(":")[0];
      var value = v.split(":")[1];
      obj.push(key,value)
    });
    console.log(obj);
    
    var arr=[];
    for(var i=parseInt(obj[0]);i<=parseInt(obj[2]);i++){
      console.log(i);
      arr.push(i)
    }
    console.log(arr);
    obj[3]==0? arr=arr.splice(0,arr.length-1) :arr=arr;

    console.log(arr);

      var month = new Date().getMonth() + 1;
      var dtpicker = new mui.DtPicker({
        type: "mui-dtpicker-body", //设置日历初始视图模式
        beginDate: new Date(obj[0], 04), //设置开始日期
        endDate: new Date(obj[2], month), //设置结束日期
        customData: {
          y: [
              
            { value: "时", text:obj[0]+'时' },
            arr[1]==undefined?'' :{ value: "时", text:  arr[1] >=10?arr[1]+'时': arr[1] + '时' },
            arr[2]==undefined?'' :{ value: "时", text:  arr[2] >=10?arr[2]+'时': arr[2] + '时' }
        
          ],
          m: [
            { value: "分", text: "00分" },
            { value: "分", text: "05分" },
            { value: "分", text: "10分" },
            { value: "分", text: "15分" },
            { value: "分", text: "20分" },
            { value: "分", text: "25分" },
            { value: "分", text: "30分" },
            { value: "分", text: "35分" },
            { value: "分", text: "40分" },
            { value: "分", text: "45分" },
            { value: "分", text: "50分" },
            { value: "分", text: "55分" }
          ]
        }
      });
    dtpicker.show(function(e) {
      console.log(e);
      if(!clickTime){
        clickTime =year+'-'+$('.timer_active').find('.list_data').text();
      }
      clickTime = clickTime+"("+$('.timer_active').find('.font_xs').text()+")";
      console.log(clickTime);
      var minText = e.m.text.split('分')[0];
      var maxText = e.y.text.split('时')[0];
      // console.log(minText);
      // console.log(maxText);
      if(minText>obj[3] && maxText==obj[2]){
        mui.toast('保养最晚时间为'+temer[1]);
        return false;
      }
      if(minText<obj[1] && maxText==obj[0]){
        mui.toast('保养最早时间为'+temer[0]);
        return false;
      }
      console.log( e.y.text +e.m.text )
      var listOrdertime = e.y.text +e.m.text;
      
      var listObj = {listOrdertime:listOrdertime,clickTime:clickTime,store_id:store_id,cartName:cartName,cartSite:cartSite}
      sessionStorage.setItem('listObj',JSON.stringify(listObj))
      dtpicker.dispose();
      location.href = "../upkeep/upkeep.html"
    });
    $(".mui-dtpicker .mui-picker").css("width", "50%");
  });

  $('.timer_content').on('tap','.reserve_store',function(){
    var store_id =$(this).parents('.fathers').find(".store").data('storeid');
    var cartName = $(this).parents('.fathers').find(".storeName").text();  //  获得门店名称
    var cartSite = $(this).parents('.fathers').find(".storeKm").text();    // 获得门店地址
    var listObj = {store_id:store_id,cartName:cartName,cartSite:cartSite}
    sessionStorage.setItem('listObj',JSON.stringify(listObj))
    location.href = "../upkeep/upkeep.html"
    console.log('jj')
  })


  //时间弹出层
  $('.datapicker_datas').on('tap',function(){
    pop.classList.add('mui-active');
    mask.show()
    $('.laydate-btns-clear').text('取消')
  })

  // var str = '90:00:00';
  // console.log(str.substring(0,5))

});
