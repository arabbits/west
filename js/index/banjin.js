

//弹出框显示与隐藏



// js事件
$(function(){
    
    var pop = document.getElementById("pop");
    var mask = mui.createMask(function () {
        pop.classList.remove('mui-active');
    });
    // 弹出层显示
    $('.fontSize').on('tap',function(){
        $('#pop').toggleClass('mui-active');
        var gg = $('.mui-backdrop').length;
        // console.log(gg);
        if(gg>0){
            mask.close()
        }else{
            mask.show()
        }
    })
    var allnow = '';
    //封装一下页面状态与弹出层状态
    // bottom_wrap 
    function reloads(that,ssthat){
        var mum =  $(".banjin_color").length;
        $('.fly').text(mum)//赋给小点点值
        var Price = 0;
        var oldPrice = 0;
        var hous = 0;
        allnow = '';
        $('.banjin_color').each(function(v , i){
            // console.log(v);
            
            var penqiText = $(this).find('.oneName').text(); // 选择的喷漆
            var text = $(this).parents('.banjin_front').find(".banjin_baoxian").text(); //选择喷漆的项目
            var newPrice = $(this).find('.newPrice').text(); //最新价格 
            var old= $(this).find('del').text();  //del的值
            var id = $(this).parents('.banjin_front').data('id')
            // var 
            var jiyou = `<li class="bottom_banjin">
                            <div class="botton_main che_display">
                                <div class="botton_left">
                                    <span class="door_name">`+text+`</span>
                                    <span class="door_penqi">(`+penqiText+`)</span>
                                </div>
                                <div class="botton_price che_display">
                                    <del>`+old+`</del>
                                    <span class="botton_money"><em>￥</em>`+newPrice+`</span>
                                    <span class="iconfont icon-guanbi" data-id="`+id+`"></span>
                                </div>
                            </div>
                        </li>`
            allnow += jiyou;
            old = old.split('￥')[1];
            if(v==0){
                if(penqiText=="钣金喷漆"){
                    hous = 6;
                }else if(penqiText == "喷漆"){
                    hous = 5;
                }
                
            }else{
                if(penqiText=="钣金喷漆"){
                    hous=hous+2;
                }else if(penqiText == "喷漆"){
                    hous=hous+1;
                }

            }
            $('.bottom_wrap').html(allnow);
            Price=parseInt(newPrice)+Price;
            oldPrice=parseInt(old)+oldPrice;
        })

        if(mum == 0){
            $('#foters').html('');
        }
        //赋值给地府状态栏   newsPrice
        // var shPrice = oldPrice-Price; //老价减去新价是为优惠也
        $('.newsPrice').text(Price); //最新价格多少
        $('.oldsMoney').text(oldPrice); //之前老价格
        $('.shMoney').text(hous); // 工作时间
        foter();
    }

    // 封装结束


    // 点击选择的东西

    $('.reser_frist a').bind('tap',function(){
        var that = $(this);
        var id = that.data('id');
        $('.banjinMain').find('.botOne').unbind('tap');
        $(this).addClass('frist_bord').siblings().removeClass('frist_bord');
        onTap(id,that);
    })

    function onTap(id,that){
        $('#item'+id+'mobile .botOne').on('tap',function(e){
            var ssthat = $(this);
            ssthat.toggleClass('banjin_color').siblings().removeClass('banjin_color');
            var Num =$(this).parents('.banjin_frist').find('.banjin_color').length;
            // console.log(Num);
            if(Num <=0){
                that.find('.frist_num').text(Num).hide();
                // console.log(that);  
            }else{
                that.find('.frist_num').text(Num).show();
            }
            // foter();
            reloads();
        })

    }
    //判断是否选择商品了  
    function foter(){
        var ss = $(".banjin_color").length;
        // console.log(ss)
        if(ss>0){
            $('.shit').addClass('uptimer');
        }else{
            $('.shit').removeClass('uptimer');
            
        }
    }
    $('.reser_frist a').first().trigger('tap');

    //点击选择分类
    // $('.mui-control-item').on('tap',function(){
    //     $(this).addClass('frist_bord').siblings().removeClass('frist_bord');
    // })

    
    //点击展开选项
    $('.banjin_top').on('tap',function(){
        $(this).find('.banjin_price').toggle().parent().next().toggle().parent().siblings().find('.banjin_price').show().parent().next().hide()
    })


    // 弹出层删除
    $('.bottom_wrap').on('tap','.icon-guanbi',function(){
        var delate = $(this);
        var id = delate.data('id');
        $('.banjin_color').each(function(v,i){
            var delId = $(this).parents('.banjin_front').data('id');
            if(id==delId){
                var fatherId = $(this).parents('.banjin_one').data('id');
                console.log(fatherId);
                $('.mui-control-item').each(function(s,j){
                    var garId = $(this).data("id");
                    if(fatherId == garId){
                        var jian = $(this).find('.frist_num').text()-1;
                        console.log(jian);
                        if(jian <=0){
                            $(this).find('.frist_num').text(jian).hide();
                            // console.log(that);  
                        }else{
                            $(this).find('.frist_num').text(jian).show();
                        }
                    }
                })
                $(this).removeClass('banjin_color');
            }
        })
        delate.parents('li').remove();
        reloads();

    })
    //清空
    $('.delAll').on('tap',function(){
        $('.frist_num').each(function(v,i){
            $(this).text('0').hide()
        });
        $('.banjin_color').each(function(v,i){
            $(this).removeClass('banjin_color');
        })
        $('.bottom_wrap li').remove();
    })



    // 跳转到选店

    $('.che_footer').on('tap','.uptimer',function(){
        // location.href = "../order/order.html";
        var number = $(".banjin_color").length;
        // $('.mui-control-item').
        console.log(number)
        $('.banjin_color').each(function(v,i){
            var that = $(this);
            var penqiText = that.find('.oneName').text(); // 选择的喷漆
            var text = that.parents('.banjin_front').find(".banjin_baoxian").text(); //选择喷漆的项目
            console.log(text+penqiText)
        })
        
    })
})


