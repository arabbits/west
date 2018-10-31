$(document).ready(function (){

    $('.che_container').show();
    
});

$(function(){

    
    var siteObj = sessionStorage.getItem('siteObj')
    //     console.log(province)
    if(siteObj){
        var siteObj = sessionStorage.getItem('siteObj')
        siteObj = JSON.parse(siteObj);
        var province = siteObj.province; //省
        var district = siteObj.district; //区
        var city = siteObj.city; //城市
        $('#J_Address').val(province+' '+district+' '+city)
    }

    //验证姓名
    function Names(theObj) {
        var reg = /^([\u4e00-\u9fa5]){2,7}$/;
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    }
        //验证手机号
    function Number(theObj) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    }
        





    $('#J_Address').on('tap',function(){
        console.log('hehe ')
        location.href = 'select/sheng.html' 
    })

    // $('.newTown').text(city);     //城市
    // $('.newPro').text(province);  //省
    // $('.newArea').text(district); //区

    //点击保存时 在父页面上生成一个div 算了  还是直接把数据加到后台 动态刷新一下好了

    $('.faNew').on('tap',function(){
        var username = $('.username').val(); //联系人
        var phone = $('.phones').val();      //联系电话
        var address = $('#areaAll').val();     //详细地址
        var allCity = $('#J_Address').val() //省市区
        // console.log(allCity)
        
        if(!Names(username)){ 
            mui.alert('您输入的联系人不合法')
            $('.username').val('')
            return false;
        }else if(!Number(phone)){
            mui.alert('您输入的手机号码不合法')
            $('.phones').val(''); 
            return false;
             
        }else if(address.length == 0){
            mui.alert('详细地址不能为空')
            return false;
        }else if(!allCity){
            mui.alert('请选择地区!')
            return false;
        }
        var id = siteObj.id; //省id
        var shiid = siteObj.shiid; //市id
        var districtid = siteObj.districtid; //区id
        $.ajax({
            url: api+'indexUserAddAddress',
            type:'post',
            headers:{'userauthkey':token},
            data:{
                user_id: user_id,      //用户id
                people : username,     //收货人
                phone  : phone,   //收货电话
                province  : id,   //省份
                city  :     shiid,  //城市
                district :   districtid ,   //县
                zipcode  :  '0000',     //邮编
                address  : address ,    //详细地址
                is_default  : 0      //是否为默认 
            },
            success:function(data){
                console.log(data)
                if(data.result){
                    sessionStorage.removeItem('siteObj');
                    mui.toast(data.msg);
                    location.href = 'address.html';
                }else{
                    mui.toast(data.msg);
                }
                 

            }

        })
        // console.log(username)
        // console.log(province)
    })
})