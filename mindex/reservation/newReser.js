$(function(){


    var newTime = sessionStorage.getItem('newTime');
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
        onTap(id,that);
    })
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
    $('.reser_frist a').first().trigger('tap');
    
    // $('.reser_frist a').on('tap',function(){
    //     $(this).addClass('frist_bord');
    // });
    // console.log(headers);
    // $('#item1mobile .reser_all').on('tap',function(e){
    //     e.stopPropagation();
    //     $(this).find('.iconfont').toggleClass('icon-duihao');
    //     var Num =$(this).parents('.reser_secend').find('.icon-duihao').length;
    //     console.log(Num);
    //     // that.find('.frist_num').text(Num).show();
    //     if(Num <=0){
    //         // $('.reser_frist a:first-child')
    //         // that.find('.frist_num').hide();
    //         $('.reser_frist a:first-child').find('.frist_num').hide();
    //         console.log($('.reser_frist a:first-child').find('.frist_num').hide());  
    //     }else{
    //         // console.log($('.reser_frist a:first-child'));  
    //         $('.reser_frist a:first-child').find('.frist_num').text(Num).show();
    //     }
    // })


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
        // location.href = "./maintain.html";
        // var arr = [];
        var obj = {};
        var numbs = $('#item1mobile .icon-duihao').length;
        var length = $('.reser_frist a').length;
        var more = $('#reser_text').val();
        $('.che_main .frist_num').each(function(v,i){
            console.log(v)
            var that = $(this);
            var text = that.text();
            var nameId = that.parent().data('id'); // 大类的id
            var textFather =  that.parent().text().trim();
            textFather = textFather.substring(0,textFather.length-1)
            // if(text>0){
            //     // var shitObj = {};
            //     var shitArr = [];
            //     console.log(textFather);
            //     // shitObj.name = textFather;
            //     $('#item'+nameId+'mobile .icon-duihao').each(function(v,i){
            //         var textPro = $(this).next().text();
            //         console.log(textPro)
            //         shitArr.push(textPro);
            //     })
            //     // shitObj.product = shitArr
            //     obj[textFather] = shitArr;
            // }
            if(text>0){
                var shitObj = {};
                var shitArr = [];
                console.log(textFather);
                shitObj.name = textFather;
                $('#item'+nameId+'mobile .icon-duihao').each(function(v,i){
                    var textPro = $(this).next().text();
                    console.log(textPro)
                    shitArr.push(textPro);
                })
                shitObj.product = shitArr
                obj[v] = shitObj;
            }
        })
        if(Object.keys(obj).length <=0){
            mui.toast('请选择维修项目');
            return false;

        }
        if(more){
            console.log(more);
            obj.more = {name:"更多描述",product:more}
        }
        console.log(obj)
        sessionStorage.setItem("reserObj",JSON.stringify(obj))
        // for(var i=1;i<=length;i++){
        //     console.log(i);
            
        // }
        // $('#item1mobile .icon-duihao').each(function(i,v){
        //     var id = $(this).data('id')
        //     // console.log(id)
        //     console.log(v)
        // })

        location.href = "./maintain.html"
    })
})