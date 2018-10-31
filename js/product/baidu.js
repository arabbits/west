

$(function(){
    var travel_id = sessionStorage.getItem('travel_id')
   
    var userObj = sessionStorage.getItem('userObj');
        userObj = JSON.parse(userObj)
    var token = userObj.token;
    var start_time = sessionStorage.getItem('start_time')
    var end_time = sessionStorage.getItem('end_time')

    $.ajax({
        url:'http://api.carlub.com.cn/indexTravelInfo',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            travel_id:travel_id
        },
        success:function(data){
            
            $('.loading').hide();
            $('.che_main').show();
            console.log(data);
            $('.bai_footer').html(template('tpl',data));
            $('.bai_header').html(template('tpltwo',data));
            $('.start_time').text(start_time);
            $('.end_time').text(end_time);
            console.log(data.data.gpsData);
            var gps_his = JSON.parse(data.data.gpsData);
            console.log(gps_his[0]);
            baiduMap(gps_his);
            function baiduMap(gps_his){
                var map = new BMap.Map('map_canvas');
                map.enableScrollWheelZoom();
                // map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
                map.centerAndZoom();
                var lushu;
                
                var arrPois =[];
                // var gps_his = {$c_travel['gps_his_geoconv']};
                // var gps_his =  data.data.gpsData
                for(var p in gps_his){
                    item = new BMap.Point(gps_his[p].lon,gps_his[p].lat);
                    arrPois = arrPois.concat(item);
                }
                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor:"#007e92", strokeWeight:6}));
                map.setViewport(arrPois);
                
                lushu = new BMapLib.LuShu(map,arrPois,{
                    defaultContent:"",//"从天安门到百度大厦"
                    autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon  : new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                    speed: 1000,
                    enableRotation:true,//是否设置marker随着道路的走向进行旋转
                    landmarkPois: [
                    ]
                });
                // 实例化一个驾车导航用来生成路线
                
                $("run").onclick = function(){
                    lushu.start();
                    console.log(lushu._opts.speed)
                }
                $("stop").onclick = function(){
                    lushu.stop();
                }
                function $(element){
                    return document.getElementById(element);
                }
            }

            
        }
    })
})
