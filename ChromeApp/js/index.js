function $(id) {
  return document.getElementById(id);
}

function log(text) {
  $('log').value += text + '\n';
}


function beginServer(webview) {
  console.log('beginning server')
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