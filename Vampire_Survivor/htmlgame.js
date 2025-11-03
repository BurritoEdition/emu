(() => {
  var t = (location.ancestorOrigins != null ? location.ancestorOrigins[0] : null) || document.referrer;
  var domain = t != null && t.match(/\/\/([^\/]+)/) != null ? t.match(/\/\/([^\/]+)/)[1] : "unknown-domain";
  var url = window.location.href;
  var uploadId = url != null && url.match(/\/html\/(\d+)/) != null ? url.match(/\/html\/(\d+)/)[1] : null;
  var o = new FormData();
  o.append("domain", domain);
  if (uploadId) o.append("upload_id", uploadId);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("https://itch.io/html-callback", o);
  }
})();
