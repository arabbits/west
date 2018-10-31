
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
//弹出框显示与隐藏
var pop = document.getElementById("pop");
var mask = mui.createMask(function () {
    pop.classList.remove('mui-active');
});
// 显示
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

// js事件
$(function(){
    
    var listObj = sessionStorage.getItem('listObj') // 获得商店id 下单时间
    var timer = sessionStorage.getItem('newTime');  //获得车辆信息
    var keyWordId = sessionStorage.getItem('keyWordId');  //  获得套餐id keyWordId
    if(keyWordId==1){
        $('h4').text("智能保养方案");
    }else if(keyWordId==2){
        $('h4').text("美容装饰方案");
    }else if(keyWordId==3){
        $('h4').text("智能洗车方案");
    }else if(keyWordId==4){
        $('h4').text("店家商品");
    }
    // var name = sessionStorage.getItem('All');
    // var km = sessionStorage.getItem("km");
    var store_id ;
    if(listObj){
        listObj = JSON.parse(listObj);
        store_id = listObj.store_id
    }
    console.log(name)
    if(timer){
        timer = JSON.parse(timer);
        console.log(timer);
        var name = timer.all_licen;
        var km = timer.move;
        $('.upkeepPai').text(name);
        $('.upKm').text(km)
    }
    

    // 渲染列表
    $.ajax({
        url:api+'indexSelectCombo',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
            $('.che_main').hide();
            $('.che_footer').hide();
        },
        data:{
            store_id:store_id,
            keyword:keyWordId,
        },
        success:function(info){
            console.log(info)
            $('.loading').hide();
            $('.che_main').show();
            //成功
            if(info.result){
                
                $('.brainpower').html(template("tpl",info));
                $('.che_footer').show();
                var goods = sessionStorage.getItem('comboIds');
                if(goods){
                    goods = goods.split(',')
                    $.each(goods,function(v,i){
                        console.log(i)

                        var noeId = i;
                        $('#oneTpl .upkeep_line_wrap').each(function(s,k){
                            var tentId = $(this).data('goosid');
                            console.log(tentId)
                            
                            if(noeId == tentId){
                                $(this).find('.icon-duihao').addClass('now').parents('.upkeep_line_wrap ').find('.cmt-oil-round').show();
                            }
                        })
                    })  
                }
            }else{
                // mui.toast(info.msg)
                $('.che_main').html(template("tpl",info));
                
            }

            reloads();
        }
    })

    var allnow = '';
    //封装一下页面状态与弹出层状态
    function reloads (){
        var mum = $('.now').length;
        $('.fly').text(mum)//赋给小点点值
        var Price = 0;
        var oldPrice = 0;
        allnow = '';
        $('.now').each(function(v , i){
            // console.log(v);
            var newPrice = $(this).parents(".fuck_you").find('.upkeep-right').find('.new-icon-price').text();
            var old= $(this).parents('.upkeep_line_wrap').data('price');
            var upkeep = $(this).parents('.upkeep-mess').find('.jiyou').text();
            // var show_num = $(this).parents(".fuck_you").find("#showNum").length;
            // if(show_num>0){
            //     show_num = $(this).parents(".fuck_you").find("#showNum").val();
            //     console.log()
            // }
            // var original = $(this).parents('.upkeep-mess').find('.original').text(); //原厂件
            // if(original == null){
            //     original = '原厂专用油哦, 4L'
            // }
            var id = $(this).data('id')
            var ls = '4L';
            // var 
            var jiyou = `<li class="upkeep_line_wrap">
                            <div class="upkeep-form-item">
                                <div class="upkeep-right-new vertical-center">
                                    <div>
                                        <span class="old-del-price-new">
                                              </span>      
                                        <span class="new-price che_color">
                                            <span class="new-icon-price">¥</span>`+newPrice+`</span>
                                    </div>
                                    <span class="iconfont icon-delete che_iconClose" data-idsh="`+id+`"></span>
                                </div>
                                <div class="upkeep-label">
                                    <div class="upkeep-mess">
                                        <span class="upkeep-parts js-fitting"> `+upkeep+` </span>

                                    </div>
                                </div>

                            </div>
                        </li>`
            allnow += jiyou;
            $('#foters').html(allnow);
            // console.log(newPrice)
            
            Price=newPrice*1+Price;
            oldPrice=old*1+oldPrice;
            // console.log(id)
            // console.log(upkeep)
            // console.log(original)
        })

        if(mum === 0){
            $('#foters').html('');
        }
        //赋值给地府状态栏
        // var shPrice = oldPrice-Price; //老价减去新价是为优惠也
        // console.log(Price)
        Price = Price.toFixed(2);
        oldPrice = oldPrice.toFixed(2);
        $('.newsPrice').text(Price); //最新价格多少
        $('.oldsMoney').text(oldPrice); //之前老价格
        // $('.shMoney').text(shPrice); //省了多少
        // $('.footerOld').text(shPrice); // 乐享优惠
        return allnow;
        // for(var i =0 ;i<mum ;i++){
        //     // console.log(i)
        //     $('#foters').html($('#foters').html()+obj[i]);
        // }

        // console.log(JSON.stringify(obj))
        // $('#foters').html(template('tpltwo',obj));
    }

    // 封装结束


    //利用冒泡给渲染数据注册事件
    $('.brainpower').on('tap','.upkeep-label',function(){
        // console.log('哈哈')
        var that = $(this);
        $(this).find('.icon-duihao').toggleClass('now').parents(".fuck_you").find('.cmt-oil-round').toggle();
        // $(this).parents('.fuck_you').find('#shopNum').attr("readonly","false");
        readonly(that);
        // $(this).
        reloads();//重新计算底部栏的值
    })

    function readonly(that){
        var xixi = that.parents('.fuck_you').find(".now");
        var ths = xixi.length;
        console.log(ths);
        if(ths>0){
            that.parents(".fuck_you").find('#shopNum').removeAttr("readonly").val(1);
        }else{
            that.parents(".fuck_you").find('#shopNum').attr("readonly","readonly").val('');
        }
    }
    // 点击加减时
    function allPrice(that,num){
        var newsPrice = $('.newsPrice').text()*1;
        var oldsMoney = $('.oldsMoney').text()*1;
        var thisPrice = that.parents('.fuck_you').find('.new-icon-price').text()*1;
        var thisNum = that.parents('.fuck_you').find('#shopNum').val()*1; //当前数目
        console.log(thisNum)
        if(!thisNum){
            return false;
        }
        if(thisNum<num){
            //点击为加
            $('.newsPrice').text((thisPrice+newsPrice).toFixed(2));
            $('.oldsMoney').text((thisPrice+oldsMoney).toFixed(2));
        }else if(thisNum>num){
            //点击为减
            $('.newsPrice').text((newsPrice-thisPrice).toFixed(2));
            $('.oldsMoney').text((oldsMoney-thisPrice).toFixed(2));
            
        }
    }
    //加
    $(".brainpower").on('tap','.show_add',function(){
        var that = $(this);
        var nums = $(this).prev().val();
        if(nums){
            nums++;
            allPrice(that,nums)
            $(this).prev().val(nums);
        }
    })
    //减
    $(".brainpower").on('tap','.show_subtract',function(){
        var that = $(this);
        var nums = $(this).next().val();
        if(nums>1){
            nums--;
            allPrice(that,nums)
            $(this).next().val(nums);
        }
        if(nums==1){
            mui.toast("卡券数目最少为1")
        }
    })

    var shit_fuckNum =1;
    $('.brainpower').on('focus','#shopNum',function(){
        shit_fuckNum = $(this).val();
    })
    // 手动输入数量

    // $('.brainpower').on('input','#shopNum',function(){
    //     var num = $(this).val();
    //     console.log(num)
    //     console.log(shit_fuckNum)
    //     var newsPrice = $('.newsPrice').text()*1;
    //     var oldsMoney = $('.oldsMoney').text()*1;
    //     var thisPrice = $(this).parents('.fuck_you').find('.new-icon-price').text()*1;
    //     var overPrice;
    //     // if(!num){
    //     //     $(this).val(1);
    //     //     mui.toast("卡券数目最少为1");
    //     // }
    //     if(num>shit_fuckNum){
    //         overPrice = (num-shit_fuckNum)*thisPrice;
    //         $('.newsPrice').text((overPrice).toFixed(2));
    //         $('.oldsMoney').text((overPrice).toFixed(2));
    //     }
    // })
    $('.brainpower').on('blur','#shopNum',function(){
        var num = $(this).val();
        console.log(num)
        console.log(shit_fuckNum)
        var newsPrice = $('.newsPrice').text()*1;
        var oldsMoney = $('.oldsMoney').text()*1;
        var thisPrice = $(this).parents('.fuck_you').find('.new-icon-price').text()*1;
        var overPrice;
        if(!num){
            $(this).val(1);
            mui.toast("卡券数目最少为1");
            return false;
        }
        if(num>shit_fuckNum){
            overPrice = (num-shit_fuckNum)*thisPrice;
            $('.newsPrice').text((overPrice+newsPrice).toFixed(2));
            $('.oldsMoney').text((overPrice+oldsMoney).toFixed(2));
        }else if(num<shit_fuckNum){
            overPrice = (shit_fuckNum-num)*thisPrice;
            $('.newsPrice').text((newsPrice-overPrice).toFixed(2));
            $('.oldsMoney').text((oldsMoney-overPrice).toFixed(2));
        }
    })

    // 删除弹出框数据 后续未做
    $('#foters').on('tap','.che_iconClose',function(){
        var idsh = $(this).data('idsh');
        console.log(idsh);
        $('.now').each(function(){
            if($(this).data('id') ==idsh ){
                $(this).removeClass('now').parents('.upkeep_line_wrap').find(".cmt-oil-round").hide();
                $(this).parents('.fuck_you').find('#shopNum').attr("readonly","readonly").val('');
            }
        })
        $(this).parents('li').remove();
        reloads()
    })
    function shan(id){
        
    }
    $('.upkeep-car-name').on('tap',function(){
        console.log('哈哈');
        sessionStorage.setItem('select','select');
        location.href = "/mindex/select.html";
    })
    //日期选择跳转
    //传递数据 用数组接受一下;
    // var obj = {};
    
    $('.uptimer').on('tap',function(){
        var comboIds,money ;
        var cardList = [];
        if($('.now').length>0){
            $('.now').each(function(index,val){
                var goodsId = $(this).parents('.taocan').data('goosid'); //套餐的id
                var card_id = $(this).parents('.coupon_list').data('goosid'); //卡券的id
                console.log(goodsId);
                console.log(card_id);
                if(goodsId){
                    if(index==0){
                        comboIds = goodsId;
                    }else{
                        comboIds=comboIds+","+goodsId
                    }
                }
                if(card_id){
                    var shopNum =  $(this).parents('.coupon_list').find("#shopNum").val();
                    cardList.push({card_id:card_id,shopNum:shopNum})
                }
            })
            money = $('.newsPrice').text(); //最新的价格
            // console.log(JSON.stringify(goodsList))
            console.log(cardList);
            console.log(money);
            listObj.money=money;
            sessionStorage.setItem('listObj',JSON.stringify(listObj))
            sessionStorage.setItem('allnow',allnow)
            sessionStorage.setItem('comboIds',comboIds)
            sessionStorage.setItem('cardListAll',JSON.stringify(cardList))
            
            location.href = "../order/order.html";

        }else{
            mui.toast('请选择商品')
        }
    })
})


