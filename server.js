var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var requestify = require('requestify');
var http = require('http');

const PORT = 8080;
const SuccesCode = 200;
const SuccesMessage = "OK";
const TodoistSync = "https://todoist.com/API/v6/sync";

var server = express();


server.use(bodyParser.json());


server.post('/todoist', function(req, res)
{
	console.log(req.body);
	
	var task_content = req.body.event_data.content;
	var project_id = req.body.event_data.project_id;
		
	var calendar = require('./addtogcal.js');
	
	var t = moment().format();
	
	calendar.Insert(task_content, t);
	
	res.status(SuccesCode).send(SuccesMessage);
});


server.get('/',  function (req, res) 
{
	requestify.request(TodoistSync, {
		method: 'POST',
		params: {
			token: '8b7673d1eb695fc3d1fd7adcd8daa2949221cb76',
			seq_no: '0',
			resource_types: 'projects'
		},
		headers: {
			'application': 'x-www-form-urlencoded'
		},    
	})
	.then(function(response) {
		// get the response body
		response.getBody();

		// get the response headers
		response.getHeaders();

		// get the code
		response.getCode();

		// Get the response raw body
		console.log(response);
		console.log(response.body);
		console.log(response.getBody());
		console.log("Then");
	});
	
	
	res.send("k");
});

server.listen(PORT, function () {
  console.log('Server application listening on port ' + PORT);
});