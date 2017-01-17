var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var display = require('./lib/displaydata');
var datetime = require('node-datetime');

var portHttp = 8080;


app.use(express.static(path.join(__dirname, "public")));

	
io.on('connection', function(socket){
    
    console.log('new connection smartFlorest'); 
      
        display.loopdata(1000, 'json' , function(data){
            var dt = datetime.create();
            var fomratted = dt.format('d/m/Y H:M:S');
            display.data = { temperatura :  Math.random() , datetime : fomratted }
            socket.emit('sendatatemp', {arg:data}); 
        });          
});

server.listen(portHttp, function(){
    console.log("Listening on port" + portHttp);
});
