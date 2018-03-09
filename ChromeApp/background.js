

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

      var yt_webview = win.document.querySelector('#yt_webview');
      var sc_webview = win.document.querySelector('#sc_webview');
      var nextbutton = win.document.querySelector('#next');
      var play = $('#play')
      var song_text = $('#song')
      var iframe = win.document.getElementById('theFrame');



      play.addEventListener('click', function () {
        var url = song_text.value;
        // console.log(url)
        // get_search_result_data(url)
        // webview.setAttribute('src', url)
        sc_webview.contentWindow.postMessage({
          'for': 'SOUNDCLOUD',
          'command': 'SEARCH_SONGS',
          'value': url,
          'client_id': client_id
        }, '*')

      })
      console.log(yt_webview.contentWindow)

      var server_running = false;


      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (sender.url.search('youtube') >= 0) {
          handle_message_from_youtube(request)
        } else {
          console.log('from soundcloud')
          handle_message_from_soundcloud(request)
        }
      });


      // #################################################
      // Youtube Content here
      // #################################################
      yt_webview.addEventListener("loadstop", function () {
        yt_webview.contentWindow.postMessage({
          'for': 'YOUTUBE',
          'command': 'QUERY_DATA'
        }, 'https://www.youtube.com/')
      })


      yt_webview.addEventListener("contentload", function () {
        console.log(new Date().getTime())
        console.log(yt_webview)

        yt_webview.executeScript({ file: "yt_inject.js" }, function (result) { });

        nextbutton.addEventListener('click', function () {
          yt_webview.contentWindow.postMessage({
            'for': 'YOUTUBE',
            'command': 'NEXT_SONG'
          }, 'https://www.youtube.com/')
        })

      });


      yt_webview.addEventListener('permissionrequest', function (e) {
        if (e.permission === 'fullscreen') {
          e.request.allow();
        }
      });

      function handle_message_from_youtube(data) {

      }


      // #################################################
      // Soundcloud Content here
      // #################################################
      let client_id = null

      sc_webview.addEventListener("contentload", function () {
        sc_webview.executeScript({ file: "sc_inject.js" }, function (result) {
          if (client_id == null) {
            sc_webview.contentWindow.postMessage({
              'for': 'SOUNDCLOUD',
              'command': 'GET_CLIENT_ID'
            }, '*')
          }

        });
      })

      function handle_message_from_soundcloud(data) {
        console.log(data)
        let resp_to = data.responding_to;
        switch (resp_to) {
          case 'GET_CLIENT_ID':
            client_id = data.data;
            if (!server_running) {
              // server handler
              createdWindow.contentWindow.beginServer({
                yt_webview: yt_webview,
                sc_webview: sc_webview,
                iframe: iframe,
                client_id: client_id
              })
            }
            console.log('updated client id: ', client_id)
            break;
          case 'SEARCH_SONGS':
            let search_data = data.data;
            console.log(search_data)

          default:
            break;
        }
      }
    }
  })

})


