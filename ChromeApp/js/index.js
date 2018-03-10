console.log(window)
function $(id) {
  return document.getElementById(id);
}

function log(text) {
  $('log').value += text + '\n';
}

var got_search_data;
const YOUTUBE = 'YOUTUBE';
const SOUNDCLOUD = 'SOUNDCLOUD';

function beginServer(args) {


  function __get_meta_from_service(service) {
    if (service == YOUTUBE) {
      return {
        service: service,
        messaging_url: 'https://www.youtube.com/',
        current_view: yt_webview
      }
    } else if (service == SOUNDCLOUD) {
      return {
        service: service,
        messaging_url: '*',
        current_view: sc_webview
      }
    }

  }


  function service_send_command(service, command, value) {
    let data = __get_meta_from_service(service)
    let tosend = {
      'for': service,
      'command': command
    }
    if (value != null) {
      tosend.value = value
    }
    data.current_view.contentWindow.postMessage(tosend, data.messaging_url)
  }

  console.log(args)
  var yt_webview = args.yt_webview;
  var sc_webview = args.sc_webview;
  var iframe = args.iframe;
  var yt_tab = args.yt_tab;
  var sc_tab = args.sc_tab;
  console.log(sc_tab)
  var client_id = args.client_id;
  var current_service = null;
  var current_view = null;
  var yt_current_url = null;
  var current_song_info = null;
  messaging_url = null
  console.log('beginning server')
  console.log(iframe)
  console.log(yt_webview)
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
        service_send_command(current_service, "SONG_PLAY", null);
        req.writeJSON({ 'served': true })
        return true;
      } else if (url == '/pause') {
        service_send_command(current_service, "SONG_PAUSE", null)
        req.writeJSON({ 'served': true })
        return true;
      } else if (url == '/next') {
        service_send_command(current_service, "SONG_NEXT", null)
        req.writeJSON({ 'served': true })
        return true;
      } else if (url == '/prev') {
        current_view.back();
      } else if (url.startsWith('/volume')) {
        console.log(url)
        var volstr = url.split('?').reverse()[0]
        var vol = parseInt(volstr) / 100;
        service_send_command(current_service, "CHANGE_VOLUME", vol)
        req.writeJSON({ 'served': true })
        return true
      } else if (url.startsWith('/search')) {
        // search on soundcloud
        var query = url.split('?')[1]
        console.log(query)
        console.log(sc_webview)
        console.log(client_id)
        sc_webview.contentWindow.postMessage({
          'for': 'SOUNDCLOUD',
          'command': 'SEARCH_SONGS',
          'value': query,
          'client_id': client_id
        }, '*')
        // search on youtube
        // first update src of webview to searchquery

        var url = 'https://www.youtube.com/results?search_query=' + query;
        get_search_result_data(url, iframe, function (songdata) {
          var str = JSON.stringify(songdata)
          // str = escape(str)
          // console.log(str)
          str = escapeJSON(str)
          // songdata = json_parse(str)
          songdata = JSON.parse(str)
          youtube_search.query = query;
          youtube_search.results = songdata

          if (soundcloud_search.query == query) {
            console.log('soundcloud query has finished')
            // soundcloud query has finished
            toret = consolidate_search_data(soundcloud_search.results, youtube_search.results)
            req.writeJSON(toret)
            global_search_req_obj = null;
          } else {
            console.log('soundcloud query has not finished')
            // soundcloud query has not finished yet
            // search global search req object
            global_search_req_obj = req
          }
        })
        return true;
      } else if (url.startsWith('/goto_song')) {
        let toks = url.split('?')
        let vidid = toks[1]
        if (vidid.startsWith('https://soundcloud.com')) {
          sc_tab.click()
          // soundcloud link
          sc_webview.setAttribute('src', vidid);
          current_service = SOUNDCLOUD
          current_view = sc_webview
          messaging_url = '*'
          setTimeout(function () {
            service_send_command(SOUNDCLOUD, 'SONG_PLAY', null)
          }, 5000)
          service_send_command(YOUTUBE, 'SONG_PAUSE', null)
        } else {
          // youtube link
          yt_tab.click()
          yt_webview.setAttribute('src', 'https://www.youtube.com/watch?v=' + vidid)
          current_service = YOUTUBE
          current_view = yt_webview
          messaging_url = 'https://www.youtube.com/'

          service_send_command(SOUNDCLOUD, 'SONG_PAUSE', null)
        }
        req.writeJSON({ 'served': true })
        return true
      } else if (url.startsWith('/get_current_song')) {
        if (current_service == SOUNDCLOUD) {
          service_send_command(current_service, 'GET_SONG_INFO', null)
          global_song_info_req_obj = req;
        } else if (current_service == YOUTUBE) {
          let yt_src = yt_webview.getAttribute('src')
          if (yt_current_url != yt_src) {
            let src = yt_src.split('v=')[1]
            console.log(src)
            var url = 'https://www.youtube.com/results?search_query=' + src
            let results = get_search_result_data(url, iframe, function (results) {
              console.log(results)
              var str = JSON.stringify(results[0])
              str = escapeJSON(str)
              songdata = JSON.parse(str)
              console.log(songdata)
              req.writeJSON(songdata)
              yt_current_url = yt_src
              current_song_info = songdata
              console.log(current_song_info)
            })
          } else {
            console.log(current_song_info)
            req.writeJSON(current_song_info)
          }


        }
        return true
      }
      // Serve the pages of this chrome application.
      req.serveUrl('/www' + url);
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
        console.log(e.data)
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
        'thumbnail': v.thumbnail.thumbnails[v.thumbnail.thumbnails.length - 1].url.split('?')[0],
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

var escapeJSON = function (s) {
  toret = ''
  for (var i = 0; i < s.length; i++) {
    var code = s.charCodeAt(i);
    if (code > 127) {
      console.log(code);
      console.log(s.charAt(i))
    } else {
      toret += s.charAt(i)
    }
  }
  return toret;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.url.search('youtube') >= 0) {
    server_handle_message_from_youtube(request)
  } else {
    console.log('from soundcloud')
    server_handle_message_from_soundcloud(request)
  }
});

var soundcloud_search = {
  query: null,
  results: null
}

var youtube_search = {
  query: null,
  results: null
}

var global_search_req_obj = null;
var global_song_info_req_obj = null;

function server_handle_message_from_soundcloud(data) {
  console.log(data)
  let resp_to = data.responding_to;
  switch (resp_to) {
    case 'SEARCH_SONGS':
      let search_data = data.data;
      let query = data.query;
      soundcloud_search.query = query;
      soundcloud_search.results = search_data;
      if (youtube_search.query == query) {
        console.log('youtube query has already finished')
        // youtube query has already finished
        toret = consolidate_search_data(soundcloud_search.results, youtube_search.results)
        global_search_req_obj.writeJSON(toret)
        global_search_req_obj = null;
      } else {
        console.log('youtube query has not finished')
        // youtube query has not finished yet
        // nothing to do
        global_search_req_obj = null
      }
      break
    case 'GET_SONG_INFO':
      let song_data = data.data;
      song_data.thumbnail = song_data.thumbnail.replace('50x50', '500x500')
      global_song_info_req_obj.writeJSON(song_data)
      global_song_info_req_obj = null;
      break;

    default:
      break;
  }
}


function server_handle_message_from_youtube(data) {
  console.log('message from youtube in index.js')
  console.log(data)
  let resp_to = data.responding_to;
  switch (resp_to) {
    case 'GET_SONG_INFO':
      let song_data = data.data;
      global_song_info_req_obj.writeJSON(song_data)
      global_song_info_req_obj = null;
      break;
    default:
      break;
  }
}


function consolidate_search_data(sc, yt) {
  const MAX_SONGS = 5;
  let toret = [];
  let serv_data = {
    service: 'YouTube',
    songs: []
  }
  for (var i = 0; (i < MAX_SONGS) && (i < yt.length); i++) {
    let item = yt[i]
    item.service = 'YOUTUBE';
    serv_data.songs.push(item);
  }
  toret.push(serv_data)

  serv_data = {
    service: 'SoundCloud',
    songs: []
  }
  for (var i = 0; (i < MAX_SONGS) && (i < sc.length); i++) {
    let item = sc[i]
    item.service = 'SOUNDCLOUD';
    serv_data.songs.push(item);
  }
  toret.push(serv_data)
  return toret;
}