$(function(){


    //获得要修改的信息
    var editObj = sessionStorage.getItem('editObj')
        editObj = JSON.parse(editObj)
    var editId =editObj.editId;   //地址id
    var name =editObj.editname;   //获取修改姓名
    var iphone =editObj.editiphone; //获取修改电话
    var text =editObj.edittext;  //获取修改地址 
    var defaultId =editObj.defaultId;  //获取修改地址 
    console.log(editObj);
    if(defaultId == 0){
        $('.mui-switch').removeClass('mui-active')
    }else if(defaultId ==1){
        $('.mui-switch').addClass('mui-active')
        $('.editMoren').hide();   
    }
        //获得修改的地址
    var siteObj = sessionStorage.getItem('siteObj')
        siteObj = JSON.parse(siteObj);
        console.log(siteObj);
    var areaText = sessionStorage.getItem('areaText'); //当修改地址后跳到本页面
    // console.log(text);

    //三级联动后能够确保详细地址上有值
    if(!text){
        
        var province = siteObj.province; //省
        var district = siteObj.district; //区
        var city = siteObj.city; //城市
        $('#J_Address').val(province+' '+district+' '+(city ==undefined? '':city))
        $('#areaAll').val(areaText);
    }else{
        var arr=text.split(" ");
        // console.log(editpand)
        $('#J_Address').val(arr[0]+' '+arr[1]+' '+arr[2])

        $('#areaAll').val(arr[3]);
        areaText = arr[3];
        sessionStorage.setItem('areaText',areaText)
        
    }
    $('.username').val(name);
    $('.phones').val(iphone);

    //暂时没有修改返回单独一个参数  先不做
    $('#J_Address').on('tap',function(){
        var allarea =  $('#areaAll').val();
        location.href = 'select/sheng.html' 
        
    })

    
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


    $('.faNew').on('tap',function(){
        console.log('呵呵')
        var username = $('.username').val(); //联系人
        var phone = $('.phones').val();      //联系电话
        var address = $('#areaAll').val();     //详细地址
        var allCity = $('#J_Address').val() //省市区
        console.log(allCity)
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
        }
        var  is_default;
        if($('.mui-switch').hasClass('mui-active')){
            is_default = 1;
        }else{
            is_default = 0;
        }
        console.log(is_default)
        var id ; //省id
        var shiid ; //市id
        var districtid ; //区id
        if(!siteObj){
            id = editObj.editproid;
            shiid = editObj.editcityid;
            districtid = editObj.editdistrictid;

        }else{
            id = siteObj.id; //省id
            shiid = siteObj.shiid; //市id
            districtid = siteObj.districtid; //区id 
        }
        // var id = siteObj.id; //省id
        // var shiid = siteObj.shiid; //市id
        // var districtid = siteObj.districtid; //区id
        
        $.ajax({
            url:api+'indexUserEditAddress',
            type:'post',
            headers:{'userauthkey':token},
            data:{
                user_id: user_id,      //用户id
                address_id : editId,
                people : username,     //收货人
                phone  : phone,   //收货电话
                province  : id,   //省份
                city  :     shiid,  //城市
                district :   districtid ,   //区
                zipcode  :  '0000',     //邮编
                address  : address ,    //详细地址
                is_default  : is_default      //是否为默认
            },
            success:function(data){
                console.log(data)
                if(data.result){
                    sessionStorage.removeItem('editObj');
                    sessionStorage.removeItem('siteObj');

                    mui.toast(data.msg)
                    location.href = 'address.html'
                    
                }else{
                    mui.toast(data.msg)
                }
            }
        })
    })
})