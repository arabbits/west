


$(function(){
    // var mask=mui.createMask()
    // mask.show();//显示遮罩层
    
    function setOptiondata(data){
        option = {
            grid: {
                left: '-30%',
                top:'0%',
                bottom:'-14%',
                right:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                // data: ['鲜花', '星星'],
                show: false
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [{
                data: [data],
                type: 'bar',
                //配置样式
                itemStyle: {
                    //通常情况下：
                    normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params) {
                            var colorList = ['rgb(42,170,227)','rgba(0,0,0,0)'];
                            return colorList[params.dataIndex];
                        }
                    },
                    //鼠标悬停时：
                    // emphasis: {
                    //     shadowBlur: 10,
                    //     shadowOffsetX: 0,
                    //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    // }
                },
                label:{
                    normal:{
                        show:true,            //显示数字
                        position: 'center',        //这里可以自己选择位置
                        textStyle: {
                            fontSize:10,
                            color:"#fff",
                            position:'center'
                        },
                    }
                },
                //设置柱子的宽度
                barWidth : 30,
            }]
        };
        return option;
    }
    var api ='http://api.carlub.com.cn/';
    var userObj = sessionStorage.getItem('userObj');
    userObj = JSON.parse(userObj)
    var token = userObj.token;
    var user_id =userObj.user_id;
    // $.ajax({
    //     url:api+'',
    // })
    $.ajax({
        url:api+'indexOilAnalyze',
        type:'post',
        headers:{
            'userauthkey':token,
        },
        beforeSend:function(){
            $('.loading').show();
        },
        data:{
            user_id :user_id ,
        },
        success:function(data){
            if(data.result){
                $('.che_main').show();
                $('.loading').hide();
                // mask.close();
                console.log(data)
                // var mileOil = data.data.oil/data.data.mile; 算平均多少钱的
                // toFixed
                // console.log(mileOil)
                $('.duel_timer').text(data.data.search_time)
                $('.mile').text(data.data.mile)
                $('.oil').text(data.data.oil)
                $('.mileOil').text( data.data.averageOil)
                var acceleate = data.data.acceleate*1 //急踩油门
                var slowdown = data.data.slowdown*1 //急刹车
                var turn = data.data.turn*1 //急转弯
                var averageVelocity = data.data.averageVelocity*1 //平均公里
                // var arr = [acceleate,slowdown,turn,averageVelocity];
                // var max = Math.max.apply(null,arr); //取最大值 
                // console.log(max)
                var myChart = echarts.init(document.getElementById('one'));
                var myChartone = echarts.init(document.getElementById('two'));
                var myCharttwo = echarts.init(document.getElementById('three'));
                var myChartfour = echarts.init(document.getElementById('four'));
                
                myChart.setOption(setOptiondata(turn))
                myChartone.setOption(setOptiondata(acceleate))
                myCharttwo.setOption(setOptiondata(slowdown))
                myChartfour.setOption(setOptiondata(averageVelocity))
            }else{
                mui.toast(data.msg);
            }
            
        }
    })

    $('.footer_main').on('tap',function(){

        var id = $(this).data('id');
        if(id == 0){
            location.href = "./fuel/idling.html"
        }else if(id == 1){
            location.href = "./fuel/youmen.html"
        }else if(id == 2){
            location.href = "./fuel/worry.html"
        }else if(id == 3){
            location.href = "./fuel/carsu.html"
        }else if(id == 4){
            location.href = "./fuel/water.html"
        }
    })

})