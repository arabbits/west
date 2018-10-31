


$(function(){




    // 反馈代码
    $('.new_footer').on('tap',function(){
        var text = $('#fankuis').val();
        console.log(text);
        if(!text){
            mui.alert('请输入您的反馈信息')
        }else{
            $.ajax({
                url:api+'indexUserDelAddress',
                type:'post',
                header:{'userauthkey':token},
                data:{
                    user_id:user_id,
                    content:text
                },
                success:function(data){
                    console.log(data)
                    if(data.result){
                        mui.alert("您的反馈已提交 谢谢您的监督",function(){
                            location.href = '../../myself.html'
                        })
                    }else{
                        mui.toast(data.msg)
                    }
                }
            })
        }
        
        mui.alert("您的反馈已提交 谢谢您的监督",function(){
            location.href = '../../myself.html'
        })
    })
})