var
  path = require('path'),
  express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  var filePath = path.normalize( __dirname + '/public/index.html');
  res.sendfile(filePath);
});

app.get('/test', function(req, res) {
});

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

server.listen(3001);

io.sockets.on('connection', function(socket) {
  socket.on('client.message', function(data) {
    io.sockets.emit('server.message', {date: data.date, message: data.message});
  });
});


