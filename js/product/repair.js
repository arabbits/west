


$(function(){
    function options(all,daoqi){
        var option = {
            series: [{
                name: '饼图二',
                type: 'pie',
                radius: ['80%', '100%'], //饼图的半径，数组的第一项是内半径，第二项是外半径。
                startAngle: 310, //弧度从哪里开始
                hoverAnimation: false,
                // label: {
                //     normal: {
                //         position: 'center'
                //     },
                //     verticalAlign:'middle'
                // },
                data: [{
                    value: all,
                    name: '占有率',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 1,
                                color: "#fff"
                            },
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#fc3030"
                        }
                    },
                }, {
                    value: daoqi,
                    // name: '占位',
                    label: {
                        normal: {
                            formatter: '\n完成率',
                            textStyle: {
                                color: '#fff',
                                fontSize: 0
                            },
                            position: 'center'
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#eee'
                        }
                    },
                    hoverAnimation: false
                }]
            }]
        };
        return option
    }
    $.ajax({
        url:api+'indexExpireRemind',
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            user_id :user_id,
        },
        success:function(data){
            if(data.result){
                mui.toast(data.msg)
                $('.loading').hide();
                $('.che_main').show()
                console.log(data)
                $('.mui-scroll').html(template('tpl',data));
                
                

                // var myChartone = echarts.init($('.che_main #lineChart'));
                var canvas = $('.che_main #lineChart');
                var daoqi ;
                var all ;
                canvas.each(function(index,value){
                    daoqi = $(this).parents('.repair_main').find('.daoqi').text()
                    if (daoqi<0){
                        daoqi=0
                    }
                    all = $(this).parents('.repair_main').find('.all').text()
                    console.log(daoqi)
                    console.log(all)
                    myChartone = echarts.init(value);
                    myChartone.setOption(options(all,daoqi)); 
                })
            }
            // $('.loading').hide();
            // $('.che_main').show()
            // console.log(data)
            // $('.mui-scroll').html(template('tpl',data));
            
            

            // // var myChartone = echarts.init($('.che_main #lineChart'));
            // var canvas = $('.che_main #lineChart');
            // var daoqi ;
            // var all ;
            // canvas.each(function(index,value){
            //     daoqi = $(this).parents('.repair_main').find('.daoqi').text()
            //     if (daoqi<0){
            //         daoqi=0
            //     }
            //     all = $(this).parents('.repair_main').find('.all').text()
            //     console.log(daoqi)
            //     console.log(all)
            //     myChartone = echarts.init(value);
            //     myChartone.setOption(options(all,daoqi)); 
            // })
            // console.log($('.che_main #lineChart'))
            // myChartone.setOption(options()); 
        }
    })
})