let express = require('express');
let path = require('path');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let display = require('./lib/displaydata');
let datetime = require('node-datetime');

let portHttp = 8080;


app.use(express.static(path.join(__dirname, "public")));

	
io.on('connection', function(socket){
    
    console.log('new connection Smart Florest'); 
      display.loopdata(1000, 'json' , (data) => {
        let dt = datetime.create();
        let fomratted = dt.format('d/m/Y H:M:S');
        display.data = { temperatura :  Math.random() , datetime : fomratted }
        socket.emit('sendatatemp', {arg:data}); 
      });        
});

server.listen(portHttp, function(){
    console.log("Listening on port" + portHttp);
});
