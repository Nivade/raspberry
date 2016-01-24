
var google = require('googleapis');
var googleAuth = require('google-auth-library');

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
	Move: function(auth, cont, time)
	{
		listEvents(auth, cont, time);
	}
};