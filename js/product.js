
$(function(){

    var userObj = sessionStorage.getItem('userObj');
    var locationRoad = sessionStorage.getItem('locationRoad');
    if(!userObj||!locationRoad){
        mui.alert('您未登陆,请刷新  ',function(){
            location.href = '/index.html'
        }) 
    }else{
        userObj = JSON.parse(userObj);
        locationRoad = JSON.parse(locationRoad);
        var userPicture = userObj.userPicture;
        $('.product_main .fatherPro').on('tap',function(){
            
            console.log($(this).data('id'))
            var id = $(this).data('id');
            if(id === 0){
                window.location.href = "./product/traffic.html"
            }else if(id ===1){
                window.location.href = "./product/report.html"
            }else if(id ===2){
                window.location.href = "./product/drive.html"
            }else if(id ===3){
                window.location.href = "./product/accident.html"
            }else if(id ===4){
                window.location.href = "./product/monitor.html"
                mui.toast('部件监控正在维护,请稍等~')
            }else if(id ===5){
                window.location.href = "./product/fuel.html"
            }else if(id ===6){
                window.location.href = "./product/security.html"
            }else if(id ===7){
                // window.location.href = "./product/fuel.html"
                mui.toast('好友功能正在维护,请稍等~')
            }else if(id ===8){
                window.location.href = "./product/remind.html"
            }else if(id ===9){
                window.location.href = "./product/maintain.html"
            }
        })
        $('.site').text(locationRoad.locationRoad)
        
        // $.ajax({
        //     url:api+'indexOrderIpLocation',
        //     type:'post',
        //     headers:{'userauthkey':token},
        //     success:function(data){
        //         console.log(data);
        //         // mui.toast(data.msg)
        //         if(data.result){

        //             sessionStorage.setItem('site',data.data)
        //             $('.site').text(data.data)
        //         }else if(data.code ==1001){
        //             mui.alert(data.error,function(){
        //                 localStorage.clear();
        //             })
        //         }
        //     }
        // })
        var xhr = $.ajax({
            url:api+'indexCartClan',
            type:'post',
            timeout: 5000, //设置超时时间
            headers:{"userauthkey":token},
            beforeSend:function(){
                $('.loading').show();
            },
            data:{
                user_id:user_id
            },
            success:function(data){
                        
                console.log(data)   
                var lat = data.data.lat;
                var lon = data.data.lon;
                if(data.result){
                    $('.nav_contant').html(template('tpl',data))
                
                    // $('.nav_left img').attr('src',userPicture)
                    $('.nav_contant img').attr('src',userPicture);
                    $('.loading').hide();
                    $('.che_navSide').show()
                    if(lat ==0 && lon ==0){
                        mui.toast('GPS定位失败');
                    }else if(!lat){
                        mui.toast('GPS定位失败');
                    }else {
                        var map = new BMap.Map("l-map");      
                        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);      
                        // 创建地理编码实例      
                        var myGeo = new BMap.Geocoder();      
                        // 根据坐标得到地址描述    
                        myGeo.getLocation(new BMap.Point(lon, lat), function(result){      
                            if (result){      
                            // alert(result.address);    
                            $('.proWhere').text(result.address)
                            }      
                        });

                    }
                        
                }else{
                     mui.toast(data.msg)
                    
                    if(data.data.skip ==1){
                        mui.alert(data.msg,function(){
                            location.href = '/myself/carlist.html'
                        })
                    }else if(data.data.skip ==2){
                        mui.alert(data.msg,function(){
                            location.href = '/upkeep/server.html'
                        })
    
                    }
                }
                
            },
            error:function(res){
                console.log(res);
                mui.alert("请求有误，请刷新", function () {
                    location.reload();
                })
                // location.reload();
            },
            complete: function (XMLHttpRequest,status) {
                if(status == 'timeout') {
                    xhr.abort();    // 超时后中断请求
                    mui.alert("网络超时，请刷新", function () {
                        location.reload();
                    })
                }   
            }
        })
    
    }
    
    
})