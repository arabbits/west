


$(function () {
    // $.ajax({
    //   url:api+"smobileTree",
    //   type:"post",
    //   headers:{"userauthkey":token},
    //   beforeSend:function(){
    //       $('.loading').show()
    //   },
    //   data:{
    //   },
    //   success:function(data){
    //       $('.loading').hide();
    //       console.log(data);
    //   }
    // })
    //点击是说明系统正在升级
    $('.cheUls a').on('tap',function(){
      var title = $(this).find('span').text();
      var id = $(this).data('id');
      var keyWordId,seaverId,locaWhere; //四个跳转页面的分别id
      // 先清除店铺存储的 sessionStorage 
      
      sessionStorage.removeItem('newTime');
      sessionStorage.removeItem('listObj');
      sessionStorage.removeItem('comboIds');
      sessionStorage.removeItem('keyWordId');
      sessionStorage.removeItem('seaverId');
      sessionStorage.removeItem('yuyueId');
      var wheres = sessionStorage.getItem('locationRoad');
      if(wheres){
        wheres = JSON.parse(wheres);
        locaWhere = wheres.where;
      }
      if(id==1){
        // console.log('借金额将')
        keyWordId = 1;
        sessionStorage.setItem('keyWordId',keyWordId);
        location.href="/shop/list.html"
      }
      else if(id==2){
        // sessionStorage.removeItem('reserObj'); //毁尸灭迹 预约维修
        
        // location.href="/mindex/reservation/reservation.html"
        seaverId = 1;  //预约维修
        sessionStorage.setItem('seaverId',seaverId);
        location.href="/shop/newList.html"
        
      }
      else if(id==3){

        // location.href="/mindex/banjin/banjin.html"
        seaverId = 2;  //钣金喷漆
        sessionStorage.setItem('seaverId',seaverId);
        location.href="/shop/newList.html"
        
      }
      else if(id==4){
        keyWordId = 2;
        sessionStorage.setItem('keyWordId',keyWordId);
        location.href="/shop/list.html"
      }
      else if(id==5){
        keyWordId = 4;
        sessionStorage.setItem('keyWordId',keyWordId);
        location.href="/shop/list.html"
      }
      else if(id==6){
        mui.toast(title+'正在维护中 请稍等')
        location.href="/mindex/sos.html"
      } 
      else if(id==7){

        location.href="https://map.baidu.com/mobile/webapp/search/search/qt=s&wd="+locaWhere+"停车场/"
      }
      else if(id==8){
        location.href="https://map.baidu.com/mobile/webapp/search/search/qt=s&wd="+locaWhere+"加油站/"
        
      }
      else if(id==9){
        keyWordId = 3;
        // sessionStorage.setItem('keyWordId',keyWordId);
        // location.href="/shop/list.html"
        seaverId = 3;  //钣金喷漆
        sessionStorage.setItem('seaverId',seaverId);
        location.href="/shop/newList.html"
      }
      else if(id==10){
        // location.href="/newindex.html"  不知道是啥页面 哈哈
        // location.href = './myself/discounts.html' // 之前写的优惠券页面
        // location.href="./mindex/coupon.html" 
        localStorage.removeItem('clickCoupon');
        location.href="./mindex/guest.html" 
      }
      else{
        mui.toast(title+'正在维护中 请稍等')

      }
    })


    $('.indexObd').on('tap',function(){
        console.log('hh ')
        location.href = '/upkeep/server.html';
    })
    console.log(token)
    // var jj = "世纪公园";
    // console.log(jj.split(',')[0])
     
    if(!token){
      WeChat()
    };
    var locationRoad = sessionStorage.getItem('locationRoad');
    var funcking = location.href;
    console.log(funcking)
    if(!locationRoad){
      $(".loading").show();
      $('.che_container').hide();
      $.ajax({
        url:api+'indexindexGetLocation',
        headers:{'userauthkey':token},
        data:{
          url:funcking
        },
        type:'get',
        success:function(data){
            console.log(data)
            var appId=data.data.appId
            var nonceStr=data.data.nonceStr
            var signature=data.data.signature
            var timestamp=data.data.timestamp
            console.log(timestamp)
            console.log(signature)
            if(data.result){
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi',
                    'openLocation',
                    'getLocation',
                    'translateVoice'
                    ]
                });
                wx.checkJsApi({
                    jsApiList: [
                        'getLocation'
                    ],
                    success: function (res) {
                        // alert(JSON.stringify(res));
                        // alert(JSON.stringify(res.checkResult.getLocation));
                        if (res.checkResult.getLocation == false) {
                            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                            return;
                        }
                    }
                });
                wx.ready(function () {
                    //自动执行的
                    wx.checkJsApi({
                        jsApiList: [
                            'getLocation',
                        ],
                        success: function (res) {
                        }
                    });
                    //如果不支持则不会执行
                    wx.getLocation({
                        success: function (res) {
                            // 用户同意后,将获取的位置基础信息(经度和纬度信息)请求到控制器
                            //控制器中利用百度的api请求返                回地理位置信息数据
                            //                 $.get("http://api.carlub.com.cn/indexindexMap",{ 'res':res ,'userauthkey':token},function(data){
                            //                     if(data.status == 0){
                            //                     $('.wxlocation').html(data.result.addressComponent.city);
                            //                         alert(data.result.addressComponent.city)
                            //                     }else{
                            //                         $('.wxlocation').html('未知城市');
                            //                         console.log('是失败')
                            //                         alert('失败')
                            //                     }
                            //                 });
                          console.log(res);
                          var map = new BMap.Map("allmap");      
                          // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);   
                          var locationRoad = {lon:res.longitude,lat:res.latitude};
                          // 创建地理编码实例      
                          var myGeo = new BMap.Geocoder();      
                          // 根据坐标得到地址描述    
                          myGeo.getLocation(new BMap.Point(res.longitude, res.latitude), function(result){      
                              if (result){      
                                console.log(result)
                                // alert(result.address+result.business.split(',')[0]);    
                                // console.log(result.addressComponents.province+result.addressComponents.city+result.addressComponents.district+result.addressComponents.street)
                                
                                // console.log(result.addressComponents.city)
                                // alert(result.address);    
                                var city = result.addressComponents.city;
                                $('.wxlocation').text(city);
                                locationRoad.locationRoad = city;
                                locationRoad.where = result.address+result.business.split(',')[0];
                                sessionStorage.setItem('locationRoad',JSON.stringify(locationRoad));
                                $(".loading").hide();
                                $('.che_container').show();
                                mui(".mui-slider").slider({
                                  interval: 2000
                                });
                                
                              }      
                          });
                        },
                        cancel: function (res) {
                            alert('用户拒绝授权获取地理位置');
                        }
                    });
                });
                wx.error(function (res) {
                    alert(res.errMsg);
                });
            }
        }
  
      })
    }else{
      locationRoad = JSON.parse(locationRoad);

      $('.wxlocation').text(locationRoad.locationRoad);
      $('.che_container').show();
      mui(".mui-slider").slider({
        interval: 2000
      });
    }
})


