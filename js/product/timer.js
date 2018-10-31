$(function(){

    $.ajax({
        url:api+'indexCartInfoExpire',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            // info_id :1,
            user_id :user_id,
            // traffic :
            // commerce  商业险
            // examine 车辆年审
            // driving_licence 驾照到期
            show:1
        },
        success:function(data){
            console.log(data)
            $('.loading').hide();
            if(!data.result){
                mui.confirm('未设置时间提醒,点击确定前往添加',function(e){
                    if(e.index==1){
                        location.href = './settime.html';
                    }else{
                        history.go(-1);
                    }
                })
            }else{
                var endexamine = data.data.examine ; //年审到期时间
                var endcommerce = data.data.commerce ; //商业险到期时间
                var endtraffic = data.data.traffic ;  //交强险到期时间
                var driving_licence = data.data.driving_licence ;  //驾照到期时间
                // var shit = '2018-05-28';
                var arr = [endexamine,endtraffic,endcommerce,driving_licence];
                // console.log(arr)
                // console.log(endexamine)
                var startime = $('.startime');

                startime.each(function(val,index){
                    $(this).text('到期时间: '+arr[val]).parents('.timers_nav').addClass('hid')
                    // 如果没有值则隐藏
                    if(arr[val]==''){
                        startime[val].parentNode.parentNode.setAttribute('class','hiden')
                    }
                })
                times = 0;
                function day(result){
                    var date = new Date();
                    var s1 = new Date(result.replace(/-/g, "/"));  //年审
                    var days = s1.getTime()-date.getTime();
                    times = parseInt(days / (1000 * 60 * 60 * 24));
                    return times;
                }
                var arrtwo = [day(endexamine),day(endtraffic),day(endcommerce),day(driving_licence)]
                console.log(arrtwo)
                $('em').each(function(val,index){
                    if(arrtwo[val]>=0){
                        $(this).text(String(arrtwo[val]))
                    }else if(arrtwo[val]<=0){
                        $(this).text(String(arrtwo[val])).css('color','red').parents('.timers_nav').find('.notime').text('超出'+Math.abs(arrtwo[val])+'天')
                    }
                })
                // $(window).onload=function(){
                $('.che_main').css('display','block')
            }
           
            // }
            // $('.che_main').html(template('tpl',data))
        }
    })
})
