$(function(){
    var reserObj = sessionStorage.getItem('reserObj');
    if(reserObj){
        reserObj = JSON.parse(reserObj)
        reserObj = {data:reserObj}
        console.log(reserObj);
        $.each(reserObj.data,function(v,i){
            console.log(v)
            console.log(i)
        })
        $('.mui-scroll').html(template('tpl',reserObj))
    }
})