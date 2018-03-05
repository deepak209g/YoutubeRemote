

chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    },
    'resizable': true,
    'state': 'maximized'
  }, function (createdWindow) {
    var win = createdWindow.contentWindow;
    win.onload = function () {
      function $(selector) {
        return win.document.querySelector(selector)
      }

      var webview = win.document.querySelector('#webview');
      var nextbutton = win.document.querySelector('#next');
      var play = $('#play')
      var song_text = $('#song')
      var iframe = win.document.getElementById('theFrame');



      play.addEventListener('click', function () {
        var url = song_text.value;
        console.log(url)
        get_search_result_data(url)
        // webview.setAttribute('src', url)
      })
      console.log(webview.contentWindow)

      // handle
      createdWindow.contentWindow.beginServer(webview, iframe)


      webview.addEventListener("loadstart", function () {
        console.log(new Date().getTime())
      })


      webview.addEventListener("loadstop", function () {
        webview.contentWindow.postMessage({
          'command': 'QUERY_DATA'
        }, 'https://www.youtube.com/')
      })
      webview.addEventListener("contentload", function () {
        console.log(new Date().getTime())
        console.log(webview)

        webview.executeScript({ file: "content_script.js" }, function (result) { });

        nextbutton.addEventListener('click', function () {
          webview.contentWindow.postMessage({
            'command': 'NEXT_SONG'
          }, 'https://www.youtube.com/')
        })

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
          console.log(request)
        });

      });


      webview.addEventListener('permissionrequest', function (e) {
        if (e.permission === 'fullscreen') {
          e.request.allow();
        }
      });
    }
  })

})


