var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';


/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, task_content, time) {
  var calendar = google.calendar('v3');
  
  console.log("Content = " + task_content + " Time = " + time);
  
  var event = {
	  'summary': task_content,
	  'description': 'Todoist task completed.',
	  'start': {
		'dateTime': time,
	  },
	  'end': {
		'dateTime': time,
	  },
	};

	calendar.events.insert({
	  auth: auth,
	  calendarId: 'druerbo9027o6b9a0nmfrfsuh0@group.calendar.google.com',
	  resource: event,
	}, function(err, event) {
	  if (err) {
		console.log('There was an error contacting the Calendar service: ' + err);
		return;
	  }
	  console.log('Event created: %s', event.htmlLink);
	});
}

module.exports = 
{	
	AddEvent: function(auth, cont, time)
	{
		listEvents(auth, cont, time);
	}
};