var loopdata = function(i, tipo, callback){
    setInterval(function(){
        
        if(tipo == 'json'){
            var streamObject = JSON.stringify(module.exports.data); 
            callback(streamObject);  
        }else{
            const err = new Error('insert parameter json');
            callback(err);
        }     
        
    }, i);

}

module.exports.loopdata = loopdata;
module.exports.data;


