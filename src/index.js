const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var url = require('url'),
    server = app.listen(process.env.PORT || 3000),
    querystring = require('querystring'),
    http = require('http'),
    io  = require('socket.io').listen(server);

var router = express.Router();

// Db connection
const { mongoose } = require('./database');
const Visita = require('./models/visitas');
// Settings 
//app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/visitas', require('./routes/visitas.routes'));
// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});



io.on('connection', function(socket) {
 
  url_cliente = socket.handshake.query.name;

  sendVisita(function(data) {
      console.log('Send locations to client ' + socket.id);
  });

  socket.emit('conexion', { bandera: 'true' });

});

//funciones adicionales
//envia un post a la api
function sendVisita(callback) {
  var api_host = 'localhost';
  var post_data = querystring.stringify({
      'url': url_cliente
  });
  var options = {
      hostname: api_host,
      port: process.env.PORT || 3000,
      path: '/api/visitas',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  var req = http.request(options, function(res) {
      //console.log('-----------------------------------------');
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      var output = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
          output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          if (callback != undefined) {
              callback(obj);
          }
      });
  });

  req.write(post_data);

  req.on('error', function(e) {
      callback({
          url: "/"
      });
      console.log('problem with request: ' + e.message);
  });

  req.end();
}