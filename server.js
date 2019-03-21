var wifiscanner = require('./node_modules/node-wifiscanner/lib/wifiscanner.js');



var express = require('express')
var app = express()

app.get('/', function (req, res) {
	
	
	wifiscanner.scan(function(err, data){
		if (err) {
			console.log("Error : " + err);
			return;
		}
		console.log(data)
		res.json(data)
	});
	
	
	
	
})

app.listen(3002)
