(function(){
function f(){var i=document.querySelectorAll("img");for(var j=0;j<i.length;j++){var s=i[j].getAttribute("src");if(!s)continue;var k=s.replace(/^\.\.\//, "").replace(/^\.\//,"");if(window._img&&window._img[k])i[j].src=window._img[k];}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f();
})();