chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
      'outerBounds': {
        'width': 400,
        'height': 500
      }
    },function (createdWindow) {
      var win = createdWindow.contentWindow;
      win.onload = function () {
      var webview =  win.document.querySelector('#webview');
      console.log(webview.contentWindow)
       webview.addEventListener("contentload", function () {
         console.log(webview)

        webview.executeScript({file: "content_script.js"}, function(result) {});
        setTimeout(function(){
          webview.contentWindow.postMessage('sometext bla aklsdfj alskdfj ', 'https://www.youtube.com/')

        }, 2000)

        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
              console.log(request)
          });
        
      });
    }
  })

})