
//indexCartInfoExpire 列表
// indexEditCartInfo 查看/修改
// indexAddCartInfo //添加
$(function(){
    // var info_id = 0;
    $.ajax({
        url:api+'indexCartInfoExpire',
        type:'post',
        beforeSend:function(){
            $('.loading').show();
        },
        headers:{'userauthkey':token},
        data:{
            // info_id :2,
            user_id :user_id,
            // traffic :
            // commerce  商业险
            // examine 车辆年审
            // driving_licence 驾照到期
            // show:1
        },
        success:function(data){
            console.log(data)
            if(data.result){
                $('.loading').hide();
                $(".che_main").show();
                $('.footer').show();
                var endexamine = data.data.examine ; //年审到期时间
                var endcommerce = data.data.commerce ; //商业险到期时间
                var endtraffic = data.data.traffic ;  //交强险到期时间
                var driving_licence = data.data.driving_licence ;  //驾照到期时间
                info_id = data.data.info_id;
                // var shit = '2018-05-28';
                var arr = [endtraffic,endcommerce,endexamine,driving_licence];
                $('.startime').each(function(i,val){
                     $(this).val(arr[i]);
                })
                $('.seetimefot').on('tap',function(){
                    var arr = []
                    $('.startime').each(function(i,val){
                        arr[i] = $(this).val();
                    })
                    console.log(arr[0])
                    // 修改接口
                    $.ajax({
                        url:api+'indexEditCartInfo ',
                        type:'post',
                        headers:{'userauthkey':token},
                        data:{
                            user_id: user_id,
                            info_id: info_id,
                            // cart_id : 2,  //车辆id
                            traffic : arr[0],  //交强
                            commerce : arr[1], //商业
                            examine  : arr[2], //年审
                            driving_licence : arr[3], //驾照到期,
                            show:2
                        },
                        success:function(data){
                            console.log(data)
                            if(data.result){
                                mui.toast(data.msg)
                                history.go(-1); 

                            }else{
                                mui.toast(data.msg)
                                
                            }
                        }
                    })
                })
            }else{
                // mui.toast(data.msg);
                $('.loading').hide();
                $(".che_main").show();
                $('.footer').show();
                $('.seetimefot').on('tap',function(){
                    var arr = []
                    $('.startime').each(function(i,val){
                        // console.log($(this).text()== '点击设置到期时间')
                        // if(!$(this).val()){
                        //     mui.toast('请将到期时间设置完整')
                        //     return false
                        // }
                        arr[i] = $(this).val();
                    })
                    if(arr.length<=3){
                        console.log('呵呵')
                        return false;
                    }
                    console.log(arr)
                    $.ajax({
                        url:api+'indexAddCartInfo ',
                        type:'post',
                        headers:{'userauthkey':token},
                        data:{
                            user_id: user_id,
                            traffic : arr[0],  //交强
                            commerce : arr[1], //商业
                            examine  : arr[2], //年审
                            driving_licence : arr[3], //驾照到期,
                        },
                        success:function(data){
                            console.log(data)
                            if(data.result){
                                mui.toast(data.msg)
                                history.go(-1); 
                                
                            }
                            // mui.alert('设置成功',function(){
                            //     // location.href = './timers.html';
                            //     history.go(-1); 
                            //     // location.reload(); 
                            // })
                        }
                    })
                })

            }
            
        }
    })
    //获得时间
    $('.startime').on('tap',function(){
        // var date = new Date();
        var that = $(this);
        var year = new Date().getFullYear();

        var dtPicker = new mui.DtPicker({
            type:'date',
            beginYear:year,
            endYear:year+2
        });
        dtPicker.show(function(e) {
            that.val(e.text)

          });
    })
    
})