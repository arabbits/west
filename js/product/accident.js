
$(function(){
    // mui(".mui-scroll-wrapper").scroll({
    //     indicators: false,
    //     bounce: false,
    //     deceleration:0.003
    // });
    var page =1;
    mui.init({
        //配置下拉刷新以及上拉加载
        pullRefresh : {
            container:"#pullrefresh",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
              height:150,//可选.默认50.触发上拉加载拖动距离
              auto:false,//可选,默认false.自动上拉加载一次
              contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
              callback :function(){
                var self = this;

                page++
                // setTimeout(function() {
                //     self.endPullupToRefresh();
                    
                // },1000)
                createFragment(page,self);
              } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
          }
    });
    mui(".mui-scroll-wrapper").scroll({
        indicators: false,
        bounce: false,
        deceleration:0.06
      });
    function createFragment(page,self){
        $.ajax({
            url:api+'indexGetLastTrouble',
            type:'post',
            headers:{'userauthkey':token},
            // beforeSend:function(){
            //     $('.loading').show();
            // },
            data:{
                user_id:user_id,
                limit:10,
                page:page
            },
            success:function(data){
                console.log(data)
                if(data.result){
                    $('.secend').append(template('tplacc',data));
                    self.endPullupToRefresh();
                    
                }else{
                    mui.toast('没有更多历史故障了!');
                    self.endPullupToRefresh();
                }   
            }
        })
    }
    //历史故障
    $.ajax({
        url:api+'indexGetLastTrouble',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{user_id:user_id,
            limit:10,
            page:page
        },
        success:function(data){
            console.log(data)
            $('.loading').hide();
            
            
            if(!data.result){
                $('.history').show()
                
                mui.toast('暂无故障')
            }else{
                $('.secend').append(template('tplacc',data))
                
            }
        }
    })
    //当前故障
    $.ajax({
        url:api+'indexListTrouble',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            user_id:user_id,
            limit:100,
            page:page
        },
        success:function(data){
            console.log(data)
            $('.loading').hide();
            
            
            if(!data.result){
                // $('.volist').show()
                $('.che_main').show();
                
                $('.present').show()
                mui.toast('暂无故障')
            }else{
                $('.che_main').show();
                $('.frist').append(template('tpl',data))
                
            }
        }
    })


    
})