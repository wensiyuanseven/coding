function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function(data) {
    success && success(data);
  };
  document.body.appendChild(script);
}
jsonp("http://xxx", "callback", function(value) {
  console.log(value);
});


<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>