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

server.use('/', express.static('nivade.ddns.net'));


server.post('/todoist', function(req, res)
{
	console.log(req.body);
	
	var task_content = req.body.event_data.content;
	var auth = require('./google_auth.js');
	var calendar = require('./calendar.js');
	var client = auth.AuthClient();
	var time = moment().format();
	
	calendar.AddEvent(client, task_content, time);
	
	res.status(SuccesCode).send(SuccesMessage);
});

server.listen(PORT, function () {
  console.log('Server application listening on port ' + PORT);
});