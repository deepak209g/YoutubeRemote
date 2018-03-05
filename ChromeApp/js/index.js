console.log(window)
function $(id) {
  return document.getElementById(id);
}

function log(text) {
  $('log').value += text + '\n';
}

var got_search_data;

function beginServer(webview, iframe) {
  console.log('beginning server')
  console.log(iframe)
  var port = 5555;
  var isServer = false;
  if (http.Server && http.WebSocketServer) {
    // Listen for HTTP connections.
    var server = new http.Server();
    var wsServer = new http.WebSocketServer(server);
    server.listen(port);
    isServer = true;

    server.addEventListener('request', function (req) {
      var url = req.headers.url;
      console.log(url)
      if (url == '/')
        url = '/index.html';
      else if (url == '/ping') {
        req.writeJSON({ 'available': true })
        console.log('Writings dta')
        return true;
      } else if (url == '/play') {
        webview.contentWindow.postMessage({
          'command': 'SONG_PLAY'
        }, 'https://www.youtube.com/')
        req.writeJSON({ 'served': true })
        return true;
      } else if (url == '/pause') {
        webview.contentWindow.postMessage({
          'command': 'SONG_PAUSE'
        }, 'https://www.youtube.com/')
        req.writeJSON({ 'served': true })
        return true;
      } else if (url == '/next') {
        webview.contentWindow.postMessage({
          'command': 'SONG_NEXT'
        }, 'https://www.youtube.com/')
        req.writeJSON({ 'served': true })
        return true;
      } else if (url.startsWith('/volume')) {
        console.log(url)
        var volstr = url.split('?').reverse()[0]
        var vol = parseInt(volstr) / 100;
        webview.contentWindow.postMessage({
          'command': 'CHANGE_VOLUME',
          'value': vol
        }, 'https://www.youtube.com/')
        req.writeJSON({ 'served': true })
        return true
      } else if (url.startsWith('/search')) {
        // search for a song
        // first update src of webview to searchquery
        var query = url.split('?')[1]
        var url = 'https://www.youtube.com/results?search_query=' + query;
        get_search_result_data(url, iframe, function (songdata) {
          var str = JSON.stringify(songdata)
          // str = escape(str)
          // console.log(str)
          str = escapeJSON(str)
          // songdata = json_parse(str)
          songdata = JSON.parse(str)
          req.writeJSON(songdata);
        })
        return true;
      } else if (url.startsWith('/goto_song')) {
        let toks = url.split('?')
        let vidid = toks[1]
        webview.setAttribute('src', 'https://www.youtube.com/watch?v=' + vidid)
        req.writeJSON({ 'served': true })
        return true
      }
      // Serve the pages of this chrome application.
      req.serveUrl(url);
      return true;
    });

    // A list of connected websockets.
    var connectedSockets = [];

    wsServer.addEventListener('request', function (req) {
      log('Client connected');
      var socket = req.accept();
      connectedSockets.push(socket);

      // When a message is received on one socket, rebroadcast it on all
      // connected sockets.
      socket.addEventListener('message', function (e) {
        for (var i = 0; i < connectedSockets.length; i++)
          connectedSockets[i].send(e.data);
      });

      // When a socket is closed, remove it from the list of connected sockets.
      socket.addEventListener('close', function () {
        log('Client disconnected');
        for (var i = 0; i < connectedSockets.length; i++) {
          if (connectedSockets[i] == socket) {
            connectedSockets.splice(i, 1);
            break;
          }
        }
      });
      return true;
    });
  }
}

chrome.system.network.getNetworkInterfaces(function (interfaces) {
  var ipdiv = document.querySelector('#ipdiv')
  var ips = []
  for (var int in interfaces) {
    var interface = interfaces[int]
    if (interface.prefixLength == 24) {
      ips.push('<h1>' + interface.address + ':5555</h1>')
    }
  }
  ips = ips.reverse()
  ipdiv.innerHTML = ips.join('')
});



function get_search_result_data(loc, iframe, callback) {

  var xhr = new XMLHttpRequest();
  console.log(loc)
  xhr.open("GET", loc, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // WARNING! Might be evaluating an evil script!
      // var resp = eval(xhr.responseText);
      // console.log(xhr.responseText)
      parser = new DOMParser();
      doc = parser.parseFromString(xhr.responseText, "text/html");
      var scripts = doc.getElementsByTagName('script')
      for (var e in scripts) {
        var script = scripts[e];
        // console.log(script.innerHTML)
        if (script.innerHTML != undefined) {
          if (script.innerHTML.indexOf('window["ytInitialData"]') > 0) {
            // var data = eval(script.innerHTML);
            var scr = script.innerHTML;


            var message = {
              'script': scr
            }
            iframe.contentWindow.postMessage(message, '*');
            window.addEventListener('message', function (event) {
              // this.console.log(event.data);
              console.log('in message')
              // document.querySelector("#result").innerHTML = event.data.result || "invalid result"
              // console.log(data)
              var songdata = song_data_from_json(event.data.result)
              callback(songdata);
            });



          }
        }

        // console.log(script.innerHTML.indexOf('window["ytInitialData"]') )

      }
    } else {
      // console.log(err)
    }
  }
  xhr.send();
}


function song_data_from_json(json) {

  // console.log(window)
  var searchres = json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0]

  console.log(searchres)
  var songs = searchres.itemSectionRenderer.contents
    .map(function (e) {
      if (e.videoRenderer) {
        return e.videoRenderer
      }
    })

  console.log(songs)
  var songdata = songs.map(function (v) {
    if (v) {
      return {
        'thumbnail': v.thumbnail.thumbnails[v.thumbnail.thumbnails.length - 1].url,
        'url': v.videoId,
        'runtime': typeof v.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer !== 'undefined' ? v.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText : typeof v.thumbnailOverlays[1].thumbnailOverlayTimeStatusRenderer !== 'undefined' ? v.thumbnailOverlays[1].thumbnailOverlayTimeStatusRenderer.text.simpleText : '',
        'uploader': v.shortBylineText.runs[0].text,
        'title': v.title.simpleText
      }
    }
  })

  songdata = songdata.filter(function (v) {
    if (v) {
      return true
    }
  })
  console.log(songdata)

  return songdata;
}

var escapeJSON = function(s){
  toret = ''
  for(var i=0; i<s.length; i++){
    var code = s.charCodeAt(i);
    if(code > 127){
      console.log(code);
      console.log(s.charAt(i))
    }else{
      toret += s.charAt(i)
    }
  }
  return toret;
}

// var escapeJSON = function (s) {
//   s = s.replace(/\\n/g, "\\n")
//     .replace(/\\'/g, "\\'")
//     .replace(/\\"/g, '\\"')
//     .replace(/\\&/g, "\\&")
//     .replace(/\\r/g, "\\r")
//     .replace(/\\t/g, "\\t")
//     .replace(/\\b/g, "\\b")
//     .replace(/\\f/g, "\\f");
//   // remove non-printable and other non-valid JSON chars
//   s = s.replace(/[\u0000-\u0019]+/g, "");
//   return s;
// }

// var escapeJSON = function(json) {
//   var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
//   var meta = {    // table of character substitutions
//               '\b': '\\b',
//               '\t': '\\t',
//               '\n': '\\n',
//               '\f': '\\f',
//               '\r': '\\r',
//               '"' : '\\"',
//               '\\': '\\\\'
//             };

//   escapable.lastIndex = 0;
//   return escapable.test(json) ? '"' + json.replace(escapable, function (a) {
//       var c = meta[a];
//       return (typeof c === 'string') ? c
//         : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//   }) + '"' : '"' + json + '"';

// };