var dateMonStr=$('.chooseDate .title').text();
// console.log(dateMonStr);
var myDate = new Date();
var year=myDate.getFullYear();
var mon=myDate.getMonth()+1;
var day=myDate.getDate(); 

var weekDay = ["日", "一", "二", "三", "四", "五", "六"];  
var dateStr = year+'-'+mon+'-'+day;
var week = new Date(Date.parse(dateStr.replace(/-/g, "/")));  
// function shiyan(week){
// 	var date = new Date(week);
// 	alert(date.getDay());
// }
// shiyan(week)
// console.log(week.getDay());
// console.log(dateStr);

// 根据月份渲染当前月日期
// 头部日期
var yearBox=$('.dateHeader .year');
var nowDate=$('.nowDate');
var nowWeek=$('.nowWeek');
yearBox.html(year);
nowDate.html(mon+'月'+day+'日');
nowWeek.html('周'+weekDay[week.getDay()]);
var title=$('.chooseDate .title');
title.html(year+'年'+mon+'月');
// 左右调月份按钮
var rightBtn=$('.chooseDate .icon-icon-arrow-right');
var leftBtn=$('.chooseDate .icon-shape');
rightBtn.on('click',function(){
	$('.dateInfo').html('');
	var monNow=title.text().split('年')[1].split('月')[0]-0;
	var yearNow=title.text().split('年')[0]-0;
	if (monNow>11) {
		monNow=1;
		yearNow++;
	}else{
		monNow++;
	}
	title.html(yearNow+'年'+monNow+'月');
	render(day);
});
leftBtn.on('click',function(){
	$('.dateInfo').html('');
	var monNow=title.text().split('年')[1].split('月')[0]-0;
	var yearNow=title.text().split('年')[0]-0;
	if (monNow<2) {
		monNow=12;
		yearNow--;
	}else{
		monNow--;
	}
	title.html(yearNow+'年'+monNow+'月');
	render(day);
});
render(day);
// 渲染空格
function space(weekNow){
	var spaceNum=0;
	if (weekNow=='日') {
		spaceNum=0;
	}else if (weekNow=='一') {
		spaceNum=1;
	}else if (weekNow=='二') {
		spaceNum=2;
	}else if (weekNow=='三') {
		spaceNum=3;
	}else if (weekNow=='四') {
		spaceNum=4;
	}else if (weekNow=='五') {
		spaceNum=5;
	}else if (weekNow=='六') {
		spaceNum=6;
	}
	for(var i=0;i<spaceNum;i++){
		$('.dateInfo').append('<li class="fl"></li>');
	}
	var lis=$('.dateInfo li');
	var liWidth=lis.eq(0).width();
	// lis.each(function(){
	// 	$(this).css({'height':liWidth+'px','line-height':liWidth+'px'})
	// });
}
function render(day){
	var monNow=title.text().split('年')[1].split('月')[0]-0;
	var yearNow=title.text().split('年')[0]-0;
	var weekDay = ["日", "一", "二", "三", "四", "五", "六"];  
	var dateStr = yearNow+'-'+monNow+'-1';
	var week = new Date(Date.parse(dateStr.replace(/-/g, "/")));  
	var weekNow=weekDay[week.getDay()];
	var dateNum=1;
	var maxDayNum=0;
	if (monNow==1||monNow==3||monNow==5||monNow==7||monNow==8||monNow==10||monNow==12) {
		//大月
		maxDayNum=31;
		space(weekNow);
		loop(maxDayNum,day);
	}else if (monNow==4||monNow==6||monNow==9||monNow==11) {
		//小月
		maxDayNum=30;
		space(weekNow);
		loop(maxDayNum,day);
	}else{
		//2月
		if (yearNow%4==0) {
			// 闰年
			maxDayNum=29;
			space(weekNow);
			loop(maxDayNum,day);
		}else{
			//平年
			maxDayNum=28;
			space(weekNow);
			loop(maxDayNum,day);
		}
	}
}

function loop(maxDayNum,day){
	var ulBox=$('.dateInfo');
	for(var i=1;i<=maxDayNum;i++){
		var timeLiStr='<li class="fl" data-id='+i+'>'+i+'</li>';
		ulBox.append(timeLiStr);
	}
	var lis=$('.dateInfo li');
	var liWidth=lis.eq(0).width();
	// lis.each(function(){
	// 	$(this).css({'height':liWidth+'px','line-height':liWidth+'px'})
	// });
	lis.each(function(index){
		if ((lis.eq(index).text()-0)==day) {
			lis.eq(index).addClass('now');
		}
	})
}


$('.dateInfo').on('tap','li',function(event){
	var nows = $('.dateInfo .now');
	var that = $(this);
	var arr = [];
	var thisDayStr=$(this).text().trim();

	if(nows.length >1 && thisDayStr!=''){
		that.addClass('now').siblings('li').removeClass('now');

	}else if (thisDayStr!='') {
		that.addClass('now');

		// $(this).addClass('clicked').siblings('li').removeClass('clicked');
		// $('.sureBtn').data('id',thisDayStr);
	}	
	var lis =$('.dateInfo li');
	
	lis.each(function(index,v){
		// console.log($(this).hasClass('now'))
		if($(this).hasClass('now')){
			arr.push(index);
		}
	})
	console.log(arr);
	
	if (arr.length>1) {
		var mac = arr[1]-arr[0];
		console.log(mac);
		if(mac>7){
			mui.toast('选择日期不能大于7天哦');
			that.siblings('li').removeClass('now');
			return false;
		}
		var temp='';
		for(var i=0;i<arr.length-1;i++){
			if (arr[i]>arr[i+1]) {
				temp=arr[i];
				arr[i]=arr[i+1];
				arr[i+1]=temp;
			}
		}
		
		for(var i=arr[0];i<arr[arr.length-1];i++){
			lis.eq(i).addClass('now')
		}
	}
	

	// console.log(nows.length)
	
});
// 点击确定是要拿到的参数
// $('.sureBtn').on('tap',function(){
// 	// var lastChooseDay = $('.sureBtn').data('id');
// 	// if (lastChooseDay!=undefined) {
// 	// 	var lastChooseDay=$('.sureBtn').data('id');
// 	// 	var lastChooseMon=title.text().split('年')[1].split('月')[0]-0;
// 	// 	var lastChooseYear=title.text().split('年')[0]-0;
// 	// 	var weekDay = ["日", "一", "二", "三", "四", "五", "六"];  
// 	// 	var dateStr = lastChooseYear+'-'+lastChooseMon+'-'+lastChooseDay;
// 	// 	var week = new Date(Date.parse(dateStr.replace(/-/g, "/"))); 
// 	// 	//当前周几 
// 	// 	var lastChooseWeek=weekDay[week.getDay()];
// 	// 	console.log('您最后选择的日期是：'+lastChooseYear+'年'+lastChooseMon+'月'+lastChooseDay+'日 周'+lastChooseWeek);
// 	// }else{
// 	// 	console.log('您未选择日期');
// 	// }
// 	var nows = $('.dateInfo .now');
// 	var arr =[];
// 	nows.each(function(i,v){
// 		arr[i] = $(this).data('id');
// 		// console.log($(this).data('id'));
// 	})
// 	if(arr.length>=2){
// 		var max = Math.max.apply(null,arr);
// 		var min = Math.min.apply(null,arr);
// 		console.log(max);
// 		console.log(min);
// 		return arr;
// 	}else if(arr.length==1){
// 		console.log(arr)
// 		return arr;
// 	}
// })
