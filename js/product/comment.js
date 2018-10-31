


var api ='http://api.carlub.com.cn/';
var userObj = sessionStorage.getItem('userObj');
userObj = JSON.parse(userObj)
var token = userObj.token;
var user_id = userObj.user_id;
// console.log(userObj)
// console.log(user_id)
// console.log(token)
function option(x,y,max){
    var getOption = {
        //横纵轴刻度
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            width: '85%',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            data: x,
            boundaryGap: false,
            axisLabel: { //y轴的内容格式化,很有用的属性
                // formatter: '{value}',
                interval: 2  
            }
        },
        yAxis: {
            max: max,
            min: 0,
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: { //y轴的内容格式化,很有用的属性
                // formatter: '{value}%'
            }
        },
        series: [{
            // id: 'a',
            type: 'line',
            symbolSize: 5,
            // showAllSymbol :true,
            data: y,
            itemStyle: {
                normal: {
                    color: '#00a7ed' //控制折线颜色
                }
            },
            label: {
                normal: {
                    show: true,
                    color: '#00a7ed' //控制标记点数字颜色
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(000, 136, 212, 0.6)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(000, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            // 设置平均线
            markLine : {
                silent :true,
                data : [
                        {type : 'average', name: '平均值',lineStyle:{color:'#ea5504'}},
                        
                ],
                // lineStyle:{color:'#ea5504'}
            },
            // markPoint:{
            //     data:[
            //         {type : 'min', name: '标准值'} //显示最小值的 没用
  
            //     ]
                    
            // }
            // itemStyle : { normal: {label : {show: true}}},
        }],
    };
    return getOption
  }