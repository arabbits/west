


$(function(){
    //扩展zepto的 prevAll与 nextAll 方法    
    var sellerList = sessionStorage.getItem('sellerList');
    var order_id;
    if(sellerList){
        sellerList = JSON.parse(sellerList);
        order_id = sellerList.order_id;
        $('.score_father').html(template("tpls",sellerList));
    }


    $.fn.prevAll = function(selector){
        var prevEls = [];
        var el = this[0];
        if(!el) return $([]);
        while (el.previousElementSibling) {
            var prev = el.previousElementSibling;
            if (selector) {
                if($(prev).is(selector)) prevEls.push(prev);
            }
            else prevEls.push(prev);
            el = prev;
            }
            return $(prevEls);
    };
    
    $.fn.nextAll = function (selector) {
        var nextEls = [];
        var el = this[0];
        if (!el) return $([]);
        while (el.nextElementSibling) {
        var next = el.nextElementSibling;
        if (selector) {
            if($(next).is(selector)) nextEls.push(next);
        }
        else nextEls.push(next);
        el = next;
        }
        return $(nextEls);
    };
    var index;
    $('.score_father').on('tap',".iconfont",function(){
        // $('.score_photo span').on('tap',function(){
        $(this).addClass('che_colors').prevAll().addClass('che_colors');
        $(this).nextAll().removeClass('che_colors');

        index = $(this).parents('.order_score').find('.che_colors').length;
        console.log(index)
        if (index == 1){
            $(this).parents('.order_score').find('.rateunder').text('非常差')
        }else if(index ==2){
            $(this).parents('.order_score').find('.rateunder').text('差')
            
        }else if(index ==3){
            $(this).parents('.order_score').find('.rateunder').text('一般')
            
        }else if(index ==4){
            $(this).parents('.order_score').find('.rateunder').text('好')
            
        }else if(index ==5){
            $(this).parents('.order_score').find('.rateunder').text('非常好')
            
        }
    })
    
    $('.gofor').on('change',function(e){
        console.log(e)
        var files = this.files;
        var img = new Image();
        var renderLoad = new FileReader();
        renderLoad.readAsDataURL(files[0]);
        var fileName = files[0].name;
        renderLoad.onload = function () {
            img.src = this.result;
            console.log(img.src)
            var base64str = img.src.split('base64,')[1];
            
            console.log(base64str)
            var imglen = $('.familySon img').length;
            if (imglen<5){
                var straaa = '<img src="' +img.src+ '" >';
                $('.familySon').append(straaa)
            }else{
                mui.toast('最多只能上传5张图片哦')
            }
        }
    })
    // $('.add' ).on('click',function(){
    //     var this_ = $(this );
    //     var ua = navigator.userAgent.toLowerCase();
    //     var isiOS = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);  // ios终端
    //     if(!isiOS){
    //         this_.next("input").attr('capture','camera');
    //     }
    //     this_.next("input").fadeOut();
    //     // 这里是为了能够多次选定同一张图片
    //     this_.after('<input type="file" class="hide" id="upimg4" accept="image/*">');
    //     var imglen = this_.parent(".imgs").children('.img').children("img").length;
    //     this_.next("input").click().off("change").on('change',function(){
    //         var size = (this_.next("input")[0].files[0].size / 1024).toFixed(2);
    //         if(size <= 5120){
    //             var img = this_.next("input")[0].files[0];
    //             var formData = new FormData();
    //             formData.append("picture",img);
    //             uploadPic(formData,this_,imglen);
    //         } else {
    //             swal({
    //                 title: ' ',
    //                 text: '您的图片超过5M',
    //                 type: 'warning',
    //                 showConfirmButton:false,
    //                 timer:1500
    //             });
    //         }
    //     });
    // });

    // function imgresize(){
    //     setTimeout(function(){
    //         var img = $('.img>img' );
    //         img.each(function(){
    //             $(this).height('20.8vw');
    //             $(this).width('20.8vw');
    //         });
    //     },100);
    // }


    // var uploadPic = function(formData,this_,imglen){
    //     $.ajax({
    //         type:"post",
    //         url:"{:Url('File/uploadPicture')}",
    //         data:formData,
    //         cache: false,
    //         processData : false,
    //         contentType : false,
    //         beforeSend: function(XMLHttpRequest){
    //             $('.swal2-confirm' ).css({'background-color':'#c1c1c1','border-left-color':'#c1c1c1','border-right-color':'#c1c1c1'})
    //         },
    //         success:function(data){
    //             alert(data)
    //             if(imglen >= 3){
    //                 this_.hide();
    //             }
    //             swal.close();
    //             var msg = $.parseJSON(data);
    //             if(msg.code == 1){
    //                 if(this_.hasClass('add')){
    //                     //图片添加
    //                     this_.parent('.imgs').children(".img").eq(imglen).removeClass('hide' )
    //                             .append('<img src='+msg.data.path+' alt="图片" data-tab='+msg.data.id+'><span><img src="/home/images/common/default.png" alt=""></span>');

    //                     // 删除图片
    //                     $(".img span").on("click", function () {
    //                         $(this).parent(".img").remove();
    //                         this_.fadeIn();
    //                         this_.before('<div class="img fl hide"></div>');
    //                     });

    //                     // 图片点击修改
    //                     /*$(".img>img").on("click", function () {
    //                      $(this).parent(".img").remove();
    //                      this_.fadeIn().click();
    //                      this_.before('<div class="img fl hide"></div>');
    //                      });*/
    //                 }else{
    //                     //图片修改
    //                     this_.find('img').remove();
    //                     this_.append('<img src='+msg.data.path+' alt="图片" data-tab='+msg.data.id+'>');
    //                 }
    //                 imgresize();

    //             } else {
    //                 return '';
    //             }
    //         },
    //         error:function(data){
    //             alert(JSON.stringify(data));
    //         }
    //     });
    // }

    // seller_id is_sure
    
    $('.icon_right').on('tap',function(){
        var text = $('.textarea').val();
        var sellerOrde = []; // 传递的值
        console.log(text)
        if($('.order_score').length>0){
            var flagArr = []; //判断是否为空
            $('.order_score').each(function(v,i){
                var length = $(this).find('.che_colors').length;
                var id = $(this).data('sellerid'); 
                var thisObj = {seller_id:id,is_sure:length};
                sellerOrde.push(thisObj);
                flagArr.push(length);
            })
            if(flagArr.indexOf(0)>-1){
                mui.toast('请对本次订单操作人员评分');
                return false;
            }
            sellerOrde = JSON.stringify(sellerOrde);
            $.ajax({
                url:api+"indexOrderCommet",
                type:"post",
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                    $('.mui-scroll-wrapper').hide();
                },
                data:{
                    user_id:user_id,
                    order_id:order_id,
                    content:text,
                    sellerList:sellerOrde   
                },
                success:function(data){
                    console.log(data);
                    if(data.result){
                        mui.toast('评价成功');
                        setTimeout(function(){
                            location.href="/myself/orders.html"
                        },500)
                    }else{
                        mui.toast(data.msg);
                    }
                }
            })
        }else{
            $.ajax({
                url:api+"indexOrderCommet",
                type:"post",
                headers:{'userauthkey':token},
                beforeSend:function(){
                    $('.loading').show();
                    $('.mui-scroll-wrapper').hide();
                },
                data:{
                    user_id:user_id,
                    order_id:order_id,
                    content:text,
                    sellerList:sellerOrde   
                },
                success:function(data){
                    console.log(data);
                    if(data.result){
                        mui.toast('评价成功');
                        setTimeout(function(){
                            location.href="/myself/orders.html"
                        },500)
                    }else{
                        mui.toast(data.msg);
                    }
                }
            })
        }
        console.log($('.order_score').length)
        // 清除sellerList缓存
        // sessionStorage.removeItem('sellerList');
    })
})