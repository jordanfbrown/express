var
  path = require('path'),
  express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  db = require('mongojs').connect('127.0.0.1:27017/db', ['messages']);

app.get('/', function(req, res) {
  var filePath = path.normalize( __dirname + '/public/index.html');
  res.sendfile(filePath);
});

app.get('/messages', function(req, res) {
  db.messages.find(function(err, messages) {
    if(err) {
      res.send('Error!');
    } 
    else {
      res.send(JSON.stringify(messages));
    }
  });
});

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

server.listen(3001);

io.sockets.on('connection', function(socket) {
  socket.on('client.message', function(data) {
    db.messages.save(data);
    io.sockets.emit('server.message', {date: data.date, message: data.message});
  });
});


