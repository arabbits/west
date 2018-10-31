

$(function(){
    // 显示 模态框
    var pop = document.getElementById("pop");
    var mask = mui.createMask(function () {
        pop.classList.remove('mui-active');
    });
    $.ajax({
        url:api+'indexListRoute',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
            $('.che_main').hide();
            $('.volist').hide();
        },
        data:{
            user_id:user_id
        },
        success:function(data){
            console.log(data)
            $('.loading').hide();
            if(data.result){
                $('.che_main').show();
                
                $('.che_main').html(template('tpl',data))
            }else{
                    $('.volist').show();
                    mui.toast(data.msg);
            }
        }
    })
    function render(keyTime){

        $.ajax({
            url:api+'indexListRoute',
            type:'post',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
                $('.volist').hide();
                
            },
            data:{
                user_id:user_id,
               'key[time]':keyTime
            },
            success:function(data){
                console.log(data)
                $('.loading').hide();
                if(data.result){
                    $('.che_main').show();
                    $('.che_main').html(template('tpl',data))
                }else{
                    $('.volist').show();
                    mui.toast(data.msg);
                }
            }
        })
    }
    $('.sureBtn').on('tap',function(){
        pop.classList.remove('mui-active');
        mask.close();
        var nows = $('.dateInfo .now');
        var arr =[];
        var time ;
        var text = $('.title').text();
        text = text.split('年');
        text[1]= text[1].split('月')[0];
        time = text[0]+'-'+(text[1]>=10 ? text[1]:'0'+text[1]);
        console.log(time);
        
        nows.each(function(i,v){
            arr[i] = $(this).data('id');
            // console.log($(this).data('id'));
        })
        if(arr.length>=2){
            var max = Math.max.apply(null,arr);
            var min = Math.min.apply(null,arr);
            var keyTime = time+'-'+(min>=10?min:'0'+min)+','+time+'-'+(max>=10?max:'0'+max);
            console.log(keyTime);
            render(keyTime);

        }else if(arr.length==1){
            var keyTime = time+'-'+(arr[0]>=10? arr[0]:'0'+arr[0]);
            console.log(keyTime);
            render(keyTime);
        }
    })
    //点击取消时
    $('.cancelBtn').on('tap',function(){
        pop.classList.remove('mui-active');
        mask.close();

    })
    $('.icon_right').on('tap',function(){
        pop.classList.add('mui-active');
        mask.show()
    })

})