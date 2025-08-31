const http = require('http');

const server = http.createServer(function(req, res){
    res.end("hello from server")
})

server.listen(3005)