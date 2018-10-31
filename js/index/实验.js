$(function(){
    // function say(content) {
    //     console.log("我是 " + this + ": 说 "+ content);
    // }
    // say.call("Bob", "World"); //==> From Bob: Hello World


    function shit(word) {
        console.log(word);
     }
     shit("Hello world");
  
     shit.call(window, "Hello world");
     
})