var wifiscanner = require('./node_modules/node-wifiscanner/lib/wifiscanner.js');
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())



app.get('/', function (req, res) {
	
	
	wifiscanner.scan(function(err, data){
		if (err) {
			console.log("Error : " + err);
			return;
		}
		console.log(data.length)
		res.json(data)
	});
	
	
	
	
})

app.listen(3002, function(){
	console.log("Start!")
})
