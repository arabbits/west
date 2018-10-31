$(function(){


    var newTime = sessionStorage.getItem('newTime');
    var seaverId = sessionStorage.getItem('seaverId');
    if(seaverId ==1){
        $('h4').text('预约维修');
    }else if(seaverId ==2){
        $('h4').text('钣金喷漆');
        $('.reser_frist').html(template('tpls'));
        $('.reser_center').text("添加喷漆描述");
        $('.reser_frist a').bind('tap',function(){
            var that = $(this);
            var id = that.data('id');
            // var Num;
            // console.log(id);
    
            // 点击是取消reser_all之前注册的事件
            $('.ordersMain').find('.reser_all').unbind('tap');
            that.addClass('frist_bord');
            that.siblings().find('.frist_num').each(function(v,i){
    
                if($(this).text()=='0'){
                    $(this).parent().removeClass('frist_bord');
                }
            })
            if(id==1){
                $('.reser_center').text("添加喷漆描述");
            }else if(id==2){
                $('.reser_center').text("添加钣金喷漆描述");
            }
            onTap(id,that);
        })
    }else if(seaverId ==3){
        $('h4').text('预约洗车');
        $('.reser_frist').html(template('tplxiche'));
        $('.reser_center').text("添加洗车描述");
    }
    
    if(newTime){
        timer = JSON.parse(newTime);
        console.log(timer);
        var name = timer.all_licen;
        var km = timer.move;
        $('.upkeepPai').text(name);
        $('.upKm').text(km)
    }else{
        $.ajax({
            url:api+'indexIsCart',
            headers:{'userauthkey':token},
            beforeSend:function(){
                $('.loading').show();
                $('.che_main').hide();
                $('.server_footer').hide();
            },
            type:'post',
            success:function(data){
              console.log(data);
              if(data.result){
                $('.loading').hide();
                $('.server_footer').show();
                $('.che_main').show();
                $('.upkeep-wrap').html(template('tpl',data))
                var newTime = {all_licen:data.data.type_name,cart_id:data.data.cart_id ,move:data.data.cart_mile,chepai:data.data.cart_licens}
                sessionStorage.setItem('newTime',JSON.stringify(newTime))
              }else{
                mui.alert(data.msg,function(){
                  location.href = "/myself/carlist.html";
                })
              }
            }
          })
    }



    function onTap(id,that){
        $('#item'+id+'mobile .reser_all').on('tap',function(e){
            // console.log($(this).parents('#item'+id+'mobile '));
            // $(this).parents('#item'+id+'mobile').siblings().find('.reser_all').unbind('tap');
            $(this).find('.iconfont').toggleClass('icon-duihao');
            var Num =$(this).parents('.reser_secend').find('.icon-duihao').length;
            console.log(Num);
            // that.find('.frist_num').text(Num).show();
            if(Num <=0){
                that.find('.frist_num').text(Num).hide();
                // console.log(that);  
            }else{
                that.find('.frist_num').text(Num).show();
            }
        })

    }
    // $('.reser_frist a').first().trigger('tap'); 
    //隐藏更多描述
    $('.reser_describe').on('tap',function(){
        $(this).hide();
    })
    if($('#reser_text').val()){
        $('.reser_describe').hide();
    }
    //监听textear获得与失去焦点事件
    $('#reser_text').on('focus',function(){
        $('.reser_describe').hide();
    })
    $('#reser_text').on('blur',function(){
        var text = $(this).val();
        // console.log(text);
        if(!text){
            $('.reser_describe').show();

        }
    })
    //选择车型 .
    $('.upkeep-wrap').on('tap','.upkeep-car-name',function(){
        console.log('哈哈');
        sessionStorage.setItem('select','select');
        location.href = "./nexts.html";
    })
    //跳转到下一页
    $('.message_div').on('tap',function(){
        var reservation = sessionStorage.getItem('newTime');
        if(reservation){
            reservation = JSON.parse(reservation);
        }
        var more = $('#reser_text').val();
        var partcontent = $('.frist_bord .partcont').text();
        console.log(partcontent)
        if(more){
            reservation.more = more;
            reservation.partcontent = partcontent;
            sessionStorage.setItem('newTime',JSON.stringify(reservation))
            location.href = "/order/neworder.html"
        }else{
            mui.confirm('确认不填写更多描述?','提示',['去填写','不填'],function(index){
                console.log(index)
                if(index.index==1){
                    reservation.more = '';
                    reservation.partcontent = partcontent;
                    sessionStorage.setItem('newTime',JSON.stringify(reservation))
                    location.href = "/order/neworder.html"
                }
                
            })
        }
    })
})