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
	var google_auth = require('./google_auth.js');
	
	var auth = google_auth.GetAuth();
	
	var calendar = require('./addtogcal.js');
	
	calendar.Move(auth, "Check", moment().format());
	
	res.send(auth);
});

server.listen(PORT, function () {
  console.log('Server application listening on port ' + PORT);
});