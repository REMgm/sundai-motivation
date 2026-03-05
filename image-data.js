// Embedded image data - replaces file references with data URIs
(function(){
var m={
"assets/rem-authority.jpg":"data:image/jpeg;base64,PLACEHOLDER_SEE_FILE"
};
function fix(){
var imgs=document.querySelectorAll("img");
for(var i=0;i<imgs.length;i++){
var s=imgs[i].getAttribute("src");
if(!s)continue;
var k=s.replace(/^\.\.\//, "").replace(/^\.\//,"");
if(m[k])imgs[i].src=m[k];
}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fix);
else fix();
})();