var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

var datetime = require('node-datetime');


app.use(express.static(path.join(__dirname, "public")));

var portHttp = 8080;
var portArduino = 'COM4';
var sendData = "";


var sp = new serialport.SerialPort(portArduino, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\n")
});


sp.on('open', function(){
	
io.on('connection', function(socket){
    
    console.log('new connection made');
    sp.on('data', function(data) {
        var value = data.split(" ")  
        var dt = datetime.create();
        var fomratted = dt.format('m/d/Y H:M:S');

        var streamObject = JSON.stringify({ temperatura : value[0] , umidade : value[1] , datetime : fomratted });
        socket.emit('message-from-server', {greeting:streamObject}); 
	});
    
     
});

});

server.listen(portHttp, function(){
    console.log("Listening on port" + portHttp);
});
