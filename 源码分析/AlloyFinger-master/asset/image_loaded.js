function imageLoaded(selector,onload){
    var img = new Image() ;
    var dom=document.querySelector(selector);
    img.onload=function(){
        onload.call(dom,this.width,this.height);
        img.onload=null;
        img=null;
    };
    img.src=dom.getAttribute("src");
}