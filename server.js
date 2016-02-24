'use strict';

var express = require('express'),
    app = express(),
    env = process.env,
    port = env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

console.log(__dirname);

//folder containing assets or scripts
app.use('/lib', express.static(__dirname+'/lib'));
app.use('/client', express.static(__dirname+'/client'));


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(port, ip, function() {
    console.log("Listening on " + port);
});
