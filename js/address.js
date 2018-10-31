

// lacation.reload();
$(function(){
    $('.fileBox').on('tap','.moren',function(){
        var that = $(this);
        var Mid = $(this).parents('.allAddress').data('id');
        console.log('哈哈')
        mui.confirm('设为默认地址吗?','',['否','是'],function(e){
            if(e.index == 1){
                $.ajax({
                    url:api+"indexUserSetDefault",
                    type:'post',
                    headers:{'userauthkey':token},
                    data:{
                        user_id :user_id,
                        address_id: Mid
                    },                                            
                    success:function(data){
                        //成功刷新页面
                        console.log('成功')
                        console.log(data)
                        if(data.result){
                            that.find('.icon-xuanze').addClass('colors').parents('.allAddress').siblings().find('.icon-xuanze').removeClass('colors')
                            mui.toast(data.msg)
                        }else{
                            mui.toast(data.msg)
                            
                        }
                        // location.reload()
                    }
                })
            }
        })
    })


    $.ajax({
        url:api+'indexUserAddressList',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show()
        },
        data:{
            user_id:user_id
        },
        success:function(data){
            console.log(data)
            $('.loading').hide()
            if(data.result){
                $('.che_main').show()
                
                $('.fileBox').html(template('tpl',data))
            }else{
                mui.toast('暂无地址信息 请新增')
            }
        }
    })


    //点击删除
    $('.fileBox').on('tap','.che-deli',function(){
        console.log('哈哈')
        var id = $(this).parents('.allAddress').data('id');
        console.log(id)
        mui.confirm('确定删除该地址吗?','提示',['取消','删除'],function(e){
            if(e.index ==1){
                console.log('赫尔');
                $.ajax({
                    url:api+"indexUserDelAddress",
                    type:'post',
                    headers:{'userauthkey':token},
                    data:{
                        user_id :1,
                        address_id:id
                    },
                    success:function(data){
                        //成功刷新页面
                        console.log('成功')
                        location.reload()
                    }
                })
            }
        })
    })
    //点击修改
    $('.fileBox').on('tap','.che_amend',function(){
        console.log('编辑')
        var id = $(this).parents('.allAddress').data('id');
        var text = $(this).parents('.allAddress').find('.particular').text();
        var name = $(this).parents('.allAddress').find('.userName').text();
        var iphone = $(this).parents('.allAddress').find('.iphone').text();
        var editproid=$(this).data('provice');  //省id
        var editcityid=$(this).data('city');   //市id
        var editdistrictid=$(this).data('district');  //区id
        var defaultId = $(this).parents('.allAddress').find('.moren').data('default');

        var obj = {editId:id,editname:name,editiphone:iphone,edittext:text,editproid:editproid,editcityid:editcityid,editdistrictid:editdistrictid,defaultId:defaultId};
        console.log(obj)
        sessionStorage.setItem('editObj',JSON.stringify(obj));
        location.href = "edit.html";
    }) 
    //点击新增地址 moren
    $('.message_div').on('tap',function(){
        // 删除三级联动的obj
        sessionStorage.removeItem('siteObj')
        location.href='newaddress.html';
    })
})