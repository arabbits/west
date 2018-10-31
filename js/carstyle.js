$(function(){
    var cheText = sessionStorage.getItem('test');
    var id = sessionStorage.getItem('ID');
    var where = sessionStorage.getItem('where');
    var type_id = 4;
    console.log(id)
    console.log(cheText)
    //渲染列表
    $.ajax({
        url:"http://api.carlub.com.cn/indexOrderSearchCar",
        type:'post',
        headers:{'userauthkey':token},
        beforeSend:function(){
            $('.loading').show()
        },
        data:{id:id,type_id:type_id},
        success:function(info){
            if(info.result){
                $('.loading').hide()
                $('.che_main').show()
                
                console.log(info)
                $('.zu_main').html(template('tpl',info))
                $('.contain .zu_main').on('tap','.zuli',function(){
                    // var that = $(this);
                    var text =  $(this).text();
                    var id = $(this).data('id');
                console.log(id)
                // var partext = $(this).parents('.contain').find('.zu_Name').text()
                    var all = cheText+text;
                    sessionStorage.setItem("All",all);
                    sessionStorage.setItem('type_id',id);
                    sessionStorage.removeItem('ID')
                    sessionStorage.removeItem('test')
                    // history.go(-2);
                    if(where){
                        location.href = '/myself/editmycar.html';
                        
                    }else{
                        location.href = '/message/message.html';
                    }
                })
            }else{
                mui.toast(info.msg);
            }
           

        }
    })

})