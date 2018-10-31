

$(function(){
    var pop = document.getElementById("pop");
    var mask = mui.createMask(function () {
        pop.classList.remove('mui-active');
    });
    var panduan ;
    $.ajax({
        url:api+'indexListTravel',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            user_id:user_id,
        },
        success:function(data){
            $('.loading').hide();
            $('.che_main').show();
            console.log(data)
            if(data.result){
                $('.mui-scroll').html(template('tpl',data))
                if(data.msg != ''){
                    mui.toast(data.msg)
                }
                if(data.data.length>0){

                    panduan = data.data[0].isONReal;
                    if(!panduan){
                        $('.icon-qianjin').hide();
                    };
                }
               
            }else{
                mui.toast(data.msg)
            }
            // console.log(data.data[0].GPS_HIS)
        }
    })
    function render(time){
        $.ajax({
            url:api+'indexListTravel',
            type:'post',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
            },
            data:{
                user_id:user_id,
                'key[time]':time
            },
            success:function(data){
                $('.loading').hide();
                $('.che_main').show();
                console.log(data)
                if(data.result){
                    $('.mui-scroll').html(template('tpl',data))
                    if(data.msg != ''){
                        mui.toast(data.msg)
                    }
                    if(data.data.length>0){

                        panduan = data.data[0].isONReal;
                        if(!panduan){
                            $('.icon-qianjin').hide();
                        };
                    }
                   
                }else{
                    mui.toast(data.msg)
                }
                // console.log(data.data[0].GPS_HIS)
            }
        })
    }
    laydate.render({
        elem: '.laydata'
        ,position: 'static'
        // ,min:0
        ,max:0
        ,theme: '#ea5504'
        ,btns: ['clear', 'confirm']
        ,done: function(value, date, endDate){
          console.log(value); //得到日期生成的值，如：2017-08-18
         // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
          mask.close()
          if(!value){
            console.log('value')
          }else{
            render(value);
          }
        }
    })
    $('.icon_right').on('tap',function(){
        pop.classList.add('mui-active');
        mask.show();
        $('.laydate-btns-clear').text('取消')
    });
    $('.che_main').on('tap','.traffic_main',function(){
        console.log("hh");
        console.log(panduan);
        if(!panduan){
            mui.toast('您未开通行驶数据功能')
        }else{
            var travel_id = $(this).data('travelid');
            var start_time = $(this).find('.start_time').text();
            var end_time = $(this).find('.end_time').text();
            sessionStorage.setItem('travel_id',travel_id);
            sessionStorage.setItem('start_time',start_time);
            sessionStorage.setItem('end_time',end_time);
            console.log(travel_id)
            location.href = "baidu.html";

        }
        
    })
})