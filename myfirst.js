const http = require('http');
const fs = require('fs')

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
    if (err) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('index.html').pipe(res);
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);
