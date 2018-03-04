function $(id) {
    return document.getElementById(id);
  }
  
  function log(text) {
    $('log').value += text + '\n';
  }
  
  var port = 5555;
  var isServer = false;
  if (http.Server && http.WebSocketServer) {
    // Listen for HTTP connections.
    var server = new http.Server();
    var wsServer = new http.WebSocketServer(server);
    server.listen(port);
    isServer = true;
  
    server.addEventListener('request', function(req) {
      var url = req.headers.url;
      if (url == '/')
        url = '/index.html';
      // Serve the pages of this chrome application.
      req.serveUrl(url);
      return true;
    });
  
    // A list of connected websockets.
    var connectedSockets = [];
  
    wsServer.addEventListener('request', function(req) {
      log('Client connected');
      var socket = req.accept();
      connectedSockets.push(socket);
  
      // When a message is received on one socket, rebroadcast it on all
      // connected sockets.
      socket.addEventListener('message', function(e) {
        for (var i = 0; i < connectedSockets.length; i++)
          connectedSockets[i].send(e.data);
      });
  
      // When a socket is closed, remove it from the list of connected sockets.
      socket.addEventListener('close', function() {
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

  

  // Qr code generation logic
  var qr = new QRious({
    element: document.getElementById('qr-canvas'),
    value: 'https://github.com/neocotic/qrious',
    size: 300
  });