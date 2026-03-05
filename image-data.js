// Embedded image data loader - loads parts and fixes image src attributes
(function(){
  var partsLoaded = 0;
  var totalParts = 5;
  var parts = [
    "image-data-part0.js",
    "image-data-part1.js",
    "image-data-part2.js",
    "image-data-part3.js",
    "image-data-part4.js"
  ];

  function fix(){
    var m = window._imgData || {};
    var imgs = document.querySelectorAll("img");
    for(var i = 0; i < imgs.length; i++){
      var s = imgs[i].getAttribute("src");
      if(!s) continue;
      var k = s.replace(/^\.\.\//, "").replace(/^\.\//, "");
      if(m[k]) imgs[i].src = m[k];
    }
  }

  function onPartLoaded(){
    partsLoaded++;
    if(partsLoaded === totalParts){
      if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", fix);
      } else {
        fix();
      }
    }
  }

  // Determine base path (works from root or articles/ subdirectory)
  var scripts = document.getElementsByTagName("script");
  var basePath = "";
  for(var i = 0; i < scripts.length; i++){
    var src = scripts[i].src || "";
    if(src.indexOf("image-data.js") !== -1){
      basePath = src.replace("image-data.js", "");
      break;
    }
  }

  // Load each part
  for(var p = 0; p < parts.length; p++){
    var script = document.createElement("script");
    script.src = basePath + parts[p];
    script.onload = onPartLoaded;
    script.onerror = onPartLoaded; // count even on error so fix() still runs
    document.head.appendChild(script);
  }
})();
