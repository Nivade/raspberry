var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';




function Add(task_content, time)
{
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
	  if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	  }
	  // Authorize a client with the loaded credentials, then call the
	  // Google Calendar API.
	  authorize(JSON.parse(content), task_content, time);
	});
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, task_content, time) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, task_content, time);
    } else 
	{
      oauth2Client.credentials = JSON.parse(token);
      listEvents(oauth2Client, task_content, time);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, task_content, time) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      listEvents(oauth2Client, task_content, time);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

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
	Insert: function(task_content, time)
	{	
		Add(task_content, time);
	};
	
	Move: function(auth, cont, time)
	{
		listEvents(auth, cont, time);
	};
};