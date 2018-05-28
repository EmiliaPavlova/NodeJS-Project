const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'credentials.json';

let authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
          return getAccessToken(oAuth2Client, callback);
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
  });
}

let getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });
  const code = '4/AACskZnRGbGHmTehSnqdorozGsk4WxJ9nQRL3MS5O_oLEAf5mGNHM6o';
  rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      console.log('code', code);
      oAuth2Client.getToken(code, (err, token) => {
          if (err) {
              return callback(err);
          }
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) {
              console.error(err);
          }
          console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
      });
  });
}

// let listFiles = (auth) => {
//   const drive = google.drive({version: 'v3', auth});
//   drive.files.list({
//       pageSize: 100,
//       fields: 'nextPageToken, files(id, name)',
//   }, (err, {data}) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const files = data.files;
//       if (files.length) {
//           console.log('Files:');
//           files.filter((file) => {
//               if (file.name === 'nodejs-homework3.css') {
//                   console.log(file);
//               }
//           });
//       } else {
//           console.log('No files found.');
//       }
//   });
// }
