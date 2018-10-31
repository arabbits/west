$(function() {
    $.ajax({
      url: api + "indexStoreInfo",
      type: "post",
      headers: { userauthkey: token },
      beforeSend:function(){
        $('.loading').show();
      },
      success: function(data) {
        console.log(data);
        $('.loading').hide();
        if(data.result){
          $('.che_sosMain').html(template('tpl',data))
        }else{
          mui.toast(data.msg)
          location.href="/index.html";
        }
        if(data.data.length==0){
          $('.volist_nomode').show();
        }
      },
      error:function(res){
        console.log(res)
      }
    });

    
  });
      
  