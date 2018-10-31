$(function() {
  $.ajax({
    url: api + "indexPositioning",
    type: "post",
    headers: { userauthkey: token },
    data: {
      user_id: user_id
    },
    success: function(data) {
      console.log(data);
      if(data.result){
        var lat = data.data.lat;
        var lon = data.data.lon;
        if(lat ==0 && lon ==0){
          mui.alert('您未购买此项服务',function(){
            history.go(-1);
          })
        }else if(!lat){
          mui.alert('您未购买此项服务',function(){
            history.go(-1);
          })
        }else{
          var dizhi;
          console.log(lat);
    
          var map = new BMap.Map("allmap");
          var new_point = new BMap.Point(lon, lat);
          
          map.centerAndZoom(new_point, 15); //显示的层级
          var marker = new BMap.Marker(new_point); // 创建标注
          map.addOverlay(marker); // 将标注添加到地图中
          //逆向解析地址
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              // map.panTo(r.point);
              // console.log(map.panTo(r.point))
              var pointB = new BMap.Point(r.point.lng,r.point.lat);  // 创建点坐标B--江北区
              mui.alert('我的位置到爱车的距离是：'+((map.getDistance(new_point,pointB))/1000).toFixed(2)+'公里');  //获取两点距离,保留小数点后两位
              // var polyline = new BMap.Polyline([pointB,new_point], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
              // map.addOverlay(polyline);     //添加折线到地图上
            }
            else {
              alert('failed'+this.getStatus());
            }        
          },{enableHighAccuracy: true})
          var myGeo = new BMap.Geocoder();      
          // 根据坐标得到地址描述    
          myGeo.getLocation(new_point, function(result){      
              if (result){      
                // mui.alert(result.address);    
                dizhi = result.address;
                // return dizhi;
                console.log(result);
                var label = new BMap.Label(
                  '<div class="father"><div class="son"><span class="iconfont icon-YYJYKSZHTJ"></span><span>Go</span></div><a class="title"><span>'+dizhi+'</span><span class="iconfont icon-qianjin"></span></a></div>',
                  { offset: new BMap.Size(-14, -22) }
                );
                marker.setLabel(label);
                label.addEventListener("click", function() {
                  // location.href='https://map.baidu.com/mobile/webapp/search/search/qt=s&wd='+result.address +'&searchFlag=more_cate/';
                  location.href="https://map.baidu.com/mobile/webapp/place/linesearch/foo=bar/from=place&end=%3D"+encodeURI(encodeURI(result.address))+"&tab=line&routeType=2"
                });
              }
          });
         
    
          map.enableScrollWheelZoom(true);
        }        
      }else{
        mui.toast(data.msg)
      }



    },
    error:function(res){
      console.log(res)
    }
  });
});
    
