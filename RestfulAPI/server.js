var express = require('express');
var app = express();
var fs = require("fs");
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
};

app.get('/', function (req, res) {
       console.log( "Hellooooo!!" );
       res.end( "Heloooooo!!!!" );
});

app.get('/listUsers', function (req, res) {
   fs.readFile( "data" + "/" + "users.json", 'utf8', function (err, data) {
       if(err){
         console.log(err);
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end(err);
       }
       console.log( data );
       res.end( data );
   });
})

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( "data" + "/" + "users.json", 'utf8', function (err, data) {
       if(err){
         console.log(err);
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end(err);
       }
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

app.get('/:id', function (req, res) {
   // First read existing users. access using http://127.0.0.1:8081/2
   fs.readFile( "data" + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id]
       console.log( user );
       res.end( JSON.stringify(user));
   });
});

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( "data" + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];

       console.log( data );
       res.end( JSON.stringify(data));
   });
});


var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});
